import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Marquee from '@/components/common/Marquee';
import { SOCIAL_LINKS } from '@/constants';

const HeroSection = () => {
  const marqueeText = "The project ★ The project ★ The project ★ The project ★ The project ★ ";
  
  return (
    <section className="min-h-screen flex flex-col justify-center items-center pt-16 relative overflow-hidden bg-black">
      {/* Animated Marquee */}
      <div className="w-full bg-yellow py-4 mb-12">
        <Marquee speed="fast" direction="left" pauseOnHover={true}>
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
              SNT4EVER es una asociación de skaters de Barcelona que 
              trabaja para <span className="text-yellow">preservar y dinamizar </span> 
              la plaza dels Paisos Catalans, conocida como Sants, un espacio mítico 
              del skateboarding. 
            </p>
            <p className="text-lg md:text-xl text-muted-foreground">
              Actuamos como puente entre el ayuntamiento, vecinos y patinadores, 
              <span className="text-yellow"> promoviendo el diálogo y la integración </span>
              de la cultura del skateboarding en el barrio a través de colaboraciones con 
              asociaciones locales y escuelas.
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
              onClick={() => window.open(SOCIAL_LINKS.changeOrg, '_blank')}
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