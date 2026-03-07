
import React from 'react';
import { AMENITIES_LIST } from '../constants';

const Amenities: React.FC = () => {
  return (
    <section id="amenities" className="py-24 bg-white scroll-mt-24">
      <div className="container mx-auto px-6 md:px-12 border-t border-gray-100 pt-20">
        <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-dark mb-16 text-center md:text-left">
            Experience Comfort & Luxury
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
          {AMENITIES_LIST.map((amenity, idx) => (
            <div key={idx} className="flex flex-col items-center md:items-start text-center md:text-left space-y-4 p-6 rounded-2xl hover:bg-gray-bg transition-colors duration-500 cursor-default group">
              <div className="text-gray-dark p-4 bg-gray-50 rounded-2xl shadow-sm group-hover:bg-white group-hover:shadow-md transition-all duration-500 group-hover:text-brand">
                {amenity.icon}
              </div>
              <span className="text-gray-dark font-medium text-base md:text-lg tracking-tight">{amenity.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-gradient-to-br from-gold-light to-white border border-orange-100/50 p-8 md:p-12 rounded-[2rem] flex flex-col md:flex-row gap-8 items-center md:items-start shadow-sm mx-auto max-w-4xl">
            <div className="flex-shrink-0 bg-white p-4 rounded-full text-gold shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            </div>
            <div className="text-center md:text-left">
                <h4 className="font-bold text-gray-dark text-xl mb-3 font-serif">House Rules & Notes</h4>
                <div className="text-gray-medium leading-relaxed font-light text-base space-y-2">
                    <p>
                        To maintain our serene atmosphere, strictly <span className="font-medium text-gray-dark">no parties</span> and <span className="font-medium text-gray-dark">no smoking indoors</span>. 
                    </p>
                    <p>
                        <span className="font-bold text-brand uppercase text-xs tracking-widest block mb-1">Strict Dietary Policy</span>
                        The premises are <span className="font-medium text-gray-dark">strictly vegetarian</span>. Absolutely <span className="font-medium text-gray-dark">no beef and no pork</span> are allowed to be cooked or consumed on the premises.
                    </p>
                    <p>
                        Linen is changed every 3 days. Washing and ironing can be provided at an extra cost.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Amenities;
