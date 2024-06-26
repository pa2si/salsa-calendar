import { createAndEditEventSchema } from '@/schemas/schemas';
import * as z from 'zod';

export interface User {
  emailAddresses: { emailAddress: string }[];
}

export type EventType = {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  clerkId: string;
  eventName: string;
  date: Date;
  time: string;
  formattedDate?: string;
  locationName: string;
  street: string;
  city: string;
  postal: string;
  country: string;
  genres: string[];
  imageUrl?: string | null;
  mapsLink?: string | null;
};

export enum EventGenre {
  Salsa = 'Salsa',
  Son = 'Son',
  Guaguanco = 'Guaguanco',
  SonMontuno = 'Son Montuno',
  Guaracha = 'Guaracha',
  Pachanga = 'Pachanga',
  Timba = 'Timba',
  Descarga = 'Descarga',
  SalsaBrava = 'Salsa Brava',
  Boogaloo = 'Boogaloo',
  Bolero = 'Bolero',
  ChaChaCha = 'Cha Cha Cha',
  Bachata = 'Bachata',
  Merengue = 'Merengue',
  Plena = 'Plena',
  Bomba = 'Bomba',
}

export type CreateAndEditEventType = z.infer<typeof createAndEditEventSchema>;

export type GetAllEventsActionTypes = {
  search?: string;
  genre?: string;
  page?: number;
  limit?: number;
};

export interface DayCardProps {
  day: Date;
  today: Date;
  view: 'day' | 'week' | 'month';
  events: EventType[];
  onDayClick: (day: Date) => void;
}
