'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { FormMessage } from '@/components/ui/form';
import { createAndEditEventSchema } from '@/schemas/schemas';
import { EventGenre, CreateAndEditEventType } from '@/types/types';
import { CustomFormField } from './FormComponents';
import DropdownMenuCheckboxes from './DropdownMenuCheckboxes';
import { DatePicker } from './Datepicker';
import { format } from 'date-fns';

const CreateEventForm = () => {
  // 1. Define your form.
  const form = useForm<CreateAndEditEventType>({
    resolver: zodResolver(createAndEditEventSchema),
    defaultValues: {
      eventName: '',
      date: undefined,
      locationName: '',
      street: '',
      city: '',
      postal: '',
      country: '',
      checkedGenres: [],
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: CreateAndEditEventType) {
    const formattedValues = {
      ...values,
      date: values.date ? format(values.date, 'yyyy-MM-dd') : null, // Format the date as a string if necessary
    };
    console.log(formattedValues);
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
          {/*  Event Name*/}
          <CustomFormField
            name="eventName"
            control={form.control}
            labelText="Event Name"
          />
          {/* Date */}
          <DatePicker name="date" />
          {/*  Location Name*/}
          <CustomFormField
            name="locationName"
            control={form.control}
            labelText="Location Name"
          />
          {/*  Street*/}
          <CustomFormField name="street" control={form.control} />
          {/*  City*/}
          <CustomFormField name="city" control={form.control} />
          {/*  Postal*/}
          <CustomFormField
            name="postal"
            control={form.control}
            labelText="postal code"
          />
          {/*  Country*/}
          <CustomFormField name="country" control={form.control} />
        </div>

        {/* Genres */}
        <DropdownMenuCheckboxes genres={genreOptions} />
        <FormMessage />
        <Button
          type="submit"
          className="capitalize bg-blue-500 hover:bg-blue-700 w-full"
        >
          create Event
        </Button>
      </form>
    </Form>
  );
};
export default CreateEventForm;
