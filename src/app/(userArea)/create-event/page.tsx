import CreateEventForm from '@/components/CreateEventForm';

export async function generateMetadata() {
  return {
    title: '',
    description: '',
  };
}

const CreateEvent = () => {
  return (
    <>
      <CreateEventForm />
    </>
  );
};
export default CreateEvent;
