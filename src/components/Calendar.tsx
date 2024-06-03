'use client';

import { useState, useEffect } from 'react';
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
import { motion, AnimatePresence } from 'framer-motion';
import {
  normalVariants,
  staggerContainerVariants,
  staggerItemVariants,
} from '@/lib/animationVariants';

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('month');
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [direction, setDirection] = useState<number>(0);
  const [viewChanged, setViewChanged] = useState<boolean>(true);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  const router = useRouter();
  const today = new Date();

  const navigate = (direction: number) => {
    setDirection(direction);
    setViewChanged(false);
    setInitialLoad(false);
    setCurrentMonth((prevMonth) => {
      let newDate;
      switch (view) {
        case 'day':
          newDate = addDays(prevMonth, direction);
          setSelectedDay(newDate);
          return newDate;
        case 'week':
          return addWeeks(prevMonth, direction);
        default:
          return addMonths(prevMonth, direction);
      }
    });
  };

  const handleViewChange = (newView: 'day' | 'week' | 'month') => {
    setViewChanged(true);
    setInitialLoad(false);
    setView(newView);
  };

  const { data } = useQuery({
    queryKey: ['publicEvents'],
    queryFn: () => getAllPublicEventsAction({ limit: 1000 }), // Set a high limit to fetch all events
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
      setCurrentMonth(day);
      setSelectedDay(day);
    }
  };

  const resetToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    setSelectedDay(today);
  };

  // Ensure that initialLoad is false after the first render.
  useEffect(() => {
    setInitialLoad(false);
  }, []);

  return (
    <div className="flex flex-col items-center p-4">
      <div
        className={`flex ${
          view === 'day' ? 'flex-col sm:flex-row' : 'flex-col lg:flex-row'
        } justify-center items-center`}
      >
        <CalendarNavigation
          onNavigate={navigate}
          currentMonth={currentMonth}
          resetToToday={resetToToday}
          currentView={view}
          selectedDay={selectedDay}
        />
        <ViewButtons onViewChange={handleViewChange} />
      </div>
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={`${currentMonth.toString()}-${view}`}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={
            initialLoad || viewChanged
              ? staggerContainerVariants
              : normalVariants
          }
          custom={direction}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="flex flex-wrap justify-center items-start gap-4"
        >
          {days.map((day, index) => {
            const dayId = format(day, 'yyyy-MM-dd');
            const eventsForDay = events.filter(
              (event) => format(new Date(event.date), 'yyyy-MM-dd') === dayId
            );

            return (
              <motion.div
                key={dayId}
                variants={initialLoad || viewChanged ? staggerItemVariants : {}}
                className="flex flex-col items-center"
                custom={index}
              >
                <DayCard
                  day={day}
                  today={today}
                  view={view}
                  events={eventsForDay}
                  onDayClick={handleDayClick}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
      {view === 'day' && (
        <div className="flex justify-center mt-4">
          <button
            className="text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg px-4 py-2 mx-1 transition duration-150 ease-in-out"
            onClick={() => {
              if (selectedDay) handleDayClick(selectedDay);
            }}
          >
            Get all info
          </button>
        </div>
      )}
    </div>
  );
}

export default Calendar;
