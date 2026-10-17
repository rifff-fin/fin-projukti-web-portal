import { motionSwitch } from '../content/copy';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { setMotion } from '../lib/motion';

/**
 * Switch for the animation. It starts from the OS setting (prefers-reduced-motion) and lets
 * visitors choose either way; the choice is remembered in this browser and the page rebuilds
 * with it (lib/motion.ts). `floating`: a pill in the bottom-left corner, desktop only (on a
 * phone it would cover content); `inline`: in the phone menu and the footer.
 */
export function MotionSwitch({ variant = 'floating' }: { variant?: 'floating' | 'inline' }) {
  const reduced = useReducedMotion();
  const place =
    variant === 'floating'
      ? 'fixed bottom-5 left-5 z-40 hidden h-9 bg-void/90 px-3.5 backdrop-blur-md md:inline-flex'
      : 'inline-flex h-10 px-4';
  return (
    <button
      type="button"
      data-motion-toggle={variant}
      aria-pressed={!reduced}
      title={motionSwitch.title}
      onClick={() => setMotion(!reduced)}
      className={`eyebrow items-center gap-2.5 border border-line-hi text-bone transition-colors duration-[var(--dur-ui)] ease-liquid hover:border-ash hover:text-chalk ${place}`}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 ${reduced ? 'bg-line-hi' : 'bg-signal shadow-[0_0_8px_var(--signal)]'}`}
      />
      {motionSwitch.label}
      <span aria-hidden="true" className="text-ash">
        {reduced ? motionSwitch.off : motionSwitch.on}
      </span>
    </button>
  );
}
