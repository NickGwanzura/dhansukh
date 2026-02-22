
import React, { useState, useEffect } from 'react';
import { Menu, X, Lock } from 'lucide-react';

interface NavbarProps {
  onHomeNav?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onHomeNav }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Our Story', href: '#our-story' },
    { name: 'Main House', href: '#main-house' },
    { name: 'Cottages', href: '#cottages' },
    { name: 'Amenities', href: '#amenities' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onHomeNav?.();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (href: string) => {
    onHomeNav?.();
    setIsMobileMenuOpen(false);
    
    // If it's an internal hash link
    if (href.startsWith('#')) {
        setTimeout(() => {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            } else if (href === '#admin') {
                window.location.hash = 'admin';
            }
        }, 50);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm border-gray-100 py-4' 
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <a 
          href="#" 
          onClick={handleLogoClick}
          className={`text-2xl md:text-3xl font-serif font-bold tracking-tighter transition-colors duration-500 ${
            isScrolled ? 'text-gray-dark' : 'text-white'
          }`}
        >
          Dhan Sukh House
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-2 items-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              className={`
                px-5 py-2.5 rounded-full font-medium transition-all duration-300 text-sm tracking-wide
                ${isScrolled 
                  ? 'text-gray-medium hover:bg-gray-bg hover:text-gray-dark' 
                  : 'text-white/90 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              {link.name}
            </a>
          ))}
          
          {/* Admin Link */}
          <a
            href="#admin"
            onClick={(e) => {
                e.preventDefault();
                window.location.hash = 'admin';
            }}
            className={`
              ml-4 flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300
              ${isScrolled 
                ? 'bg-gray-dark text-white hover:bg-brand shadow-sm' 
                : 'bg-white/10 text-white border border-white/20 hover:bg-white hover:text-gray-dark'
              }
            `}
          >
            <Lock size={14} />
            Manage
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`
            md:hidden p-2 rounded-full transition-all duration-300
            ${isScrolled 
              ? 'text-gray-dark hover:bg-gray-100' 
              : 'text-gray-800 bg-white/90 shadow-lg'
            }
          `}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`
          md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl shadow-airbnb border-t border-gray-100
          transition-all duration-300 ease-in-out origin-top
          ${isMobileMenuOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-95 invisible'}
        `}
      >
        <div className="flex flex-col p-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-dark font-medium text-lg py-3 border-b border-gray-100 last:border-0 hover:text-brand transition-colors font-serif"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#admin"
            className="flex items-center gap-3 text-brand font-bold text-lg py-4 border-t border-gray-100 mt-2"
            onClick={(e) => {
              e.preventDefault();
              setIsMobileMenuOpen(false);
              window.location.hash = 'admin';
            }}
          >
            <Lock size={20} />
            Admin Dashboard
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
