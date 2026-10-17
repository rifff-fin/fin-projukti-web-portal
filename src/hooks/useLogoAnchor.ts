import { useCallback } from 'react';
import { registerAnchor, type AnchorId } from '../store/scene';

/** Ref callback that registers an element as a 3D logo station (and unregisters on unmount). */
export function useLogoAnchor(id: AnchorId) {
  return useCallback(
    (el: HTMLElement | null) => {
      registerAnchor(id, el);
      return () => registerAnchor(id, null);
    },
    [id],
  );
}
