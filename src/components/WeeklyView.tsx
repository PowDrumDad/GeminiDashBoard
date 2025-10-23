import React from 'react';
import { Appointment } from '../types';

const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
};

const getWeekDays = (date: Date): Date[] => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay()); // Sunday
    const week = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        week.push(day);
    }
    return week;
};

interface WeeklyViewProps {
  appointments: Appointment[];
}

export const WeeklyView: React.FC<WeeklyViewProps> = ({ appointments }) => {
    const today = new Date();
    const weekDays = getWeekDays(new Date());
    const dayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short' });

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">This Week's Schedule</h2>
            <div className="grid grid-cols-1 sm:grid-cols-7 gap-2">
                {weekDays.map((day, index) => (
                    <div key={index} className="flex flex-col border rounded-lg p-2 bg-slate-50 min-h-[12rem]">
                        <div className="text-center font-semibold text-sm mb-2">
                            <span className={isSameDay(day, today) ? 'text-indigo-600 font-bold' : 'text-slate-500'}>
                                {dayFormatter.format(day)}
                            </span>
                            <div className={`mt-1 text-lg ${isSameDay(day, today) ? 'bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto font-bold' : 'w-8 h-8 flex items-center justify-center mx-auto'}`}>
                                {day.getDate()}
                            </div>
                        </div>
                        <div className="space-y-1 mt-2 overflow-y-auto">
                            {appointments
                                .filter(appt => isSameDay(appt.startTime, day))
                                .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
                                .map(appt => (
                                    <div key={appt.id} className="bg-indigo-100 border-l-2 border-indigo-400 text-indigo-800 text-xs p-1 rounded-r">
                                        <p className="font-semibold truncate">{appt.title}</p>
                                        <p>{appt.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
