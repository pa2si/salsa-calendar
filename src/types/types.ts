import { createAndEditEventSchema } from '@/app/schemas/schemas';
import * as z from 'zod';

export interface Event {
  id: number;
  imageUrl: string;
  title: string;
  date: Date;
  city: string;
  location: string;
  street: string;
  number: string;
  postal: string;
  country: string;
  genre: string;
}

export interface User {
  emailAddresses: { emailAddress: string }[];
}

export type EventType = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
  eventName: string;
  date: string; // ISO 8601 date in string format 'YYYY-MM-DD'
  locationName: string;
  street: string;
  city: string;
  postal: string;
  country: string;
  genre: string;
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
  Bachata = 'Bacahta',
  Merengue = 'Merengue',
  Plena = 'Plena',
  Bomba = 'Bomba',
}

export type CreateAndEditEventType = z.infer<typeof createAndEditEventSchema>;
