
import React from 'react';
import { Calendar as CalendarIcon, Images, CheckCircle2 } from 'lucide-react';
import { handleImageError } from '../constants';
import { Cottage } from '../types';
import Button from './Button';

interface CottagesProps {
    data: Cottage[];
    onCheckAvailability: (unitId: string, unitName: string) => void;
    onOpenGallery: (images: string[], title: string) => void;
}

const Cottages: React.FC<CottagesProps> = ({ data, onCheckAvailability, onOpenGallery }) => {
  // Debug logging
  React.useEffect(() => {
    console.log('Cottages data received:', data);
    data.forEach(c => {
      console.log(`Cottage ${c.id}: image present = ${!!c.image}, image length = ${c.image?.length || 0}`);
    });
  }, [data]);
  
  return (
    <section id="cottages" className="py-28 bg-gray-bg scroll-mt-24 border-t border-gray-100">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-gold font-medium tracking-widest text-xs uppercase mb-4 block">Private Collections</span>
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-dark mb-6 tracking-tight">The Garden Cottages</h2>
          <p className="text-gray-medium text-lg md:text-xl font-light leading-relaxed">
            Private, secure, and fully equipped self-catering units set in our lush gardens.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {data.map((cottage) => (
            <div key={cottage.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-airbnb-hover transition-all duration-500 flex flex-col group border border-gray-100 hover:border-gray-200">
              
              <div 
                className="relative h-64 overflow-hidden cursor-pointer bg-gray-100"
                onClick={() => onOpenGallery(cottage.galleryImages, cottage.title)}
              >
                {cottage.image && cottage.image.trim() !== '' ? (
                  <img 
                    src={cottage.image} 
                    alt={cottage.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.5s]"
                    onError={(e) => {
                      console.error(`Image error for ${cottage.title}:`, cottage.image.substring(0, 50));
                      handleImageError(e);
                    }}
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 font-serif italic text-sm">{cottage.title} (no image)</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500"></div>
                <div className="absolute bottom-4 left-4 text-white text-xs font-bold tracking-wider bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 uppercase">
                    Garden View
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow relative">
                <div className="absolute -top-6 right-8 bg-white shadow-lg px-4 py-2 rounded-xl border border-gray-50 flex flex-col items-center">
                     <span className="text-xl font-serif font-bold text-gray-dark">${cottage.price}</span>
                     <span className="text-[10px] text-gray-500 uppercase tracking-wide font-medium">Per Room</span>
                </div>

                <h3 className="text-2xl font-serif font-medium text-gray-dark mb-1 group-hover:text-brand transition-colors duration-300 pr-16">{cottage.title}</h3>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-3 block">Max 2 Persons</span>
                
                <p className="text-gray-medium text-sm mb-6 line-clamp-2 font-light leading-relaxed">
                  {cottage.description}
                </p>

                <div className="grid grid-cols-2 gap-y-2 gap-x-2 mb-8 flex-grow">
                  {cottage.features.slice(0, 8).map((feature, idx) => (
                    <div key={idx} className="flex items-start text-[11px] text-gray-600 font-normal">
                      <CheckCircle2 size={12} className="text-gold mr-2 flex-shrink-0 mt-0.5" />
                      <span className="leading-tight">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto flex flex-col gap-3">
                  <Button 
                    label="Book on WhatsApp" 
                    message={`Hi, I am interested in booking a Cottage (${cottage.title}) at Dhan Sukh House`}
                    fullWidth
                    variant="primary"
                  />
                  <div className="grid grid-cols-2 gap-3">
                        <Button 
                            label="Dates" 
                            variant="outline"
                            icon={CalendarIcon}
                            onClick={() => onCheckAvailability(cottage.id, cottage.title)}
                            fullWidth
                        />
                         <Button 
                            label="Gallery" 
                            variant="secondary"
                            icon={Images}
                            onClick={() => onOpenGallery(cottage.galleryImages, cottage.title)}
                            fullWidth
                        />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cottages;
