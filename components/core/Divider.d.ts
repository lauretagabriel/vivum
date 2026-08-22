/** 1px rule. Hairlines carry every elevation cue in this system — there are no shadows. */
export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  /** hairline (default) · strong · fade (rule that dissolves to the right) · accent (amber). */
  tone?: 'hairline' | 'strong' | 'fade' | 'accent';
  /** Margin on the cross axis, px. */
  spacing?: number;
  style?: React.CSSProperties;
}
export function Divider(props: DividerProps): JSX.Element;
