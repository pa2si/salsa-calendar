import React from 'react';
import { BsCloudUpload } from 'react-icons/bs';

interface UploadEventDayCardProps {
  view: 'day' | 'week' | 'month';
}

const UploadEventDayCard: React.FC<UploadEventDayCardProps> = ({ view }) => {
  return (
    <div
      className={`flex flex-col justify-center items-center pt-6 px-4 ${
        view === 'day'
          ? 'h-[350px] w-[350px]'
          : view === 'week'
          ? 'h-[170px] md:h-[260px]'
          : 'h-[180px]'
      }`}
    >
      <BsCloudUpload size="2rem" />
      <p style={{ textAlign: 'center', padding: '20px' }}>Upload your event</p>
    </div>
  );
};

export default UploadEventDayCard;
