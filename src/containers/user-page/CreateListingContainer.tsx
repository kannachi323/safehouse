import { QueryProvider } from "@/contexts/QueryContext"
import Logo from "@/components/Logos"
import Link from 'next/link';
import FiltersContainer from "../listings-page/FiltersContainer";
import SearchBar from "@/components/SearchBar";

export default function CreateListingContainer() {
   
    return (
        <QueryProvider>
            <div className="w-screen h-screen flex flex-row justify-start items-center">
            
            <div id="side-panel" className="w-1/5 h-full flex flex-col justify-start border-r-black border-r-2 p-5">
              
              <Logo className="flex flex-row items-center justify-center w-full mb-5" />
              
              
              
              <Link className="w-full my-5 p-2 hover:text-[#ffc00c] hover:bg-slate-100" href="/listings/default">Dashboard</Link>
              
              <Link className="w-full my-5 p-2 hover:text-[#ffc00c] hover:bg-slate-100" href="/listings/default">Create a listing</Link>
              <Link className="w-full my-5 p-2 hover:text-[#ffc00c] hover:bg-slate-100" href="/listings/default">Profile</Link>
              <Link className="w-full my-5 p-2 hover:text-[#ffc00c] hover:bg-slate-100" href="/listings/default">Settings</Link>
              
            </div>
  
  
            <div id="content" className="w-4/5 h-full flex flex-col items-start justify-start overflow-y-auto p-5">
                <h1 className="text-3xl m-30">My Listings</h1>
                
                
                <FiltersContainer />
               
  
  
                
                
            </div>
          </div>
        </QueryProvider>
            
       
    )
}

