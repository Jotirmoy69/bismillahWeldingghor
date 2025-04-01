"use client";
import { motion } from "motion/react";
import Navbar from "@/Components/Navbar";
import Image from "next/image";
// import LocomotiveScroll from 'locomotive-scroll';
import { useEffect, useState } from "react";

export default function Home() {
  const [name, setName] = useState([
    "RAGIB",
    "SADIK",
    "MIFTAHUL",
    "TAHIAT",
    "MUSFIK",
    "SAFIN",
    "RAIYAN",
    "RAGIB",
    "SADIK",
    "MIFTAHUL",
    "TAHIAT",
    "MUSFIK",
    "SAFIN",
    "RAIYAN",
    "RAGIB",
    "SADIK",
    "MIFTAHUL",
    "TAHIAT",
    "MUSFIK",
    "SAFIN",
    "RAIYAN",
  ]);

  const [members, setMembers] = useState([
    {
      name: "RAGIB",
      post: "FOUNDER",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      img: "/ragib2.svg",
    },
    {
      name: "SADIK",
      post: "HANDLING MASTER",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      img: "/sadik2.svg",
    },
    {
      name: "MIFTAHUL",
      post: "SUIPER",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      img: "/miftahul2.svg",
    },
    {
      name: "TAHIAT",
      post: "METHOR",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      img: "/tahiat2.svg",
    },
    {
      name: "MUSFIK",
      post: "WELDER",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      img: "/MUSFIK2.svg",
    }
  ]);
  

  useEffect(() => {
    // const locomotiveScroll = new LocomotiveScroll();
  }, []);
  return (
    <main>
      <Navbar />
      {/* hero section */}
      <div className="w-full h-[100vh] bg-cover bg-[url('/bg2.svg')] md:px-20 md:py-20 px-10 flex md:flex-row flex-col">
        <div className="md:w-1/2 w-full  py-10">
          <h1 className="font-[valorant] lg:text-[7vw] md:text-6xl text-4xl">
            Forging Strength, Crafting Connections, Your Trusted Welding House.
          </h1>
        </div>

        <div className="md:w-1/2 w-full h-full py-10">
          <Image
            src="/hero-right.png"
            alt="logo"
            width={650}
            height={650}
            className="mt-5"
          />
        </div>
      </div>

      {/* second section */}

      <div className="w-full  overflow-hidden rounded-bl-xl rounded-br-xl">
      <div className="w-full md:h-60 h-30 bg-[#BBEEFF] font-[valorant] flex items-center">
        <motion.div
          className="flex gap-10 whitespace-nowrap"
          initial={{ x: "0%" }}
          animate={{ x: "-100%" }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          {name.map((item, index) => (
            <span key={index} className="md:text-9xl text-7xl">
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* cards section
      <h1 className="font-[valorant] md:text-9xl text-7xl text-center pt-10">MEMBERS</h1> */}
      <div className="w-full h-full md:p-16 p-5 flex gap-10 flex-row flex-wrap font-[valorant] ">
        {/* card */}
        {members.map((item, index) => (
          <div key={index} className="w-[85vh] h-96 bg-[#BBEEFF] rounded-xl">
          <div className="h-4/6 bg-amber-20 w-full flex justify-center items-center">
          <div  className="w-1/2 h-full p-10">
          <h1 className="font-[valorant] md:text-8xl text-4xl">{item.name}</h1>
          <h2 className="font-[valorant] md:text-4xl text-2xl">{item.post}</h2>
          </div>
          <div className="w-1/2 h-full flex items-center justify-center mr-5">
          <Image src={item.img} alt="profilePic" width={230} height={230}/>
          </div>
          </div>
          <div className="h-1/4 w-full flex p-8 pt-0 font-[valorant] text-xs md:text-2xl ">
          <h4 >{item.description}</h4>
          </div>
        </div>
        ))}

        

        
        
      </div>
    </div>
    </main>
  );
}
