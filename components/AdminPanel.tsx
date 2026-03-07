
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Lock, LayoutDashboard, Calendar as CalendarIcon, 
  Image as ImageIcon, Save, LogOut, Plus, Trash2,
  ChevronLeft, ChevronRight, Check, Loader2, UploadCloud,
  Sparkles, Database, ShieldAlert, ExternalLink, RefreshCw,
  Copy, CheckCircle2, Settings, Key, Globe, MessageCircle,
  FileImage, MousePointer2, X, Star, LayoutGrid, Camera,
  Wifi, WifiOff, CloudDownload, Share2, Smartphone
} from 'lucide-react';
import { AppState, MainHouseData, Cottage } from '../types';
import { supabase, uploadFile } from '../supabase';
// Fix: Import Calendar component
import Calendar from './Calendar';

interface AdminPanelProps {
  state: AppState;
  isSyncing: boolean;
  onRefreshCloud: () => void;
  onUpdateBookings: (unitId: string, dates: string[]) => void;
  onUpdateMainHouse: (data: MainHouseData) => void;
  onUpdateCottage: (id: string, data: Cottage) => void;
  onUpdateHeroImages: (urls: string[]) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  state, isSyncing, onRefreshCloud, onUpdateBookings, 
  onUpdateMainHouse, onUpdateCottage, onUpdateHeroImages 
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkey, setPasskey] = useState('');
  const [activeTab, setActiveTab] = useState<'bookings' | 'content' | 'hero' | 'cloud'>('bookings');
  const [activeUnitId, setActiveUnitId] = useState<string>(state.mainHouse.id);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkey === '2024') setIsAuthenticated(true);
    else alert('Incorrect passkey');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-dark flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md text-center">
          <div className="w-16 h-16 bg-brand/10 text-brand rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-serif font-bold text-gray-dark mb-2">Admin Access</h1>
          <p className="text-gray-medium mb-8">Please enter the security passkey to manage Dhan Sukh House.</p>
          <form onSubmit={handleLogin} className="space-y-4 text-gray-dark">
            <input 
              type="password" 
              placeholder="Enter Passkey"
              className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-brand outline-none transition-all text-center text-xl tracking-widest text-gray-dark bg-white"
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              autoFocus
            />
            <button className="w-full bg-brand text-white font-bold py-4 rounded-xl hover:bg-brand-hover transition-colors shadow-lg active:scale-95">
              Unlock Dashboard
            </button>
            <button 
              type="button" 
              onClick={() => window.location.hash = ''} 
              className="text-gray-400 hover:text-gray-600 text-sm font-medium pt-2"
            >
              Return to Website
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-gray-dark text-white flex flex-col p-6 space-y-8">
        <div>
          <h2 className="text-xl font-serif font-bold tracking-tight mb-1 text-white">Admin Panel</h2>
          <div className="flex items-center gap-2">
            {isSyncing ? (
              <span className="flex items-center gap-1.5 text-[10px] text-brand font-bold uppercase animate-pulse">
                <RefreshCw size={10} className="animate-spin" /> Syncing...
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-[10px] text-green-400 font-bold uppercase">
                {/* Fix: Check size syntax */}
                <Check size={10} /> Cloud Active
              </span>
            )}
          </div>
        </div>
        
        <nav className="flex-grow space-y-2">
          <button onClick={() => setActiveTab('bookings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'bookings' ? 'bg-brand text-white' : 'text-gray-400 hover:bg-white/5'}`}>
            <CalendarIcon size={20} /> <span className="font-medium">Bookings</span>
          </button>
          <button onClick={() => setActiveTab('hero')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'hero' ? 'bg-brand text-white' : 'text-gray-400 hover:bg-white/5'}`}>
            <ImageIcon size={20} /> <span className="font-medium">Hero Slider</span>
          </button>
          <button onClick={() => setActiveTab('content')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'content' ? 'bg-brand text-white' : 'text-gray-400 hover:bg-white/5'}`}>
            <LayoutDashboard size={20} /> <span className="font-medium">Villa & Cottages</span>
          </button>
          <button onClick={() => setActiveTab('cloud')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'cloud' ? 'bg-brand text-white' : 'text-gray-400 hover:bg-white/5'}`}>
            <Settings size={20} /> <span className="font-medium">Cloud Settings</span>
          </button>
        </nav>

        <div className="pt-4 border-t border-white/10 space-y-4">
          <button 
            onClick={onRefreshCloud}
            disabled={isSyncing}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-all text-sm disabled:opacity-50"
          >
            <CloudDownload size={18} />
            <span>Pull Cloud Data</span>
          </button>
          <button 
            onClick={() => window.location.hash = ''}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Exit Admin</span>
          </button>
        </div>
      </div>

      <div className="flex-grow p-6 md:p-12 overflow-y-auto max-h-screen scroll-smooth">
        {activeTab === 'bookings' ? (
          <BookingManager state={state} onUpdateBookings={onUpdateBookings} activeUnit={activeUnitId} setActiveUnit={setActiveUnitId} />
        ) : activeTab === 'content' ? (
          <ContentManager state={state} onUpdateMainHouse={onUpdateMainHouse} onUpdateCottage={onUpdateCottage} />
        ) : activeTab === 'hero' ? (
          <HeroManager state={state} onUpdateHeroImages={onUpdateHeroImages} />
        ) : (
          <CloudManager />
        )}
      </div>
    </div>
  );
};

// Fix: Implementation of MediaLibrary for managing image assets
const MediaLibrary: React.FC<{
  label: string;
  images: string[];
  onUpdate: (urls: string[]) => void;
  single?: boolean;
}> = ({ label, images, onUpdate, single = false }) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddUrl = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      if (single) onUpdate([url]);
      else onUpdate([...images, url]);
    }
  };

  const handleRemove = (idx: number) => {
    if (single) onUpdate(['']);
    else onUpdate(images.filter((_, i) => i !== idx));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // Use UploadThing for file uploads
      const result = await uploadFile(file);
      
      if (result.error) {
        throw new Error(result.error);
      } else if (result.url) {
        if (single) onUpdate([result.url]);
        else onUpdate([...images, result.url]);
      }
    } catch (err: any) {
      alert(`Error uploading: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{label}</label>
        <div className="flex gap-2">
           <button 
             onClick={() => fileInputRef.current?.click()} 
             disabled={isUploading}
             className="text-xs font-bold text-brand flex items-center gap-1.5 px-3 py-1.5 bg-brand/5 rounded-lg hover:bg-brand/10 transition-colors disabled:opacity-50"
           >
             {isUploading ? <Loader2 size={14} className="animate-spin" /> : <UploadCloud size={14} />}
             Upload File
           </button>
           <button onClick={handleAddUrl} className="text-xs font-bold text-gray-500 flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
             <Plus size={14} /> Add URL
           </button>
           <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {images.filter(img => img).map((img, idx) => (
          <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-gray-100 group">
            <img src={img} alt="" className="w-full h-full object-cover" />
            <button 
              onClick={() => handleRemove(idx)}
              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={12} />
            </button>
          </div>
        ))}
        {images.filter(img => img).length === 0 && (
           <div className="col-span-full border-2 border-dashed border-gray-100 rounded-2xl py-8 flex flex-col items-center justify-center text-gray-300">
              <ImageIcon size={32} className="mb-2 opacity-20" />
              <span className="text-sm font-medium">No images added</span>
           </div>
        )}
      </div>
      {!supabase && (
         <p className="text-[10px] text-amber-600 font-medium italic">* Upload disabled: No Supabase connection.</p>
      )}
    </div>
  );
};

