
import React from 'react';
import { Check, Calendar as CalendarIcon, Images, Star } from 'lucide-react';
import { handleImageError } from '../constants';
import { MainHouseData } from '../types';
import Button from './Button';

interface MainHouseProps {
    data: MainHouseData;
    onCheckAvailability: (unitId: string, unitName: string) => void;
    onOpenGallery: (images: string[], title: string) => void;
}

const MainHouse: React.FC<MainHouseProps> = ({ data, onCheckAvailability, onOpenGallery }) => {
  return (
    <section id="main-house" className="py-28 bg-white scroll-mt-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          
          {/* Image Gallery Side */}
          <div className="w-full lg:w-1/2 relative">
            <div 
                className="relative overflow-hidden rounded-[2rem] shadow-2xl hover:shadow-airbnb-hover transition-all duration-700 group cursor-pointer aspect-[4/3] lg:aspect-[3/4] bg-gray-100"
                onClick={() => onOpenGallery(data.galleryImages, data.title)}
            >
              {data.image ? (
                <img 
                  src={data.image} 
                  alt={data.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.5s]" 
                  onError={handleImageError}
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 font-serif italic">{data.title}</span>
                </div>
              )}
              <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg z-10 flex items-center gap-2">
                <Star size={14} className="text-gold fill-gold" />
                <span className="text-xs font-bold tracking-widest uppercase text-gray-dark font-sans">Premium Villa</span>
              </div>
              
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-white/90 text-gray-dark px-8 py-4 rounded-full font-medium shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-3">
                      <Images size={20} /> View Gallery
                  </span>
              </div>
            </div>
          </div>

          {/* Details Side */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center pt-8">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4 text-gold font-medium tracking-wide text-sm uppercase">
                 <span className="w-8 h-[1px] bg-gold"></span>
                 Dhan Sukh Estate
              </div>
              <h2 className="text-5xl md:text-6xl font-serif font-medium text-gray-dark mb-4 tracking-tight leading-none">{data.title}</h2>
              <div className="flex items-center text-gray-medium text-lg font-light font-sans">
                <span className="text-gray-800">Entire Villa</span>
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mx-4"></span>
                <span>Belvedere, Harare</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3 mb-10 border-b border-gray-100 pb-10">
                <span className="text-4xl font-serif text-gray-dark">${data.price}</span>
                <span className="text-gray-medium text-xl font-light">/ night</span>
            </div>

            <div className="mb-10">
              <p className="text-gray-600 leading-relaxed text-lg font-light">
                {data.description}
              </p>
            </div>

            <h3 className="text-xl font-serif text-gray-dark mb-6">Premium Amenities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 mb-12">
              {data.features.map((feature, idx) => (
                <div key={idx} className="flex items-center text-gray-600 group">
                  <div className="w-8 h-8 rounded-full bg-gold-light flex items-center justify-center mr-3 group-hover:bg-gold group-hover:text-white transition-colors duration-300">
                    <Check size={14} className="text-gold group-hover:text-white transition-colors" />
                  </div>
                  <span className="font-light text-base">{feature}</span>
                </div>
              ))}
            </div>

            <div className="bg-gray-bg p-8 md:p-10 rounded-[2rem] border border-gray-100 hover:border-gray-200 transition-colors shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <span className="font-serif text-gray-dark text-xl">Minimum Stay</span>
                <span className="text-gray-600 font-medium px-4 py-1 bg-white rounded-full border border-gray-100">{data.minNights} Nights</span>
              </div>
              
              <div className="flex flex-col gap-4">
                  <Button 
                    label="Request Main House on WhatsApp" 
                    message={`Hi, I am interested in booking the ${data.title} at Dhan Sukh House`}
                    fullWidth
                  />
                  <div className="flex gap-4">
                    <div className="w-1/2">
                        <Button 
                            label="Check Dates" 
                            variant="outline"
                            icon={CalendarIcon}
                            onClick={() => onCheckAvailability(data.id, data.title)}
                            fullWidth
                        />
                    </div>
                    <div className="w-1/2">
                        <Button 
                            label="Gallery" 
                            variant="secondary"
                            icon={Images}
                            onClick={() => onOpenGallery(data.galleryImages, data.title)}
                            fullWidth
                        />
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainHouse;
