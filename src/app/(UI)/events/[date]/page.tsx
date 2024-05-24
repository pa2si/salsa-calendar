import { getAllPublicEventsAction } from '@/actions/dbActions';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import DayEventsList from '@/components/DayEventsList';

async function EventsPerDay({ params }: { params: { date: string } }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['events', params.date],
    queryFn: () => getAllPublicEventsAction({ date: params.date }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DayEventsList date={params.date} />
    </HydrationBoundary>
  );
}

export default EventsPerDay;
