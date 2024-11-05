import FiltersContainer from "@containers/listings-page/FiltersContainer"
import ListingsContainer from "@containers/listings-page/ListingsContainer"
import MapsContainer from "@containers/listings-page/MapsContainer"
import { QueryProvider } from "@contexts/QueryContext"
import NavBar from "@/components/NavBar"

export default function Listings() {
    return (
      <QueryProvider>
        <NavBar/>
        <div className="flex flex-col">
          <FiltersContainer />
          
          
            <div className="flex flex-row">
              
              <MapsContainer />
              <ListingsContainer className="w-[50vw] h-[82vh] overflow-y-scroll"/>
            
            </div>

  
          </div>
        </QueryProvider>
        
    )
}

export function MyListings() {

}