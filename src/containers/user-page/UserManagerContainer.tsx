'use client'
import { QueryProvider } from "@/contexts/QueryContext";
import Logo from "@/components/Logos";
import Link from 'next/link';
import { BiMessageSquareDetail } from "react-icons/bi";
import { FaHouseUser } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import { CiSaveDown2 } from "react-icons/ci";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { useAuth } from "@/contexts/AuthContext";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";
import { userSignOut } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import { useGoogleMaps } from "@/contexts/GoogleMapsContext";


interface Props {
  children : React.ReactNode;
  node : string;
}


export default function UserManagerContainer({children, node} : Props) {
    const [toggleProfile, setToggleProfile] = useState(false);
    const router = useRouter();
    const { user } = useAuth();
    const {isLoaded, loadError} = useGoogleMaps();
    
    const selectedLink = (linkNode : string) => {
     
      return node === linkNode ? "bg-[#fdc100]" : "bg-white";
    }


    if (!isLoaded) {
        return;
    }
    if (loadError) {
        return <div className="self-center items-center">Sorry, experiencing some issues at the moment</div>
    }


   
    return (
        user && 
         
            <div className="w-screen h-screen flex">

              <div id="side-panel" className="w-1/5 h-full flex flex-col justify-start items-start border-r-black border-r-2 p-5 relative bg-[#013c6c]">
                  
                  <Logo className="flex flex-row items-center justify-center w-full mb-5 text-white" />
                  
                    <Link className={`w-full my-5 p-2 text-lg text-[#013c6c] rounded-3xl flex flex-row items-center hover:shadow-2xl transform hover:scale-105 cursor-pointer transition-all duration-300 ${selectedLink("dashboard")}`} href="/user/dashboard">
                    
                      <MdOutlineSpaceDashboard className="inline-flex text-3xl mx-2"/>
                      Dashboard
                 
                  </Link>
                  
                  <Link className={`w-full my-5 p-2 text-lg text-[#013c6c] rounded-3xl flex flex-row items-center hover:shadow-2xl transform hover:scale-105 cursor-pointer transition-all duration-300 ${selectedLink("properties")}`} href="/user/properties">
                    <FaHouseUser className="inline-flex text-2xl mx-2"/>
                    Properties
                  </Link>
                  
                  <Link className={`w-full my-5 p-2 text-lg text-[#013c6c] rounded-3xl flex flex-row items-center hover:shadow-2xl transform hover:scale-105 cursor-pointer transition-all duration-300 ${selectedLink("messages")}`} href="/user/messages">
                    <BiMessageSquareDetail className="inline-flex text-2xl mx-2"/>
                    Messages
                  </Link>

                  <Link className={`w-full my-5 p-2 text-lg text-[#013c6c] rounded-3xl flex flex-row items-center hover:shadow-2xl transform hover:scale-105 cursor-pointer transition-all duration-300 ${selectedLink("saved-searches")}`} href="/user/messages">
                    <CiSaveDown2 className="inline-flex text-2xl font-bold mx-2"/>
                    Saved Searches
                  </Link>
                  
                  
                 
                  <button className='relative w-full p-2 text-lg text-[#013c6c] bg-white rounded-3xl flex flex-row items-center mt-auto'
                    onClick={() => setToggleProfile(!toggleProfile)}
                  >
                    <MdOutlineAccountCircle className="inline-flex text-2xl mx-2"/>
                    {user.email?.split('@')[0]}
                    {toggleProfile ? <IoMdArrowDropdown className="inline-flex text-2xl mx-2 rotate-180"/> : <IoMdArrowDropdown className="inline-flex text-2xl mx-2"/>}
                    
                    {toggleProfile && 
                      <div className="absolute bottom-[100%] mb-1 left-0 w-full h-[250%] bg-white flex flex-col justify-start items-start p-2 shadow-xl border-2 border-slate-200 rounded-3xl">
                        <Link className='w-full p-2 text-lg text-[#013c6c] rounded-3xl flex flex-row items-center hover:bg-slate-200' href="/user/settings">
                         
                          Settings
                        </Link>
                        <button
                          onClick={async () => {
                            await userSignOut();
                            router.replace('/');
                          }}
                          className="w-full p-2 text-lg text-[#013c6c] rounded-3xl flex flex-row items-center hover:bg-slate-200"
                          key="logout"
                        >
                          
                          Logout
                        </button>
                  
                      </div>
                    }
                  </button>
              </div>
              
              {children}

            </div>
    );
}