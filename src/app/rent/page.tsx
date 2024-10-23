import FiltersContainer from "@/containers/rentals-page/FiltersContainer"
import ListingsContainer from "@containers/rentals-page/ListingsContainer"
import MapsContainer from "@containers/rentals-page/MapsContainer"
import { QueryProvider } from "@contexts/QueryContext"

export default function Rent() {
    return (
        <QueryProvider>
          <div className="flex flex-col">
            <FiltersContainer />
            
            
            <div className="flex flex-row">
              
                <MapsContainer />
                <ListingsContainer />
              
            </div>
              
          </div>
          <div className="flex">
              
          </div>
      
      
        </QueryProvider>
        
    )
}