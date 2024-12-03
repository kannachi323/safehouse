import Logo from "@/components/Logos";
import Image from "next/image";

interface Props {
    showPage: number;
    setShowPage: (showPage: number) => void;
    setIsLandlord: (isLandlord: boolean) => void;
}

export default function ChooseUser({ showPage, setShowPage, setIsLandlord }: Props) {
    return (
        <>
            <Image
                src={"/images/ucsc-bg.jpg"}
                alt="Background"
                layout="fill"
                objectFit="cover"
                priority={true}
                className="absolute z-[-1]"
            />

            {/* Content */}
            <div className="relative flex flex-col justify-between h-screen px-4 py-10 z-[2]">
                {/* Logo at the top */}
                <Logo className="mt-10 text-white" />

                {/* Centered buttons */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-8 w-full max-w-4xl my-10 flex-grow">
                    {/* Button 1 */}
                    <button
                        className="py-8 px-3 w-full text-2xl font-medium text-white bg-[#013c6c] rounded-2xl shadow-lg hover:bg-[#02548f] transition-all duration-300"
                        onClick={() => {
                            setShowPage(showPage + 1);
                        }}
                    >
                        I want to find a place to live.
                    </button>

                    {/* Button 2 */}
                    <button
                        className="py-4 px-3 w-full text-2xl font-medium text-[#013c6c] bg-[#fdc100] rounded-2xl shadow-lg hover:bg-[#f4dda3] transition-all duration-300"
                        onClick={() => {
                            setShowPage(showPage + 1);
                            setIsLandlord(true);
                        }}
                    >
                        I want to lease out my property.
                    </button>
                </div>
            </div>
        </>
    );
}
