'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HamburgerMenuBtn from './HamburgerMenuBtn';
import MemberProfile from './MemberProfile';
import NavLinks from './NavLinks';
import SidebarHeader from './SidebarHeader';
import { SlLogin } from 'react-icons/sl';
import { GrClose } from 'react-icons/gr';
import { FaSpinner } from 'react-icons/fa6';
import { useEffect, useRef, useState } from 'react';

const Sidebar = () => {
  const { isSignedIn, isLoaded } = useUser();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      setIsLoading(false);
    }
  }, [isLoaded]);

  const drawerRef = useRef<HTMLInputElement>(null); // Initialize drawerRef with the correct type

  const handleMenuClick = () => {
    if (drawerRef.current) {
      drawerRef.current.click(); // Trigger the click event on drawerRef if it's not null
    }
  };

  // Check if the current pathname matches '/create-event' or '/all-events'
  const isCreateOrAllEventsPage =
    pathname === '/create-event' || pathname === '/my-events';

  return (
    <div
      className={`z-50 absolute ${
        isCreateOrAllEventsPage ? 'lg:top-0 lg:left-0' : 'top-5 left-5'
      }`}
    >
      <div
        className={`drawer ${isCreateOrAllEventsPage ? 'lg:drawer-open' : ''}`}
      >
        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle"
          ref={drawerRef}
        />
        <div
          className={`drawer-content ${
            isCreateOrAllEventsPage ? 'block lg:hidden' : ''
          }`}
        >
          <label
            htmlFor="my-drawer"
            className="btn drawer-button text-xl transition duration-700 ease-in-out"
          >
            <HamburgerMenuBtn />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <ul className="px-4 pt-4 pb-8 sm:pt-8 sm:pb-8 w-80 min-h-full bg-base-200 text-base-content grid grid-rows-[auto,1fr,auto]">
            <li className="relative">
              <div className="block sm:hidden mb-6">
                <label
                  htmlFor="my-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay absolute top-3 right-4"
                >
                  <GrClose size={25} style={{ color: 'gray' }} />
                </label>
              </div>
              <SidebarHeader drawerRef={drawerRef} />
            </li>

            {isLoading ? (
              <div className="flex items-center justify-center drawer-side">
                <label
                  htmlFor="my-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <div className="flex justify-center items-center">
                  <FaSpinner size={25} className="animate-spin" />
                </div>
              </div>
            ) : (
              <>
                <li className="">
                  {/* 'About' button to open a modal, modal implementation can be added later */}
                  <button
                    className="btn w-full text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg px-4 py-2 mx-1 transition duration-150 ease-in-out"
                    onClick={handleMenuClick}
                  >
                    About
                  </button>
                </li>
                {isSignedIn ? (
                  <>
                    <li>
                      <NavLinks drawerRef={drawerRef} />
                    </li>
                    <li className="mt-6">
                      <MemberProfile />
                    </li>
                  </>
                ) : (
                  <div className="flex justify-center items-center">
                    {/* 'About' button to open a modal, modal implementation can be added later */}
                    <button className="btn text-2xl" onClick={handleMenuClick}>
                      <SlLogin size={40} />
                      <Link href="/sign-in">login</Link>
                    </button>
                  </div>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
