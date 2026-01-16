import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import TimelineStepper from './TimelineStepper';
import { useState, useEffect } from 'react';
import image1 from '@/assets/snt_bench_new.png';
import image2 from '@/assets/sants_new.png';
import image3 from '@/assets/snt_landscape_1983.jpg';

const TimelineSection = () => {
  const [activeYear, setActiveYear] = useState<number>(1983);
  const [visibleYears, setVisibleYears] = useState<Set<number>>(new Set([1983]));

  const timelineEvents = [
    {
      year: '1983',
      title: 'Architecture & Design',
      content: 'The original plaza design was created as part of Barcelona\'s urban renewal project. The architectural vision aimed to create a multifunctional public space that would serve the community for decades.',
      type: 'gallery',
      images: [image1, image2, image3]
    },
    {
      year: '1997',
      title: 'Birth of Skate Culture',
      content: 'Local skaters discovered the plaza\'s perfect concrete surfaces and began transforming it into a skate destination. This marked the beginning of Sants as a legendary spot in Barcelona\'s skate scene.',
      type: 'video',
      videoId: 'dQw4w9WgXcQ' // Example YouTube ID
    },
    {
      year: '2007',
      title: 'International Recognition',
      content: 'Sants Skate Plaza gained international fame as skate magazines and professionals from around the world discovered its unique features and vibrant community.',
      type: 'gallery',
      images: ['/images/2007-1.jpg', '/images/2007-2.jpg', '/images/2007-3.jpg']
    },
    {
      year: '2012',
      title: 'Deterioration Begins',
      content: 'Construction projects around the plaza began affecting the surface quality. The community noticed cracks and wear that threatened the skating experience and public safety.',
      type: 'history',
      image: '/images/2012-damage.jpg'
    },
    {
      year: '2018',
      title: 'Community Action',
      content: 'SNT (Sants4Ever) was formed to organize repair efforts, events, and advocacy. The association officially registered and began working with local authorities.',
      type: 'events',
      events: [
        'First community repair day',
        'Skate jam fundraiser',
        'Meeting with city council',
        'Association official registration'
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const eventElements = document.querySelectorAll('[data-timeline-year]');
      
      eventElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const year = parseInt(element.getAttribute('data-timeline-year') || '0');
        
        // Mark year as visible if it's in viewport
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setVisibleYears(prev => new Set(prev).add(year));
          
          // Set as active year if it's the most centered
          const elementCenter = rect.top + rect.height / 2;
          const windowCenter = window.innerHeight / 2;
          const distance = Math.abs(elementCenter - windowCenter);
          
          if (distance < window.innerHeight / 3) {
            setActiveYear(year);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prepare timeline stepper data
  const timelineStepperData = timelineEvents.map(event => ({
    year: parseInt(event.year),
    title: event.title,
    subtitle: event.type === 'gallery' ? `${event.images?.length || 0} photos` : 
               event.type === 'video' ? 'Video content' : 
               event.type === 'events' ? `${event.events?.length || 0} events` : 
               'Historical content',
    isComplete: visibleYears.has(parseInt(event.year))
  }));

  return (
    <section className="section-padding bg-black" id="story">
      <div className="container-snt">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-yellow">
              Our Story
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              From architectural vision to cultural landmark, follow the journey of Sants skate plaza and the community that fights to preserve it.
            </p>
          </motion.div>

          {/* Timeline Stepper */}
          <motion.div
            variants={itemVariants}
            className="mb-16"
          >
            <TimelineStepper 
              years={timelineStepperData}
              activeYear={activeYear}
              onYearChange={setActiveYear}
            />
          </motion.div>

          {/* Timeline Events */}
          <div className="space-y-24">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.year}
                data-timeline-year={event.year}
                variants={itemVariants}
                className={`flex flex-col lg:flex-row gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Year Display */}
                <div className="lg:w-1/4">
                  <div className="text-center lg:text-right">
                    <span className="text-6xl md:text-7xl lg:text-8xl font-bold text-yellow/20">
                      {event.year}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:w-3/4">
                  <Card className="card-dark border-white/10 overflow-hidden">
                    <CardContent className="p-8 md:p-12">
                      <h3 className="text-3xl md:text-4xl font-bold mb-6 text-yellow">
                        {event.title}
                      </h3>
                      
                      <p className="text-lg md:text-xl text-white mb-8 leading-relaxed">
                        {event.content}
                      </p>

                      {/* Video Content */}
                      {event.type === 'video' && event.videoId && (
                        <div className="aspect-video mb-8 rounded-lg overflow-hidden bg-black/50">
                          <iframe 
                            width="100%" 
                            height="100%" 
                            src="https://www.youtube.com/embed/mZctJpnGNyI?si=y8Jn4n_h1BLKGnEq" 
                            title="YouTube video player" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerPolicy="strict-origin-when-cross-origin" 
                            allowFullScreen></iframe>
                        </div>
                      )}

                      {/* Gallery Content */}
                      {event.type === 'gallery' && event.images && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                          {event.images.map((_, imgIndex) => (
                            <div
                              key={imgIndex}
                              className="aspect-square bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                            >
                              <img
                                src={event.images![imgIndex]}
                                alt={`Image ${imgIndex + 1} for ${event.title}`}
                                className="object-cover w-full h-full rounded-lg"
                              />                            </div>
                          ))}
                        </div>
                      )}

                      {/* Events List */}
                      {event.type === 'events' && event.events && (
                        <div className="space-y-3 mb-8">
                          {event.events.map((eventItem, eventIndex) => (
                            <div
                              key={eventIndex}
                              className="flex items-center gap-3 text-white bg-white/5 rounded-lg p-3"
                            >
                              <Calendar className="h-4 w-4 text-yellow flex-shrink-0" />
                              <span>{eventItem}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Action Button */}
                      <Button
                        variant="outline"
                        size="lg"
                        className="btn-secondary"
                        onClick={() => window.open('#archive', '_self')}
                      >
                        View Archive
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TimelineSection;