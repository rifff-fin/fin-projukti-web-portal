/**
 * Sending a form to the studio inbox (Web3Forms; there is no backend). Used by the brief
 * form (sections/Contact) and the Fin NFC Card order (sections/Nfc).
 */

// Web3Forms access keys are public by design (they only allow sending to the owner's inbox).
const WEB3FORMS_KEY = '0ff5fa5d-94f1-4d99-92d6-115272782300';
const ENDPOINT = 'https://api.web3forms.com/submit';
/** A form sent faster than this after it appeared is a bot. */
const MIN_FILL_MS = 2500;

/**
 * A filled honeypot (`botcheck`) or an instant submit is treated as a bot: the form should
 * look sent, but nothing goes out. `shownAt` is when the form appeared (performance.now()).
 */
export function looksLikeBot(form: HTMLFormElement, submittedAt: number, shownAt: number) {
  const honey = new FormData(form).get('botcheck');
  return String(honey ?? '') !== '' || submittedAt - shownAt < MIN_FILL_MS;
}

/** Send one message to the inbox. Throws if it does not go through. */
export async function sendToInbox(subject: string, fields: Record<string, string>) {
  const body = new FormData();
  body.append('access_key', WEB3FORMS_KEY);
  body.append('subject', subject);
  body.append('from_name', 'Fin Projukti website');
  for (const [k, v] of Object.entries(fields)) body.append(k, v);
  const res = await fetch(ENDPOINT, { method: 'POST', body });
  const json = (await res.json()) as { success?: boolean };
  if (!json.success) throw new Error('rejected');
}

/** A wa.me link with a prefilled message. */
export function whatsappLink(number: string, message: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
