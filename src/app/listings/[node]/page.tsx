'use client'
import { LoadScript } from '@react-google-maps/api';
import FiltersContainer from "@containers/listings-page/FiltersContainer"
import ListingsContainer from "@containers/listings-page/ListingsContainer"
import MapsContainer from "@containers/listings-page/MapsContainer"
import { QueryProvider } from "@contexts/QueryContext"
import NavBar from "@/components/NavBar"

export default function Listings() {
    const googleMapsAPIKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (googleMapsAPIKey === undefined) {
        return
    }



    return (
      <QueryProvider>
        <LoadScript googleMapsApiKey={googleMapsAPIKey} libraries={['places']}  
          loadingElement={<div style={{ width: '100vw', height: '100vh', backgroundColor: 'white' }} />}
        >
          <NavBar/>
          <div className="flex flex-col">
            <FiltersContainer/>
            
            
              <div className="flex flex-row">
                <MapsContainer />
              
                <ListingsContainer className="w-[50vw] h-[82vh] overflow-y-scroll"/>
              
              </div>

    
            </div>
          </LoadScript>
        </QueryProvider>
        
    )
}

export function MyListings() {

}