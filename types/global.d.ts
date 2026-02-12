declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module 'react-medium-image-zoom' {
  import { ComponentType, HTMLAttributes, ImgHTMLAttributes, ReactNode } from 'react';

  export interface ZoomProps {
    children: ReactNode;
    ZoomContent?: ComponentType<{
      img: ReactNode | null;
      buttonUnzoom: ReactNode;
      modalState: string;
      onUnzoom: () => void;
    }>;
    closeText?: string;
    openText?: string;
    overlayBgColorEnd?: string;
    overlayBgColorStart?: string;
    transitionDuration?: number;
    zoomMargin?: number;
    wrapElement?: string;
    wrapStyle?: React.CSSProperties;
    wrapClassName?: string;
    defaultStyles?: {
      overlay?: React.CSSProperties;
      overlayTransition?: React.CSSProperties;
      img?: React.CSSProperties;
      zoomContainer?: React.CSSProperties;
      zoomImage?: React.CSSProperties;
      btn?: React.CSSProperties;
    };
  }

  const Zoom: ComponentType<ZoomProps>;
  export default Zoom;
}
