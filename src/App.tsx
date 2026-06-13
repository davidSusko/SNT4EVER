import Navigation from './components/layout/Navigation';
import HeroSection from './components/sections/HeroSection';
import TimelineSection from './components/sections/TimelineSection';
import ImageGallery from './components/sections/ImageGallery';
import { VideoGallery } from './components/sections/YouTubePlayer';
import NewsEvents from './components/sections/NewsEvents';
import SectionMarquee from '@/components/common/SectionMarquee';
import Footer from './components/layout/Footer';
import { ARCHIVE_IMAGES, ARCHIVE_VIDEOS, SOCIAL_LINKS } from '@/constants';
import { useTranslation } from "react-i18next";


function App() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <main>
        <HeroSection />
        <TimelineSection />
        
        {/* Additional sections can be added here */}
        <section id="archive" className="scroll-mt-14 md:scroll-mt-24 bg-black">
          <SectionMarquee 
            text="Archive" 
            className="hidden w-full bg-yellow py-1 md:py-2 mb-4 mt-24 md:mt-32 md:flex items-center overflow-hidden"
          />
          <div className="container-snt pt-24 pb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-yellow mb-8 text-center">
              {t('jsx_archive')}</h2>
            <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-12">
              {t('jsx_explore_our_collection_of_hist')}</p>
            
            {/* Image Gallery */}
            <div className="mb-16 min-h-[500px]">
              <h3 className="text-2xl font-bold text-white mb-8">{t('jsx_photo_archive')}</h3>
              <ImageGallery 
                images={ARCHIVE_IMAGES}
                layout="masonry"
                columns={3}
              />
            </div>
            
            {/* Video Gallery */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-8">{t('jsx_video_archive')}</h3>
              <VideoGallery 
                videos={ARCHIVE_VIDEOS}
              />
            </div>
          </div>
        </section>

        <NewsEvents />

        <section id="join" className="scroll-mt-14 md:scroll-mt-24 section-padding bg-black">
          <div className="container-snt">
            <h2 className="text-4xl md:text-5xl font-bold text-yellow mb-8 text-center">
              {t('jsx_join_us')}</h2>
            <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-8">
              {t('jsx_become_a_member_of_snt_and_hel')}</p>
            <div className="text-center">
              <button 
                className="btn-primary"
                onClick={() => window.open(SOCIAL_LINKS.joinForm, '_blank')}
              >
                {t('jsx__nete_a_la_asociaci_n')}</button>
            </div>
          </div>
        </section>

        <section id="contact" className="section-padding bg-gray-950">
          <div className="container-snt">
            <h2 className="text-4xl md:text-5xl font-bold text-yellow mb-8 text-center">
              {t('jsx_contact')}</h2>
            <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto">
              {t('jsx_get_in_touch_with_us_for_colla')}</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;