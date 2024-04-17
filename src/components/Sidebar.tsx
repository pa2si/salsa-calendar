'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import HamburgerMenuBtn from './HamburgerMenuBtn';
import MemberProfile from './MemberProfile';
import NavLinks from './NavLinks';
import SidebarHeader from './SidebarHeader';
import { SlLogin } from 'react-icons/sl';

const Sidebar = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="z-50 absolute top-5 left-5">
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
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
          <ul className="px-4 py-12 w-80 min-h-full bg-base-200 text-base-content grid grid-rows-[auto,1fr,auto]">
            <li>
              <SidebarHeader />
            </li>
            {isSignedIn ? (
              <>
                <li>
                  <NavLinks />
                </li>
                <li className="">
                  {/* 'About' button to open a modal, modal implementation can be added later */}
                  <button className="btn w-full hover:text-lg transition-all duration-200 ease-in-out">
                    About
                  </button>
                </li>
                <li className="mt-4">
                  <MemberProfile />
                </li>
              </>
            ) : (
              <div className="flex justify-center items-center">
                {/* 'About' button to open a modal, modal implementation can be added later */}
                <button className="btn text-2xl">
                  <SlLogin size={40} />
                  <Link href="/sign-in">login</Link>
                </button>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
