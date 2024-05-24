import CreateEventForm from '@/components/CreateEventForm';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

export async function generateMetadata() {
  return {
    title: 'Add an event',
    description: '',
  };
}

const AddEventPage = ({
  searchParams,
}: {
  searchParams: { date?: string };
}) => {
  const queryClient = new QueryClient();
  const selectedDate = searchParams.date ? new Date(searchParams.date) : null;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CreateEventForm selectedDate={selectedDate} />
    </HydrationBoundary>
  );
};

export default AddEventPage;
