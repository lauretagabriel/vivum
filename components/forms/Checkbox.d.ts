/** 16px square box, 2px corners; checked fills amber with a navy Lucide check. */
export interface CheckboxProps {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  /** Controlled state; omit for uncontrolled. */
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
}
export function Checkbox(props: CheckboxProps): JSX.Element;
