import React, { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { format, getISOWeek } from 'date-fns';

interface CalendarNavigationProps {
  onNavigate: (direction: number) => void;
  currentMonth: Date;
  resetToToday: () => void;
  currentView: 'day' | 'week' | 'month';
  selectedDay: Date | null;
}

const CalendarNavigation: React.FC<CalendarNavigationProps> = ({
  onNavigate,
  currentMonth,
  resetToToday,
  currentView,
  selectedDay,
}) => {
  const getShortDayName = (day: string) => {
    switch (day) {
      case 'Monday':
        return 'Mon';
      case 'Tuesday':
        return 'Tue';
      case 'Wednesday':
        return 'Wed';
      case 'Thursday':
        return 'Thu';
      case 'Friday':
        return 'Fri';
      case 'Saturday':
        return 'Sat';
      case 'Sunday':
        return 'Sun';
      default:
        return day;
    }
  };

  let label = format(currentMonth, 'MMMM yyyy'); // Default to month/year format

  if (currentView === 'day' && selectedDay) {
    const dayName = format(selectedDay, 'EEEE');
    const shortDayName = getShortDayName(dayName);
    label = `${shortDayName}, ${format(selectedDay, 'MMM dd, yyyy')}`;
  } else if (currentView === 'week') {
    const weekNumber = getISOWeek(currentMonth);
    label = `Week ${weekNumber}, ${format(currentMonth, 'yyyy')}`; // Show week number for 'week' view
  }

  const containerClass = `flex justify-between mt-4 sm:mt-0 ${
    currentView === 'day' ? 'mb-4 sm:mb-8' : 'mb-4 md:mb-8'
  } `;

  return (
    <div className={containerClass}>
      <button
        onClick={() => onNavigate(-1)}
        className="text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg px-4 py-2 mx-1 transition duration-150 ease-in-out"
      >
        <IoIosArrowBack />
      </button>
      <button
        onClick={resetToToday}
        className={`text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg px-4 py-2 mx-1 transition duration-150 ease-in-out ${
          currentView === 'day'
            ? 'w-[180px]'
            : currentView === 'month'
            ? 'w-[160px]'
            : ''
        }`}
      >
        {label}
      </button>
      <button
        onClick={() => onNavigate(1)}
        className="text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg px-4 py-2 mx-1 transition duration-150 ease-in-out"
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default CalendarNavigation;
