import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TimelineYear {
  year: number;
  title: string;
  subtitle?: string;
  isComplete: boolean;
}

interface TimelineStepperProps {
  years: TimelineYear[];
  activeYear: number;
  onYearChange?: (year: number) => void;
}

const TimelineStepper = ({ years, activeYear, onYearChange }: TimelineStepperProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [isInSection, setIsInSection] = useState(false);
  const [stepperHeight, setStepperHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const storySection = document.getElementById('story');
      const stepperElement = document.getElementById('timeline-stepper');
      
      if (storySection) {
        const storyRect = storySection.getBoundingClientRect();
        
        // Check if user is within the story section (more generous detection)
        const inStorySection = storyRect.top < window.innerHeight && storyRect.bottom > -100;
        setIsInSection(inStorySection);
        
        // Store height for placeholder when in section
        if (stepperElement && stepperHeight === 0 && stepperElement.getBoundingClientRect().height > 0 && inStorySection) {
          const currentStepperRect = stepperElement.getBoundingClientRect();
          setStepperHeight(currentStepperRect.height);
        }
        
        // Check if stepper should be sticky (only when in section)
        if (stepperElement) {
          const currentStepperRect = stepperElement.getBoundingClientRect();
          const shouldBeSticky = inStorySection && currentStepperRect.top <= 64; // 64px = header height
          setIsSticky(shouldBeSticky);
        }
        
        // Calculate progress within the section (only when in section)
        if (inStorySection) {
          const progress = Math.max(0, Math.min(1, 
            (window.innerHeight - storyRect.top) / (storyRect.height + window.innerHeight)
          ));
          setScrollProgress(progress);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [stepperHeight]);

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

  const getActiveIndex = () => {
    return years.findIndex(y => y.year === activeYear);
  };

  return (
    <AnimatePresence>
      {isInSection && (
        <>
          {/* Placeholder to prevent content jump */}
          {isSticky && stepperHeight > 0 && (
            <div style={{ height: stepperHeight }} />
          )}
          
          <motion.div 
        id="timeline-stepper"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className={`w-full transition-all duration-300 ${
          isSticky 
            ? 'fixed top-16 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-b border-white/10' 
            : 'relative'
        }`}
      >
        <div className={`container-snt py-4 ${isSticky ? 'py-3' : ''}`}>
        {/* Progress Indicator */}
        <div className={`mb-6 ${isSticky ? 'mb-4' : ''}`}>
          <div className="flex items-center justify-between text-sm text-white/60 mb-2">
            <span>Timeline Progress</span>
            <span>{Math.round(scrollProgress * 100)}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <motion.div
              className="bg-yellow h-2 rounded-full"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>

        {/* Horizontal Year Navigation */}
        <div className="relative">
          <div className="flex items-center justify-between gap-2 md:gap-4 overflow-x-auto pb-2">
            {years.map((yearData, index) => {
              const isActive = yearData.year === activeYear;
              const isCompleted = yearData.isComplete;
              
              return (
                <motion.div
                  key={yearData.year}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-shrink-0"
                >
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleYearClick(yearData.year)}
                    className={`relative overflow-hidden group flex-col ${
                      isSticky ? 'h-16 w-16 md:h-18 md:w-18' : 'h-20 w-20 md:w-24 md:h-24'
                    } p-2 ${
                      isActive 
                        ? 'bg-yellow text-black hover:bg-yellow/90' 
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {/* Active indicator */}
                    {isActive && (
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
                        isActive 
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
                        <div className={`text-xs mt-1 text-center ${isActive ? 'text-black/70' : 'text-white/40'}`}>
                          {yearData.title.length > 12 ? yearData.title.substring(0, 12) + '...' : yearData.title}
                        </div>
                      )}
                    </div>
                  </Button>
                </motion.div>
              );
            })}
          </div>

          {/* Connection line */}
          <div className={`absolute ${
            isSticky ? 'top-8' : 'top-10'
          } left-0 right-0 h-0.5 bg-white/10 -z-10`} />
          
          {/* Active position indicator */}
          <motion.div
            className={`absolute ${
              isSticky ? 'top-6' : 'top-8'
            } w-1 h-4 bg-yellow rounded-full`}
            animate={{
              left: `${(getActiveIndex() / (years.length - 1)) * 100}%`
            }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
          />
        </div>

        {/* Navigation hint - only show when not sticky */}
        {!isSticky && (
          <div className="mt-4 text-center">
            <p className="text-xs text-white/40">
              Click any year to jump to that timeline section
            </p>
          </div>
        )}
          </div>
        </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TimelineStepper;