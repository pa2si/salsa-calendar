'use client';

import EventCard from './EventCard';
import { useSearchParams } from 'next/navigation';
import { getAllEventsAction } from '@/actions/dbActions';
import { useQuery } from '@tanstack/react-query';
import ComplexButtonContainer from './ComplexButtonContainer';

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

  const count = data?.count || 0;
  const page = data?.page || 0;
  const totalPages = data?.totalPages || 0;

  if (isPending) return <h2 className="text-xl">Please wait...</h2>;
  if (events.length < 1) return <h1 className="text-4xl">EventsList</h1>;

  return (
    <>
      {/* button container */}
      <div className="grid grid-rows sm:grid-cols sm:grid-cols-12 items-center justify-between mb-8">
        <h2 className="text-xl font-semibold capitalize sm:col-span-4 lg:sm:col-span-6">
          {count} events found
        </h2>
        <div className="sm:col-span-8 lg:sm:col-span-6">
          {totalPages < 2 ? null : (
            <ComplexButtonContainer
              currentPage={page}
              totalPages={totalPages}
            />
          )}
        </div>
      </div>
      {/* list of event cards */}
      <div className="grid md:grid-cols-2 gap-8">
        {events.map((event) => {
          return <EventCard key={event.id} event={event} />;
        })}
      </div>
    </>
  );
}
export default EventsList;
