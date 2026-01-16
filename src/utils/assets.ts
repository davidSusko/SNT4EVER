import { ASSET_PATHS } from '@/constants';

export const getAssetPath = (category: keyof typeof ASSET_PATHS, assetKey: string): string => {
  return ASSET_PATHS[category]?.[assetKey] || '';
};

export const getOptimizedImagePath = (path: string, width?: number, height?: number): string => {
  // This could integrate with a CDN or image optimization service
  if (!width && !height) return path;
  
  const params = new URLSearchParams();
  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());
  
  const separator = path.includes('?') ? '&' : '?';
  return `${path}${separator}${params.toString()}`;
};

export const generateAltText = (filename: string): string => {
  // Generate descriptive alt text from filename
  const cleanName = filename
    .replace(/\.(jpg|jpeg|png|gif|webp)$/i, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
  
  return cleanName || 'Image';
};