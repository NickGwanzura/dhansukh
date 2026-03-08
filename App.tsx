
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import MainHouse from './components/MainHouse';
import Cottages from './components/Cottages';
import Amenities from './components/Amenities';
import Footer from './components/Footer';
import AvailabilityModal from './components/AvailabilityModal';
import GalleryModal from './components/GalleryModal';
import PrivacyPolicy from './components/PrivacyPolicy';
import Terms from './components/Terms';
import Sitemap from './components/Sitemap';
import AdminPanel from './components/AdminPanel';
import { MAIN_HOUSE, COTTAGES, MOCK_AVAILABILITY, HERO_DEFAULT_IMAGES } from './constants';
import { AppState, MainHouseData, Cottage } from './types';
import { supabase, initializeDatabase } from './supabase';
import { loadState, saveState, getStorageUsage } from './lib/storage';

type PageView = 'home' | 'privacy' | 'terms' | 'sitemap' | 'admin';

function App() {
  const [appState, setAppState] = useState<AppState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const isInitialLoadDone = useRef(false);

  const migrateState = (data: any): AppState => {
    return {
      mainHouse: data?.mainHouse || MAIN_HOUSE,
      cottages: (data?.cottages && data.cottages.length > 0) ? data.cottages : COTTAGES,
      bookings: data?.bookings || MOCK_AVAILABILITY,
      heroImages: (data?.heroImages && data.heroImages.length > 0) ? data.heroImages : HERO_DEFAULT_IMAGES
    };
  };

  const fetchCloudState = useCallback(async (manual = false) => {
    if (manual) setIsSyncing(true);
    
    // Only load once on initial mount
    if (isInitialLoadDone.current && !manual) return;
    
    // Try IndexedDB first (larger storage)
    try {
      const dbState = await loadState();
      if (dbState) {
        console.log('Loaded from IndexedDB:', dbState);
        if (dbState.cottages) {
          dbState.cottages.forEach((c: any) => {
            console.log(`Loaded cottage ${c.id}: image = ${c.image ? c.image.substring(0, 50) + '...' : 'EMPTY'}`);
          });
        }
        setAppState(migrateState(dbState));
      } else {
        // Fallback to localStorage for migration
        const cached = localStorage.getItem('dhan_sukh_state');
        if (cached) {
          const parsed = JSON.parse(cached);
          console.log('Migrating from localStorage:', parsed);
          setAppState(migrateState(parsed));
          // Migrate to IndexedDB
          await saveState(parsed);
          localStorage.removeItem('dhan_sukh_state');
        } else {
          console.log('No cached state, using defaults');
          setAppState(migrateState({}));
        }
      }
    } catch (e) {
      console.error('Failed to load state:', e);
      setAppState(migrateState({}));
    }

    setIsLoading(false);
    setIsSyncing(false);
    isInitialLoadDone.current = true;
  }, []);

  const saveToCloud = async (newState: AppState) => {
    if (!isInitialLoadDone.current) return;
    
    setIsSyncing(true);
    try {
      await saveState(newState);
      
      // Log storage usage
      const usage = await getStorageUsage();
      const usedMB = (usage.used / (1024 * 1024)).toFixed(1);
      const totalMB = usage.total ? (usage.total / (1024 * 1024)).toFixed(0) : 'unknown';
      console.log(`Saved to IndexedDB. Storage used: ${usedMB}MB / ${totalMB}MB`);
    } catch (e: any) {
      console.error("Save failed:", e);
      alert(`Failed to save: ${e.message}\n\nTry using smaller images or removing some images.`);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    // Initialize database and fetch initial state
    const init = async () => {
      await initializeDatabase();
      fetchCloudState();
    };
    init();
  }, [fetchCloudState]);

  const [currentView, setCurrentView] = useState<PageView>('home');
  const [availabilityModalOpen, setAvailabilityModalOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<{id: string, name: string} | null>(null);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<{images: string[], title: string} | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#privacy') setCurrentView('privacy');
      else if (hash === '#terms') setCurrentView('terms');
      else if (hash === '#sitemap') setCurrentView('sitemap');
      else if (hash.startsWith('#admin')) setCurrentView('admin');
      else setCurrentView('home');
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const updateBookings = (unitId: string, dates: string[]) => {
    if (!appState) return;
    const newState = { ...appState, bookings: { ...appState.bookings, [unitId]: dates } };
    setAppState(newState);
    saveToCloud(newState);
  };

  const updateMainHouse = (data: MainHouseData) => {
    if (!appState) return;
    const newState = { ...appState, mainHouse: data };
    setAppState(newState);
    saveToCloud(newState);
  };

  const updateCottage = (cottageId: string, data: Cottage) => {
    if (!appState) return;
    const newState = { ...appState, cottages: appState.cottages.map(c => c.id === cottageId ? data : c) };
    setAppState(newState);
    saveToCloud(newState);
  };

  const updateHeroImages = (urls: string[]) => {
    if (!appState) return;
    const newState = { ...appState, heroImages: urls };
    setAppState(newState);
    saveToCloud(newState);
  };

  if (isLoading || !appState) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-10 h-10 border-2 border-brand border-t-transparent rounded-full animate-spin"></div>
          <div className="text-center">
            <h2 className="font-serif text-lg text-gray-dark mb-1">Dhan Sukh House</h2>
            <p className="text-gray-medium text-[10px] tracking-widest uppercase animate-pulse">Belvedere • Harare</p>
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (currentView) {
      case 'admin':
        return (
          <AdminPanel 
            state={appState} 
            isSyncing={isSyncing}
            onRefreshCloud={() => fetchCloudState(true)}
            onUpdateBookings={updateBookings}
            onUpdateMainHouse={updateMainHouse}
            onUpdateCottage={updateCottage}
            onUpdateHeroImages={updateHeroImages}
          />
        );
      case 'privacy': return <PrivacyPolicy />;
      case 'terms': return <Terms />;
      case 'sitemap': return <Sitemap />;
      default:
        console.log('Rendering with heroImages:', appState.heroImages);
        return (
          <>
            <Hero images={appState.heroImages} />
            <About />
            <MainHouse 
                data={appState.mainHouse}
                onCheckAvailability={(id, name) => { setSelectedUnit({ id, name }); setAvailabilityModalOpen(true); }} 
                onOpenGallery={(images, title) => { setSelectedGallery({ images, title }); setGalleryModalOpen(true); }}
            />
            <Cottages 
                data={appState.cottages}
                onCheckAvailability={(id, name) => { setSelectedUnit({ id, name }); setAvailabilityModalOpen(true); }} 
                onOpenGallery={(images, title) => { setSelectedGallery({ images, title }); setGalleryModalOpen(true); }}
            />
            <Amenities />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      {currentView !== 'admin' && <Navbar onHomeNav={() => window.location.hash = ''} />}
      <main className="flex-grow">
        {renderContent()}
      </main>
      {currentView !== 'admin' && <Footer onLegalNav={(v) => window.location.hash = v} />}
      <AvailabilityModal isOpen={availabilityModalOpen} onClose={() => setAvailabilityModalOpen(false)} unitName={selectedUnit?.name || ''} bookedDates={selectedUnit ? (appState.bookings[selectedUnit.id] || []) : []} />
      <GalleryModal isOpen={galleryModalOpen} onClose={() => setGalleryModalOpen(false)} images={selectedGallery?.images || []} title={selectedGallery?.title || ''} />
    </div>
  );
}

export default App;
