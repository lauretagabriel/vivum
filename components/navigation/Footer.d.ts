/** Site footer on a base bloom over the canvas: mark, link columns, legal line, tagline. */
export interface FooterColumn { label: React.ReactNode; links?: Array<{ label: React.ReactNode; href?: string }> }
export interface FooterProps {
  /** Path to vivum-mark-gray.svg. */
  markSrc?: string;
  columns?: FooterColumn[];
  /** Legal line, bottom-left. */
  legal?: React.ReactNode;
  /** Short sentence under the mark. */
  tagline?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Footer(props: FooterProps): JSX.Element;
