/** Single-line field: 4% ice wash, hairline border, blue focus, amber error. */
export interface InputProps {
  /** Uppercase graphite label above the field. */
  label?: React.ReactNode;
  /** Caption below the field. */
  hint?: React.ReactNode;
  /** Error message; turns the border and caption amber. */
  error?: React.ReactNode;
  /** Lucide slug shown inside the field, left of the text. */
  icon?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
}
export function Input(props: InputProps): JSX.Element;
