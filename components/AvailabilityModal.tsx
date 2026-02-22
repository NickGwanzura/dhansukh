import React, { useState, useEffect } from 'react';
import { X, User, Users, Calendar as CalendarIcon, MessageCircle } from 'lucide-react';
import Calendar from './Calendar';
import { BookedDates } from '../types';
import { WHATSAPP_NUMBER } from '../constants';

interface AvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  unitName: string;
  bookedDates: BookedDates;
}

const AvailabilityModal: React.FC<AvailabilityModalProps> = ({ isOpen, onClose, unitName, bookedDates }) => {
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);
  const [guestName, setGuestName] = useState('');
  const [guests, setGuests] = useState(2);
  const [error, setError] = useState<string | null>(null);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setCheckIn(null);
      setCheckOut(null);
      setGuestName('');
      setGuests(2);
      setError(null);
    }
  }, [isOpen, unitName]);

  const handleDateSelect = (date: string) => {
    setError(null);
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
    } else if (checkIn && !checkOut) {
      if (date < checkIn) {
        setCheckIn(date);
      } else if (date === checkIn) {
        // Deselect if clicking same date? or just do nothing
        setCheckIn(null);
      } else {
        // Validate range overlap with booked dates
        const start = new Date(checkIn);
        const end = new Date(date);
        let hasOverlap = false;
        
        // Simple overlap check
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
           const dStr = d.toISOString().split('T')[0];
           if (bookedDates.includes(dStr)) {
               hasOverlap = true;
               break;
           }
        }

        if (hasOverlap) {
            setError("Selected range includes booked dates. Please choose another range.");
            setCheckOut(null);
        } else {
            setCheckOut(date);
        }
      }
    }
  };

  const handleBooking = () => {
    if (!checkIn || !checkOut) {
      setError("Please select check-in and check-out dates.");
      return;
    }
    if (!guestName.trim()) {
      setError("Please enter your name.");
      return;
    }

    const message = `Hi, I would like to request a booking at Dhan Sukh House.
    
*Unit:* ${unitName}
*Name:* ${guestName}
*Guests:* ${guests}
*Check-in:* ${checkIn}
*Check-out:* ${checkOut}

Is this available?`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 z-50 bg-white/80 backdrop-blur-sm"
        >
          <X size={24} />
        </button>

        {/* Left Side: Calendar */}
        <div className="w-full md:w-1/2 p-6 bg-gray-bg border-b md:border-b-0 md:border-r border-gray-100 overflow-y-auto">
          <div className="mb-4">
              <h3 className="font-serif text-xl font-bold text-gray-dark">Select Dates</h3>
              <p className="text-sm text-gray-500">{unitName}</p>
          </div>
          <Calendar 
            bookedDates={bookedDates} 
            startDate={checkIn}
            endDate={checkOut}
            onDateSelect={handleDateSelect}
          />
           <div className="mt-6 text-center">
             <p className="text-gray-400 text-xs">
                 * Tap start date, then end date.
             </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-white overflow-y-auto">
            <h4 className="font-serif text-lg font-bold text-gray-dark mb-6">Booking Details</h4>
            
            <div className="space-y-5">
                {/* Dates Display */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Check-in</label>
                        <div className={`p-3 rounded-xl border ${checkIn ? 'border-brand bg-brand/5 text-brand' : 'border-gray-200 bg-gray-50 text-gray-400'} text-sm font-medium flex items-center`}>
                           <CalendarIcon size={16} className="mr-2" />
                           {checkIn || 'Select Date'}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Check-out</label>
                        <div className={`p-3 rounded-xl border ${checkOut ? 'border-brand bg-brand/5 text-brand' : 'border-gray-200 bg-gray-50 text-gray-400'} text-sm font-medium flex items-center`}>
                           <CalendarIcon size={16} className="mr-2" />
                           {checkOut || 'Select Date'}
                        </div>
                    </div>
                </div>

                {/* Guest Name */}
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            placeholder="Enter your name"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all text-gray-700 bg-gray-50 focus:bg-white"
                        />
                    </div>
                </div>

                {/* Guests Count */}
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Guests</label>
                    <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <select 
                            value={guests}
                            onChange={(e) => setGuests(Number(e.target.value))}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all text-gray-700 bg-gray-50 focus:bg-white appearance-none cursor-pointer"
                        >
                            {[1,2,3,4,5,6].map(num => (
                                <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {error && (
                    <div className="p-3 bg-red-50 text-red-500 text-sm rounded-lg border border-red-100">
                        {error}
                    </div>
                )}

                <button 
                    onClick={handleBooking}
                    disabled={!checkIn || !checkOut || !guestName}
                    className={`
                        w-full py-4 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 mt-4
                        transition-all duration-300 transform
                        ${(!checkIn || !checkOut || !guestName) 
                            ? 'bg-gray-300 cursor-not-allowed' 
                            : 'bg-brand hover:bg-brand-hover hover:-translate-y-1 hover:shadow-xl'
                        }
                    `}
                >
                    <MessageCircle size={20} />
                    <span>Request on WhatsApp</span>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityModal;