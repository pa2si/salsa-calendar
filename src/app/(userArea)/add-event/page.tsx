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

const AddEventPage = () => {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CreateEventForm />
    </HydrationBoundary>
  );
};
export default AddEventPage;
