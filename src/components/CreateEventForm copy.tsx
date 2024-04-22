'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';

import { createAndEditEventSchema } from '@/schemas/schemas';
import { CreateAndEditEventType, EventGenre } from '@/types/types';
import { CustomFormField, CustomDropdownMenuCheckbox } from './FormComponents';

const CreateEventForm = () => {
  // 1. Define your form.
  const form = useForm<CreateAndEditEventType>({
    resolver: zodResolver(createAndEditEventSchema),
    defaultValues: {
      eventName: '',
      date: '',
      locationName: '',
      street: '',
      city: '',
      postal: '',
      country: '',
      genre: EventGenre.Salsa,
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: CreateAndEditEventType) {
    console.log(values);
  }
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
          {/*  Date*/}
          <CustomFormField name="date" control={form.control} />
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
          <CustomFormField name="postal" control={form.control} />
          {/*  Country*/}
          <CustomFormField name="country" control={form.control} />
        </div>

        {/* Genres */}
        <CustomDropdownMenuCheckbox
          name="genres"
          control={form.control}
          labelText="genres"
          items={Object.values(EventGenre)}
        />

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
