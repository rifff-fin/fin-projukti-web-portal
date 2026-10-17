import { useId } from 'react';

/** A unique id for SVG clip paths, gradients and patterns (useId's own characters are not all valid in url()). */
export function useUid(prefix: string) {
  return `${prefix}${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
}
