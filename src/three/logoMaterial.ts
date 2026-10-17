import { Color, MeshPhysicalMaterial, Vector4 } from 'three';
import { CORNER_ARCS, LOGO_COLOR } from '../brand/logoSpec';

/**
 * One material for every part of the logo: satin orange with a clear coat (reads as
 * anodised paint or glazed ceramic under the studio light), plus shader additions driven by
 * the per-vertex arc position `aArc` (logoGeometry.ts):
 *
 *   uDraw     the build: anything further along than this is not drawn
 *   uHead     where the node is (arc 0..1)
 *   uGlow     the node's brightness: a hot white band with an orange tail behind it
 *   uTail     tail length, in arc units
 *   uFill     the path behind the node stays lit (the Process climb: progress made visible)
 *   uCorners  the four corners' glow (the steps reached)
 *   uBall     the end ball's glow (arrival flare, then a soft "on")
 *
 * Only uniforms change at run time, so the shader compiles once.
 */
export function createLogoMaterial() {
  const uniforms = {
    uDraw: { value: 1 },
    uHead: { value: 1 },
    uGlow: { value: 0 },
    uTail: { value: 0.14 },
    uFill: { value: 0 },
    uCorners: { value: new Vector4() },
    uCornerArcs: { value: new Vector4(...CORNER_ARCS) },
    uBall: { value: 0 },
    uHot: { value: new Color('#fff3e6') },
    uWarm: { value: new Color('#ff4a00') },
  };

  const material = new MeshPhysicalMaterial({
    color: LOGO_COLOR,
    roughness: 0.34,
    metalness: 0,
    clearcoat: 0.75,
    clearcoatRoughness: 0.16,
    envMapIntensity: 1,
  });

  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nattribute float aArc;\nvarying float vArc;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvArc = aArc;');
    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        /* glsl */ `#include <common>
varying float vArc;
uniform float uDraw, uHead, uGlow, uTail, uFill, uBall;
uniform vec4 uCorners, uCornerArcs;
uniform vec3 uHot, uWarm;`,
      )
      .replace(
        '#include <clipping_planes_fragment>',
        /* glsl */ `#include <clipping_planes_fragment>
if (vArc > uDraw + 0.0005) discard;`,
      )
      .replace(
        '#include <emissivemap_fragment>',
        /* glsl */ `#include <emissivemap_fragment>
{
  float d = vArc - uHead; // > 0 ahead of the node, < 0 behind it
  float core = exp(-(d * d) / (0.028 * 0.028));
  float behind = step(d, 0.0);
  float tail = behind * exp(d / max(uTail, 0.001));
  totalEmissiveRadiance += uGlow * (uHot * core * 3.2 + uWarm * tail * 0.9);
  // kept low: the tone mapper turns a bright red-orange pale pink
  totalEmissiveRadiance += uWarm * behind * uFill * 0.22;
  vec4 cd = vec4(vArc) - uCornerArcs;
  vec4 cg = uCorners * exp(-(cd * cd) / (0.016 * 0.016));
  totalEmissiveRadiance += mix(uWarm, uHot, 0.35) * (cg.x + cg.y + cg.z + cg.w) * 0.9;
  totalEmissiveRadiance += mix(uWarm, uHot, clamp(uBall - 1.0, 0.0, 1.0)) * step(0.9995, vArc) * uBall * 1.2;
}`,
      );
  };
  material.customProgramCacheKey = () => 'fin-logo-v2';

  return { material, uniforms };
}

export type LogoUniforms = ReturnType<typeof createLogoMaterial>['uniforms'];
