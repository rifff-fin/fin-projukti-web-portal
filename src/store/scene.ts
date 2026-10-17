import { createStore } from 'zustand/vanilla';

/**
 * Where the 3D logo can stand: DOM boxes (logo plates) in the static layout.
 *   hero     the opening screen
 *   process  the sticky plate of the Process section (the node climbs the steps)
 *   cta      the footer's call to action
 */
export type AnchorId = 'hero' | 'process' | 'cta';

/** Just the part of a ScrollTrigger the 3D reads. */
export interface Progress {
  progress: number;
}

export interface SceneState {
  anchors: Partial<Record<AnchorId, HTMLElement>>;
}

export const sceneStore = createStore<SceneState>()(() => ({ anchors: {} }));

export function registerAnchor(id: AnchorId, el: HTMLElement | null) {
  sceneStore.setState((s) => {
    const anchors = { ...s.anchors };
    if (el) anchors[id] = el;
    else delete anchors[id];
    return { anchors };
  });
}

/**
 * Scroll progress the 3D reads every frame (ScrollTriggers are mutable objects; nothing
 * re-renders). `process` is the Process section's sticky track.
 */
export const tracks: { process?: Progress } = {};

export function registerTrack(id: keyof typeof tracks, trigger: Progress | null | undefined) {
  if (trigger) tracks[id] = trigger;
  else delete tracks[id];
}

/**
 * Pulse requests from the page (hovering the main buttons sends one up the logo). The 3D
 * compares the counter with the last one it served.
 */
export const signal = { requests: 0 };

export function firePulse() {
  signal.requests++;
}
