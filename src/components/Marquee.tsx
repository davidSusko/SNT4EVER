import React from 'react';
import { motion } from 'framer-motion';

interface MarqueeProps {
  children: React.ReactNode;
  speed?: 'slow' | 'normal' | 'fast';
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  className?: string;
}

const Marquee: React.FC<MarqueeProps> = ({
  children,
  speed = 'normal',
  direction = 'left',
  pauseOnHover = true,
  className = ''
}) => {
  const getSpeedDuration = () => {
    switch (speed) {
      case 'slow':
        return 40;
      case 'fast':
        return 15;
      default:
        return 25;
    }
  };

  const getAnimationDirection = () => {
    return direction === 'left' ? [-50, 0] : [0, -50];
  };

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: getAnimationDirection(),
        }}
        transition={{
          duration: getSpeedDuration(),
          repeat: Infinity,
          ease: "linear",
        }}
        whileHover={pauseOnHover ? { animationPlayState: 'paused' } : {}}
      >
        {/* Double the content for seamless loop */}
        <div className="inline-block">{children}</div>
        <div className="inline-block">{children}</div>
      </motion.div>
    </div>
  );
};

export default Marquee;