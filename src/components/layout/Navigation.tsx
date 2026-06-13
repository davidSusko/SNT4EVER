import { useState, useEffect } from 'react';
import { ShoppingCart, Plus, ArrowDown } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Marquee from '@/components/common/Marquee';
import { NAVIGATION_ITEMS } from '@/constants';
import { useActiveSection } from '@/hooks';
import logo from '@/assets/images/ICON-SNT-HEADER.png';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sectionIds = ['hero', ...NAVIGATION_ITEMS.map(item => item.id)];
  const activeSection = useActiveSection(sectionIds);

  const getMarqueeText = () => {
    switch (activeSection) {
      case 'story':
        return 'Our History';
      case 'archive':
        return 'Archive';
      case 'news':
        return 'News & Events';
      default:
        return 'The Project';
    }
  };

  const marqueeText = getMarqueeText();

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 md:bg-black ${isScrolled ? 'md:bg-opacity-100' : 'md:bg-opacity-75'} bg-yellow font-mono`}>
      <nav className="container-snt h-24 hidden md:flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img src={logo} alt="SNT4EVER Logo" className="h-20" />
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 text-sm">
          {NAVIGATION_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="text-white hover:text-gray-300 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a href="#cart" className="text-white hover:text-gray-300 ml-2">
            <ShoppingCart className="h-5 w-5" />
          </a>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center justify-between h-14 w-full relative overflow-hidden border-b-2 border-black">
        <div className="flex-1 overflow-hidden h-full flex items-center">
          <Marquee speed="slow" direction="right" pauseOnHover={false}>
            {Array(10).fill(null).map((_, i) => (
              <span key={i} className="inline-flex items-center gap-3 mx-3 text-black font-bold text-3xl shrink-0 whitespace-nowrap leading-none tracking-tight">
                {marqueeText}
                <ArrowDown className="h-6 w-6" strokeWidth={3} />
              </span>
            ))}
          </Marquee>
        </div>

        <div className="h-14 w-14 bg-black flex-shrink-0 flex items-center justify-center z-10 border-l-2 border-black">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="flex items-center justify-center w-full h-full text-yellow hover:text-white transition-colors focus:outline-none">
                <Plus className="h-8 w-8" strokeWidth={3} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black border-white/10 text-white">
              <div className="flex flex-col space-y-6 mt-8">
                {NAVIGATION_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    className={`text-4xl font-medium transition-all duration-300 relative ${item.isSpecial
                      ? 'bg-yellow text-black px-3 py-2 rounded-lg text-center'
                      : activeSection === item.id
                        ? 'text-yellow font-semibold'
                        : 'text-white hover:text-yellow'
                      }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {/* Active indicator */}
                    {activeSection === item.id && !item.isSpecial && (
                      <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-yellow rounded-full" />
                    )}
                    {item.label}
                  </a>
                ))}

                {/* Language Toggle */}
                <div className="pt-4 border-t border-white/10">
                  <button className="text-sm text-muted-foreground hover:text-yellow transition-colors">
                    English
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navigation;