import RENT1 from "@public/images/rent1.jpg";
import RENT2 from "@public/images/rent2.jpg"
import Image from "next/image"
import FindPlacesContainer from "@/containers/home-page/FindPlacesContainer"



export default function Home() {
  return (
    <>
      {/* section 1 */}
      <div className="w-screen bg-white text-[#013c6c] flex flex-col justify-start items-center" >
        <FindPlacesContainer />
        <b className="text-[#013c6c] self-start text-3xl mx-20 my-20">
          Finding your next place <span className="text-[#ffc00c]">starts with us</span>
        </b>

        {/* image container */}
        <div className="relative flex flex-row justify-evenly items-center w-[80vw] h-[40vh] space-x-4">
          
    
          <Image src={RENT1} alt="First image" className="w-1/3 h-full object-cover rounded-xl" />
          <Image src={RENT2} alt="Second image" className="w-1/3 h-full object-cover rounded-xl" />
          <Image src={RENT1} alt="Third image" className="w-1/3 h-full object-cover rounded-xl" />


        </div>

        
        <b className="text-[#013c6c] self-end text-3xl mx-20 my-20">
          And <span className="text-[#ffc00c]">we're here to help</span> every step of the way
        </b>

      </div>

      {/* section 2 */}
      <div className="w-screen bg-[#f7f7f7] text-[#013c6c] flex flex-col justify-start items-center">
        <div className="flex flex-row justify-around items-center my-20">
          <Image src={RENT1} alt="First image" className="w-1/3 h-full object-cover rounded-xl" />
          <b className="text-[#013c6c] text-3xl mx-20 my-20">
            Explore listings from <span className="text-[#ffc00c]">multiple platforms</span>
          </b>
        </div>
      
      </div>

      <div className="w-screen bg-white text-[#013c6c] flex flex-col justify-start items-center">
        <div className="flex flex-row justify-center items-center my-20">
          <b className="text-[#013c6c] text-3xl mx-20 my-20 text-center">
          Get recommendations tailored to <span className="text-[#ffc00c]">your preferences</span>
          </b>
          <Image src={RENT1} alt="First image" className="w-1/3 h-full object-cover rounded-xl" /> 
        </div>
      </div>

      {/* section 3 */}
      <div className="w-screen bg-[#f7f7f7] text-[#013c6c] flex flex-col justify-start items-center">
        <b className="text-[#013c6c] self-center text-3xl mx-20 my-20">
        <span className="text-[#ffc00c]">Safe</span> and <span className="text-[#ffc00c]">secure</span> communication
        </b>
        <div className="relative flex flex-row justify-evenly items-center w-[80vw] h-[40vh] space-x-4 mb-20">
          
          <Image src={RENT1} alt="First image" className="w-1/3 h-full object-cover rounded-xl" />
          <Image src={RENT2} alt="Second image" className="w-1/3 h-full object-cover rounded-xl" />
          <Image src={RENT1} alt="Third image" className="w-1/3 h-full object-cover rounded-xl" />
        </div>

        
      </div>

      

    </>
   
  );
}
