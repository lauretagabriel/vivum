/** Rectangular toggle — sharp corners, blue when on. Used for panel settings. */
export interface SwitchProps {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  /** Receives the next boolean value. */
  onChange?: (next: boolean) => void;
  style?: React.CSSProperties;
}
export function Switch(props: SwitchProps): JSX.Element;
