import { useState } from 'react';
import { Menu, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NAVIGATION_ITEMS } from '@/constants';
import { useActiveSection } from '@/hooks';
import logo from '@/assets/images/ICON-SNT-HEADER.png';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const sectionIds = NAVIGATION_ITEMS.map(item => item.id);
  const activeSection = useActiveSection(sectionIds);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-75 font-mono">
      <nav className="container-snt h-24 flex items-center justify-between">
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

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Cart Icon */}
          <Button variant="ghost" size="icon" className="text-white hover:text-yellow">
            <ShoppingCart className="h-5 w-5" />
          </Button>

          {/* Hamburger Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:text-yellow">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black border-white/10 text-white">
              <div className="flex flex-col space-y-6 mt-8">
                {NAVIGATION_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    className={`text-lg font-medium transition-all duration-300 relative ${item.isSpecial
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
      </nav>
    </header>
  );
};

export default Navigation;