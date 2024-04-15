import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { format, getISOWeek } from 'date-fns';

interface NavigationProps {
  onNavigate: (direction: number) => void;
  currentMonth: Date;
  resetToToday: () => void;
  currentView: 'day' | 'week' | 'month';
}

const Navigation: React.FC<NavigationProps> = ({
  onNavigate,
  currentMonth,
  resetToToday,
  currentView,
}) => {
  let label = format(currentMonth, 'MMMM yyyy'); // Default to month/year format

  if (currentView === 'day') {
    label = format(currentMonth, 'EEEE, MMMM dd, yyyy'); // Full date for 'day' view
  } else if (currentView === 'week') {
    const weekNumber = getISOWeek(currentMonth);
    label = `Week ${weekNumber}, ${format(currentMonth, 'yyyy')}`; // Show week number for 'week' view
  }

  return (
    <div className="flex justify-between mb-4 md:mb-8">
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
