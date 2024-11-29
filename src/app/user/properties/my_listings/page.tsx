'use client'
import UserManagerContainer from "@/containers/user-page/UserManagerContainer";
import FiltersContainer from "@containers/listings-page/FiltersContainer";
import ListingsContainer from "@/containers/listings-page/ListingsContainer";

import { QueryProvider } from "@/contexts/QueryContext";
import Link from "next/link";


export default function Page() {
    
    
    return (
        
            <QueryProvider>
                <UserManagerContainer node="properties">
                    {/* Breadcrumb Section */}
                    
                    <div className="w-4/5 overflow-y-scroll p-5">
                        <div className="flex items-center space-x-2 mb-2">
                            <Link href="/user/properties" className="hover:underline">
                                <span className="text-2xl font-semibold">Properties</span>
                            </Link>
                            <span className="text-2xl">{'>'}</span> {/* Separator */}
                            <span className="text-2xl font-semibold text-[#fdc100]">My Listings</span>
                        </div>
              
                        <FiltersContainer />
                        <ListingsContainer className="w-full"/>
                        

                    </div>
                </UserManagerContainer>
            </QueryProvider>
            

        
            
    )
}