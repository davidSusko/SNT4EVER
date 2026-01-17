import { useState, useEffect } from 'react';

interface ScrollSpyOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useScrollSpy = (elementIds: string[], options: ScrollSpyOptions = {}) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  
  useEffect(() => {
    const { threshold = 0.5, rootMargin = '0px' } = options;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        
        if (visibleEntries.length > 0) {
          const mostVisible = visibleEntries.reduce((prev, current) => 
            prev.intersectionRatio > current.intersectionRatio ? prev : current
          );
          setActiveId(mostVisible.target.id);
        }
      },
      { threshold, rootMargin }
    );
    
    const elements = elementIds.map(id => document.getElementById(id)).filter(Boolean);
    
    elements.forEach(el => {
      if (el) observer.observe(el);
    });
    
    return () => {
      elements.forEach(el => {
        if (el) observer.unobserve(el);
      });
    };
  }, [elementIds, options]);
  
  return activeId;
};