

type SearchBarProps = {
  children? : React.ReactElement
}

export default function SearchBar({children} : SearchBarProps) {
    return (
      <span className="inline-flex items-center justify-center">
        <input className="rounded-md inline-flex px-2 h-8 outline-none text-base text-black w-[40vw] hover:text-[#d4d2d2]" 
          type="search" 
          placeholder="Enter an address, neighborhood, city, or ZIP code"
          
        />
  
        {children}

      
      </span>
         
      
        
        
    )
}