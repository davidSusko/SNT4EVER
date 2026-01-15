import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Marquee from './Marquee';

const HeroSection = () => {
  const marqueeText = "The project ★ The project ★ The project ★ The project ★ The project ★ ";
  
  return (
    <section className="min-h-screen flex flex-col justify-center items-center pt-16 relative overflow-hidden bg-black">
      {/* Animated Marquee */}
      <div className="w-full bg-yellow py-4 mb-12">
        <Marquee speed="normal" direction="left" pauseOnHover={true}>
          <span className="text-black font-bold text-2xl">
            {marqueeText}
          </span>
        </Marquee>
      </div>

      {/* Main Content */}
      <div className="container-snt text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-yellow">
            SNT4EVER
          </h1>

          {/* Mission Statement */}
          <div className="text-2xl md:text-3xl lg:text-4xl text-white mb-12 leading-relaxed">
            <p className="mb-6">
              Somos una asociación sin ánimo de lucro creada para{' '}
              <span className="text-yellow">preservar y mantener el Skate Plaza de Sant Andreu</span>{' '}
              como un espacio cultural y deportivo.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground">
              We are a non-profit association created to{' '}
              <span className="text-yellow">preserve and maintain the Sant Andreu Skate Plaza</span>{' '}
              as a cultural and sports space.
            </p>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              size="lg" 
              className="btn-primary group"
              onClick={() => window.open('https://www.change.org/p/salvemos-el-skate-plaza-de-sant-andreu', '_blank')}
            >
              Firma la petición
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button variant="outline" size="lg" className="btn-secondary">
              Únete a la asociación
            </Button>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 text-muted-foreground"
          >
            <p className="text-sm">
              Desde 1983 defendiendo el skate en Barcelona • Since 1983 defending skate in Barcelona
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 pointer-events-none" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-yellow/10 rounded-full blur-xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-yellow/10 rounded-full blur-2xl" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow/5 rounded-full blur-lg" />
    </section>
  );
};

export default HeroSection;