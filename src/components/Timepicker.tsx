import React, { useState } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { Controller, useFormContext } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FormLabel } from './ui/form';

export function TimePicker({ name }: { name: string }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [hour, setHour] = useState<string>('00');
  const [minute, setMinute] = useState<string>('00');

  return (
    <div className="flex flex-col">
      <FormLabel className="py-2">Time</FormLabel>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="flex flex-row gap-2">
            {/* Hour Selector */}
            <Select
              onValueChange={(value) => {
                setHour(value); // Update hour state
                const time = `${value}-${minute}`; // Combine with minute
                field.onChange(time); // Update form field

                // console.log('Selected Time:', combinedTime);
              }}
            >
              <SelectTrigger className="w-[60px]">
                <SelectValue placeholder="H" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Hour</SelectLabel>
                  {/* Add hour items */}
                  {Array.from({ length: 24 }, (_, i) => (
                    <SelectItem key={i} value={String(i).padStart(2, '0')}>
                      {String(i).padStart(2, '0')}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Minute Selector */}
            <Select
              onValueChange={(value) => {
                setMinute(value); // Update minute state
                const time = `${hour}:${value}`; // Combine with hour
                field.onChange(time); // Update form field

                // console.log('Selected Time:', time);
              }}
            >
              <SelectTrigger className="w-[60px]">
                <SelectValue placeholder="M" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Min.</SelectLabel>
                  {/* Add minute items */}
                  {[0, 15, 30, 45].map((i) => (
                    <SelectItem key={i} value={String(i).padStart(2, '0')}>
                      {String(i).padStart(2, '0')}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      />

      {/* Display Errors */}
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
