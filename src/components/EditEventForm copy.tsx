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

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getSingleEventAction, updateEventAction } from '@/actions/dbActions';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { TimePicker } from './Timepicker';
import { FormLabel } from '@/components/ui/form';
import UploadFile from './UploadFile';
import { useEdgeStore } from '@/lib/providers';
import useGoogleAutocomplete from '@/lib/useGoogleAutocomplete';

const EditEventForm = ({ eventId }: { eventId: string }) => {
  const { edgestore } = useEdgeStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ['event', eventId],
    queryFn: () => getSingleEventAction(eventId),
  });

  // 1. Define your form.
  const form = useForm<CreateAndEditEventType>({
    resolver: zodResolver(createAndEditEventSchema),
    defaultValues: {
      id: data?.id || '',
      eventName: data?.eventName || '',
      date: data?.date || new Date(),
      time: data?.time || '',
      locationName: data?.locationName || '',
      street: data?.street || '',
      city: data?.city || '',
      postal: data?.postal || '',
      country: data?.country || '',
      genres: data?.genres || [],
      imageUrl: data?.imageUrl || '',
      mapsLink: data?.mapsLink || '',
    },
  });

  // Use the custom hook for Google Autocomplete
  useGoogleAutocomplete(form);

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditEventType) =>
      updateEventAction(eventId, values),
    onSuccess: (data) => {
      if (!data) {
        toast.error('There was an error processing your request.');
        return;
      }
      toast.success('Event added successfully');
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['event', eventId] });

      // Reset form after successful submission
      // form.reset();
      router.push('/my-events');
    },
    onError: (error) => {
      // Handle errors more specifically if you can
      toast.error(`Error: ${error.message}`);
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: CreateAndEditEventType) {
    console.log('Submitting values:', values);
    mutate(values);
  }

  const genreOptions = Object.keys(EventGenre) as (keyof typeof EventGenre)[];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 rounded"
      >
        <h2 className="capitalize font-semibold text-4xl mb-6">edit Event</h2>
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
            placeholder="Find your location"
          />
          {/*  Street */}
          <CustomFormField
            name="street"
            labelText="Street and Number"
            control={form.control}
            placeholder="Enter a Street"
          />
          {/* City */}
          <CustomFormField
            name="city"
            control={form.control}
            placeholder="Enter a City"
          />
          {/*  Postal*/}
          <CustomFormField
            name="postal"
            control={form.control}
            labelText="postal code"
            placeholder="Enter a Postal Code"
          />
          {/* Country */}
          <CustomFormField
            name="country"
            control={form.control}
            placeholder="Enter a Country"
          />
          {/* Maps Link */}
          <CustomFormField
            labelText="Google Maps Link"
            name="mapsLink"
            control={form.control}
            placeholder="Paste a Maps Link of the location "
          />
          <div className="flex flex-col mt-2 gap-2">
            {/* Genres */}
            <FormLabel className="mb-2">Genre</FormLabel>
            <Genrepicker genres={genreOptions} />
          </div>
          {/* Image Upload */}
          <div className="flex flex-col mt-2 gap-2">
            <FormLabel className="mb-2">Upload a new Flyer</FormLabel>
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
          {isPending ? 'loading' : 'edit Event'}
        </Button>
      </form>
    </Form>
  );
};

export default EditEventForm;
