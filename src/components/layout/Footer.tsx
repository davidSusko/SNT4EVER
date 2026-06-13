import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { Instagram, Mail, MapPin } from 'lucide-react';
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const footerSections = [
    {
      title: 'Directiva',
      items: [
        { name: 'President', role: 'Marc Rovira', instagram: '@marcskate' },
        { name: 'Vice President', role: 'Anna Soler', instagram: '@annaskate' },
        { name: 'Secretary', role: 'David García', instagram: '@davidskate' },
        { name: 'Treasurer', role: 'Laura Martínez', instagram: '@lauraskate' },
      ]
    },
    {
      title: 'Design & Web',
      items: [
        { name: 'Web Design', role: 'Studio Neutre', instagram: '@studioneutre' },
        { name: 'Graphic Design', role: 'Carlos Ruiz', instagram: '@carlosdesign' },
        { name: 'Documentation', role: 'Marta López', instagram: '@martalopez' },
        { name: 'Brand Identity', role: 'Creative Lab BCN', instagram: '@creativelabbcn' },
      ]
    },
    {
      title: 'Renders & Maps',
      items: [
        { name: '3D Visualization', role: 'Visual Studio', instagram: '@visualstudio' },
        { name: 'Architecture', role: 'Arquitectura BCN', instagram: '@arqbcn' },
        { name: 'Technical Plans', role: 'Técnica 2020', instagram: '@tecnica2020' },
        { name: 'Mapping', role: 'Geo Maps', instagram: '@geomaps' },
      ]
    },
    {
      title: 'Photographers',
      items: [
        { name: 'Lead Photographer', role: 'Jordi Pérez', instagram: '@jordiperez' },
        { name: 'Photo Editor', role: 'Elena Ramírez', instagram: '@elenaphoto' },
        { name: 'Archive Photos', role: 'Sants Archive', instagram: '@santandreuhistory' },
        { name: 'Event Photography', role: 'Flash Photography', instagram: '@flashphoto' },
      ]
    },
  ];

  const collaborators = [
    'Skate Shop Sants',
    'BCN Skate Co.',
    'Urban Sports Foundation',
    'City Council Barcelona',
    'Local Youth Association',
    'Cultural Heritage Foundation',
    'Community Center',
    'Skate Magazine Spain',
    'Red Bull Spain',
    'Vans Spain',
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container-snt py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Main Credits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {footerSections.map((section) => (
              <motion.div
                key={section.title}
                variants={itemVariants}
              >
                <h3 className="text-xl font-bold text-yellow mb-6">
                  {section.title}
                </h3>
                <div className="space-y-4">
                  {section.items.map((item) => (
                    <div key={item.name} className="group">
                      <p className="text-white font-medium mb-1">
                        {item.name}
                      </p>
                      <p className="text-muted-foreground text-sm mb-2">
                        {item.role}
                      </p>
                      {item.instagram && (
                        <a
                          href={`https://instagram.com/${item.instagram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-yellow transition-colors"
                        >
                          <Instagram className="h-3 w-3" />
                          {item.instagram}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <Separator className="bg-white/10 mb-12" />

          {/* Collaborators */}
          <motion.div
            variants={itemVariants}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-yellow mb-6 text-center">
              {t('jsx_collaborators')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {collaborators.map((collaborator) => (
                <div
                  key={collaborator}
                  className="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <p className="text-sm text-white/80">{collaborator}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <Separator className="bg-white/10 mb-12" />

          {/* Contact Info */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            <div className="text-center">
              <Mail className="h-6 w-6 text-yellow mx-auto mb-3" />
              <p className="text-white font-medium mb-1">{t('jsx_contact')}</p>
              <a
                href="mailto:info@snt4ever.com"
                className="text-muted-foreground hover:text-yellow transition-colors"
              >
                {t('jsx_info_snt4ever_com')}</a>
            </div>
            
            <div className="text-center">
              <MapPin className="h-6 w-6 text-yellow mx-auto mb-3" />
              <p className="text-white font-medium mb-1">{t('jsx_location')}</p>
              <p className="text-muted-foreground">
                {t('jsx_sants_skate_plaza')}<br />
                {t('jsx_barcelona_spain')}</p>
            </div>
            
            <div className="text-center">
              <Instagram className="h-6 w-6 text-yellow mx-auto mb-3" />
              <p className="text-white font-medium mb-1">{t('jsx_social')}</p>
              <a
                href="https://instagram.com/snt4ever"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-yellow transition-colors"
              >
                {t('jsx__snt4ever')}</a>
            </div>
          </motion.div>

          {/* Bottom Footer */}
          <motion.div
            variants={itemVariants}
            className="text-center pt-8 border-t border-white/10"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} {t('jsx_snt4ever_all_rights_reserved')}</p>
              <div className="flex gap-6 text-sm">
                <a href="#privacy" className="text-muted-foreground hover:text-yellow transition-colors">
                  {t('jsx_privacy_policy')}</a>
                <a href="#terms" className="text-muted-foreground hover:text-yellow transition-colors">
                  {t('jsx_terms_of_service')}</a>
                <a href="#cookies" className="text-muted-foreground hover:text-yellow transition-colors">
                  {t('jsx_cookies')}</a>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              {t('jsx_made_with_in_barcelona_spain')}</p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;