import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import { format, isSameDay } from 'date-fns';
import { DayCardProps } from '@/types/types';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'; // Adjust the import based on how you import from Shadcn UI
import UploadEventDayCard from './UploadEventDayCard';

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

  const baseClasses = 'relative w-full bg-neutral-50';
  const hoverClass = view !== 'day' ? 'hover:scale-105' : '';
  const dayViewClass =
    view === 'day' ? 'max-w-[600px] cursor-default max-w-[450px]' : '';
  const weekViewClass =
    view === 'week'
      ? `flex-1 min-w-[140px] max-w-[160px] h-[226px] md:min-w-[280px] md:h-[300px] md:max-w-[280px]`
      : '';
  const monthViewClass =
    view === 'month'
      ? `flex-1 min-w-[140px] max-w-[100px] md:min-w-[170px] md:max-w-[170px] max-h-[500px]`
      : '';

  return (
    <Link href={eventsForDay.length > 0 ? '#' : `/add-event?date=${dayId}`}>
      <Card
        shadow="sm"
        key={dayId}
        radius="lg"
        isPressable={view !== 'day'}
        onPress={() => {
          if (eventsForDay.length > 0) {
            onDayClick(day);
          }
        }}
        className={`${baseClasses} ${hoverClass} ${dayViewClass} ${weekViewClass} ${monthViewClass}`}
      >
        <CardFooter
          className={`flex flex-col ${
            view !== 'day' ? 'md:flex-row' : 'flex-row'
          } justify-between items-center ${
            view === 'week' || view === 'month' ? 'p-1 md:p-2' : 'p-2'
          } rounded-0 ${isToday ? 'bg-blue-200' : 'bg-neutral-100'}`}
        >
          <b>{format(day, 'EEEE')}</b>
          <div>
            <span>{format(day, 'dd')}</span>
            <span>{format(day, ' MMM')}</span>
          </div>
        </CardFooter>
        <CardBody className="relative overflow-visible p-0 bg-neutral-50">
          {eventsForDay.length > 1 && view === 'day' ? (
            /* Display of Carousel when more than 1 event and Day view */
            <Carousel className="w-full max-w-[450px]  relative">
              <CarouselContent>
                {eventsForDay.map((event) => (
                  <CarouselItem key={event.id}>
                    <div className="p-0">
                      <Card>
                        <CardBody className="flex aspect-square items-center justify-center  ">
                          <Image
                            shadow="sm"
                            radius="lg"
                            width="100%"
                            src={event.imageUrl || ''}
                            alt={event.eventName}
                            className="w-full object-cover min-h-[180px]"
                          />
                        </CardBody>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2" />
              <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2" />
            </Carousel>
          ) : eventsForDay.length > 0 ? (
            <div className="relative w-full h-full">
              {/* display of how many events if more than one */}
              {eventsForDay.length > 1 && (
                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-20 text-white text-lg z-50">
                  <p className=" bg-black bg-opacity-50 z-50 py-2 px-4 rounded-lg">
                    {eventsForDay.length} events
                  </p>
                </div>
              )}
              {/* Image Container when more than 1 event and not DayView  */}
              <div
                className={`grid ${
                  eventsForDay.length === 2
                    ? 'grid-rows-2'
                    : eventsForDay.length === 3
                    ? 'grid-cols-2 grid-rows-2'
                    : eventsForDay.length >= 4
                    ? 'grid-cols-2 grid-rows-2'
                    : 'grid-cols-1'
                } gap-1 w-full  ${
                  view === 'day'
                    ? 'min-h-[350px]'
                    : view === 'week'
                    ? ' h-[170px] md:h-[260px]'
                    : 'h-[180px]'
                }`}
              >
                {eventsForDay.map((event, index) => (
                  <div
                    key={event.id}
                    className={`relative ${
                      eventsForDay.length === 3 && index === 2
                        ? 'col-span-2 row-span-1'
                        : ''
                    }`}
                  >
                    <Image
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      src={event.imageUrl || ''}
                      alt={event.eventName}
                      className={`w-full ${
                        (view === 'month' && eventsForDay.length === 1) ||
                        (view === 'week' && eventsForDay.length === 1)
                          ? 'h-[180px] md:h-[260px]'
                          : 'h-full'
                      } object-cover`}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <UploadEventDayCard view={view} />
          )}
        </CardBody>
      </Card>
    </Link>
  );
};

export default DayCard;
