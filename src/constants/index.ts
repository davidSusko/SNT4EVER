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
    // Placeholder images for timeline events (add actual images when available)
    deterioration2012: '/images/2012-deterioration.jpg',
    goldenEra: '/images/golden-era.jpg',
    diyMaintenance: '/images/diy-maintenance.jpg',
    snt4everFoundation: '/images/snt4ever-foundation.jpg',
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
    title: 'El Nacimiento de la "Plaza Dura"',
    content: 'Diseñada por los arquitectos Albert Viaplana y Helio Piñón, la plaza se presenta como una ruptura con el urbanismo tradicional. Ante la imposibilidad de plantar árboles sobre la losa ferroviaria, se crea una superficie mineral de granito y metal. En 1983 recibe el Premio FAD de Arquitectura, consolidándose como un referente internacional de la arquitectura moderna.',
    type: 'gallery',
    images: [
      ASSET_PATHS.images.sntLandscape1983,
      ASSET_PATHS.images.sntBenchNew,
      ASSET_PATHS.images.santsNew
    ]
  },
  {
    year: '1985',
    title: 'El Descubrimiento',
    content: 'Mientras Barcelona se preparaba para los Juegos Olímpicos, los primeros skaters locales descubrieron que el granito pulido y las formas abstractas de la plaza eran perfectas para patinar. Lo que fue diseñado como un espacio de tránsito se convirtió en un laboratorio de trucos, comenzando el uso de los bancos de granito originales.',
    type: 'events',
    events: [
      'Primeras ruedas sobre granito pulido',
      'Apropiación del espacio arquitectónico',
      'Uso original de los bancos de granito',
      'Transformación de tránsito a laboratorio skate'
    ]
  },
  {
    year: '2000',
    title: 'La Era Dorada',
    content: 'Sants se convirtió en el epicentro mundial del skate. Patinadores de todo el mundo viajaban a Barcelona (la "Mecca del skate") y Sants era una parada obligatoria. El desgaste natural del granito y roturas accidentales crearon obstáculos únicos como el "Up-Ledge", volviéndose legendarios en la escena global.',
    type: 'events',
    events: [
      'Aparición en vídeos de marcas internacionales',
      'Destino mundial para skaters profesionales',
      'Creación del legendario "Up-Ledge"',
      'Consolidación como spot icónico global'
    ]
  },
  {
    year: '2012',
    title: 'Deterioro y Olvido Institucional',
    content: 'Las obras de la llegada del AVE degradaron el entorno. Se realizaron parches de hormigón y se eliminaron elementos originales. Ante la falta de mantenimiento por parte del Ayuntamiento o Adif, los patinadores locales empezaron a cuidar el espacio de forma informal, limpiando y reparando lo que podían.',
    type: 'history',
    image: ASSET_PATHS.images.deterioration2012
  },
  {
    year: '2019',
    title: 'Mantenimiento DIY',
    content: 'Los locales de Sants llevaron cemento, masilla y herramientas para arreglar los bordillos de granito destrozados. Se recuperaron bancos que estaban fuera de uso. El spot ya no era solo un lugar para patinar, era un espacio autogestionado por la comunidad local.',
    type: 'events',
    events: [
      'Reparaciones con cemento y herramientas propias',
      'Recuperación de bancos originales',
      'Limpieza y mantenimiento informal',
      'Construcción de comunidad autogestionada'
    ]
  },
  {
    year: '2021',
    title: 'El Nacimiento de SNT4EVER',
    content: 'El 4 de enero de 2021 se registra oficialmente la Asociación SNT4EVER. Tras los anuncios de una nueva remodelación integral, el grupo se organiza para negociar con las instituciones y evitar la expulsión del skate. Se recogen miles de firmas y se consigue que el skate sea reconocido como un uso legítimo de la plaza.',
    type: 'video',
    videoId: '_LtYmEHNkHQ'
  },
  {
    year: '2022',
    title: 'Documentación del Legado',
    content: 'Estreno del documental "En Resumen" que narra la historia de la plaza desde los ojos de quienes la han patinado durante décadas, subrayando su valor como patrimonio inmaterial de Barcelona. Una obra que preserva la memoria colectiva y lucha de la comunidad SNT.',
    type: 'video',
    videoId: 'bpNrTu-dQR8'
  },
  {
    year: '2024',
    title: 'Remodelación y Compromiso',
    content: 'Febrero 2025: Cierre total de la plaza por las obras de Adif. SNT4EVER logra el compromiso municipal de que la nueva plaza (prevista para 2026) respetará los elementos icónicos. Se inaugura "Skate-Sants" en la Rambla de Sants como alternativa temporal durante las obras.',
    type: 'video',
    videoId: 'egDfjgsWVnk'
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