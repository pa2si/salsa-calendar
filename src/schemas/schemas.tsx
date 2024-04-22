import * as z from 'zod';
import { isToday, isFuture } from 'date-fns';

export const createAndEditEventSchema = z.object({
  eventName: z
    .string()
    .min(2, {
      message: 'Event name must be at least 2 characters',
    })
    .max(200, { message: 'Event name must not exceed 200 characters' }),
  date: z.date().refine(
    (date) => {
      const today = new Date();
      return isToday(date) || isFuture(date);
    },
    { message: 'Date must not be in the past' }
  ),
  locationName: z
    .string()
    .min(2, {
      message: 'Location name must be at least 2 characters',
    })
    .max(200, { message: 'Location must not exceed 200 characters' }),
  street: z
    .string()
    .min(2, {
      message: 'Street must be at least 2 characters',
    })
    .max(200, { message: 'Street must not exceed 200 characters' }),
  city: z
    .string()
    .min(2, {
      message: 'City must be at least 2 characters',
    })
    .max(100, { message: 'City must not exceed 100 characters' }),
  postal: z.string().regex(/^[a-zA-Z0-9 \-]{3,10}$/, {
    message:
      'Postal code must be between 3 and 10 alphanumeric characters and may include hyphens and spaces',
  }),
  country: z
    .string()
    .min(2, {
      message: 'Country must be at least 2 characters',
    })
    .max(100, { message: 'Event name must not exceed 100 characters' }),
  checkedGenres: z.array(z.string()).min(1, {
    message: 'At least one genre must be selected',
  }),
});
