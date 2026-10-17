import { useId } from 'react';

/**
 * Form primitives shared by the brief form (Contact) and the card order (Nfc): a labelled
 * text field with its error, and the honeypot.
 */
interface TextFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: { target: { value: string } }) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  error?: string;
  required?: boolean;
  type?: string;
  inputMode?: 'text' | 'tel' | 'email' | 'url';
  autoComplete?: string;
  multiline?: boolean;
  rows?: number;
  maxLength?: number;
}

export function TextField({ name, label, error, required, multiline, ...rest }: TextFieldProps) {
  const id = useId();
  const errId = `${id}-error`;
  const common = {
    id,
    name,
    className: 'field',
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errId : undefined,
    'aria-required': required || undefined,
    value: rest.value,
    onChange: rest.onChange,
    onBlur: rest.onBlur,
    onFocus: rest.onFocus,
    placeholder: rest.placeholder,
    autoComplete: rest.autoComplete,
    maxLength: rest.maxLength,
  };
  return (
    <div>
      <label htmlFor={id} className="eyebrow mb-3 flex gap-2 text-ash">
        {label}
        {required && <span className="text-signal-hi">*</span>}
      </label>
      {multiline ? (
        <textarea {...common} rows={rest.rows ?? 5} className="field min-h-[9rem] resize-y" />
      ) : (
        <input {...common} type={rest.type ?? 'text'} inputMode={rest.inputMode} />
      )}
      {error && (
        <p id={errId} className="mt-2 text-[0.8125rem] text-error">
          {error}
        </p>
      )}
    </div>
  );
}

/** Honeypot: people never see or fill it (Web3Forms also checks it). */
export function Honeypot() {
  return (
    <input
      type="checkbox"
      name="botcheck"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="absolute h-px w-px opacity-0"
      style={{ left: -9999 }}
    />
  );
}
