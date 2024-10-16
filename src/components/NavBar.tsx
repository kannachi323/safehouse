import Link from "next/link";
import Logo from "@/components/Logos";
import { MdOutlineMenu } from "react-icons/md";


export default function NavBar() {
  return (
    <div className="w-screen flex flex-row justify-between items-center bg-[#013c6c]
     text-white border-b-2 border-b-[#ffc00c] p-1"
    >

      <div className="flex flex-row items-center justify-start">
        <MdOutlineMenu className="text-3xl m-5 cursor-pointer hover:text-[#ffc00c]"/>
        <Link className="m-5 hover:text-[#ffc00c]" href="/rent">Rent</Link>
        
        <Link className="m-5 hover:text-[#ffc00c]" href="/contact">Contact Us</Link>
        <Link className="m-5 hover:text-[#ffc00c]" href="/help">Help</Link>
        
      </div>

      <Link href="/">
        <div className="flex flex-row items-center justify-center">
          <Logo />
          <b className="text-3xl ml-5 pr-5 hover:text-[#ffc00c]">SafeHouse</b>
        </div>
      
      
      </Link>
      
      
      <div className="flex flex-row items-center justify-end">
        <Link className="m-5 hover:text-[#ffc00c]" href="/apply">Apply</Link>
        <Link className="m-5 hover:text-[#ffc00c]" href="/rent">Manage rentals</Link>
        <Link className="m-5 hover:text-[#ffc00c]" href="/user-register">Sign Up</Link>
        <Link className="m-5 hover:text-[#ffc00c]" href="/user-login">Log In</Link>
      </div>
    </div>
  );
}