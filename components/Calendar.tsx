import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BookedDates } from '../types';

interface CalendarProps {
  bookedDates: BookedDates;
  startDate?: string | null;
  endDate?: string | null;
  onDateSelect?: (date: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ bookedDates, startDate, endDate, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Generate calendar grid
  const days = [];
  // Empty slots for days before start of month
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const isBooked = bookedDates.includes(dateStr);
    const isToday = new Date().toISOString().split('T')[0] === dateStr;
    const isPast = new Date(dateStr) < new Date(new Date().setHours(0,0,0,0));
    
    const isSelectedStart = startDate === dateStr;
    const isSelectedEnd = endDate === dateStr;
    const isInRange = startDate && endDate && dateStr > startDate && dateStr < endDate;
    const isSelected = isSelectedStart || isSelectedEnd;

    let dayClass = "h-10 w-10 flex items-center justify-center text-sm font-medium transition-all duration-200 relative ";
    let wrapperClass = "flex justify-center items-center py-1 relative z-10 ";
    
    // Background for range
    if (isInRange) {
        wrapperClass += "bg-brand/10 ";
        // Connect range visually
        if (day === 1 && firstDay === 0) wrapperClass += "rounded-l-full "; 
    }
    if (isSelectedStart && endDate) {
        wrapperClass += "bg-gradient-to-r from-transparent to-brand/10 ";
    }
    if (isSelectedEnd && startDate) {
        wrapperClass += "bg-gradient-to-l from-transparent to-brand/10 ";
    }


    if (isBooked) {
      dayClass += "text-gray-300 bg-gray-50 cursor-not-allowed decoration-slice line-through decoration-gray-300 rounded-full";
    } else if (isPast) {
      dayClass += "text-gray-300 cursor-not-allowed rounded-full";
    } else if (isSelected) {
      dayClass += "bg-brand text-white shadow-lg scale-105 font-bold rounded-full z-20";
    } else if (isInRange) {
      dayClass += "text-brand font-semibold";
      // No rounded-full for in-range to show flow, or maybe smaller circle? 
      // Let's keep it simple: just text color and wrapper background handles the flow.
    } else {
      dayClass += "text-gray-dark hover:bg-gray-100 hover:text-brand cursor-pointer hover:font-bold hover:shadow-sm rounded-full";
    }

    if (isToday && !isSelected && !isInRange) {
        dayClass += " border border-gray-300 font-bold";
    }

    days.push(
      <div key={day} className={wrapperClass}>
        <div 
            className={dayClass} 
            title={isBooked ? "Booked" : "Available"}
            onClick={() => {
                if (!isBooked && !isPast && onDateSelect) {
                    onDateSelect(dateStr);
                }
            }}
        >
          {day}
          {isToday && !isBooked && !isSelected && !isInRange && (
             <div className="absolute -bottom-1 w-1 h-1 bg-brand rounded-full"></div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm w-full max-w-sm mx-auto select-none">
      <div className="flex justify-between items-center mb-6">
        <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
          <ChevronLeft size={20} />
        </button>
        <h3 className="font-serif text-lg font-bold text-gray-dark">
          {monthNames[month]} {year}
        </h3>
        <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {days}
      </div>

      <div className="mt-6 flex justify-center items-center space-x-6 text-xs text-gray-500 font-medium">
        <div className="flex items-center">
            <div className="w-3 h-3 rounded-full border border-gray-300 mr-2"></div>
            Available
        </div>
        <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-brand mr-2"></div>
            Selected
        </div>
        <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-gray-50 border border-gray-100 relative mr-2 overflow-hidden">
                <div className="absolute inset-0 border-t border-gray-300 transform rotate-45 scale-150 origin-center opacity-50"></div>
            </div>
            Booked
        </div>
      </div>
    </div>
  );
};

export default Calendar;