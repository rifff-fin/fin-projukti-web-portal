import { Fragment } from 'react';

/**
 * Headline copy marks its accent with asterisks: 'From manual *to automatic.*'. The plain
 * words set in light Geist, the accent in Instrument Serif italic (globals.css). A newline
 * in the copy becomes a line break.
 */
export function Emph({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, l) => (
        <Fragment key={l}>
          {l > 0 && <br />}
          {line
            .split(/(\*[^*]+\*)/)
            .map((part, i) =>
              part.length > 2 && part.startsWith('*') && part.endsWith('*') ? (
                <em key={i}>{part.slice(1, -1)}</em>
              ) : (
                <Fragment key={i}>{part}</Fragment>
              ),
            )}
        </Fragment>
      ))}
    </>
  );
}
