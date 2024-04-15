// DayCard.tsx
import React from 'react';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import { format, isSameDay } from 'date-fns';

interface DayCardProps {
  day: Date;
  today: Date;
  view: 'day' | 'week' | 'month';
}

const DayCard: React.FC<DayCardProps> = ({ day, today, view }) => {
  const dayId = format(day, 'yyyy-MM-dd');
  const isToday = isSameDay(day, today);

  return (
    <Card
      shadow="sm"
      key={dayId}
      radius="lg"
      isPressable
      onPress={() => console.log(`${dayId} item pressed`)}
      className={`relative w-full ${
        view === 'day'
          ? 'max-w-[450px]'
          : view === 'week'
          ? 'flex-1 min-w-[160px] max-w-[160px] md:min-w-[280px] md:max-w-[280px]'
          : 'flex-1 min-w-[100px] max-w-[100px] md:min-w-[180px] md:max-w-[180px]'
      } ${isToday ? 'bg-blue-200' : 'bg-white'}`}
    >
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          src="/1.jpg"
          alt="Calendar background"
          className="w-full object-cover"
        />
      </CardBody>
      <CardFooter className="flex flex-col md:flex-row justify-between items-center p-2">
        <b>{format(day, 'EEEE')}</b>
        <div>
          <span>{format(day, 'dd')}</span>
          <span>{format(day, ' MMM')}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DayCard;
