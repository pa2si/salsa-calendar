import React, { useEffect, useState } from 'react';
import { UserButton } from '@clerk/nextjs';
import { fetchCurrentUser } from '@/actions/fetchClerkUser';
import { User } from '@/types/types';
import { FaSpinner } from 'react-icons/fa';

const MemberProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const fetchedUser = await fetchCurrentUser();
      setUser(fetchedUser);
    };

    getUser();
  }, []);

  return (
    <div className="px-4 flex items-center justify-center gap-2 border border-cyan-700 p-4 rounded-lg bg-neutral-200">
      {user ? (
        <>
          <UserButton afterSignOutUrl="/" />
          <p>{user.emailAddresses[0].emailAddress}</p>
        </>
      ) : (
        <div className="flex justify-center items-center animate-spin">
          <FaSpinner size={20} />
        </div>
      )}
    </div>
  );
};

export default MemberProfile;
