import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, ExternalLink, Calendar } from 'lucide-react';

const TimelineSection = () => {
  const timelineEvents = [
    {
      year: '1983',
      title: 'Architecture & Design',
      content: 'The original plaza design was created as part of Barcelona\'s urban renewal project. The architectural vision aimed to create a multifunctional public space that would serve the community for decades.',
      type: 'history',
      image: '/images/1983-plaza.jpg'
    },
    {
      year: '1997',
      title: 'Birth of Skate Culture',
      content: 'Local skaters discovered the plaza\'s perfect concrete surfaces and began transforming it into a skate destination. This marked the beginning of Sant Andreu as a legendary spot in Barcelona\'s skate scene.',
      type: 'video',
      videoId: 'dQw4w9WgXcQ' // Example YouTube ID
    },
    {
      year: '2007',
      title: 'International Recognition',
      content: 'Sant Andreu Skate Plaza gained international fame as skate magazines and professionals from around the world discovered its unique features and vibrant community.',
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
      content: 'SNT (Skateboarders National Team) was formed to organize repair efforts, events, and advocacy. The association officially registered and began working with local authorities.',
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
              From architectural vision to cultural landmark, follow the journey of Sant Andreu Skate Plaza
            </p>
          </motion.div>

          {/* Timeline Events */}
          <div className="space-y-24">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.year}
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
                          <div className="w-full h-full flex items-center justify-center">
                            <Button
                              variant="secondary"
                              size="lg"
                              className="flex items-center gap-2"
                              onClick={() => window.open(`https://www.youtube.com/watch?v=${event.videoId}`, '_blank')}
                            >
                              <Play className="h-5 w-5" />
                              Watch Video
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
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
                              <span className="text-sm text-muted-foreground">Image {imgIndex + 1}</span>
                            </div>
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