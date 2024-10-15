import Link from "next/link";
import Logo from "@/components/Logos";

export default function NavBar() {
  return (
    <div className="h-[10vh] flex flex-row items-center p-1 bg-[#013c6c] text-white">
      <Link href="/">
        <div className="flex flex-row items-center ">
          <Logo />
          <b className="text-3xl ml-5">SafeHouse</b>
        </div>
      
      
      </Link>
      
      
      <div className="ml-auto flex justify-between">
        <Link className="m-5" href="/rent">Rent</Link>
        <Link className="m-5" href="/apply">Apply</Link>
        <Link className="m-5" href="/contact">Contact Us</Link>
        <Link className="m-5" href="/user-register">Sign Up</Link>
        <Link className="m-5" href="/user-login">Log In</Link>
      </div>
    </div>
  );
}