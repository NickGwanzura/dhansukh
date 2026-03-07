
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

export const HERO_DEFAULT_IMAGES: string[] = [];

export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.currentTarget;
  target.style.display = 'none';
  if (target.parentElement) {
    target.parentElement.classList.add('bg-stone-100', 'flex', 'items-center', 'justify-center');
    const placeholder = document.createElement('div');
    placeholder.className = 'text-stone-300 font-serif italic text-sm text-center px-4';
    placeholder.innerText = 'Dhan Sukh House';
    target.parentElement.appendChild(placeholder);
  }
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
