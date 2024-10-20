"use client";
import Link from "next/link";
import Logo from "@/components/Logos";
import { MdOutlineMenu } from "react-icons/md";
import React, {useState} from 'react';

export default function NavBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    console.log("Menu toggled:", !isSidebarOpen);
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <div className="w-screen flex flex-row justify-between items-center bg-[#013c6c] text-white border-b-2 border-b-[#ffc00c] p-1">
        <div className="flex flex-row items-center justify-start">
          <MdOutlineMenu className="text-3xl m-5 cursor-pointer hover:text-[#ffc00c]" onClick={toggleSidebar} />
          <Link className="m-5 hover:text-[#ffc00c]" href="/rent">Rent</Link>
          <Link className="m-5 hover:text-[#ffc00c]" href="/contact">Contact Us</Link>
          <Link className="m-5 hover:text-[#ffc00c]" href="/help">Help</Link>
        </div>

        <Link href="/">
          <div className="flex flex-row items-center justify-center">
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

      <div
        className={`fixed top-0 left-0 h-full bg-[#013c6c] text-white p-5 z-50 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "250px" }}>
        <h2 className="text-xl font-bold mb-5">Filters</h2>
        <ul>
          <li className="mb-5"><button className="bedrooms">Bedrooms</button>
          </li>
          <li className="mb-5"><button className="Bathrooms">Bathrooms</button>
          </li>
          <li className="mb-5"><button className="price-range">Price Range</button>
          </li>
          <li className="mb-5"><button className="distance">Distance</button>
          </li>
          <li className="mb-5"><button className="housing-type">Housing Type</button>
          </li>
          <li className="mb-5"><button className="parking">Parking</button>
          </li>
          <li className="mb-5"><button className="pet-status">Pet Status</button>
          </li>
          <li className="mb-5"><button className="laundry">Laundry</button>
          </li>
          <li className="mb-5">
          </li>
          <li className="mb-5"><button className="mr-3">Reset</button>
          <button>Apply</button>
          </li>
        </ul>
      </div>

    {isSidebarOpen && (
      <div
        className="fixed inset-0 bg-black opacity-50 z-40"
        onClick={toggleSidebar}>
      </div>
    )}
    </div>
  );
}