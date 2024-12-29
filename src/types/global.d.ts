
interface DivWithOverflow extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  overflow?: string;
}

declare namespace JSX {
  interface IntrinsicElements {
    div: DivWithOverflow;
    'amp-ad': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      type: string;
      'data-ad-client': string;
      'data-ad-slot': string;
      'data-auto-format'?: string;
      'data-full-width'?: string;
      width: string;
      height: string;
    };
  }
}