'use client';

import Link from "next/link";
import Logo from "@/components/Logos";
import { useAuth } from '@contexts/AuthContext';
import { CgProfile } from "react-icons/cg";
import Dropdown from "./Dropdown/Dropdown";
import { userSignOut } from "@/firebase/auth";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const { user } = useAuth();
  const router = useRouter();

  const userElements = [
    { href: '/user/dashboard', label: 'Dashboard' },
    { href: '/user/properties', label: 'My Properties' },
    { href: '/user/messages', label: 'Messages' },
    { href: '/user/settings', label: 'Settings' },
  ];

  return (
    <div className="flex flex-row h-[10vh] justify-between items-center bg-[#013c6c] text-white border-b-2 border-b-[#ffc00c] p-3">
      <div className="flex flex-row items-center justify-start w-1/3">
        <Link className="m-5 hover:text-[#ffc00c]" href="/listings/default">Rent</Link>
        <Link className="m-5 hover:text-[#ffc00c]" href="/contact">Contact Us</Link>
        <Link className="m-5 hover:text-[#ffc00c]" href="/help">Help</Link>
      </div>

      <Logo className="flex flex-row items-center justify-center" />

      <div className="flex flex-row items-center justify-end w-1/3">
        {user ? (
          <Dropdown className="text-[#013c6c]" width="200px" position="top-[90%] right-0" hover={true} action={true} elements={[
            ...userElements.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="block px-4 py-2 m-1 text-sm text-gray-800 hover:bg-gray-200 rounded-md"
                action-attr="close"
              >
                {item.label}
              </Link>
            )),
           
            <button
              onClick={async () => {
                await userSignOut();
                router.replace('/');
              }}
              className="block px-4 py-2 m-1 text-sm text-left text-gray-800 hover:bg-gray-200 rounded-md"
              key="logout"
            >
              
              Logout
            </button>
          ]}>
            <span className="inline-flex items-center gap-3 mx-5">
              <CgProfile className="text-white text-4xl hover:text-[#ffc00c] cursor-pointer" />
              <p className="text-white">{user.email?.split('@')[0]}</p>
            </span>
           
          </Dropdown>
        ) : (
          <>
           
            <Link className="m-5 hover:text-[#ffc00c]" href="/login">Log In</Link>
            <Link className="m-5 hover:text-[#ffc00c]" href="/register">Sign Up</Link>
          </>
        )}
      </div>
    </div>
  );
}
