"use client";

import { Menu, X } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { ConnectWallet } from "@thirdweb-dev/react";

import logo from "@/public/Logo/DL_Logo.png";
import { navItems } from "@/app/constants";

import { useState } from "react";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const toggleNavbar = () => setToggle(!toggle);

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b-[1px] border-[#60799e] text-white">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <Image src={logo} alt="Logo" className="h-10 w-10 mr-2" />
            <span className="text-xl tracking-tight">SwimmingPool</span>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li
                key={index}
                className="transition-transform transform hover:-translate-y-1 duration-300"
              >
                <Link href={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex justify-center items-center space-x-4">
            <div className=" py-2 px-3 rounded-3xl text-white w-[180px]">
              <ConnectWallet />
              {/* Connect Wallet */}
            </div>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {toggle ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {toggle && (
          <div className="fixed right-0 z-20 bg-[#000626] w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <Link href={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
            <div className="flex space-x-6">
              <div className=" py-2 px-3 rounded-3xl text-white w-[180px]">
                <ConnectWallet />
                {/* Connect Wallet */}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
