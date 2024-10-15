import BKG1 from "@public/images/bkg1.jpg";
import FindPlacesContainer from "@/containers/home-page/FindPlacesContainer"
import SlideShowContainer from "@/containers/home-page/SlideShowContainer"
import Dropdown from "@/components/Dropdown";
import SearchBar from "@/components/SearchBar";


export default function Home() {
  return (
    <>
      {/* section 1 */}
      <div className="h-[90vh] bg-cover bg-center text-[#013c6c] flex flex-col justify-center items-center" 
        
      >
        <SlideShowContainer />
        
        <FindPlacesContainer />
        
      
      
      
      </div>
    </>
   
  );
}
