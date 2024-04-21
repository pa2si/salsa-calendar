import { createAndEditEventSchema } from '@/app/Schemas/Schemas';
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
  date: string;
  eventName: string;
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
