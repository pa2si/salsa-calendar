import EventsList from '@/components/EventsList';
import SearchForm from '@/components/SearchForm';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getAllEventsAction } from '@/actions/dbActions';

export async function generateMetadata() {
  return {
    title: '',
    description: '',
  };
}

async function MyEvents() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['events', '', 'all', 1],
    queryFn: () => getAllEventsAction({}),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchForm />
      <EventsList />
    </HydrationBoundary>
  );
}
export default MyEvents;
