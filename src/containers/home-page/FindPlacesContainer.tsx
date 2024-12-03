'use client'
import BKG1 from "@public/images/bkg1.jpg"
import { useRouter } from "next/navigation";

export default function FindPlacesContainer() {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center bg-blue-500 relative h-[45vh] w-full text-3xl"
      style={{
        backgroundImage: `url(${BKG1.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover"
      }}
    >

        <b className="text-white text-2xl mb-2">We're excited you're here. Let's find your next home.</b>
        

       
        <button
          className="p-4 bg-[#013c6c] rounded-full text-white w-[1/3] text-lg font-semibold shadow-lg 
                    hover:bg-[#fdc100] hover:text-[#013c6c] hover:shadow-xl 
                    transition-all duration-300 ease-in-out transform hover:scale-105"
          onClick={() => {
            router.push('/listings/default');
          }}
        >
          Get Started
        </button>

  

    

    </div>
  );
}