// Fix: Implementation of BookingManager to manage availability calendars
const BookingManager: React.FC<{
  state: AppState;
  onUpdateBookings: (unitId: string, dates: string[]) => void;
  activeUnit: string;
  setActiveUnit: (id: string) => void;
}> = ({ state, onUpdateBookings, activeUnit, setActiveUnit }) => {
  const units = [
    { id: state.mainHouse.id, name: state.mainHouse.title },
    ...state.cottages.map(c => ({ id: c.id, name: c.title }))
  ];

  const currentBookings = state.bookings[activeUnit] || [];

  const handleToggleDate = (date: string) => {
    if (currentBookings.includes(date)) {
      onUpdateBookings(activeUnit, currentBookings.filter(d => d !== date));
    } else {
      onUpdateBookings(activeUnit, [...currentBookings, date].sort());
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <h2 className="text-3xl font-serif font-bold text-gray-dark">Manage Availability</h2>
        <div className="flex bg-gray-200 p-1.5 rounded-2xl overflow-x-auto max-w-full">
          {units.map(unit => (
            <button
              key={unit.id}
              onClick={() => setActiveUnit(unit.id)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeUnit === unit.id ? 'bg-white text-brand shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {unit.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="bg-white p-8 rounded-[2rem] shadow-airbnb border border-gray-100 overflow-x-auto">
           <Calendar bookedDates={currentBookings} onDateSelect={handleToggleDate} />
           <p className="mt-6 text-center text-xs text-gray-400">Click a date to toggle its booking status (Gray = Booked)</p>
        </div>

        <div className="bg-white p-8 rounded-[2rem] shadow-airbnb border border-gray-100">
           <h3 className="font-serif text-xl font-bold mb-6 text-gray-dark">Booked Dates</h3>
           {currentBookings.length === 0 ? (
             <div className="text-center py-12 text-gray-400 italic">No dates booked for this unit.</div>
           ) : (
             <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
               {currentBookings.map(date => (
                 <div key={date} className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                   <span className="text-xs font-mono font-medium text-gray-600">{date}</span>
                   <button onClick={() => handleToggleDate(date)} className="text-red-400 hover:text-red-600 transition-colors"><Trash2 size={14} /></button>
                 </div>
               ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

// Fix: Implementation of ContentManager for editing villa and cottage details
const ContentManager: React.FC<{
  state: AppState;
  onUpdateMainHouse: (data: MainHouseData) => void;
  onUpdateCottage: (id: string, data: Cottage) => void;
}> = ({ state, onUpdateMainHouse, onUpdateCottage }) => {
  const [editingId, setEditingId] = useState<string>(state.mainHouse.id);
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    if (editingId === state.mainHouse.id) {
      setFormData({ ...state.mainHouse });
    } else {
      const cottage = state.cottages.find(c => c.id === editingId);
      if (cottage) setFormData({ ...cottage });
    }
  }, [editingId, state.mainHouse, state.cottages]);

  const handleSave = () => {
    if (editingId === state.mainHouse.id) {
      onUpdateMainHouse(formData);
    } else {
      onUpdateCottage(editingId, formData);
    }
    alert('Changes saved successfully');
  };

  if (!formData) return null;

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl text-gray-dark">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <h2 className="text-3xl font-serif font-bold">Villa & Cottages</h2>
        <select 
          value={editingId} 
          onChange={(e) => setEditingId(e.target.value)}
          className="bg-white border border-gray-200 px-4 py-2 rounded-xl outline-none focus:border-brand font-medium text-gray-dark"
        >
          <option value={state.mainHouse.id}>{state.mainHouse.title}</option>
          {state.cottages.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
        </select>
      </div>

      <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-airbnb border border-gray-100 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Title</label>
              <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand outline-none bg-gray-50 focus:bg-white transition-all" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Price ($ per night)</label>
              <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand outline-none bg-gray-50 focus:bg-white transition-all" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Description</label>
            <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand outline-none resize-none bg-gray-50 focus:bg-white transition-all" />
          </div>

          <div className="space-y-4">
             <label className="text-xs font-bold text-gray-500 uppercase tracking-wide flex items-center justify-between">
               <span>Features</span>
               <button onClick={() => setFormData({...formData, features: [...formData.features, 'New feature']})} className="text-brand flex items-center gap-1 hover:underline"><Plus size={14}/> Add</button>
             </label>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {formData.features.map((f: string, idx: number) => (
                  <div key={idx} className="flex gap-2">
                    <input type="text" value={f} onChange={e => {
                      const newFeatures = [...formData.features];
                      newFeatures[idx] = e.target.value;
                      setFormData({...formData, features: newFeatures});
                    }} className="flex-grow px-3 py-2 rounded-lg border border-gray-200 focus:border-brand outline-none text-sm bg-gray-50 focus:bg-white transition-all" />
                    <button onClick={() => setFormData({...formData, features: formData.features.filter((_: any, i: number) => i !== idx)})} className="text-red-400 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
                  </div>
                ))}
             </div>
          </div>

          <MediaLibrary 
            label="Main Display Image"
            images={[formData.image]}
            onUpdate={urls => setFormData({...formData, image: urls[0]})}
            single
          />

          <MediaLibrary 
            label="Gallery Images"
            images={formData.galleryImages}
            onUpdate={urls => setFormData({...formData, galleryImages: urls})}
          />

          <button onClick={handleSave} className="w-full bg-brand text-white font-bold py-4 rounded-xl hover:bg-brand-hover shadow-lg transition-all flex items-center justify-center gap-2">
            <Save size={20} /> Save Changes
          </button>
      </div>
    </div>
  );
};

// Fix: Implementation of HeroManager to update top-level landing page images
const HeroManager: React.FC<{
  state: AppState;
  onUpdateHeroImages: (urls: string[]) => void;
}> = ({ state, onUpdateHeroImages }) => {
  const [localImages, setLocalImages] = useState<string[]>(state.heroImages);

  const handleSave = () => {
    onUpdateHeroImages(localImages);
    alert('Hero images saved successfully');
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl text-gray-dark">
      <h2 className="text-3xl font-serif font-bold">Hero Slider Images</h2>
      <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-airbnb border border-gray-100 space-y-6">
        <MediaLibrary 
          label="Hero Slider Collection"
          images={localImages}
          onUpdate={setLocalImages}
        />
        <button onClick={handleSave} className="w-full bg-brand text-white font-bold py-4 rounded-xl hover:bg-brand-hover shadow-lg transition-all flex items-center justify-center gap-2">
          <Save size={20} /> Save Changes
        </button>
        <div className="mt-4 p-6 bg-gray-bg rounded-2xl border border-gray-100 flex items-start gap-4">
           <div className="bg-white p-3 rounded-xl shadow-sm text-brand"><Sparkles size={20} /></div>
           <div>
             <h4 className="font-bold mb-1">Slider Tip</h4>
             <p className="text-gray-medium text-sm leading-relaxed font-light">
               High-resolution landscape images (1920x1080) work best for the hero slider. They will automatically transition every 6 seconds.
             </p>
           </div>
        </div>
      </div>
    </div>
  );
};

const CloudManager: React.FC = () => {
  const [url, setUrl] = useState(localStorage.getItem('supabase_url') || '');
  const [key, setKey] = useState(localStorage.getItem('supabase_key') || '');
  const [isSaved, setIsSaved] = useState(false);
  const isConnected = !!supabase;

  const handleSave = () => {
    localStorage.setItem('supabase_url', url.trim());
    localStorage.setItem('supabase_key', key.trim());
    setIsSaved(true);
    setTimeout(() => { window.location.hash = '#admin'; window.location.reload(); }, 800);
  };

  const generateSyncLink = () => {
    if (!url || !key) {
        alert("Please save your credentials first.");
        return;
    }
    const syncUrl = new URL(window.location.origin + window.location.pathname);
    syncUrl.searchParams.set('s_url', url.trim());
    syncUrl.searchParams.set('s_key', key.trim());
    syncUrl.hash = '#admin';
    
    navigator.clipboard.writeText(syncUrl.toString());
    alert("🚀 Mobile Sync Link Copied!\n\nSend this link to your phone (via WhatsApp/Email). Once you open it on your mobile, your images will load perfectly!");
  };

  const sqlSetup = `CREATE TABLE IF NOT EXISTS settings (name TEXT PRIMARY KEY, data JSONB NOT NULL, updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()); ALTER TABLE settings ENABLE ROW LEVEL SECURITY; CREATE POLICY "Public Read/Write Settings" ON settings FOR ALL USING (true); CREATE POLICY "Public Read Access" ON storage.objects FOR SELECT USING ( bucket_id = 'property-images' ); CREATE POLICY "Public Insert Access" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'property-images' ); CREATE POLICY "Public Delete Access" ON storage.objects FOR DELETE USING ( bucket_id = 'property-images' );`.trim();

  return (
    <div className="space-y-8 animate-fade-in max-w-2xl text-gray-dark">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-serif font-bold">Cloud Sync Settings</h2>
        <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${isConnected ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {isConnected ? <><Wifi size={14}/> Connected</> : <><WifiOff size={14}/> Disconnected</>}
        </div>
      </div>

      {isConnected && (
        <div className="bg-brand/5 border border-brand/20 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 shadow-sm">
            <div className="bg-brand text-white p-5 rounded-2xl shadow-lg animate-bounce-slow">
                <Smartphone size={32} />
            </div>
            <div className="flex-grow">
                <h4 className="font-bold text-xl mb-1">Fix Images on Mobile</h4>
                <p className="text-gray-medium text-sm leading-relaxed">
                    Images not showing on your phone? Click the button below, send the link to your phone, and open it. It will link your mobile device to your Supabase account instantly.
                </p>
            </div>
            <button 
                onClick={generateSyncLink}
                className="bg-gray-dark text-white px-8 py-4 rounded-xl font-bold hover:bg-black transition-all flex items-center gap-2 shadow-md hover:shadow-xl whitespace-nowrap"
            >
                <Share2 size={20} />
                Get Sync Link
            </button>
        </div>
      )}

      <div className="bg-white rounded-3xl p-8 shadow-airbnb border border-gray-100 space-y-6">
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide flex items-center gap-2"><Globe size={14} /> Supabase/Neon Project URL</label>
            <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://your-project.supabase.co" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand outline-none bg-gray-50 focus:bg-white transition-all text-gray-dark" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide flex items-center gap-2"><Key size={14} /> Project API Anon Key</label>
            <input type="password" value={key} onChange={(e) => setKey(e.target.value)} placeholder="Paste your anon public key here" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand outline-none bg-gray-50 focus:bg-white transition-all text-gray-dark" />
          </div>
          <button onClick={handleSave} className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all active:scale-95 ${isSaved ? 'bg-green-500' : 'bg-gray-dark hover:bg-black'}`}>
            {isSaved ? 'Keys Saved! Restarting...' : 'Save Configuration Permanently'}
          </button>
        </div>
        <div className="pt-6 border-t border-gray-100">
           <div className="flex justify-between items-center mb-4">
             <h4 className="text-sm font-bold">Required SQL Setup</h4>
             <button onClick={() => { navigator.clipboard.writeText(sqlSetup); alert("SQL Copied!"); }} className="text-[10px] text-brand font-bold uppercase flex items-center gap-1 hover:underline"><Copy size={12}/> Copy SQL</button>
           </div>
           <div className="bg-gray-900 rounded-xl p-4 font-mono text-[10px] text-gray-300 relative max-h-[150px] overflow-y-auto border border-gray-800">
               <pre className="whitespace-pre-wrap">{sqlSetup}</pre>
           </div>
           <p className="mt-4 text-[11px] text-gray-400 leading-relaxed italic">Ensure a public bucket named <strong className="text-gray-600 font-bold">"property-images"</strong> exists.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
