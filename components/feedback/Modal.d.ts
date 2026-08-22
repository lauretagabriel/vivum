/** Centred dialog on a 72% navy scrim. Slate panel, hairline chrome, 8px rise on enter. */
export interface ModalProps {
  open?: boolean;
  title?: React.ReactNode;
  meta?: React.ReactNode;
  children?: React.ReactNode;
  /** Footer actions, right-aligned — secondary first, primary last. */
  actions?: React.ReactNode;
  onClose?: () => void;
  width?: number;
  style?: React.CSSProperties;
}
export function Modal(props: ModalProps): JSX.Element | null;
