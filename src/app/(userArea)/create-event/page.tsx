import CreateEventForm from '@/components/CreateEventForm';

export async function generateMetadata() {
  return {
    title: 'Add an event',
    description: '',
  };
}

const CreateEvent = () => {
  return (
    <div>
      <CreateEventForm />
    </div>
  );
};
export default CreateEvent;
