import { EventGenre } from '@/types/types';
import * as z from 'zod';

export const createAndEditEventSchema = z.object({
  eventName: z.string().min(2, {
    message: 'Event name must be at least 2 characters',
  }),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date must be in format YYYY-MM-DD',
  }),
  locationName: z.string().min(2, {
    message: 'Location name must be at least 2 characters',
  }),
  street: z.string().min(2, {
    message: 'Street must be at least 2 characters',
  }),
  city: z.string().min(2, {
    message: 'City must be at least 2 characters',
  }),
  postal: z.string().min(5, {
    message: 'Please provide the 5 numbers of your postal',
  }),
  country: z.string().min(2, {
    message: 'Country must be at least 2 characters',
  }),
  genre: z.nativeEnum(EventGenre),
});
