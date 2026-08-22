/**
 * Site header: gray logo left, links pushed right, one amber action after them.
 */
export interface NavLink { href: string; label: React.ReactNode; external?: boolean }
export interface NavBarProps {
  /** Path to vivum-logo-gray.svg. Falls back to the wordmark in type. */
  logoSrc?: string;
  logoAlt?: string;
  /** Wordmark text used when no logoSrc is given. */
  brand?: string;
  links?: NavLink[];
  /** href of the current page; gets an amber underline. */
  activeHref?: string;
  /** Single right-hand action. */
  cta?: { label: React.ReactNode; href?: string; onClick?: () => void };
  /** Bare over a video hero at rest; a glass plate fades in once the page scrolls. */
  transparent?: boolean;
  /** Scroll distance (px) at which the glass plate appears. Default 72 — one bar height. */
  glassAt?: number;
  /** Intercepts link clicks for click-through prototypes. */
  onNavigate?: (href: string) => void;
  style?: React.CSSProperties;
}
export function NavBar(props: NavBarProps): JSX.Element;
