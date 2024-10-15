import Image from "next/image";
import RENT1 from "@public/images/rent1.jpg";
import RENT2 from "@public/images/rent2.jpg";

export default function SlideShowContainer() {
  return (
    <div className="relative w-20 h-20">
     
    
        <Image 
          src={RENT2}
          alt="Rent 1 Slideshow"
          fill
          sizes="100%"
          className="rounded-lg"
          style={{ objectFit: "cover" }}
        />
    

    </div>
  );
}
