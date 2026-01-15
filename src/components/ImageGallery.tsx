import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X, ZoomIn } from 'lucide-react';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  year?: number;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  layout?: 'grid' | 'masonry' | 'carousel';
  columns?: 1 | 2 | 3 | 4;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images, 
  layout = 'grid', 
  columns = 3 
}) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const getGridClasses = () => {
    const baseClass = 'grid gap-4';
    switch (columns) {
      case 1:
        return `${baseClass} grid-cols-1`;
      case 2:
        return `${baseClass} grid-cols-1 md:grid-cols-2`;
      case 3:
        return `${baseClass} grid-cols-1 md:grid-cols-2 lg:grid-cols-3`;
      case 4:
        return `${baseClass} grid-cols-2 md:grid-cols-3 lg:grid-cols-4`;
      default:
        return `${baseClass} grid-cols-1 md:grid-cols-2 lg:grid-cols-3`;
    }
  };

  if (layout === 'masonry') {
    return (
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {images.map((image) => (
          <motion.div
            key={image.id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="break-inside-avoid mb-4 group cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <div className="relative overflow-hidden rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300">
              <div className="aspect-[4/3] md:aspect-auto bg-black/50 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ZoomIn className="h-8 w-8 text-white/50" />
                  </div>
                  <p className="text-white/50 text-sm">Image Placeholder</p>
                  <p className="text-white/30 text-xs mt-2">{image.alt}</p>
                </div>
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Caption */}
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm">{image.caption}</p>
                  {image.year && (
                    <p className="text-white/60 text-xs">{image.year}</p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
        
        {/* Lightbox */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="bg-black border-white/10 max-w-4xl max-h-[90vh] overflow-hidden">
            {selectedImage && (
              <div className="relative">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="aspect-[4/3] bg-white/5 rounded-lg flex items-center justify-center">
                  <div className="text-center p-12">
                    <ZoomIn className="h-16 w-16 text-white/30 mx-auto mb-4" />
                    <p className="text-white/30">Full size image would appear here</p>
                    <p className="text-white/20 text-sm mt-2">{selectedImage.alt}</p>
                  </div>
                </div>
                {selectedImage.caption && (
                  <div className="mt-4 text-center">
                    <p className="text-white">{selectedImage.caption}</p>
                    {selectedImage.year && (
                      <p className="text-white/60 text-sm">{selectedImage.year}</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={getGridClasses()}
    >
      {images.map((image) => (
        <motion.div
          key={image.id}
          variants={itemVariants}
          className="group cursor-pointer"
          onClick={() => setSelectedImage(image)}
        >
          <div className="relative overflow-hidden rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 lift-hover">
            <div className="aspect-[4/3] bg-black/50 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ZoomIn className="h-8 w-8 text-white/50" />
                </div>
                <p className="text-white/50 text-sm">Image Placeholder</p>
                <p className="text-white/30 text-xs mt-2">{image.alt}</p>
              </div>
            </div>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
              <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Caption */}
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm">{image.caption}</p>
                {image.year && (
                  <p className="text-white/60 text-xs">{image.year}</p>
                )}
              </div>
            )}
          </div>
        </motion.div>
      ))}
      
      {/* Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="bg-black border-white/10 max-w-4xl max-h-[90vh] overflow-hidden">
          {selectedImage && (
            <div className="relative">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="aspect-[4/3] bg-white/5 rounded-lg flex items-center justify-center">
                <div className="text-center p-12">
                  <ZoomIn className="h-16 w-16 text-white/30 mx-auto mb-4" />
                  <p className="text-white/30">Full size image would appear here</p>
                  <p className="text-white/20 text-sm mt-2">{selectedImage.alt}</p>
                </div>
              </div>
              {selectedImage.caption && (
                <div className="mt-4 text-center">
                  <p className="text-white">{selectedImage.caption}</p>
                  {selectedImage.year && (
                    <p className="text-white/60 text-sm">{selectedImage.year}</p>
                  )}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default ImageGallery;