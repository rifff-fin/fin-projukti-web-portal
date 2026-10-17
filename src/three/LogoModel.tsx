import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  AdditiveBlending,
  Group,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PointLight,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  Vector3,
} from 'three';
import { easing } from 'maath';
import { CORNER_ARCS } from '../brand/logoSpec';
import { isRevealed, whenRevealed } from '../lib/preloader';
import { signal } from '../store/scene';
import { haloTexture, ringTexture } from './halo';
import {
  BALL_CENTER,
  BALL_R,
  FOOT,
  TUBE_R,
  buildBall,
  buildFoot,
  buildPath,
  pointAt,
} from './logoGeometry';
import { createLogoMaterial } from './logoMaterial';
import { stage, target } from './stations';

/**
 * The 3D logo and its node.
 *
 *   build      (hero, on first sight after the loader) the foot rises, then the node leaves
 *              it and lays the path behind it; at the top the ball forms around the node,
 *              flares and sends out a ring of light.
 *   heartbeat  (hero and footer) a pulse runs from the square to the circle every few
 *              seconds, or at once when a main button is hovered; the ball answers.
 *   climb      (Process) scroll owns the node: it moves corner by corner, the path behind it
 *              stays lit, each corner lights as it is reached, the ball at the end.
 *   reduced    the logo stands complete with the ball on; nothing moves by itself.
 *
 * Scroll and time write targets; everything visible is damped towards them, so jumps in
 * scroll position never show as jumps on screen.
 */

const T = {
  footIn: 0.6, // foot rises and fades in
  runAt: 0.45, // node leaves the foot
  run: 1.9, // node lays the path
  ballIn: 0.75, // ball forms
  settle: 1.4, // after the arrival, before the heartbeat starts
  pulse: 1.45, // one heartbeat run
  every: 6.5, // between heartbeats
};

/** The end ball's resting glow ("on"). */
const BALL_ON = 0.32;

const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
const expoOut = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const cubicInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const sineInOut = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;
/** Frame-rate independent approach of `v` towards `to` (time constant `tau` seconds). */
const approach = (v: number, to: number, tau: number, dt: number) =>
  v + (to - v) * (1 - Math.exp(-dt / tau));
const smoothstep = (a: number, b: number, t: number) => {
  const x = clamp01((t - a) / (b - a));
  return x * x * (3 - 2 * x);
};

/**
 * Process progress (0..1) → node position along the path. Four equal windows, one per
 * step: the node travels to that step's corner in the first part of its window and rests
 * there; in the last window it rests on the fourth corner, then runs on to the ball.
 */
function climbArc(p: number) {
  const w = Math.min(3, Math.floor(p * 4));
  const u = p * 4 - w;
  const from = w === 0 ? 0 : CORNER_ARCS[w - 1];
  const to = CORNER_ARCS[w];
  if (w < 3) return from + (to - from) * smoothstep(0, 0.6, u);
  const atCorner = from + (to - from) * smoothstep(0, 0.42, u);
  return atCorner + (1 - to) * smoothstep(0.6, 0.92, u);
}

/**
 * Geometry, materials and textures, made once: the site has one logo and the 3D chunk is
 * loaded only when it is needed, so they live for the page.
 */
const parts = (() => {
  const { material, uniforms } = createLogoMaterial();
  const glow = haloTexture();
  return {
    path: buildPath(),
    foot: buildFoot(),
    ball: buildBall(),
    material,
    uniforms,
    coreGeo: new SphereGeometry(TUBE_R * 1.07, 32, 24),
    coreMat: new MeshBasicMaterial({ color: '#fff3e6', toneMapped: false }),
    haloMat: new SpriteMaterial({
      map: glow,
      blending: AdditiveBlending,
      depthWrite: false,
      depthTest: false,
      transparent: true,
      toneMapped: false,
      opacity: 0,
    }),
    ballHaloMat: new SpriteMaterial({
      map: glow,
      blending: AdditiveBlending,
      depthWrite: false,
      transparent: true,
      toneMapped: false,
      opacity: 0,
    }),
    ringMat: new SpriteMaterial({
      map: ringTexture(),
      blending: AdditiveBlending,
      depthWrite: false,
      transparent: true,
      toneMapped: false,
      opacity: 0,
    }),
  };
})();

type Phase = 'waiting' | 'build' | 'live';

