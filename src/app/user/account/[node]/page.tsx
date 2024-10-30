import Link from "next/link";
import ListingsContainer from "@/containers/listings-page/ListingsContainer";

export default function UserListings() {
    //should only allow to get here if user is signed in
    
    return (
        <>
            <div className="w-screen h-[90vh] flex flex-row justify-start bg-purple-500 items-center">
                
                <div id="side-panel" className="w-1/5 h-full flex flex-col items-start justify-start bg-red-500 ">
                  <h1 className="text-3xl"> mchen201 </h1>
                  
                  <Link className=" hover:text-[#ffc00c]" href="/listings/default">Create a listing</Link>
                  <Link className="hover:text-[#ffc00c]" href="/listings/default">My Listings</Link>
                  <Link className=" hover:text-[#ffc00c]" href="/listings/default">Saved Listings</Link>
                  
                 

                
                </div>
                <div id="content" className="w-4/5 h-full flex flex-col items-start justify-start bg-blue-500">
                    <h1 className="text-5xl">My Listings</h1>
                    <ListingsContainer className="w-full h-full overflow-y-scroll" />

                </div>
            </div>
            
        
        </>
    )
}