// ViewButtons.tsx
import React from 'react';

interface ViewButtonsProps {
  onViewChange: (view: 'day' | 'week' | 'month') => void;
}

const ViewButtons: React.FC<ViewButtonsProps> = ({ onViewChange }) => {
  return (
    <div className="mb-8">
      <button
        onClick={() => onViewChange('day')}
        className="mb-1 text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg px-4 py-2 mx-1 transition duration-150 ease-in-out"
      >
        Day
      </button>
      <button
        onClick={() => onViewChange('week')}
        className="m-1 text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg px-4 py-2 mx-1 transition duration-150 ease-in-out"
      >
        Week
      </button>
      <button
        onClick={() => onViewChange('month')}
        className="mt-1 text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg px-4 py-2 mx-1 transition duration-150 ease-in-out"
      >
        Month
      </button>
    </div>
  );
};

export default ViewButtons;
