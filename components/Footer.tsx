import React from 'react';

interface FooterProps {
  onLegalNav?: (page: 'privacy' | 'terms' | 'sitemap') => void;
}

const Footer: React.FC<FooterProps> = ({ onLegalNav }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-gray-bg py-20 border-t border-gray-200">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <h5 className="text-gray-dark text-3xl font-serif font-bold mb-2 tracking-tight">Dhan Sukh House</h5>
            <p className="text-gray-medium text-sm tracking-wide uppercase">Belvedere, Harare</p>
          </div>
          
          <div className="text-gray-medium text-sm text-center font-light">
            <p>&copy; {currentYear} Dhan Sukh House. All rights reserved.</p>
          </div>

          <div className="flex gap-8">
            <button 
              onClick={() => onLegalNav?.('privacy')} 
              className="text-gray-medium hover:text-brand transition-colors text-sm font-medium"
            >
              Privacy
            </button>
            <button 
              onClick={() => onLegalNav?.('terms')} 
              className="text-gray-medium hover:text-brand transition-colors text-sm font-medium"
            >
              Terms
            </button>
            <button 
              onClick={() => onLegalNav?.('sitemap')} 
              className="text-gray-medium hover:text-brand transition-colors text-sm font-medium"
            >
              Sitemap
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;