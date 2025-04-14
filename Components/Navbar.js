'use client'
import React, { useState, useEffect } from "react";
import { IoMenu } from "react-icons/io5";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import gsap from "gsap";
const Navbar = () => {


const [scrollingUp, setScrollingUp] = useState(true);
const [lastScrollY, setLastScrollY] = useState(0);

useEffect(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setScrollingUp(currentScrollY < lastScrollY || currentScrollY < 10);
    setLastScrollY(currentScrollY);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [lastScrollY]);


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
<header
  className={`fixed top-0 left-0 w-full md:h-16 h-20 z-50 px-5 md:px-0 flex items-center justify-between md:justify-around backdrop-blur-xs bg-white/300 transition-transform duration-500 ${
    scrollingUp ? "translate-y-0" : "-translate-y-full"
  }`}
>
  {/* Logo & Branding */}
  <div className="flex items-center gap-2">
    <Image
      src="/logo.png"
      className="rotate-[20deg] md:w-16 md:h-16 w-10 h-10"
      alt="logo"
      width={70}
      height={70}
    />
    <h2 className="font-[valorant] md:text-3xl text-2xl">Bismillah</h2>
  </div>

  {/* Desktop Navigation */}
  <ul className="md:flex gap-5 font-[valorant] text-2xl hidden">
    <Link href="/"><li>Home</li></Link>
    <Link href="/services"><li>Services</li></Link>
    <Link href="/"><li>Contact Us</li></Link>
  </ul>

  {/* Pricing - shown separately only on desktop */}
  <div className="hidden md:block font-[valorant] text-2xl">
    <Link href="/pricing" className="bg-[#48A6A7] rounded-xs">
      <button className=" border-3 rounded-full px-5 bg-[#F2EFE7] hover:bg-[#48A6A7] duration-200 hover:text-white transition-all">Pricing</button>
    </Link>
  </div>

  {/* Mobile Menu Button */}
  <ul className="flex gap-5 font-[valorant] text-2xl md:hidden">
    <li><IoMenu onClick={() => setIsShow(!isShow)} /></li>
  </ul>

  {/* Mobile Menu Modal */}
  <div
    className={`fixed top-0 left-0 w-full h-full backdrop-blur-md bg-white/80 z-40 transition-all duration-300 ${
      isShow ? "flex" : "hidden"
    } justify-center items-center`}
  >
    <div className="h-[60%] w-80 rounded-xl px-6 py-8 flex flex-col justify-between items-center bg-[#BBEEFF] relative shadow-xl">
      <button
        className="absolute top-4 right-4"
        onClick={() => setIsShow(false)}
      >
        <RxCross2 size={24} />
      </button>
      <ul className="flex flex-col gap-6 font-[valorant] text-3xl items-center">
        <li onClick={() => setIsShow(false)}><Link href="/">Home</Link></li>
        <li onClick={() => setIsShow(false)}><Link href="/services">Services</Link></li>
        <li onClick={() => setIsShow(false)}><Link href="/">Contact Us</Link></li>
        <li onClick={() => setIsShow(false)}><Link href="/pricing">Pricing</Link></li>
      </ul>
    </div>
  </div>
</header>


  );
};

export default Navbar;
