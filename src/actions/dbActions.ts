'use server';

import prisma from '@/db/prismaDb';
import { Prisma } from '@prisma/client';
import { auth } from '@clerk/nextjs';
import {
  EventType,
  CreateAndEditEventType,
  GetAllEventsActionTypes,
} from '@/types/types';
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
        genres: values.genres,
        imageUrl: values.imageUrl,
        mapsLink: values.mapsLink,
        clerkId: userId,
      },
    });
    return event;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAllEventsAction({
  search,
  genre,
  page = 1,
  limit = 10,
}: GetAllEventsActionTypes): Promise<{
  events: EventType[];
  count: number;
  page: number;
  totalPages: number;
}> {
  // await new Promise((resolve) => setTimeout(resolve, 10000));

  const userId = authenticateAndRedirect();
  try {
    let whereClause: Prisma.EventWhereInput = {
      clerkId: userId,
    };
    if (search) {
      whereClause = {
        ...whereClause,
        OR: [
          {
            locationName: {
              contains: search,
              mode: 'insensitive',
            },
          },
          { eventName: { contains: search, mode: 'insensitive' } }, // Assuming eventName should be searched as well
        ],
      };
    }
    if (genre && genre !== 'all') {
      whereClause = {
        ...whereClause,
        genres: { has: genre },
      };
    }

    const events: EventType[] = await prisma.event.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { events, count: 0, page: 1, totalPages: 0 };
  } catch (error) {
    return { events: [], count: 0, page: 1, totalPages: 0 };
  }
}

export async function deleteEventAction(id: string): Promise<EventType | null> {
  const userId = authenticateAndRedirect();

  try {
    const event: EventType = await prisma.event.delete({
      where: {
        id,
        clerkId: userId,
      },
    });
    return event;
  } catch (error) {
    return null;
  }
}

export async function getSingleEventAction(
  id: string
): Promise<EventType | null> {
  let event: EventType | null = null;

  const userId = authenticateAndRedirect();
  try {
    event = await prisma.event.findUnique({
      where: {
        id,
        clerkId: userId,
      },
    });
    // console.log('getSingleEventAction:', event);
  } catch (error) {
    event = null;
  }
  if (!event) {
    redirect('/my-events');
  }
  return event;
}

export async function updateEventAction(
  id: string,
  values: CreateAndEditEventType
): Promise<EventType | null> {
  const userId = authenticateAndRedirect();
  try {
    // console.log('User ID:', userId);
    // console.log('Updating event with ID:', id);
    // console.log('Updating event with values:', values);
    const event: EventType = await prisma.event.update({
      where: {
        id,
        clerkId: userId,
      },
      data: {
        ...values,
      },
    });
    // console.log('this is the updateEventAction with following event:', event);
    return event;
  } catch (error) {
    // console.error('Error updating event:', error);
    return null;
  }
}
