import { nfc } from '../../content/copy';
import { LogoMark } from '../Logo';
import { ArrowUpRight, Contactless, LinkIcon, Mail, Phone, UserPlus, WhatsApp } from '../icons';

export interface ProfileDetails {
  name: string;
  role: string;
  company: string;
  links: string;
}

/**
 * The phone in the Fin NFC stage: the profile the card opens, filled live from the setup
 * form. The static layout shows the profile; with motion on, the stage first puts the phone
 * to sleep ([data-idle]) and the tap wakes it ([data-p] items rise in).
 */
export function ProfilePhone({
  details,
  className,
}: {
  details: ProfileDetails;
  className?: string;
}) {
  const p = nfc.profile;
  const name = details.name.trim() || nfc.card.name;
  const role = [
    details.role.trim() || nfc.card.title.replace(/ \(.*\)$/, ''),
    details.company.trim(),
  ]
    .filter(Boolean)
    .join(' · ');
  const initials = details.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
  const links = details.links
    .split('\n')
    .map((l) =>
      l
        .trim()
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .replace(/\/$/, ''),
    )
    .filter(Boolean)
    .slice(0, 3);

  return (
    <div data-phone className={`nfc-phone ${className ?? ''}`}>
      <div className="nfc-screen">
        <div className="nfc-status">
          <span>9:41</span>
          <span className="flex items-center gap-[1.5cqw]">
            <i className="nfc-bars" />
            <i className="nfc-battery" />
          </span>
        </div>

        <div className="nfc-profile">
          <div data-p className="nfc-cover" />
          <div data-p className="nfc-avatar">
            {initials ? <span>{initials}</span> : <LogoMark className="h-auto w-[30%]" />}
          </div>
          <p data-p className="nfc-p-name">
            {name}
          </p>
          <p data-p className="nfc-p-role">
            {role}
          </p>
          <span data-p className="nfc-save">
            <UserPlus size={13} className="h-[1.15em] w-auto" />
            {p.save}
          </span>
          <div data-p className="nfc-actions">
            {[
              { label: p.actions.call, Icon: Phone },
              { label: p.actions.whatsapp, Icon: WhatsApp },
              { label: p.actions.email, Icon: Mail },
            ].map(({ label, Icon }) => (
              <span key={label}>
                <Icon className="h-[1.6em] w-auto text-signal-hi" />
                {label}
              </span>
            ))}
          </div>
          <ul className="nfc-links">
            {(links.length ? links : p.links).map((l, i) => (
              <li data-p key={`${l}-${i}`} className={links.length ? 'text-bone' : 'text-ash'}>
                <LinkIcon className="h-[1.2em] w-auto shrink-0 text-ash" />
                <span className="min-w-0 flex-1 truncate">{l}</span>
                <ArrowUpRight className="h-[1.1em] w-auto shrink-0 text-ash" />
              </li>
            ))}
          </ul>
          <p data-p className="nfc-p-powered">
            {p.powered}
          </p>
        </div>

        {/* asleep until the card taps it (motion only) */}
        <div data-idle className="nfc-idle">
          <span className="nfc-idle-time">9:41</span>
          <span className="nfc-idle-hint">
            <Contactless className="h-[2.4em] w-auto text-signal" />
            {nfc.stage.idle}
          </span>
        </div>
      </div>

      <div className="nfc-rings">
        <i data-ring />
        <i data-ring />
        <i data-ring />
      </div>
    </div>
  );
}
