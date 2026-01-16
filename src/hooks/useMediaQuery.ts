import { useState, useEffect } from 'react';

interface UseMediaQueryOptions {
  defaultValue?: boolean;
}

export const useMediaQuery = (
  query: string,
  options: UseMediaQueryOptions = {}
) => {
  const { defaultValue = false } = options;
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return defaultValue;
    return window.matchMedia(query).matches;
  });
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const media = window.matchMedia(query);
    
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    // Add listener for changes
    media.addEventListener('change', listener);
    
    return () => {
      media.removeEventListener('change', listener);
    };
  }, [query]);
  
  return matches;
};