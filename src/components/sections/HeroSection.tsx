import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowDown } from 'lucide-react';
import SectionMarquee from '@/components/common/SectionMarquee';
import { SOCIAL_LINKS } from '@/constants';

const HeroSection = () => {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-center pt-24 md:pt-40 relative overflow-hidden bg-black">
      {/* Animated Marquee */}
      <SectionMarquee text="The project" />

      {/* Main Content */}
      <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full mx-auto"
        >
          {/* Mission Statement */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] font-bold text-white mb-12 leading-[1.1] md:leading-[1.1] lg:leading-[1.1] text-left tracking-tight">
            SNT4EVER es una asociación formada por skaters de Barcelona que han dinamizado el espacio de la estación de Sants de manera totalmente independiente y que ahora se constituye como asociación entre el ayuntamiento, los vecinos y los patinadores de la plaza, para <span className="text-yellow">salvar una plaza mítica dentro del mundo del skateboarding e iniciar el diálogo</span> entre el ayuntamiento y los skaters. Además de promover la cultura urbana, en concreto la del skateboarding, entre las diferentes asociaciones del barrio, escuelas y todo el que esté interesado en colaborar con nosotros.
          </h1>

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

            <Button 
              variant="outline" 
              size="lg" 
              className="btn-secondary"
              onClick={() => window.open(SOCIAL_LINKS.joinForm, '_blank')}
            >
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