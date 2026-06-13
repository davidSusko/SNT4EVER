import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import SectionMarquee from '@/components/common/SectionMarquee';

interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  type: 'news' | 'event';
  location?: string;
  link?: string;
  image?: string;
}

const NewsEvents: React.FC = () => {
  const newsItems: NewsItem[] = [
    {
      id: '1',
      title: 'Community Repair Day - Join Us!',
      date: '2024-02-15',
      excerpt: 'Help us maintain and improve the skate plaza. All skill levels welcome - bring your tools and enthusiasm!',
      type: 'event',
      location: 'Sants Skate Plaza',
      image: '/images/repair-day.jpg'
    },
    {
      id: '2',
      title: 'SNT Receives Municipal Support',
      date: '2024-01-28',
      excerpt: 'Barcelona City Council commits funding for plaza renovations after successful advocacy campaign.',
      type: 'news',
      link: 'https://barcelona.cat/news/article/sant-andreu-skate-plaza-funding',
      image: '/images/council-meeting.jpg'
    },
    {
      id: '3',
      title: 'Annual Skate Jam 2024',
      date: '2024-03-20',
      excerpt: 'Join us for the biggest skate event of the year! Competitions, music, food trucks, and community celebration.',
      type: 'event',
      location: 'Sants Skate Plaza',
      image: '/images/skate-jam.jpg'
    },
    {
      id: '4',
      title: 'Documentary Release: Plaza Dreams',
      date: '2024-01-15',
      excerpt: 'Watch the story of Sants Skate Plaza through the eyes of the community that built and preserved it.',
      type: 'news',
      link: 'https://youtube.com/watch?v=plaza-dreams',
      image: '/images/documentary.jpg'
    },
    {
      id: '5',
      title: 'Youth Skate Workshop',
      date: '2024-02-08',
      excerpt: 'Free skate lessons for kids aged 8-16. Professional instructors provide guidance for all skill levels.',
      type: 'event',
      location: 'Sants Skate Plaza',
      image: '/images/youth-workshop.jpg'
    },
    {
      id: '6',
      title: 'Partnership with Local Schools',
      date: '2024-01-10',
      excerpt: 'SNT establishes educational programs with nearby schools to promote skate culture and urban arts.',
      type: 'news',
      link: 'https://snt4ever.com/education',
      image: '/images/school-program.jpg'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getTypeColor = (type: 'news' | 'event') => {
    return type === 'event' ? 'text-yellow' : 'text-white';
  };

  const getTypeBg = (type: 'news' | 'event') => {
    return type === 'event' ? 'bg-yellow/20' : 'bg-white/10';
  };

  return (
    <section className="scroll-mt-14 md:scroll-mt-24 bg-black" id="news">
      <SectionMarquee 
        text="News & Events" 
        className="hidden w-full bg-yellow py-1 md:py-2 mb-4 mt-24 md:mt-32 md:flex items-center overflow-hidden"
      />
      <div className="container-snt pt-24 pb-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-yellow">
              News & Events
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Stay updated with the latest happenings, events, and news from SNT and the skate community.
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-4 mb-12"
          >
            <Button variant="outline" className="btn-secondary">
              All
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-yellow">
              News
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-yellow">
              Events
            </Button>
          </motion.div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="card-dark border-white/10 h-full hover:border-yellow/30 transition-colors group">
                  {/* Image Placeholder */}
                  <div className="aspect-video bg-black/50 rounded-t-lg overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center p-8">
                        <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                          {item.type === 'event' ? (
                            <Calendar className="h-8 w-8 text-white/50" />
                          ) : (
                            <ExternalLink className="h-8 w-8 text-white/50" />
                          )}
                        </div>
                        <p className="text-white/50 text-sm">Image</p>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    {/* Type Badge */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeBg(item.type)} ${getTypeColor(item.type)}`}>
                        {item.type === 'event' ? 'EVENT' : 'NEWS'}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(item.date)}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {item.excerpt}
                    </p>

                    {/* Location for events */}
                    {item.location && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <MapPin className="h-4 w-4" />
                        {item.location}
                      </div>
                    )}

                    {/* Action Button */}
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="btn-secondary w-full"
                      onClick={() => item.link ? window.open(item.link, '_blank') : window.open('#contact', '_self')}
                    >
                      {item.type === 'event' ? 'Register' : 'Read More'}
                      {item.link && <ExternalLink className="h-3 w-3 ml-2" />}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-12"
          >
            <Button variant="outline" size="lg" className="btn-secondary">
              Load More News
            </Button>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center p-8 bg-white/5 rounded-lg border border-white/10"
          >
            <h3 className="text-2xl font-bold text-yellow mb-4">
              Stay Connected
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter for weekly updates on events, news, and ways to support the skate plaza.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-yellow transition-colors"
              />
              <Button className="btn-primary">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsEvents;