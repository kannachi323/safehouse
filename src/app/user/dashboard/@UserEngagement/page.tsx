import { VscFeedback } from "react-icons/vsc";


export default function Page() {
    return (
        <div id='c' className="flex flex-col col-span-3 row-span-3 rounded-3xl p-5 border-2 border-slate-200 shadow-lg">
            <span className="inline-flex items-center gap-x-4">  
                <p className="text-2xl">User Engagement</p>
                <VscFeedback className="text-3xl" />
            </span>
            <p className="mt-4 text-xl text-gray-500">Coming Soon</p> 
        </div>
    )
}