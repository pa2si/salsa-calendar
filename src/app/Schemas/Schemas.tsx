import { EventGenre } from '@/types/types';
import * as z from 'zod';

export const createAndEditEventSchema = z.object({
  EventName: z.string().min(2, {
    message: 'Event Name must be at least 2 characters',
  }),
  locationName: z.string().min(2, {
    message: 'Location Name must be at least 2 characters',
  }),
  street: z.string().min(2, {
    message: 'Event Name must be at least 2 characters',
  }),
  city: z.string().min(2, {
    message: 'Event Name must be at least 2 characters',
  }),
  postal: z.string().min(2, {
    message: 'Event Name must be at least 2 characters',
  }),
  country: z.string().min(2, {
    message: 'Event Name must be at least 2 characters',
  }),
  genre: z.nativeEnum(EventGenre),
});
