'use server';

import { User } from '@/types/types';
import { currentUser } from '@clerk/nextjs';

export async function fetchCurrentUser(): Promise<User | null> {
  try {
    const user = await currentUser();
    if (!user) {
      // If user is null, return null
      return null;
    }

    // Extract necessary data and return it as a plain object
    const userData: User = {
      emailAddresses: user.emailAddresses.map((address) => ({
        emailAddress: address.emailAddress,
      })),
    };
    return userData;
  } catch (error) {
    console.error('Failed to fetch current user:', error);
    return null;
  }
}
