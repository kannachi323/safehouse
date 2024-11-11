import UserManagerContainer from "@/containers/user-page/UserManagerContainer";
import Link from "next/link";
import { MdAdd } from "react-icons/md";

export default function PropertiesPage() {
    return (
        <UserManagerContainer node="properties">
            <Link
                className="flex flex-col justify-center items-center w-1/4 h-1/3 m-5 text-2xl font-semibold rounded-lg shadow-lg cursor-pointer hover:bg-gray-300"
                href="/user/properties/create_listings"
            >
                Create a new listing
                <MdAdd className="text-4xl mt-4" />
            </Link>

            <Link
                className="flex flex-col justify-center items-center w-1/4 h-1/3 m-5 text-2xl font-semibold rounded-lg shadow-lg cursor-pointer hover:bg-gray-300"
                href="/user/properties/my_listings"
            >
                View My Listings
            </Link>
        </UserManagerContainer>
    )
}