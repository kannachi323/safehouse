import { PiDetectiveBold } from "react-icons/pi";

export default function Page() {
    return (
        <div id='b' className="flex flex-col row-span-2 col-span-3 rounded-3xl p-5 border-2 border-slate-200 shadow-lg">
            <span className="inline-flex items-center gap-x-4">  
                <p className="text-2xl">Listing Accuracy</p>
                <PiDetectiveBold className="text-3xl" />
            </span>
            
        </div>

    )
    
}