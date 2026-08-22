/** Transient notice: slate panel, status dot, one line of detail. */
export interface ToastProps {
  children?: React.ReactNode;
  title?: React.ReactNode;
  /** Status dot tone: live · attention · idle · ok. */
  tone?: 'live' | 'attention' | 'idle' | 'ok';
  onClose?: () => void;
  /** Set the detail line in IBM Plex Mono — good for IDs and log lines. */
  mono?: boolean;
  style?: React.CSSProperties;
}
export function Toast(props: ToastProps): JSX.Element;
