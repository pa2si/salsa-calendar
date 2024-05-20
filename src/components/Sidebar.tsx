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
import { ImSpinner8 } from 'react-icons/im';
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

  const drawerRef = useRef<HTMLInputElement>(null);

  const handleMenuClick = () => {
    if (drawerRef.current) {
      drawerRef.current.click();
    }
  };

  const specificRoute =
    pathname === '/add-event' ||
    pathname === '/my-events' ||
    /^\/my-events\/edit\/.+/.test(pathname);

  return (
    <div
      className={`z-50 fixed ${
        specificRoute ? 'lg:top-0 lg:left-0' : 'top-5 left-5'
      }`}
    >
      <div className={`drawer ${specificRoute ? 'lg:drawer-open' : ''}`}>
        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle"
          ref={drawerRef}
        />
        <div
          className={`drawer-content ${specificRoute ? 'block lg:hidden' : ''}`}
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
                  <ImSpinner8 size={25} className="animate-spin" />
                </div>
              </div>
            ) : (
              <>
                {!isSignedIn && (
                  <li>
                    <button
                      className="btn w-full text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg px-4 py-2 mx-1 transition duration-150 ease-in-out"
                      onClick={handleMenuClick}
                    >
                      About
                    </button>
                  </li>
                )}
                {isSignedIn ? (
                  <>
                    <li>
                      <NavLinks drawerRef={drawerRef} isSignedIn={isSignedIn} />
                    </li>
                    <li>
                      <button
                        className="btn w-full text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg px-4 py-2 mx-1 transition duration-150 ease-in-out"
                        onClick={handleMenuClick}
                      >
                        About
                      </button>
                    </li>
                    <li className="mt-6">
                      <MemberProfile />
                    </li>
                  </>
                ) : (
                  <div className="flex justify-center items-center">
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
