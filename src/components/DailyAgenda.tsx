
import React from 'react';
import { Appointment } from '../types';

interface DailyAgendaProps {
  appointments: Appointment[];
}

const hours = Array.from({ length: 18 }, (_, i) => i + 6); // 6 AM to 11 PM (23:00)

const formatTime = (hour: number) => {
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const h = hour % 12 || 12;
  return `${h} ${ampm}`;
};

export const DailyAgenda: React.FC<DailyAgendaProps> = ({ appointments }) => {
    
  const getAppointmentStyle = (appt: Appointment) => {
    const startHour = appt.startTime.getHours();
    const startMinute = appt.startTime.getMinutes();
    const endHour = appt.endTime.getHours();
    const endMinute = appt.endTime.getMinutes();

    const startTotalMinutes = (startHour * 60) + startMinute;
    const endTotalMinutes = (endHour * 60) + endMinute;
    
    const durationMinutes = endTotalMinutes - startTotalMinutes;
    const topOffset = ((startTotalMinutes - (6 * 60)) / 60) * 4; // 4rem per hour, starting from 6 AM

    return {
      top: `${topOffset}rem`,
      height: `${(durationMinutes / 60) * 4}rem`,
    };
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Today's Schedule</h2>
      <div className="relative">
        {/* Time Grid */}
        <div className="grid grid-cols-[auto_1fr] gap-x-4">
          {hours.map((hour) => (
            <React.Fragment key={hour}>
              <div className="text-right text-sm text-slate-400 -mt-2">
                {formatTime(hour)}
              </div>
              <div className="border-t border-slate-200 h-16"></div>
            </React.Fragment>
          ))}
        </div>

        {/* Appointments */}
        <div className="absolute top-0 left-[4.5rem] right-0 h-full">
          {appointments.map((appt) => (
            <div
              key={appt.id}
              className="absolute w-[calc(100%-1rem)] left-2 bg-indigo-100 border-l-4 border-indigo-500 rounded-r-lg p-2 overflow-hidden"
              style={getAppointmentStyle(appt)}
            >
              <p className="font-semibold text-indigo-800 text-sm">{appt.title}</p>
              <p className="text-xs text-indigo-600">
                {appt.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {appt.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
