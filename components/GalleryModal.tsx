
import React from 'react';
import { X } from 'lucide-react';
import { handleImageError } from '../constants';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  title: string;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ isOpen, onClose, images, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-6xl h-[90vh] flex flex-col pointer-events-none">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4 pointer-events-auto px-4 md:px-0">
          <h3 className="text-white text-xl font-serif">{title} Gallery</h3>
          <button 
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm"
          >
            <X size={24} />
          </button>
        </div>

        {/* Grid */}
        <div className="flex-grow overflow-y-auto pointer-events-auto pr-2 scrollbar-hide">
            {images.length === 0 ? (
                <div className="flex items-center justify-center h-full text-white/50">
                    <p>No images in gallery yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {images.filter(img => img && img.trim() !== '').map((img, idx) => (
                        <div key={`${idx}-${img.substring(0, 20)}`} className="relative aspect-[4/3] group overflow-hidden rounded-xl bg-gray-800">
                            <img 
                                src={img} 
                                alt={`${title} view ${idx + 1}`}
                                loading="lazy"
                                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                                onError={handleImageError}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
        
      </div>
    </div>
  );
};

export default GalleryModal;
