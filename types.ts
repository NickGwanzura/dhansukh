
import React from 'react';

export interface Amenity {
  icon: React.ReactNode;
  label: string;
}

export interface Cottage {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  features: string[];
  galleryImages: string[];
}

export interface MainHouseData {
  id: string;
  title: string;
  price: number;
  minNights: number;
  features: string[];
  description: string;
  image: string;
  galleryImages: string[];
}

export type BookedDates = string[]; // ISO date strings 'YYYY-MM-DD'
export type BookingMap = Record<string, BookedDates>; // unitId -> dates

export interface AppState {
  mainHouse: MainHouseData;
  cottages: Cottage[];
  bookings: BookingMap;
  heroImages: string[];
}
