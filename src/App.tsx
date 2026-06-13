import Navigation from './components/layout/Navigation';
import HeroSection from './components/sections/HeroSection';
import TimelineSection from './components/sections/TimelineSection';
import ImageGallery from './components/sections/ImageGallery';
import { VideoGallery } from './components/sections/YouTubePlayer';
import NewsEvents from './components/sections/NewsEvents';
import SectionMarquee from '@/components/common/SectionMarquee';
import Footer from './components/layout/Footer';
import { ARCHIVE_IMAGES, ARCHIVE_VIDEOS, SOCIAL_LINKS } from '@/constants';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <main>
        <HeroSection />
        <TimelineSection />
        
        {/* Additional sections can be added here */}
        <section id="archive" className="bg-black">
          <SectionMarquee 
            text="Archive" 
            className="hidden w-full bg-yellow py-1 md:py-2 mb-4 mt-24 md:mt-32 md:flex items-center overflow-hidden"
          />
          <div className="container-snt pt-24 pb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-yellow mb-8 text-center">
              Archive
            </h2>
            <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-12">
              Explore our collection of historical photos, videos, and documents that tell the story of Sants Skate Plaza.
            </p>
            
            {/* Image Gallery */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-white mb-8">Photo Archive</h3>
              <ImageGallery 
                images={ARCHIVE_IMAGES}
                layout="masonry"
                columns={3}
              />
            </div>
            
            {/* Video Gallery */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-8">Video Archive</h3>
              <VideoGallery 
                videos={ARCHIVE_VIDEOS}
              />
            </div>
          </div>
        </section>

        <NewsEvents />

        <section id="join" className="section-padding bg-black">
          <div className="container-snt">
            <h2 className="text-4xl md:text-5xl font-bold text-yellow mb-8 text-center">
              Join Us!
            </h2>
            <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-8">
              Become a member of SNT and help us preserve the skate plaza for future generations.
            </p>
            <div className="text-center">
              <button 
                className="btn-primary"
                onClick={() => window.open(SOCIAL_LINKS.joinForm, '_blank')}
              >
                Únete a la asociación
              </button>
            </div>
          </div>
        </section>

        <section id="contact" className="section-padding bg-gray-950">
          <div className="container-snt">
            <h2 className="text-4xl md:text-5xl font-bold text-yellow mb-8 text-center">
              Contact
            </h2>
            <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto">
              Get in touch with us for collaborations, donations, or any questions about the project.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;