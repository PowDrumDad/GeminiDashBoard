import React from 'react';
import { Appointment } from '../types';

const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
};

interface MonthlyViewProps {
  appointments: Appointment[];
}

export const MonthlyView: React.FC<MonthlyViewProps> = ({ appointments }) => {
    const today = new Date();
    const [currentDate, setCurrentDate] = React.useState(new Date());

    const changeMonth = (offset: number) => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() + offset);
            return newDate;
        });
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday

    const calendarDays: (Date | null)[] = [];
    
    for (let i = 0; i < startDayOfWeek; i++) {
        calendarDays.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
        calendarDays.push(new Date(year, month, i));
    }

    const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-slate-800">{monthFormatter.format(currentDate)}</h2>
                <div className="flex items-center gap-2">
                    <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-slate-100 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-slate-100 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-1">
                {weekdays.map(day => (
                    <div key={day} className="text-center font-semibold text-slate-500 text-sm py-2">{day}</div>
                ))}
                {calendarDays.map((day, index) => (
                    <div key={index} className={`border rounded-lg p-2 h-24 sm:h-28 overflow-hidden transition-colors ${day ? 'bg-white hover:bg-slate-50' : 'bg-slate-50/70'}`}>
                        {day && (
                            <>
                                <span className={`text-sm flex items-center justify-center ${isSameDay(day, today) ? 'bg-indigo-600 text-white rounded-full w-6 h-6 font-bold' : 'w-6 h-6'}`}>
                                    {day.getDate()}
                                </span>
                                <div className="mt-1 space-y-1 overflow-y-auto max-h-20">
                                    {appointments
                                        .filter(appt => day && isSameDay(appt.startTime, day))
                                        .sort((a,b) => a.startTime.getTime() - b.startTime.getTime())
                                        .map(appt => (
                                            <div key={appt.id} className="bg-indigo-100 text-indigo-800 text-[10px] p-0.5 rounded truncate" title={appt.title}>
                                                {appt.title}
                                            </div>
                                        ))
                                    }
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};