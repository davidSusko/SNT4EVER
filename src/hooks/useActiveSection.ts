import { useState, useEffect } from 'react';

export const useActiveSection = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      // The offset from the top where we consider a section "active".
      // E.g., when the top of the section hits the top 30% of the screen.
      const offset = window.innerHeight * 0.3;
      
      let currentActiveId = '';
      
      // Iterate through sections in order
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the element has passed the offset line
          if (rect.top <= offset) {
            currentActiveId = id;
          }
        }
      }
      
      // If none are past the offset, we are probably at the very top.
      // But the first section (hero) usually starts at top: 0, so it will be caught.
      if (currentActiveId && currentActiveId !== activeSection) {
        setActiveSection(currentActiveId);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check immediately on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, activeSection]);

  return activeSection;
};