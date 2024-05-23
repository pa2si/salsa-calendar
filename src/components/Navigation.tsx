import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { format, getISOWeek } from 'date-fns';

interface NavigationProps {
  onNavigate: (direction: number) => void;
  currentMonth: Date;
  resetToToday: () => void;
  currentView: 'day' | 'week' | 'month';
  selectedDay: Date | null;
}

const Navigation: React.FC<NavigationProps> = ({
  onNavigate,
  currentMonth,
  resetToToday,
  currentView,
  selectedDay,
}) => {
  let label = format(currentMonth, 'MMMM yyyy'); // Default to month/year format

  if (currentView === 'day' && selectedDay) {
    label = format(selectedDay, 'EEEE, MMMM dd, yyyy'); // Full date for 'day' view
  } else if (currentView === 'week') {
    const weekNumber = getISOWeek(currentMonth);
    label = `Week ${weekNumber}, ${format(currentMonth, 'yyyy')}`; // Show week number for 'week' view
  }
  const containerClass = `flex justify-between ${
    currentView === 'day' ? 'mb-4' : 'mb-4 md:mb-8'
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
        className="text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg px-4 py-2 mx-1 transition duration-150 ease-in-out"
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

export default Navigation;
