'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { FormMessage } from '@/components/ui/form';
import { createAndEditEventSchema } from '@/schemas/schemas';
import { EventGenre, CreateAndEditEventType } from '@/types/types';
import { CustomFormField } from './FormComponents';
import Genrepicker from './Genrepicker';
import { DatePicker } from './Datepicker';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEventAction } from '@/actions/dbActions';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { TimePicker } from './Timepicker';
import { FormLabel } from '@/components/ui/form';
import UploadFile from './UploadFile';
import { useEdgeStore } from '@/lib/providers';

const CreateEventForm = () => {
  const { edgestore } = useEdgeStore();

  // 1. Define your form.
  const form = useForm<CreateAndEditEventType>({
    resolver: zodResolver(createAndEditEventSchema),
    defaultValues: {
      eventName: '',
      date: new Date(),
      time: '',
      locationName: '',
      street: '',
      city: '',
      postal: '',
      country: '',
      checkedGenres: [],
      imageUrl: '',
    },
  });

  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: CreateAndEditEventType) => {
      // Try to confirm the image upload if imageUrl is present
      if (values.imageUrl) {
        try {
          await edgestore.publicImages.confirmUpload({
            url: values.imageUrl,
          });
        } catch (error) {
          console.error('Failed to confirm image upload:', error);
          throw new Error('Failed to confirm image upload. Please try again.');
        }
      }

      // Proceed to create the event with all collected values
      return createEventAction(values);
    },
    onSuccess: (data) => {
      if (!data) {
        toast.error('There was an error processing your request.');
        return;
      }
      toast.success('Event added successfully');
      queryClient.invalidateQueries({ queryKey: ['events'] });

      // form.reset()
      router.push('/');
    },
    onError: (error) => {
      // Handle errors more specifically if you can
      toast.error(`Error: ${error.message}`);
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: CreateAndEditEventType) {
    // console.log(values);
    mutate(values);
  }

  const genreOptions = Object.keys(EventGenre) as (keyof typeof EventGenre)[];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 rounded"
      >
        <h2 className="capitalize font-semibold text-4xl mb-6">add Event</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols3 items-start">
          {/*  Event Name */}
          <CustomFormField
            name="eventName"
            control={form.control}
            labelText="Event Name"
          />
          <div className="flex flex-row w-full sm:w-64 md:w-80 lg:w-72 xl:w-80">
            {/* Date */}
            <div className="grow">
              <DatePicker name="date" />
            </div>
            <div>
              <TimePicker name="time" />
            </div>
            {/* Time */}
          </div>

          {/*  Location Name */}
          <CustomFormField
            name="locationName"
            control={form.control}
            labelText="Location Name"
          />
          {/*  Street */}
          <CustomFormField name="street" control={form.control} />
          {/* City */}
          <CustomFormField name="city" control={form.control} />
          {/*  Postal*/}
          <CustomFormField
            name="postal"
            control={form.control}
            labelText="postal code"
          />
          {/* Country */}
          <CustomFormField name="country" control={form.control} />
          <div className="flex flex-col mt-2 gap-2">
            {/* Genres */}
            <FormLabel className="mb-2">Genre</FormLabel>
            <Genrepicker genres={genreOptions} />
          </div>
          {/* Image Upload */}
          <div className="flex flex-col mt-2 gap-2">
            <FormLabel className="mb-2">Upload Flyer</FormLabel>
            <div className="w-full sm:w-64 md:w-80 lg:w-72 xl:w-80 max-w-xs flex justify-center">
              <UploadFile
                onUrlChange={(url) => form.setValue('imageUrl', url)} // Store the URL in the form state
              />
            </div>
          </div>
        </div>

        <FormMessage />
        <Button
          type="submit"
          className="capitalize bg-blue-500 hover:bg-blue-700 w-full"
          disabled={isPending}
        >
          {isPending ? 'loading' : 'add Event'}
        </Button>
      </form>
    </Form>
  );
};
export default CreateEventForm;
