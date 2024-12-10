import { BsGraphUp } from "react-icons/bs";
import Image from "next/image"

export default function Page() {
    return (
        <div id='e' className="flex flex-col row-span-2 col-span-4 rounded-3xl p-5 border-2 border-slate-200 shadow-lg">
            <span className="inline-flex items-center gap-x-4">  
                <p className="text-2xl">Trend for Total Views</p>
                <BsGraphUp className="text-3xl" />
            </span>
        </div>
    )
}