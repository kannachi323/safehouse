'use client'
import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import { QueryProvider } from "@/contexts/QueryContext";
import Logo from "@/components/Logos";
import Link from 'next/link';
import FiltersContainer from "@containers/user-page/FiltersContainer";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FaHouseUser } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { useAuth } from "@/contexts/AuthContext";
import { MdOutlineSpaceDashboard } from "react-icons/md";


interface Props {
  children : React.ReactNode;
  node : string;
}


export default function UserManagerContainer({children, node} : Props) {

    const selectedLinkStyles = (linkNode : string | string[]) => {
      return node === linkNode
        ? 'w-full my-5 p-2 text-lg text-[#013c6c] bg-slate-200'
        : 'w-full my-5 p-2 text-lg hover:text-[#ffc00c] hover:bg-slate-100'
    }
   
    return (
        
          <QueryProvider>
            <div className="w-screen h-screen flex flex-row justify-start items-center">

            <div id="side-panel" className="w-1/5 h-full flex flex-col justify-start border-r-black border-r-2 p-5">
                
                <Logo className="flex flex-row items-center justify-center w-full mb-5" />
                
                <Link className={selectedLinkStyles('dashboard')} href="/user/dashboard">
                  <span className="inline-flex justify-center items-center">
                    <MdOutlineSpaceDashboard className="inline-flex text-3xl mx-2"/>
                    Dashboard
                  </span>
                </Link>
                
                <Link className={selectedLinkStyles('my-properties')} href="/user/my-properties">
                  <span className="inline-flex justify-center items-center">
                    <FaHouseUser className="inline-flex text-2xl mx-2"/>
                    My Properties
                  </span>
                </Link>
                
                <Link className={selectedLinkStyles('messages')} href="/user/messages">
                  <span className="inline-flex justify-center items-center">
                    <BiMessageSquareDetail className="inline-flex text-2xl mx-2"/>
                    Messages
                  </span>
                </Link>
                
                <Link className={selectedLinkStyles('settings')} href="/user/settings">
                  <span className="inline-flex justify-center items-center">
                    <IoSettingsSharp className="inline-flex text-2xl mx-2"/>
                    Settings
                  </span>
                </Link>

                <Link className={selectedLinkStyles('account')} href="/user/account">
                  <span className="inline-flex justify-center items-center">
                    <MdOutlineAccountCircle className="inline-flex text-2xl mx-2"/>
                    Account
                  </span>
                </Link>
                

                
              </div>

              {children}

            </div>
          </QueryProvider>
        
    );
}
