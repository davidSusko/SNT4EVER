import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

interface TimelineYear {
  year: number;
  title: string;
  subtitle?: string;
  isComplete: boolean;
}

interface TimelineStepperProps {
  years: TimelineYear[];
  activeYear: number | null;
  onYearChange?: (year: number) => void;
}

const TimelineStepper = ({ years, activeYear, onYearChange }: TimelineStepperProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [isInSection, setIsInSection] = useState(false);
  const [stepperHeight, setStepperHeight] = useState(0);
  const [originalTopPosition, setOriginalTopPosition] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const storySection = document.getElementById('story');
      const stepperElement = document.getElementById('timeline-stepper');
      
      if (storySection) {
        const storyRect = storySection.getBoundingClientRect();
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Check if user is within story section (more precise detection)
        const inStorySection = storyRect.top < window.innerHeight + 200 && storyRect.bottom > -200;
        
        // Calculate all state values first, then batch update
        let newStepperHeight = stepperHeight;
        let newOriginalTop = originalTopPosition;
        let newIsSticky = isSticky;
        let newProgress = scrollProgress;
        
        // Store height and original position when first visible
        if (stepperElement && stepperElement.getBoundingClientRect().height > 0 && inStorySection) {
          const currentStepperRect = stepperElement.getBoundingClientRect();
          
          // Store height only once
          if (stepperHeight === 0) {
            newStepperHeight = currentStepperRect.height;
          }
          
          // Store original top position only once
          if (!originalTopPosition) {
            newOriginalTop = currentStepperRect.top + currentScrollTop;
            console.log('Original position set:', {
              rectTop: currentStepperRect.top,
              scrollTop: currentScrollTop,
              originalPos: newOriginalTop
            });
          }
        }
        
        // Check if stepper should be sticky based on original position
        if (stepperElement && newOriginalTop !== null) {
          // Should be sticky if scrolled past original position
          newIsSticky = inStorySection && currentScrollTop >= newOriginalTop - 64;
          
          console.log('Sticky Debug:', {
            currentScrollTop,
            originalTopPosition: newOriginalTop,
            shouldBeSticky: newIsSticky,
            inStorySection,
            condition: currentScrollTop >= newOriginalTop - 64
          });
        }
        
        // Calculate progress within section (only when in section)
        if (inStorySection) {
          newProgress = Math.max(0, Math.min(1, 
            (window.innerHeight - storyRect.top) / (storyRect.height + window.innerHeight)
          ));
        } else {
          newProgress = 0;
          newOriginalTop = null; // Reset when leaving section
        }
        
        // Batch all state updates together
        setIsInSection(inStorySection);
        setStepperHeight(newStepperHeight);
        setOriginalTopPosition(newOriginalTop);
        setIsSticky(newIsSticky);
        setScrollProgress(newProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [stepperHeight, originalTopPosition, isSticky, scrollProgress]);

  const handleYearClick = (year: number) => {
    onYearChange?.(year);
    
    // Find and scroll to the corresponding timeline event
    const eventElements = document.querySelectorAll('[data-timeline-year]');
    eventElements.forEach(el => {
      if (el.getAttribute('data-timeline-year') === year.toString()) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  };

  const getActiveIndex = useCallback(() => {
    if (!activeYear || years.length === 0) return 0;
    const index = years.findIndex(y => y.year === activeYear);
    return index >= 0 ? index : 0;
  }, [years, activeYear]);




  return (
    <>
      {/* Always render when within the TimelineSection */}
      {/* Placeholder to prevent content jump */}
      {isSticky && stepperHeight > 0 && (
        <div style={{ height: stepperHeight }} />
      )}
      
          <motion.div 
            id="timeline-stepper"
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: isInSection && scrollProgress < 0.96 ? 1 : 0,
              y: isInSection && scrollProgress < 0.96 ? 0 : -20,
              height: isInSection && scrollProgress < 0.96 ? 'auto' : 0
            }}
            transition={{ 
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1] // Smooth cubic-bezier for both directions
            }}
            style={{ overflow: 'hidden' }}
            className={`w-full transition-all duration-300 ${
              isSticky 
                ? 'fixed top-16 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-b border-white/10' 
                : 'relative'
            }`}
          >
            <div className={`container-snt py-4 ${isSticky ? 'py-3' : ''}`}>

        {/* Horizontal Year Navigation */}
        <div className="relative">
          {years.length > 0 ? (
            <>
              {/* Desktop: Horizontal scroll */}
              <div className="hidden md:flex items-center justify-between gap-4 overflow-x-auto pb-2">
                {years.map((yearData, index) => {
                  const isActive = yearData.year === activeYear;
                  const isCompleted = yearData.isComplete;
                  
                  // Add fallback for when activeYear is null - use the first year as default
                  const fallbackActive = !activeYear && index === 0;
                
                return (
                  <motion.div
                    key={yearData.year}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-shrink-0"
                  >
                    <Button
                      variant={(isActive || fallbackActive) ? "default" : "ghost"}
                      size="sm"
                      onClick={() => handleYearClick(yearData.year)}
                      className={`relative overflow-hidden group flex-col ${
                        isSticky ? 'h-16 w-16' : 'h-20 w-20 md:w-24 md:h-24'
                      } p-2 ${
                        (isActive || fallbackActive)
                          ? 'bg-yellow text-black hover:bg-yellow/90' 
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                        {/* Active indicator */}
                        {(isActive || fallbackActive) && (
                        <motion.div
                          layoutId="activeTimeline"
                          className="absolute inset-0 bg-yellow"
                          initial={false}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                       
                      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
                        {/* Year Status */}
                        <div className={`flex-shrink-0 ${
                          isSticky ? 'w-4 h-4' : 'w-6 h-6 md:w-8 md:h-8'
                          } rounded-full flex items-center justify-center mb-1 ${
                            (isActive || fallbackActive)
                              ? 'bg-black text-yellow' 
                              : isCompleted 
                                ? 'bg-green-500/20 text-green-400 border border-green-400/30'
                                : 'bg-white/10 text-white/40'
                          }`}>
                          {isCompleted ? (
                            <Check className={`${
                              isSticky ? 'h-2 w-2' : 'h-3 w-3 md:h-4 md:w-4'
                            }`} />
                          ) : (
                            <span className={`${
                              isSticky ? 'text-xs' : 'text-xs'
                            } font-bold`}>{yearData.year.toString().slice(-2)}</span>
                          )}
                        </div>
                        
                        {/* Year */}
                        <div className={`font-bold ${
                          isSticky ? 'text-xs' : 'text-xs md:text-sm'
                        }`}>{yearData.year}</div>
                        {!isSticky && yearData.title && (
                          <div className={`text-xs mt-1 text-center ${(isActive || fallbackActive) ? 'text-black/70' : 'text-white/40'}`}>
                            {yearData.title.length > 12 ? yearData.title.substring(0, 12) + '...' : yearData.title}
                          </div>
                        )}
                      </div>
                    </Button>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile: Vertical dropdown */}
              <div className="md:hidden">
                <select
                  value={activeYear || years[0]?.year || ''}
                  onChange={(e) => handleYearClick(parseInt(e.target.value))}
                  className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow focus:ring-1 focus:ring-yellow"
                >
                  {years.map((yearData) => (
                    <option 
                      key={yearData.year} 
                      value={yearData.year}
                      className="bg-black text-white"
                    >
                      {yearData.year} - {yearData.title}
                    </option>
                  ))}
                </select>
                
                {/* Mobile year indicators */}
                <div className="flex justify-between mt-3 px-2">
                  {years.map((yearData) => {
                    const isActive = yearData.year === activeYear;
                    const isCompleted = yearData.isComplete;
                    
                    return (
                      <button
                        key={yearData.year}
                        onClick={() => handleYearClick(yearData.year)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          isActive 
                            ? 'bg-yellow' 
                            : isCompleted 
                              ? 'bg-green-500/50' 
                              : 'bg-white/20'
                        }`}
                        aria-label={`Go to ${yearData.year}`}
                      />
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-white/40 py-8">
              <p className="text-sm">No timeline events available</p>
            </div>
          )}

          {/* Connection line - only show on desktop if we have multiple years */}
          {years.length > 1 && (
            <div className={`hidden md:block absolute ${
              isSticky ? 'top-8' : 'top-10'
            } left-0 right-0 h-0.5 bg-white/10 -z-10`} />
          )}
          
          {/* Active position indicator - only show on desktop if we have multiple years */}
          {years.length > 1 && (
            <motion.div
              className={`hidden md:block absolute ${
                isSticky ? 'top-6' : 'top-8'
              } w-1 h-4 bg-yellow rounded-full`}
              animate={{
                left: `${(getActiveIndex() / (years.length - 1)) * 100}%`
              }}
              transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
            />
          )}
        </div>

        {/* Navigation hint - only show when not sticky and on desktop */}
        {!isSticky && (
          <div className="hidden md:block mt-4 text-center">
            <p className="text-xs text-white/40">
              Click any year to jump to that timeline section
            </p>
          </div>
        )}
          </div>
        </motion.div>
    </>
  );
};

export default TimelineStepper;