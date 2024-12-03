import Image from "next/image";
import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect } from "react";

export function Carousel({ images, height, width }: { images: string[], height: string, width: string }) {
  const xTranslation = useMotionValue(0);

  useEffect(() => {
    const cardWidth = 300; // Width of each PhotoCard (adjust as needed)
    const gap = 4; // Gap between cards (gap-4 = 4rem)
    const totalWidth = (cardWidth + gap) * images.length; // Total width of one set of images

    // Start infinite animation for seamless scroll
    const controls = animate(xTranslation, [0, -totalWidth], {
      ease: "linear",
      duration: 25, // Adjust duration for scrolling speed
      repeat: Infinity,
    });

    return () => controls.stop(); // Cleanup on unmount
  }, [xTranslation, images.length]);

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-4"
        style={{
          x: xTranslation,
        }}
      >
        {/* Duplicate the images array for seamless scrolling */}
        {[...images, ...images].map((image, index) => (
          <PhotoCard image={image} key={index} height={height} width={width} />
        ))}
      </motion.div>
    </div>
  );
}

interface PhotoCardProps {
  image: string;
  height: string;
  width: string;
}

function PhotoCard({ image, height, width }: PhotoCardProps) {
  return (
    <div className="relative rounded-xl flex justify-center items-center" style={{ height, width }}>
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
