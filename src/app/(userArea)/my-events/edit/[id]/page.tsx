import EditEventForm from '@/components/EditEventForm';
import { getSingleEventAction } from '@/actions/dbActions';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

async function EventDetailPage({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['event, params.id'],
    queryFn: () => getSingleEventAction(params.id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditEventForm eventId={params.id} />
    </HydrationBoundary>
  );
}

export default EventDetailPage;
