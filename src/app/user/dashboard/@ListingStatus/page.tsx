import { FaEye } from "react-icons/fa";

export default function Page() {
    return (
        <div id='d' className="flex flex-col row-span-2 col-span-2 rounded-3xl p-5 border-2 border-slate-200 shadow-lg">
            <span className="inline-flex items-center gap-x-4">  
                <p className="text-2xl">Status</p>
                <FaEye className="text-3xl" />
            </span>
            <p className="mt-4 text-xl text-gray-500">Coming Soon</p> 
        </div>
    )
}