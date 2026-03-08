
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { handleImageError } from '../constants';

interface HeroProps {
  images?: string[];
}

const Hero: React.FC<HeroProps> = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  // Reset index when images change
  useEffect(() => {
    setCurrentIndex(0);
    setLoadedImages(new Set());
  }, [images?.join(',')]);

  const sliderImages = images && images.length > 0 && images.some(img => img && img.trim() !== '')
    ? images.filter(img => img && img.trim() !== '')
    : ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920"];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
  }, [sliderImages.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
  }, [sliderImages.length]);

  useEffect(() => {
    if (sliderImages.length <= 1 || isPaused) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [sliderImages.length, nextSlide, isPaused]);

  return (
    <div 
      className="relative h-[95vh] w-full flex items-center justify-center overflow-hidden bg-gray-900 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        {sliderImages.map((image, index) => (
          <div
            key={`slide-${index}-${image.substring(0, 20)}`}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={image} 
              alt={`Dhan Sukh House Exterior ${index + 1}`}
              className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-out ${
                index === currentIndex ? 'scale-110 translate-y-2' : 'scale-100 translate-y-0'
              }`}
              onError={handleImageError}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </div>
        ))}
        {/* Premium Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/80"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto text-white mt-8 animate-fade-in-up">
        <span className="inline-block py-1.5 px-5 border border-white/20 rounded-full text-xs md:text-sm font-semibold tracking-[0.2em] uppercase mb-8 backdrop-blur-xl bg-white/5 shadow-2xl">
          Welcome to Harare
        </span>
        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-medium mb-8 tracking-tighter drop-shadow-2xl leading-[1]">
          Dhan Sukh House
        </h1>
        <p className="font-sans text-xl md:text-2xl font-light mb-14 opacity-95 drop-shadow-md max-w-2xl mx-auto leading-relaxed text-gray-100">
          A serene family retreat in the heart of Belvedere.
          <span className="block mt-3 text-lg opacity-70 font-normal tracking-wide italic">
            Luxury Villa & Garden Cottages
          </span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
           <a 
             href="#main-house" 
             className="bg-brand hover:bg-brand-hover text-white font-bold py-5 px-12 rounded-full transition-all duration-500 shadow-2xl hover:shadow-brand/50 hover:-translate-y-1.5 w-full sm:w-auto tracking-widest uppercase text-xs"
           >
             Explore Villa
           </a>
           <a 
             href="#cottages" 
             className="bg-white/10 backdrop-blur-xl hover:bg-white text-white hover:text-gray-900 border border-white/20 font-bold py-5 px-12 rounded-full transition-all duration-500 shadow-2xl hover:-translate-y-1.5 w-full sm:w-auto tracking-widest uppercase text-xs"
           >
             View Cottages
           </a>
        </div>
      </div>

      {/* Side Controls (Visible on Desktop hover) */}
      {sliderImages.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute left-8 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-brand"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-8 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-brand"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Navigation Dots */}
      {sliderImages.length > 1 && (
        <div className="absolute bottom-24 flex gap-3 z-20">
            {sliderImages.map((_, idx) => (
                <button 
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 transition-all duration-500 rounded-full shadow-lg ${
                        idx === currentIndex ? 'w-10 bg-brand' : 'w-2 bg-white/40 hover:bg-white/60'
                    }`}
                />
            ))}
        </div>
      )}

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/40 z-10">
        <ChevronDown size={32} />
      </div>
    </div>
  );
};

export default Hero;
