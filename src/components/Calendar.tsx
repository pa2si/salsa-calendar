'use client';

import { useState } from 'react';
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
import { useRouter } from 'next/navigation';
import CalendarNavigation from './CalendarNavigation';
import ViewButtons from './ViewButtons';
import DayCard from './DayCard';
import { useQuery } from '@tanstack/react-query';
import { getAllPublicEventsAction } from '@/actions/dbActions';
import { EventType } from '@/types/types';

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('month');
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const router = useRouter();
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

  const { data } = useQuery({
    queryKey: ['publicEvents'],
    queryFn: () => getAllPublicEventsAction({}),
  });

  const events: EventType[] = data?.events || [];

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

  const handleDayClick = (day: Date) => {
    const formattedDate = format(day, 'yyyy-MM-dd');
    if (view === 'day') {
      router.push(`/events/${formattedDate}`);
    } else {
      setView('day');
      setCurrentMonth(day); // Update currentMonth to the selected day
      setSelectedDay(day);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div
        className={`flex ${
          view === 'day' ? 'flex-col' : 'flex-col lg:flex-row'
        } justify-center items-center`}
      >
        <CalendarNavigation
          onNavigate={navigate}
          currentMonth={currentMonth}
          resetToToday={() => setCurrentMonth(new Date())}
          currentView={view}
          selectedDay={selectedDay} // Pass selectedDay to Navigation
        />
        <ViewButtons onViewChange={setView} />
      </div>
      <div className="flex flex-wrap justify-center items-start gap-4">
        {days.map((day) => (
          <DayCard
            key={format(day, 'yyyy-MM-dd')}
            day={day}
            today={today}
            view={view}
            events={events}
            onDayClick={handleDayClick}
          />
        ))}
      </div>
    </div>
  );
}

export default Calendar;
