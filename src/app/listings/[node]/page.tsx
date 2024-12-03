'use client'
import FiltersContainer from "@containers/listings-page/FiltersContainer"
import ListingsContainer from "@containers/listings-page/ListingsContainer"
import MapsContainer from "@containers/listings-page/MapsContainer"
import { QueryProvider } from "@contexts/QueryContext"
import NavBar from "@/components/NavBar"
import { useGoogleMaps } from "@/contexts/GoogleMapsContext";

export default function Listings() {
  const {isLoaded, loadError} = useGoogleMaps();
  
  if (!isLoaded) {
    return <div className="self-center items-center">Loading...</div>;
  }
  if (loadError) {
    return <div className="self-center items-center">Sorry, experiencing some issues at the moment</div>
  }



    return (
      <QueryProvider>
        
          <NavBar/>
          <div className="flex flex-col">
            <FiltersContainer/>
            
            
              <div className="flex flex-row">
                <MapsContainer width="50vw" height="82vh"/>
              
                <ListingsContainer className="w-[50vw] h-[82vh] overflow-y-scroll"/>
              
              </div>

    
            </div>
        </QueryProvider>
        
    )
}

