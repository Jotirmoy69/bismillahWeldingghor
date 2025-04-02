'use client'
import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import gsap from "gsap";
const Navbar = () => {

  useGSAP(()=>{
    gsap.from("ul li", {
      y:-50,
      duration:1,
      opacity:0,
      stagger:0.2
    }),

    gsap.from(".logo , .h2", {
      y:-50,
      duration:1,
      opacity:0,
      stagger:0.2
    })
  })




  const [isShow, setIsShow] = useState(false)
  return (
    <header className="md:px-10 px-5 w-full bg-[#BBEEFF] h-16 opacity-85 flex items-center md:justify-around justify-between">
      <div className="flex items-center">
        <Image
          src="/logo.png"
          className="logo rotate-[20deg] md:w-16 md:h-16 w-10 h-10"

          alt="logo"
          width={70}
          height={70}
        />
        <h2 className=" h2 font-[valorant] md:text-3xl text-2xl">Bismillah</h2>
      </div>
      <ul className="md:flex gap-5 font-[valorant] text-2xl hidden ">
        <Link href={"/"}><li>Home</li></Link>
        <Link href={"/services"}><li>Sevices</li></Link>
        <Link href={"/"}><li>Contact Us</li></Link>
      </ul>
      <ul className="flex gap-5 font-[valorant] text-2xl md:hidden "> 
        <li><IoMenu onClick={() => setIsShow(!isShow)} /></li>
      </ul>




    <div className={`fixed top-0 left-0 w-full h-full flex justify-center bg-white items-center ${isShow ? "block" : "hidden"} `}>
      <div className="h-52 w-72 rounded-xl pb-10 px-5   flex justify-center items-center list-none font-[valorant] text-4xl flex-col bg-[#BBEEFF]">
        <div className="w-full flex justify-end pt-4"><RxCross2 size={20} onClick={() => setIsShow(!isShow)} /></div>
         <li className="h-1/3 border-b-2 w-full flex justify-center ">Home</li>
         <li className="h-1/3 border-b-2 w-full flex justify-center ">Services</li>
         <li className="h-1/3 border-b-2 w-full flex justify-center ">Contact Us</li>

      </div>
    </div>
    </header>
  );
};

export default Navbar;
