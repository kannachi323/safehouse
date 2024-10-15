

type SearchBarProps = {
  children? : React.ReactElement
}

export default function SearchBar({children} : SearchBarProps) {
    return (
        <div className="flex flex-row bg-white justify-between items-center max-w-full
          m-5"
        >
          <input className="p-2 border-[#013c6c] border-2 rounded-md" type="search" />
  
          {children}

        </div>
        
        
    )
}