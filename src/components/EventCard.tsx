import { EventType } from '@/types/types';
import { MapPin, Clock, CalendarDays, AudioLines } from 'lucide-react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import EventInfo from './EventInfo';
import DeleteEventBtn from './DeleteEventBtn';
import { format } from 'date-fns';
import Image from 'next/image';

function EventCard({ event }: { event: EventType }) {
  const formattedDate = format(new Date(event.date), 'dd.MM.yyyy');
  const createdDate = format(new Date(event.createdAt), 'dd.MM.yyyy');
  const imageUrl = event.imageUrl;

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="capitalize">{event.eventName}</CardTitle>
        <CardDescription>
          {/* <CalendarDays /> */}
          created at {createdDate}
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="mt-4">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <EventInfo icon={<CalendarDays />} text={formattedDate} />
          <EventInfo icon={<Clock />} text={event.time} />
        </div>
        <EventInfo
          icon={<MapPin />}
          text={
            event.mapsLink ? (
              <a
                href={event.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline "
              >
                {event.locationName}
              </a>
            ) : (
              event.locationName
            )
          }
        />
        <div className="ml-8 text-gray-700">
          <EventInfo
            icon=""
            text={`${event.street}, ${event.postal}, ${event.city}`}
          />
          <EventInfo icon="" text={event.country} />
        </div>

        {/* Render genres as badges */}
        {event.genre.map((genre, index) => (
          <Badge key={index} className=" my-3 justify-center bg-gray-500 mr-1 ">
            <AudioLines className="w-4" /> {genre}
          </Badge>
        ))}
        {/* Fyler */}
        {imageUrl && (
          <div className="h-56 relative">
            <Image
              src={imageUrl}
              alt={event.eventName}
              fill
              className="absolute object-cover rounded-lg"
              sizes="33vw"
            />
          </div>
        )}
      </CardContent>
      <Separator />
      <CardFooter className="flex gap-4 mt-4">
        <Button asChild size="sm" className="bg-blue-500 hover:bg-blue-700">
          <Link href={`/myevents/${event.id}`}>edit</Link>
        </Button>
        <DeleteEventBtn id={event.id} />
      </CardFooter>
    </Card>
  );
}
export default EventCard;
