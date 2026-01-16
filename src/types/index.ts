export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  year?: number;
}

export interface VideoItem {
  id: string;
  title: string;
  year: number;
  videoId?: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  content: string;
  type: 'gallery' | 'video' | 'history' | 'events';
  images?: string[];
  videoId?: string;
  image?: string;
  events?: string[];
}

export interface TimelineStepperData {
  year: number;
  title: string;
  subtitle: string;
  isComplete: boolean;
}

export interface NavigationItem {
  label: string;
  href: string;
  isSpecial?: boolean;
}

export interface ImageGalleryProps {
  images: GalleryImage[];
  layout?: 'grid' | 'masonry' | 'carousel';
  columns?: 1 | 2 | 3 | 4;
}

export interface VideoGalleryProps {
  videos: VideoItem[];
}

export interface AssetPaths {
  images: {
    [key: string]: string;
  };
  videos: {
    [key: string]: string;
  };
}