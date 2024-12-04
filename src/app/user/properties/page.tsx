import UserManagerContainer from "@/containers/user-page/UserManagerContainer";
import Link from "next/link";
import { MdAdd } from "react-icons/md";
import { FaListAlt } from "react-icons/fa";

export default function PropertiesPage() {
    return (
        <UserManagerContainer node="properties">
            <div className="flex flex-col items-center justify-center h-full w-4/5 p-10 gap-10">
                {/* Header Section */}
                <h1 className="text-3xl font-bold text-[#013c6c] mb-8">Properties</h1>
                
                {/* Cards Section */}
                <div className="flex flex-wrap justify-center items-center w-full gap-10">
                    {/* Create a New Listing */}
                    <Link
                        className="flex flex-col justify-center items-center w-60 h-60 text-center text-white bg-[#013c6c] hover:bg-[#02548f] rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 cursor-pointer transition-all duration-300"
                        href="/user/properties/create_listings"
                    >
                        <MdAdd className="text-6xl mb-4" />
                        <span className="text-xl font-semibold">Create a New Listing</span>
                    </Link>

                    {/* View My Listings */}
                    <Link
                        className="flex flex-col justify-center items-center w-60 h-60 text-center text-[#013c6c] bg-[#fdc100] hover:bg-[#f6cd67] rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 cursor-pointer transition-all duration-300"
                        href="/user/properties/my_listings"
                    >
                        <FaListAlt className="text-5xl mb-4" />
                        <span className="text-xl font-semibold">View My Listings</span>
                    </Link>
                </div>
            </div>
        </UserManagerContainer>
    );
}
