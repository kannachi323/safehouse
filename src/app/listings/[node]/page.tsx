import FiltersContainer from "@containers/listings-page/FiltersContainer";
import ListingsContainer from "@containers/listings-page/ListingsContainer";
import MapsContainer from "@containers/listings-page/MapsContainer";
import { QueryProvider } from "@contexts/QueryContext";
import NavBar from "@/components/NavBar";

export default async function Listings() {
  // Corrected URL with double slashes after 'http:'
  const data = await fetch('http://localhost:3000/api/db/listings', { cache: 'no-store' });
  const listings = await data.json();

  console.log(listings);
  

  return (
    <QueryProvider>
      <NavBar />
      <div className="flex flex-col">
        <FiltersContainer />
        <div className="flex flex-row">
          <MapsContainer />
          <ListingsContainer className="w-[50vw] h-[82vh] overflow-y-scroll" listings={listings} />
        </div>
      </div>
    </QueryProvider>
  );
}
