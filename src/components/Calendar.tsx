'use client';
import React, { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  startOfWeek,
  endOfWeek,
  addWeeks,
  addDays,
} from 'date-fns';
import Navigation from './Navigation';
import ViewButtons from './ViewButtons';
import DayCard from './DayCard';

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('month');

  const today = new Date();

  const navigate = (direction: number) => {
    setCurrentMonth((prevMonth) => {
      switch (view) {
        case 'day':
          return addDays(prevMonth, direction);
        case 'week':
          return addWeeks(prevMonth, direction);
        default:
          return addMonths(prevMonth, direction);
      }
    });
  };

  let days = eachDayOfInterval({
    start:
      view === 'day'
        ? currentMonth
        : view === 'week'
        ? startOfWeek(currentMonth, { weekStartsOn: 1 })
        : startOfMonth(currentMonth),
    end:
      view === 'day'
        ? currentMonth
        : view === 'week'
        ? endOfWeek(currentMonth, { weekStartsOn: 1 })
        : endOfMonth(currentMonth),
  });

  return (
    <div className="flex flex-col items-center p-4">
      <Navigation
        onNavigate={navigate}
        currentMonth={currentMonth}
        resetToToday={() => setCurrentMonth(new Date())}
        currentView={view} // Pass the current view to Navigation
      />
      <ViewButtons onViewChange={setView} />
      <div className="flex flex-wrap justify-center items-stretch gap-4">
        {days.map((day) => (
          <DayCard
            key={format(day, 'yyyy-MM-dd')}
            day={day}
            today={today}
            view={view}
          />
        ))}
      </div>
    </div>
  );
}

export default Calendar;
