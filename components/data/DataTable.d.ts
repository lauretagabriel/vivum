/**
 * Hairline data table: uppercase graphite header on a 4% wash, mono numeric columns.
 */
export interface DataColumn {
  key: string;
  label: React.ReactNode;
  align?: 'left' | 'right' | 'center';
  /** Set for numbers, IDs, hashes and timestamps. */
  mono?: boolean;
  /** muted = graphite · data = Vivum Blue · default = ice. */
  tone?: 'default' | 'muted' | 'data';
  /** Allow wrapping in this column. */
  wrap?: boolean;
}
export interface DataTableProps {
  columns?: DataColumn[];
  /** Row objects keyed by column key; `id` is used as the React key when present. Cells may be nodes. */
  rows?: Array<Record<string, React.ReactNode>>;
  /** Tighter rows for long lists. */
  dense?: boolean;
  /** Use on ice sheets / print. */
  onLight?: boolean;
  style?: React.CSSProperties;
}
export function DataTable(props: DataTableProps): JSX.Element;
