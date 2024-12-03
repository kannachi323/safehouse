import Image from "next/image";
import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect } from "react";

export function Carousel({images, animated = true} : {images: string[], animated?: boolean}) {
 
  const xTranslation = useMotionValue(0);

  useEffect(() => {
    if (animated) {
      const cardWidth = 300; // Width of each PhotoCard (adjust as needed)
      const gap = 16; // Gap between cards (gap-4 = 4rem)
      const totalWidth = (cardWidth + gap) * images.length; // Total width of one set of images

      // Start infinite animation for seamless scroll
      const controls = animate(xTranslation, [0, -totalWidth], {
        ease: "linear",
        duration: 30, // Adjust duration for scrolling speed
        repeat: Infinity,
      });
    

      return controls.stop; // Cleanup on unmount
    }
  }, [xTranslation, images.length]);

  return (
    <div className="overflow-hidden w-full h-[50vh]">
      <motion.div
        className="flex gap-4"
        style={{
          x: xTranslation,
          width: "max-content",
        }}
      >
        {/* Duplicate the images array for seamless scrolling */}
        {[...images, ...images].map((image, index) => (
          <PhotoCard image={image} key={index} />
        ))}
        
      </motion.div>
    </div>
  );
}

interface PhotoCardProps {
  image: string;
}

function PhotoCard({ image }: PhotoCardProps) {
  return (
    <div className="relative w-[300px] h-[300px] rounded-xl flex justify-center items-center">
      <Image
        src={image}
        alt="Image"
        fill
        style={{ objectFit: "cover" }}
        className="rounded-lg"
      />
    </div>
  );
}
