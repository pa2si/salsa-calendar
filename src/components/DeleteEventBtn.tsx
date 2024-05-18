import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteEventAction } from '@/actions/dbActions';
import toast from 'react-hot-toast';
import { Button } from './ui/button';

function DeleteEventBtn({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteEventAction(id),
    onSuccess: (data) => {
      if (!data) {
        toast.error('There was an error processing your request.');
        return;
      }
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('event removed');
    },
  });

  return (
    <Button
      size="sm"
      className="bg-blue-500 hover:bg-blue-700"
      disabled={isPending}
      onClick={() => {
        mutate(id);
      }}
    >
      {isPending ? 'deleting...' : 'delete'}
    </Button>
  );
}

export default DeleteEventBtn;
