import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import { format, isSameDay } from 'date-fns';
import { EventType } from '@/types/types';
import { BsCloudUpload } from 'react-icons/bs';
import Link from 'next/link';

interface DayCardProps {
  day: Date;
  today: Date;
  view: 'day' | 'week' | 'month';
  events: EventType[];
  onDayClick: (day: Date) => void;
}

const DayCard: React.FC<DayCardProps> = ({
  day,
  today,
  view,
  events,
  onDayClick,
}) => {
  const dayId = format(day, 'yyyy-MM-dd');
  const isToday = isSameDay(day, today);

  const eventsForDay = events.filter(
    (event) => format(new Date(event.date), 'yyyy-MM-dd') === dayId
  );

  return (
    <Link href={eventsForDay.length > 0 ? '#' : `/add-event?date=${dayId}`}>
      <Card
        shadow="sm"
        key={dayId}
        radius="lg"
        isPressable
        onPress={() => {
          if (eventsForDay.length > 0) {
            onDayClick(day);
          }
        }}
        className={`relative w-full hover:scale-105 bg-neutral-50 ${
          view === 'day'
            ? 'max-w-[450px]'
            : view === 'week'
            ? `flex-1 min-w-[140px] max-w-[160px] ${
                eventsForDay.length > 1 ? 'max-h-content' : 'max-h-[240px]'
              } md:min-w-[280px] md:max-h-[500px] md:max-w-[280px]`
            : `flex-1 min-w-[140px] max-w-[100px] md:min-w-[170px] md:max-w-[170px] ${
                eventsForDay.length > 1 ? 'max-h-[500px]' : 'max-h-[240px]'
              }`
        } `}
      >
        <CardFooter
          className={`flex flex-col md:flex-row justify-between items-center p-2  rounded-0 ${
            isToday ? 'bg-blue-200' : 'bg-neutral-100'
          } `}
        >
          <b>{format(day, 'EEEE')}</b>
          <div>
            <span>{format(day, 'dd')}</span>
            <span>{format(day, ' MMM')}</span>
          </div>
        </CardFooter>
        <CardBody className="overflow-visible p-0 bg-neutral-50 ">
          {eventsForDay.length > 0 ? (
            <div
              className={` ${eventsForDay.length > 1 ? 'flex flex-wrap' : ''}`}
            >
              {eventsForDay.map((event) => (
                <div className="relative w-full" key={event.id}>
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    src={event.imageUrl || ''}
                    alt={event.eventName}
                    className={`w-full object-cover ${
                      view === 'day'
                        ? eventsForDay.length === 1
                          ? 'max-w-[450px] min-h-[180px]'
                          : 'p-1 max-w-[450px] w-[225px] h-[225px]'
                        : view === 'week'
                        ? eventsForDay.length === 1
                          ? 'min-h-[180px] max-h-[180px] md:max-h-[260px]  '
                          : 'pb-1 min-h-[88px] max-h-[92px] md:max-h-[132px] w-72'
                        : eventsForDay.length === 1
                        ? 'h-[180px] md:max-h-[180px]'
                        : 'pb-1 h-[90px] w-44'
                    }`}
                  />
                  {view === 'day' && (
                    <div className="hidden lg:flex absolute inset-0 bg-black bg-opacity-50 justify-center items-center text-white text-lg opacity-0 hover:opacity-100 z-50">
                      Click for all details
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div
              className={`flex flex-col justify-center items-center pt-6 px-4 ${
                view === 'day'
                  ? 'h-[350px] w-[350px]'
                  : view === 'week'
                  ? 'h-[180px] md:h-[260px]'
                  : 'h-[180px]'
              }`}
            >
              <BsCloudUpload size="2rem" />
              <p style={{ textAlign: 'center', padding: '20px' }}>
                Upload your event
              </p>
            </div>
          )}
        </CardBody>
      </Card>
    </Link>
  );
};

export default DayCard;
