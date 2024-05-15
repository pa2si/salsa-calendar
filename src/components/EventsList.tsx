'use client';

import EventCard from './EventCard';
import { usePathname, useSearchParams } from 'next/navigation';
import { getAllEventsAction } from '@/actions/dbActions';
import { useQuery } from '@tanstack/react-query';

function EventsList() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const genre = searchParams.get('genre') || 'all';

  const pageNumber = Number(searchParams.get('page')) || 1;

  const { data, isPending } = useQuery({
    queryKey: ['events', search, genre, pageNumber],
    queryFn: () => getAllEventsAction({ search, genre, page: pageNumber }),
  });

  const events = data?.events || [];

  if (isPending) return <h2 className="text-xl">Please wait...</h2>;
  if (events.length < 1) return <h1 className="text-4xl">EventsList</h1>;

  return (
    <>
      {/* button container */}
      <div className="grid md:grid-cols-2 gap-8">
        {events.map((event) => {
          return <EventCard key={event.id} event={event} />;
        })}
      </div>
    </>
  );
}
export default EventsList;
