import { BsGraphUp } from "react-icons/bs";

export default function Page() {
    return (
        <div id='e' className="flex flex-col bg-red-50 row-span-2 col-span-4 rounded-3xl p-5">
            <span className="inline-flex items-center gap-x-4">  
                <p className="text-2xl">Trend for Total Views</p>
                <BsGraphUp className="text-3xl" />
            </span>
        </div>
    )
}