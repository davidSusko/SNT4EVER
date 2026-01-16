import { useState, useEffect } from 'react';

interface ScrollPosition {
  scrollY: number;
  scrollDirection: 'up' | 'down' | null;
  isScrolling: boolean;
}

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollY: 0,
    scrollDirection: null,
    isScrolling: false,
  });
  
  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    let scrollTimeout: ReturnType<typeof setTimeout>;
    
    const updateScrollPosition = () => {
      const currentScrollY = window.pageYOffset;
      const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
      
      setScrollPosition({
        scrollY: currentScrollY,
        scrollDirection,
        isScrolling: true,
      });
      
      lastScrollY = currentScrollY;
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setScrollPosition(prev => ({ ...prev, isScrolling: false }));
      }, 150);
    };
    
    window.addEventListener('scroll', updateScrollPosition, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', updateScrollPosition);
      clearTimeout(scrollTimeout);
    };
  }, []);
  
  return scrollPosition;
};