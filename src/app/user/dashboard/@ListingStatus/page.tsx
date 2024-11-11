import { FaEye } from "react-icons/fa";

export default function Page() {
    return (
        <div id='d' className="flex flex-col bg-red-50 row-span-2 col-span-2 rounded-3xl p-5">
            <span className="inline-flex items-center gap-x-4">  
                <p className="text-2xl">Status</p>
                <FaEye className="text-3xl" />
            </span>
        </div>
    )
}