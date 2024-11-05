import UserManagerContainer from "@/containers/user-page/UserManagerContainer";
import Link from "next/link";
import { MdAdd } from "react-icons/md";

export default async function Properties() {
    return (
        <UserManagerContainer node="my-properties">
            <div id="content" className="w-4/5 h-full flex flex-row items-center justify-center overflow-y-auto">
                
            <Link
                className="flex flex-col justify-center items-center w-1/4 h-1/3 m-5 text-2xl font-semibold rounded-lg shadow-lg cursor-pointer hover:bg-gray-300"
                href="/user/properties/create"
                >
                Create a new listing
                <MdAdd className="text-4xl mt-4" />
            </Link>

            <Link
                className="flex flex-col justify-center items-center w-1/4 h-1/3 m-5 text-2xl font-semibold rounded-lg shadow-lg cursor-pointer hover:bg-gray-300"
                href="/user/properties/my-listings"
                >
                View My Listings
                
            </Link>
            
                
            </div>
        </UserManagerContainer>
    );
}
