/** Native select in Input chrome, with a Lucide chevron. */
export interface SelectOption { value: string; label: string }
export interface SelectProps {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  /** Strings or {value,label} pairs. */
  options?: Array<string | SelectOption>;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  style?: React.CSSProperties;
}
export function Select(props: SelectProps): JSX.Element;
