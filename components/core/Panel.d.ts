/**
 * The system's container: slate fill, 2px corners, hairline chrome, no shadow.
 */
export interface PanelProps {
  children?: React.ReactNode;
  /** panel = slate fill · quiet = 4% ice wash · outline = transparent + hairline · raised = #082036 · sheet = ice for print. */
  variant?: 'panel' | 'quiet' | 'outline' | 'raised' | 'sheet';
  /** Interior padding in px. 24 default, 32 for feature panels. */
  pad?: number;
  /** Optional header title. */
  title?: React.ReactNode;
  /** Small caption under the title. */
  meta?: React.ReactNode;
  /** Right-aligned header controls (IconButton, Button size="sm"). */
  actions?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Panel(props: PanelProps): JSX.Element;
