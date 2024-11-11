import { MdHouse } from "react-icons/md";

export default function Page() {
    return (
       
        <div id='a' className="flex flex-col bg-red-50 row-span-2 col-span-3 rounded-3xl p-5">
            <span className="inline-flex items-center gap-x-4">  
                <p className="text-2xl">Properties for Rent</p>
                <MdHouse className="text-3xl" />
            </span>
        </div>
        
      
        
    )
}