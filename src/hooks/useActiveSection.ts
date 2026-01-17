import { useState, useEffect } from 'react';

export const useActiveSection = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        
        if (visibleEntries.length > 0) {
          // Find the entry that is most in the center of the viewport
          const mostCentered = visibleEntries.reduce((prev, current) => {
            const prevDistance = Math.abs(prev.intersectionRatio - 0.5);
            const currentDistance = Math.abs(current.intersectionRatio - 0.5);
            return currentDistance < prevDistance ? current : prev;
          });
          
          const sectionId = mostCentered.target.id;
          setActiveSection(sectionId);
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        rootMargin: '-10% 0px -60% 0px' // Account for fixed header
      }
    );

    const sectionElements = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
    
    sectionElements.forEach(element => {
      if (element) observer.observe(element);
    });

    return () => {
      sectionElements.forEach(element => {
        if (element) observer.unobserve(element);
      });
    };
  }, [sectionIds]);

  return activeSection;
};