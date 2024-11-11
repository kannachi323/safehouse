import { VscFeedback } from "react-icons/vsc";


export default function Page() {
    return (
        <div id='c' className="flex flex-col bg-red-50 col-span-3 row-span-3 rounded-3xl p-5">
            <span className="inline-flex items-center gap-x-4">  
                <p className="text-2xl">User Engagement</p>
                <VscFeedback className="text-3xl" />
            </span>
        </div>
    )
}