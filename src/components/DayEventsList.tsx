'use client';

import { useQuery } from '@tanstack/react-query';
import { getAllPublicEventsAction } from '@/actions/dbActions';
import PublicEventCard from './PublicEventCard';

function DayEventsList({ date }: { date: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ['events', date],
    queryFn: () => getAllPublicEventsAction({ date }),
  });

  const events = data?.events || [];

  if (isLoading) return <h2 className="text-xl">Please wait...</h2>;
  if (events.length < 1)
    return <h1 className="text-4xl">No events for this day</h1>;

  return (
    <div
      className={`${
        events.length <= 1
          ? 'flex justify-center items-center'
          : 'grid md:grid-cols-2 gap-8'
      }`}
    >
      {events.map((event) => (
        <PublicEventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default DayEventsList;
