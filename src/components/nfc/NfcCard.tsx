import { QR_PATH, QR_SIZE } from '../../brand/qr';
import { nfc } from '../../content/copy';

/**
 * The Fin NFC Card, drawn from the print design (docs/reference/fin-nfc-card.png): matte
 * black, round corners. Front: name, job title and the QR code. Back: the NFC waves around
 * "Tap · Connect · Grow" and the "Powered by FinProjukti | NFC Tech" line.
 *
 * Layers (styles/nfc.css), so GSAP and CSS never write the same transform:
 *   .nfc-card-wrap  position; the tap moves it (sections/Nfc). Size container for the text.
 *   .nfc-float      the idle float (CSS)
 *   .nfc-tilt       turns towards the pointer (GSAP)
 *   .nfc-card       the flip (GSAP rotationY)
 */
export function NfcCard({
  name,
  role,
  className,
}: {
  name: string;
  role: string;
  className?: string;
}) {
  const c = nfc.card;
  return (
    <div data-card-wrap className={`nfc-card-wrap ${className ?? ''}`}>
      <div className="nfc-float">
        <div data-card-tilt className="nfc-tilt">
          <div data-card className="nfc-card">
            <div className="nfc-face">
              <div className="absolute top-1/2 right-[44%] left-[7.6%] -translate-y-[58%]">
                <p className="nfc-name">{name.trim() || c.name}</p>
                <p className="nfc-role">{role.trim() || c.title}</p>
              </div>
              <div className="nfc-qr">
                <svg
                  viewBox={`-1.5 -1.5 ${QR_SIZE + 3} ${QR_SIZE + 3}`}
                  shapeRendering="crispEdges"
                >
                  <path d={QR_PATH} fill="#0a0a0b" />
                </svg>
              </div>
              <span className="nfc-sheen" />
            </div>

            <div className="nfc-face nfc-back">
              <Waves className="top-[29%]" />
              <p className="nfc-slogan">
                {c.slogan.before}
                <span className="nfc-dot">·</span>
                <span className="text-signal">{c.slogan.accent}</span>
                <span className="nfc-dot">·</span>
                {c.slogan.after}
              </p>
              <Waves className="top-[55%] -scale-y-100" />
              <p className="nfc-powered">
                {c.powered.lead} <span className="text-signal">{c.powered.accent}</span>
                {c.powered.brand} | {c.powered.tech}
              </p>
              <span className="nfc-sheen" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Three arcs around a centre below them; the smallest sits next to the slogan. */
function Waves({ className }: { className: string }) {
  const arc = (r: number) => {
    const a = (52 * Math.PI) / 180;
    const x = r * Math.sin(a);
    const y = 46 - r * Math.cos(a);
    return `M${50 - x} ${y}A${r} ${r} 0 0 1 ${50 + x} ${y}`;
  };
  return (
    <svg viewBox="0 0 100 44" className={`nfc-waves ${className}`}>
      {[12, 24, 36].map((r, i) => (
        <path key={r} d={arc(r)} className="nfc-wave" style={{ animationDelay: `${i * 0.18}s` }} />
      ))}
    </svg>
  );
}
