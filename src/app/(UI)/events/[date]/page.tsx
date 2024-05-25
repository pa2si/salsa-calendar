import { getAllPublicEventsAction } from '@/actions/dbActions';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { format, parseISO } from 'date-fns';
import DayEventsList from '@/components/DayEventsList';

export async function generateMetadata() {
  return {
    title: 'events',
    description: '',
  };
}

async function EventsPerDay({ params }: { params: { date: string } }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['events', params.date],
    queryFn: () => getAllPublicEventsAction({ date: params.date }),
  });

  const formattedDate = format(parseISO(params.date), 'EEEE, MMMM dd, yyyy');

  return (
    <>
      <h2 className="text-2xl text-center mb-4">Events for {formattedDate} </h2>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DayEventsList date={params.date} />
      </HydrationBoundary>
    </>
  );
}

export default EventsPerDay;
