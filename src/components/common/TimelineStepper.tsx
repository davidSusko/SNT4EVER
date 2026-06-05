import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

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
        className={`w-full transition-all duration-300 ${isSticky
            ? 'fixed top-24 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-b border-white/10'
            : 'relative'
          }`}
      >
        <div className={`container-snt py-4 ${isSticky ? 'py-3' : ''}`}>

          {/* Horizontal Year Navigation */}
          <div className="relative">
            {years.length > 0 ? (
              <>
                {/* Desktop: Clean dropdown selector */}
                <div className="hidden md:block">
                  <div className="flex items-center gap-4">
                    <select
                      value={activeYear || years[0]?.year || ''}
                      onChange={(e) => handleYearClick(parseInt(e.target.value))}
                      className="flex-1 bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow focus:ring-1 focus:ring-yellow transition-colors"
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

                    <Button
                      onClick={() => {
                        const currentIndex = years.findIndex(y => y.year === (activeYear || years[0]?.year));
                        const nextIndex = (currentIndex + 1) % years.length;
                        handleYearClick(years[nextIndex].year);
                      }}
                      className="bg-yellow text-black hover:bg-yellow/90 px-4"
                    >
                      Next →
                    </Button>
                  </div>

                  {/* Desktop year indicators */}
                  <div className="flex justify-between mt-4 px-1">
                    {years.map((yearData) => {
                      const isActive = yearData.year === activeYear;
                      const isCompleted = yearData.isComplete;

                      return (
                        <div key={yearData.year} className="flex flex-col items-center gap-2">
                          <button
                            onClick={() => handleYearClick(yearData.year)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${isActive
                                ? 'bg-yellow shadow-lg shadow-yellow/50'
                                : isCompleted
                                  ? 'bg-green-500/50 hover:bg-green-500/70'
                                  : 'bg-white/20 hover:bg-white/30'
                              }`}
                            aria-label={`Go to ${yearData.year}`}
                          />
                          <span className={`text-xs transition-colors ${isActive
                              ? 'text-yellow font-bold'
                              : 'text-white/40'
                            }`}>
                            {yearData.year.toString().slice(-2)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Mobile: Vertical dropdown */}
                <div className="md:hidden">
                  <div className="flex items-center gap-2">
                    <select
                      value={activeYear || years[0]?.year || ''}
                      onChange={(e) => handleYearClick(parseInt(e.target.value))}
                      className="flex-1 bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow focus:ring-1 focus:ring-yellow"
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

                    <Button
                      onClick={() => {
                        const currentIndex = years.findIndex(y => y.year === (activeYear || years[0]?.year));
                        const nextIndex = (currentIndex + 1) % years.length;
                        handleYearClick(years[nextIndex].year);
                      }}
                      className="bg-yellow text-black hover:bg-yellow/90 px-3 py-2 text-sm"
                    >
                      →
                    </Button>
                  </div>

                  {/* Mobile year indicators */}
                  <div className="flex justify-between mt-3 px-2">
                    {years.map((yearData) => {
                      const isActive = yearData.year === activeYear;
                      const isCompleted = yearData.isComplete;

                      return (
                        <div key={yearData.year} className="flex flex-col items-center gap-1">
                          <button
                            onClick={() => handleYearClick(yearData.year)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 hover:scale-125 ${isActive
                                ? 'bg-yellow shadow-lg shadow-yellow/50'
                                : isCompleted
                                  ? 'bg-green-500/50 hover:bg-green-500/70'
                                  : 'bg-white/20 hover:bg-white/30'
                              }`}
                            aria-label={`Go to ${yearData.year}`}
                          />
                          <span className={`text-xs transition-colors ${isActive
                              ? 'text-yellow font-bold'
                              : 'text-white/40'
                            }`}>
                            {yearData.year.toString().slice(-2)}
                          </span>
                        </div>
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