'use client'
import FiltersContainer from "@containers/listings-page/FiltersContainer"
import ListingsContainer from "@containers/listings-page/ListingsContainer"
import MapsContainer from "@containers/listings-page/MapsContainer"
import { QueryProvider } from "@contexts/QueryContext"
import NavBar from "@/components/NavBar"
import { useJsApiLoader } from '@react-google-maps/api';

export default function Listings() {
  const googleMapsAPIKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleMapsAPIKey || '',
    libraries: ['places'],
  });

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
                <MapsContainer />
              
                <ListingsContainer className="w-[50vw] h-[82vh] overflow-y-scroll p-5"/>
              
              </div>

    
            </div>
        </QueryProvider>
        
    )
}

export function MyListings() {

}