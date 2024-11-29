import Image from "next/image";
import BKG1 from "@public/images/bkg1.jpg";

interface Props {
    showPage : number;
    setShowPage : (showPage : number) => void;
    setIsLandlord : (isLandlord : boolean) => void;
    
}



export default function ChooseUser({showPage, setShowPage, setIsLandlord} : Props) {
    
    return (
        <>  
            <Image
                src={BKG1.src}
                alt="Background"
                layout="fill"
                objectFit="cover"
                priority={true}
                className="absolute z-[-1]"
            />

            {/* Content */}
            <div className="flex flex-col items-center justify-center text-center px-4 z-[2]">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-12 drop-shadow-md">
                    How can we help you today?
                </h1>
                <div className="flex flex-col md:flex-row justify-center items-center gap-8 w-full max-w-4xl">
                    {/* Button 1 */}
                    <button
                        className="p-8 w-full h-full text-2xl font-medium text-white bg-[#013c6c] rounded-xl shadow-lg hover:bg-[#02548f] transition-all duration-300"
                        onClick={() => {
                            setShowPage(showPage + 1);
                        }}
                    >
                        I want to find a place to live.
                    </button>

                    {/* Button 2 */}
                    <button
                        className="p-8 w-full h-full text-2xl font-medium text-[#013c6c] bg-[#fdc100] rounded-xl shadow-lg hover:bg-[#f4dda3] transition-all duration-300"
                        onClick={() => {
                            setShowPage(showPage + 1);
                            setIsLandlord(true);
                        }}
                    >
                        I want to lease out my rental property.
                    </button>
                </div>
            </div>
        </>
        
    )
}