interface Props {
    showPage : number;
    setShowPage : (showPage : number) => void;
    setIsLandlord : (isLandlord : boolean) => void;
    
}



export default function ChooseUser({showPage, setShowPage, setIsLandlord} : Props) {
    
    return (
        <>
            <h1 className="text-5xl mt-20">How can we help you today?</h1>
            <div className="flex flex-row justify-center items-center w-4/5 h-full gap-10">
                <button className="p-20 w-1/2 text-3xl bg-gray-100 h-1/2 rounded-3xl hover:bg-gray-300" 
                    onClick={() => {
                        setShowPage(showPage + 1)
                    }}
                >
                    I want to find a place to live.
                </button>

                <button className="p-20 w-1/2 text-3xl bg-gray-100 h-1/2 rounded-3xl hover:bg-gray-300" 
                    onClick={() => {
                        setShowPage(showPage + 1)
                        setIsLandlord(true);
                    }}
                    
                >
                    I want to lease out my rental property.
                </button>
            </div>
        </>
        
    )
}