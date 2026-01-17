import type { AssetPaths, TimelineEvent, VideoItem, GalleryImage } from '@/types';

export const ASSET_PATHS: AssetPaths = {
  images: {
    sntBenchNew: '/src/assets/images/snt_bench_new.png',
    santsNew: '/src/assets/images/sants_new.png',
    sntLandscape1983: '/src/assets/images/snt_landscape_1983.jpg',
    fuentesSants: '/src/assets/images/FuentesSants_rogerferrero_2004.jpg',
    selloSnt: '/src/assets/images/SELLO-SNT.png',
    logo: '/src/assets/images/SNT4EVER_LOGO_BENCH.png',
    sntBench: '/src/assets/images/snt_bench.png',
    sntDestroyed: '/src/assets/images/snt_destroyed.png',
    localsBuilding: '/src/assets/images/localsBuilding.png',
  },
  videos: {
    // Add video paths when available
  }
};

export const NAVIGATION_ITEMS = [
  { label: 'The plans', href: '#plans', id: 'plans' },
  { label: 'Our story', href: '#story', id: 'story' },
  { label: 'Archive', href: '#archive', id: 'archive' },
  { label: 'News/Events', href: '#news', id: 'news' },
  { label: 'Docs', href: '#docs', id: 'docs' },
  { label: 'Join us!', href: '#join', id: 'join' },
  { label: 'Contact', href: '#contact', id: 'contact' },
  { label: 'Shop', href: '#shop', id: 'shop', isSpecial: true },
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '1983',
    title: 'Architecture & Design',
    content: 'The original plaza design was created as part of Barcelona\'s urban renewal project. The architectural vision aimed to create a multifunctional public space that would serve the community for decades.',
    type: 'gallery',
    images: [
      ASSET_PATHS.images.sntBenchNew,
      ASSET_PATHS.images.santsNew,
      ASSET_PATHS.images.sntLandscape1983
    ]
  },
  {
    year: '1997',
    title: 'Birth of Skate Culture',
    content: 'Local skaters discovered the plaza\'s perfect concrete surfaces and began transforming it into a skate destination. This marked the beginning of Sants as a legendary spot in Barcelona\'s skate scene.',
    type: 'video',
    videoId: 'mZctJpnGNyI'
  },
  {
    year: '2007',
    title: 'International Recognition',
    content: 'Sants Skate Plaza gained international fame as skate magazines and professionals from around the world discovered its unique features and vibrant community.',
    type: 'gallery',
    images: ['/images/2007-1.jpg', '/images/2007-2.jpg', '/images/2007-3.jpg']
  },
  {
    year: '2012',
    title: 'Deterioration Begins',
    content: 'Construction projects around the plaza began affecting the surface quality. The community noticed cracks and wear that threatened the skating experience and public safety.',
    type: 'history',
    image: '/images/2012-damage.jpg'
  },
  {
    year: '2018',
    title: 'Community Action',
    content: 'SNT (Sants4Ever) was formed to organize repair efforts, events, and advocacy. The association officially registered and began working with local authorities.',
    type: 'events',
    events: [
      'First community repair day',
      'Skate jam fundraiser',
      'Meeting with city council',
      'Association official registration'
    ]
  }
];

export const ARCHIVE_IMAGES: GalleryImage[] = [
  { id: '1', src: '/images/archive1.jpg', alt: 'Early days of the plaza', caption: 'Original construction in 1983', year: 1983 },
  { id: '2', src: '/images/archive2.jpg', alt: 'Skaters in the 90s', caption: 'First generation skaters', year: 1997 },
  { id: '3', src: '/images/archive3.jpg', alt: 'Competition 2007', caption: 'International competition', year: 2007 },
  { id: '4', src: '/images/archive4.jpg', alt: 'Plaza renovation', caption: 'Community repair efforts', year: 2018 },
  { id: '5', src: '/images/archive5.jpg', alt: 'Recent events', caption: 'Annual skate jam', year: 2023 },
  { id: '6', src: '/images/archive6.jpg', alt: 'Aerial view', caption: 'Plaza from above', year: 2022 },
];

export const ARCHIVE_VIDEOS: VideoItem[] = [
  { id: 'dQw4w9WgXcQ', title: 'The Making of Sants Plaza', year: 1983 },
  { id: 'dQw4w9WgXcQ', title: 'Barcelona Skate Scene 1997', year: 1997 },
  { id: 'dQw4w9WgXcQ', title: 'International Skate Competition', year: 2007 },
];

export const SOCIAL_LINKS = {
  changeOrg: 'https://www.change.org/p/salvemos-el-skate-plaza-de-sant-andreu',
  instagram: '#',
  twitter: '#',
  youtube: '#',
};

export const CONTACT_INFO = {
  email: 'info@snt4ever.org',
  location: 'Sants Skate Plaza, Barcelona',
  phone: '+34 XXX XXX XXX',
};