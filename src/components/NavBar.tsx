'use client'

import Link from "next/link";
import Logo from "@/components/Logos";
import { MdOutlineMenu } from "react-icons/md";
import { useAuth } from '@contexts/AuthContext';
import { CgProfile } from "react-icons/cg";
import Dropdown from "./Dropdown";
import { userSignOut } from "@/firebase/auth";

export default function NavBar() {
  const { user } = useAuth();
  
  
  const dropdownElements = [
    <Link href="/user/dashboard" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200" key={0}>
      Dashboard
    </Link>,
    <Link href="/user/properties" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200" key={1}>
      My Properties
    </Link>,
    <Link href="/user/messages" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200" key={2}>
      Messages
    </Link>,
    <Link href="/user/settings" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200" key={3}>
      Settings
    </Link>,
    <button onClick={userSignOut} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 text-left" key={4}>
      Logout
    </button>
  ];

  return (
    <div className="flex flex-row h-[10vh] justify-between items-center bg-[#013c6c]
     text-white border-b-2 border-b-[#ffc00c] p-1"
    >

      <div className="flex flex-row items-center justify-start w-1/3">
        <MdOutlineMenu className="text-3xl m-5 cursor-pointer hover:text-[#ffc00c]"/>
        <Link className="m-5 hover:text-[#ffc00c]" href="/listings/default">Rent</Link>
        
        <Link className="m-5 hover:text-[#ffc00c]" href="/contact">Contact Us</Link>
        <Link className="m-5 hover:text-[#ffc00c]" href="/help">Help</Link>
        
      </div>

      <Logo className="flex flex-row items-center justify-center w-1/3"/>
      
      <div className="flex flex-row items-center justify-end w-1/3">
        
        {user ? (
         <Dropdown className="text-[#013c6c]" elements={dropdownElements} width="250%">
          <CgProfile className="text-white text-3xl m-5 hover:text-[#ffc00c] cursor-pointer" />
         </Dropdown>
          
          
        ) : (
          <>
            <Link className="m-5 hover:text-[#ffc00c]" href="/user/login">Log In</Link>
            <Link className="m-5 hover:text-[#ffc00c]" href="/user/register">Sign Up</Link>
          </>
          
        )}
        
      </div>
    </div>
  );
}

