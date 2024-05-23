import React, { useState } from 'react';
import { format } from 'date-fns';
import { ErrorMessage } from '@hookform/error-message';
import { Calendar as CalendarIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormLabel } from './ui/form';
import { Controller, useFormContext } from 'react-hook-form';

export function DatePicker({ name }: { name: string }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <FormLabel className="py-2">Date</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className="w-[175px] justify-start text-left font-normal"
                onClick={() => setOpen(!open)}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value ? (
                  format(new Date(field.value), 'PPP')
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => {
                  field.onChange(date);
                  setOpen(false);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        as="p"
        render={({ message }: { message: string }) => (
          <p className="text-red-500 mt-2">{message}</p>
        )}
      />
    </div>
  );
}
