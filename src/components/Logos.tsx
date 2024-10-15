import Image from 'next/image';
import SammySlug from '@public/images/sammy_logo.jpg'
import Link from 'next/link';

interface LogoProps {
    linkHref?: string;
}

export default function Logo({ linkHref = "/" }: LogoProps) {
    return (
            <Image
              src={SammySlug}
              width={80}
              height={80}
              alt="some logo"
            />
   
        

    )

    
}