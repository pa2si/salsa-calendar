'use server';

import prisma from '@/db/prismaDb';
import { auth } from '@clerk/nextjs';
import { EventType, CreateAndEditEventType } from '@/types/types';
import { createAndEditEventSchema } from '@/schemas/schemas';
import { redirect } from 'next/navigation';

function authenticateAndRedirect(): string {
  const { userId } = auth();
  if (!userId) {
    redirect('/');
  }
  return userId;
}

export async function createEventAction(
  values: CreateAndEditEventType
): Promise<EventType | null> {
  const userId = authenticateAndRedirect();
  try {
    createAndEditEventSchema.parse(values); // Validate using Zod; 'date' is a Date object
    const event: EventType = await prisma.event.create({
      data: {
        eventName: values.eventName,
        date: values.date,
        time: values.time,
        locationName: values.locationName,
        street: values.street,
        city: values.city,
        postal: values.postal,
        country: values.country,
        genre: values.checkedGenres,
        clerkId: userId,
      },
    });
    return event;
  } catch (error) {
    console.log(error);
    return null;
  }
}
