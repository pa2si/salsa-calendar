import { EventType } from '@/types/types';
import { MapPin, Clock, CalendarDays, AudioLines } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
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

function PublicEventCard({ event }: { event: EventType }) {
  const formattedDate = format(new Date(event.date), 'dd.MM.yyyy');
  const createdDate = format(new Date(event.createdAt), 'dd.MM.yyyy');
  const imageUrl = event.imageUrl;

  const openModal = (): void => {
    const modal = document.getElementById(
      `image_modal_${event.id}`
    ) as HTMLDialogElement | null;
    modal?.showModal();
  };

  return (
    <Card className="md:min-w-80 lg:min-w-72 xl:min-w-96">
      <CardHeader>
        <CardTitle className="capitalize">{event.eventName}</CardTitle>
        <CardDescription>created at {createdDate}</CardDescription>
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

        {event.genres.map((genre, index) => (
          <Badge key={index} className="my-3 justify-center bg-gray-500 mr-1">
            <AudioLines className="w-4" /> {genre}
          </Badge>
        ))}

        {imageUrl && (
          <div className="h-56 relative">
            <Image
              src={imageUrl}
              alt={event.eventName}
              fill
              className="absolute object-cover rounded-lg cursor-pointer hover:scale-105 transition-all duration-250 ease-in-out"
              sizes="33vw"
              onClick={openModal}
            />
          </div>
        )}
      </CardContent>
      <Separator />

      {/* Modal for Image */}
      <dialog id={'image_modal_' + event.id} className="modal modal-middle">
        <div className="modal-box ">
          {/* <h3 className="font-bold text-lg">{event.eventName}</h3> */}

          {imageUrl && (
            <Image
              src={imageUrl}
              alt={event.eventName}
              width={500}
              height={500}
              priority
              className="object-cover rounded-lg"
            />
          )}
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </Card>
  );
}

export default PublicEventCard;