export function LogoModel() {
  const root = useRef<Group>(null);
  const spin = useRef<Group>(null);
  const float = useRef<Group>(null);
  const foot = useRef<Mesh>(null);
  const ball = useRef<Mesh>(null);
  const core = useRef<Mesh>(null);
  const halo = useRef<Sprite>(null);
  const ballHalo = useRef<Sprite>(null);
  const ring = useRef<Sprite>(null);
  const light = useRef<PointLight>(null);

  const life = useRef({
    phase: 'waiting' as Phase,
    revealed: isRevealed(),
    buildAt: 0,
    pulseAt: -1,
    nextPulse: 0,
    served: signal.requests,
    flareAt: -100,
    climbing: false,
    climbArrived: false,
    snap: true,
    station: null as string | null,
    visible: false,
    head: { x: 0, y: 0 },
    corners: [0, 0, 0, 0],
  });

  useEffect(() => {
    whenRevealed(() => {
      life.current.revealed = true;
    });
  }, []);

  const tmp = useMemo(() => new Vector3(), []);

  useFrame((state, delta) => {
    const g = root.current;
    const s = spin.current;
    const f = float.current;
    if (!g || !s || !f) return;
    const L = life.current;
    const u = parts.uniforms;
    const now = state.clock.elapsedTime;
    const dt = Math.min(delta, 1 / 20);

    g.visible = target.visible;

    // ---- placement: viewport px → world units at z = 0 ----
    const cam = state.camera as PerspectiveCamera;
    const k = (2 * cam.position.z * Math.tan((cam.fov * Math.PI) / 360)) / state.size.height;
    tmp.set((target.x - state.size.width / 2) * k, -(target.y - state.size.height / 2) * k, 0);
    const scale = target.pxPerUnit * k;
    // jump straight there on the first frame and whenever the logo reappears elsewhere
    if (target.station !== L.station && !L.visible) L.snap = true;
    if (L.snap) {
      g.position.copy(tmp);
      g.scale.setScalar(scale);
      s.rotation.set(target.pitch, target.yaw, 0);
      L.snap = false;
    } else {
      easing.damp3(g.position, tmp, 0.07, dt);
      easing.damp3(g.scale, [scale, scale, scale], 0.07, dt);
    }
    L.station = target.station;
    L.visible = target.visible;

    // ---- pose: station pose + life (full motion only) ----
    let yaw = target.yaw;
    let pitch = target.pitch;
    let lift = 0;
    if (stage.motion) {
      yaw += Math.sin(now * 0.42) * 0.07 + stage.pointer.x * 0.22;
      pitch += Math.sin(now * 0.31 + 1) * 0.03 + stage.pointer.y * 0.12;
      lift = Math.sin(now * 0.9) * 0.035;
    }
    easing.damp(s.rotation, 'y', yaw, target.settled ? 0.35 : 0.12, dt);
    easing.damp(s.rotation, 'x', pitch, 0.35, dt);
    easing.damp(f.position, 'y', lift, 0.2, dt);

    // ---- the node ----
    let head = 1; // node position along the path
    let glow = 0; // node brightness
    let draw = 1; // how much of the path exists
    let footIn = 1;
    let ballIn = 1;
    let ballGlow = BALL_ON; // the end ball "on"
    let coreOn = 0;
    let haloSize = 1.0;
    let fill = 0;
    let tail = 0.15;
    const cornerTarget = [0, 0, 0, 0];

    if (!stage.motion) {
      L.phase = 'live';
    } else if (L.phase === 'waiting') {
      if (L.revealed && target.visible) {
        // build on first sight in the hero; arriving anywhere else, it is simply there
        if (target.station === 'hero') {
          L.phase = 'build';
          L.buildAt = now;
        } else {
          L.phase = 'live';
          L.nextPulse = now + T.settle;
        }
      } else {
        draw = 0;
        footIn = 0;
        ballIn = 0;
      }
    }

    if (stage.motion && L.phase === 'build') {
      const t = now - L.buildAt;
      footIn = expoOut(clamp01(t / T.footIn));
      const run = clamp01((t - T.runAt) / T.run);
      head = cubicInOut(run);
      draw = head;
      glow = smoothstep(0, 0.35, t);
      coreOn = 1;
      haloSize = 1.35;
      tail = 0.12;
      const arrived = t - (T.runAt + T.run);
      if (arrived < 0) {
        ballIn = 0;
        ballGlow = 0;
      } else {
        if (L.flareAt < L.buildAt) L.flareAt = now - arrived;
        ballIn = 0.35 + 0.65 * expoOut(clamp01(arrived / T.ballIn));
        // the node's light hands over to the ball
        const fade = 1 - smoothstep(0, 0.6, arrived);
        glow *= fade;
        coreOn = fade;
        if (arrived > T.settle) {
          L.phase = 'live';
          L.nextPulse = now + 2.2;
        }
      }
    } else if (stage.motion && L.phase === 'live') {
      if (target.climb !== null) {
        // the climb: scroll owns the node
        L.pulseAt = -1;
        L.served = signal.requests;
        const want = climbArc(target.climb);
        if (!L.climbing) u.uHead.value = want;
        head = want;
        glow = 1;
        fill = 1;
        tail = 0.08;
        haloSize = 1.05;
        for (let c = 0; c < 4; c++)
          cornerTarget[c] = smoothstep(-0.006, 0.004, want - CORNER_ARCS[c]);
        ballGlow = 0.12 + smoothstep(0.985, 1, want) * 1.5;
        // the node reaches the ball: the same flare as the build's arrival
        if (want > 0.999 && !L.climbArrived && L.climbing) L.flareAt = now;
        L.climbArrived = want > 0.99;
        L.climbing = true;
      } else {
        L.climbing = false;
        // heartbeat
        const asked = signal.requests !== L.served;
        if (L.pulseAt < 0 && target.visible && (now >= L.nextPulse || asked)) {
          L.pulseAt = now;
        }
        L.served = signal.requests;
        if (L.pulseAt >= 0) {
          const p = (now - L.pulseAt) / T.pulse;
          if (p >= 1) {
            L.pulseAt = -1;
            L.flareAt = now;
            L.nextPulse = now + T.every;
          } else {
            head = sineInOut(p);
            glow = smoothstep(0, 0.08, p) * (1 - smoothstep(0.94, 1, p));
          }
        }
        const sinceFlare = now - L.flareAt;
        ballGlow = BALL_ON + 1.6 * Math.exp(-sinceFlare * 3.2) * (sinceFlare >= 0 ? 1 : 0);
      }
    }

    // ---- write uniforms (damped where scroll could jump) ----
    if (L.climbing) easing.damp(u.uHead, 'value', head, 0.12, dt);
    else u.uHead.value = head;
    u.uDraw.value = draw;
    easing.damp(u.uGlow, 'value', glow, L.climbing ? 0.25 : 0.04, dt);
    easing.damp(u.uFill, 'value', fill, 0.3, dt);
    u.uTail.value = tail;
    for (let c = 0; c < 4; c++) L.corners[c] = approach(L.corners[c], cornerTarget[c], 0.12, dt);
    u.uCorners.value.set(L.corners[0], L.corners[1], L.corners[2], L.corners[3]);
    easing.damp(u.uBall, 'value', ballGlow, L.phase === 'build' ? 0.03 : 0.12, dt);

    // ---- parts that move ----
    const ft = foot.current!;
    ft.scale.setScalar(Math.max(0.0001, footIn));
    ft.position.set(FOOT.center[0], FOOT.center[1] - 0.18 * (1 - footIn), 0);
    ball.current!.scale.setScalar(Math.max(0.0001, ballIn));

    const at = pointAt(u.uHead.value, L.head);
    const c = core.current!;
    c.visible = coreOn > 0.01;
    c.position.set(at.x, at.y, 0);
    c.scale.setScalar(Math.max(0.0001, coreOn));

    const shine = u.uGlow.value;
    const h = halo.current!;
    h.position.set(at.x, at.y, TUBE_R * 1.4);
    h.scale.setScalar(haloSize * (0.7 + 0.3 * shine));
    parts.haloMat.opacity = Math.min(1, shine) * 0.95;
    h.visible = shine > 0.01;

    const lt = light.current!;
    lt.position.set(at.x, at.y, 0.5);
    lt.intensity = shine * 3.2;

    const bh = ballHalo.current!;
    bh.scale.setScalar(BALL_R * 5.2 * (0.85 + 0.15 * Math.min(2, u.uBall.value)));
    parts.ballHaloMat.opacity = Math.min(0.85, u.uBall.value * 0.32) * ballIn;

    const r = ring.current!;
    const rt = (now - L.flareAt) / 1.1;
    r.visible = stage.motion && rt >= 0 && rt < 1;
    if (r.visible) {
      r.scale.setScalar(BALL_R * 2.4 * (1 + 2.6 * expoOut(rt)));
      parts.ringMat.opacity = (1 - rt) * (1 - rt) * 0.9;
    }
  });

  return (
    <group ref={root} visible={false}>
      <group ref={spin}>
        <group ref={float}>
          <mesh geometry={parts.path} material={parts.material} />
          <mesh ref={foot} geometry={parts.foot} material={parts.material} />
          <mesh
            ref={ball}
            geometry={parts.ball}
            material={parts.material}
            position={[BALL_CENTER[0], BALL_CENTER[1], 0]}
          />
          <mesh ref={core} geometry={parts.coreGeo} material={parts.coreMat} />
          <sprite ref={halo} material={parts.haloMat} renderOrder={10} />
          <sprite
            ref={ballHalo}
            material={parts.ballHaloMat}
            position={[BALL_CENTER[0], BALL_CENTER[1], -0.05]}
            renderOrder={5}
          />
          <sprite
            ref={ring}
            material={parts.ringMat}
            position={[BALL_CENTER[0], BALL_CENTER[1], 0]}
            renderOrder={11}
          />
          <pointLight ref={light} color="#ff8a3d" intensity={0} distance={3.2} decay={2} />
        </group>
      </group>
    </group>
  );
}
