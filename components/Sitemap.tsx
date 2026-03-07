import React from 'react';

const Sitemap: React.FC = () => {
  return (
    <div className="py-24 max-w-4xl mx-auto px-6 font-sans">
      <h1 className="text-4xl font-serif font-bold mb-8">Sitemap</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-dark border-b pb-2">Main Sections</h2>
          <ul className="space-y-2 text-brand">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/#our-story" className="hover:underline">Our Story</a></li>
            <li><a href="/#main-house" className="hover:underline">Main House Villa</a></li>
            <li><a href="/#cottages" className="hover:underline">Garden Cottages</a></li>
            <li><a href="/#amenities" className="hover:underline">Amenities</a></li>
            <li><a href="/#contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-dark border-b pb-2">Legal</h2>
          <ul className="space-y-2 text-brand">
            <li><button onClick={() => window.location.hash = '#privacy'} className="hover:underline text-left">Privacy Policy</button></li>
            <li><button onClick={() => window.location.hash = '#terms'} className="hover:underline text-left">Terms & Conditions</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;