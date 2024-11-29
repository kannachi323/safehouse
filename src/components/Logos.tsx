import Image from 'next/image';
import SammySlug from '@public/images/sammy_logo.jpg'
import Link from 'next/link';

interface Props {
  className? : string;
  width?: number;
  height?: number;
}


export default function Logo({className, width=80, height=80} : Props) {
    return (
      <Link href="/" className={className}>
        <div className="flex flex-row items-center justify-center"> 
          <Image
            src={SammySlug}
            width={width}
            height={height}
            alt="some logo"
          />
          <b className="text-3xl ml-5 pr-5 hover:text-[#ffc00c]">SafeHouse</b>
        </div>
      </Link>
   
        

    )
}