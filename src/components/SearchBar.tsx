type SearchBarProps = {
  children? : React.ReactElement
  width: string
}

interface Product {
  id: number;
  name: string;
  price: number;
  // Add other relevant fields as needed
}



export default function SearchBar({children, width} : SearchBarProps) {
    async function getLocation(): Promise<void> {
    
      const url: string = `http://localhost:3000/api/db/listings?address=Anton Pacific, 800 Pacific Ave, Santa Cruz, CA`;
      
      try {
        const response: Response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const json: Product[] = await response.json();
        console.log(json);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error message:', error.message);
        } else {
          console.error('Unexpected error:', error);
        }
      }
    }

    return (
      <span className="inline-flex items-center justify-center rounded-lg bg-white h-9 border-[#013c6c] border-2"
        style={{width}}
      >
        <input className="rounded-md inline-flex h-7 outline-none text-base text-[#013c6c] px-2 w-full"
          id="search-bar"
          type="search" 
          placeholder="Enter an address, neighborhood, city, or ZIP code"
          onKeyDown={() => getLocation}
        />
        {children}
      </span>
         
      
        
        
    )
}