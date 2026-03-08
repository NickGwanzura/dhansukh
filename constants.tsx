
import React from 'react';
import { Wifi, Sun, Droplets, ShieldCheck, Coffee, Utensils, Tv, Home, Wind } from 'lucide-react';
import { Amenity, Cottage, MainHouseData, BookingMap } from './types';

export const WHATSAPP_NUMBER = "263712201681"; 

export const MAIN_HOUSE: MainHouseData = {
  id: "main-house",
  title: "Main House Villa",
  price: 250,
  minNights: 3,
  features: [
    "4 Bedrooms (Ensuite Master)",
    "2.5 Bathrooms",
    "Modern Strictly Vegetarian Kitchen",
    "No Beef or Pork allowed on premises",
    "10kVA Solar & Borehole",
    "Linen changed every 3 days",
    "Daily Maid Service"
  ],
  description: "A spacious 4-bedroom sanctuary. Strictly vegetarian/vegan environment. No beef or pork products are permitted to be cooked or brought onto the premises. Includes daily maid service. Washing and ironing provided at an extra cost.",
  image: "", 
  galleryImages: []
};

const COMMON_COTTAGE_FEATURES = [
  "Aircon & Fan",
  "Smart TV",
  "Fridge & Kettle",
  "Fiberlink WiFi",
  "Work Desk",
  "Solar Geyser",
  "Security screen door",
  "Linen changed every 3 days"
];

export const COTTAGES: Cottage[] = [
  {
    id: "cottage-1",
    title: "Garden Suite A",
    description: "Serene garden suite with twin beds. Modern comfort with full amenities. Strictly vegetarian/no meat premises.",
    price: 75,
    features: ["2 Single Beds", ...COMMON_COTTAGE_FEATURES],
    image: "",
    galleryImages: []
  },
  {
    id: "cottage-2",
    title: "Garden Suite B",
    description: "Beautifully appointed twin suite. Secure and peaceful with premium finishing. Strictly vegetarian/no meat premises.",
    price: 75,
    features: ["2 Single Beds", ...COMMON_COTTAGE_FEATURES],
    image: "",
    galleryImages: []
  },
  {
    id: "cottage-3",
    title: "Garden Suite C",
    description: "Our signature double-bed suite. Ideal for couples seeking tranquility. Strictly vegetarian/no meat premises.",
    price: 75,
    features: ["1 Double Bed", ...COMMON_COTTAGE_FEATURES],
    image: "",
    galleryImages: []
  }
];

export const HERO_DEFAULT_IMAGES: string[] = [
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920"
];

export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.currentTarget;
  const originalSrc = target.src;
  
  // Don't replace if it's already a data URL (base64 image) - it might just be loading
  if (originalSrc.startsWith('data:image')) {
    console.log('Base64 image error (might be large/loading):', originalSrc.substring(0, 50) + '...');
    // For base64 images, just add a background color and show text instead of replacing
    target.style.backgroundColor = '#f5f5f4';
    target.style.objectFit = 'contain';
    target.style.padding = '20px';
    target.onerror = null;
    return;
  }
  
  // Don't replace if it's already a placeholder or empty
  if (!originalSrc || originalSrc.includes('placeholder') || originalSrc === window.location.href) {
    console.log('Empty or placeholder image');
    return;
  }
  
  console.error('Image failed to load:', originalSrc);
  
  // Set a fallback placeholder image
  target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22 viewBox=%220 0 400 300%22%3E%3Crect width=%22400%22 height=%22300%22 fill=%22%23f5f5f4%22/%3E%3Ctext x=%22200%22 y=%22150%22 font-family=%22serif%22 font-size=%2218%22 fill=%22%23a8a29e%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3EDhan Sukh House%3C/text%3E%3C/svg%3E';
  target.onerror = null; // Prevent infinite loop
};

export const AMENITIES_LIST: Amenity[] = [
  { icon: <Sun size={24} />, label: "10kVA Solar Power" },
  { icon: <Droplets size={24} />, label: "Borehole Water" },
  { icon: <Wifi size={24} />, label: "Fiberlink Wi-Fi" },
  { icon: <ShieldCheck size={24} />, label: "Security Screen Doors" },
  { icon: <Home size={24} />, label: "Linen Service" },
  { icon: <Wind size={24} />, label: "Air Conditioning" },
  { icon: <Utensils size={24} />, label: "Veg-Only Kitchen" },
  { icon: <Tv size={24} />, label: "Smart TV & Desk" },
];

export const MOCK_AVAILABILITY: BookingMap = {
  "main-house": [],
  "cottage-1": [],
  "cottage-2": [],
  "cottage-3": []
};
