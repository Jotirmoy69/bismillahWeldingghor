"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import axios from "axios";
import LocomotiveScroll from "locomotive-scroll";

export default function Home() {
  const refDiv = useRef(null);
  const [X, setX] = useState(0);
  const [Y, setY] = useState(0);
  const [name, setName] = useState([
    "RAGIB", "SADIK", "MIFTAHUL", "TAHIAT", "MUSFIK", "SAFIN", "RAIYAN",
    "RAGIB", "SADIK", "MIFTAHUL", "TAHIAT", "MUSFIK", "SAFIN", "RAIYAN",
    "RAGIB", "SADIK", "MIFTAHUL", "TAHIAT", "MUSFIK", "SAFIN", "RAIYAN",
  ]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".tagline h1", {
      x: -50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "easeInOut",
    });

    gsap.from(".top-image", {
      y: -50,
      stagger: 0.2,
      opacity: 0,
      duration: 2,
    });

    gsap.utils.toArray(".card").forEach((card) => {
      gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      });
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/data");
        setMembers(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleMouse = (e) => {
    const { clientX, clientY } = e;

    if (refDiv.current) {
      const rect = refDiv.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const offsetX = clientX - centerX;
      const offsetY = clientY - centerY;

      setX(clientX);
      setY(clientY);

      gsap.to(refDiv.current, {
        rotateX: -offsetY * 0.07,
        rotateY: offsetX * 0.05,
        transformPerspective: 1000,
        transformOrigin: "center",
        duration: 2,
        ease: "power2.out",
      });
    }
  };

  return (
    <main data-barba="container" data-barba-namespace="home">
      <div className="w-full h-[100vh] bg-cover bg-[url('/bg.svg')] scale-x-[102%] flex md:flex-row flex-col relative">
        <div onMouseMove={handleMouse} className="absolute w-full h-full z-50"></div>

        <div
          ref={refDiv}
          className="tagline md:pl-20 text-gray-800 md:w-1/2 w-full pl-10 py-10 md:mt-40 mt-20 z-10"
        >
          <h1 className="font-[valorant] lg:text-[7vw] md:text-6xl text-4xl">Forging Strength,</h1>
          <h1 className="font-[valorant] lg:text-[7vw] md:text-6xl text-4xl">Crafting Connections,</h1>
          <h1 className="font-[valorant] lg:text-[7vw] md:text-6xl text-4xl">Your Trusted Welding</h1>
          <h1 className="font-[valorant] lg:text-[7vw] md:text-6xl text-4xl">House.</h1>
        </div>

        <div className="md:w-1/2 w-full h-full flex gap-1.5 md:gap-5 md:mt-52 pr-0 md:pr-20 mt-7 justify-center z-10">
          <img src="/ragib.png" alt="Ragib" className="top-image rounded-2xl object-cover h-60 md:h-96 w-24 md:w-36 mt-[5vh] shadow-[0_0_30px_#2973B2]" />
          <img src="/miftahul.png" alt="Miftahul" className="top-image rounded-2xl object-cover h-60 md:h-96 w-24 md:w-36 shadow-[0_0_30px_#2973B2]" />
          <img src="/sadik.png" alt="Sadik" className="top-image rounded-2xl object-cover h-60 md:h-96 w-24 md:w-36 mt-[-5vh] shadow-[0_0_30px_#2973B2]" />
        </div>
      </div>

      <div className="w-full overflow-hidden rounded-bl-xl rounded-br-xl">
        <div className="w-full md:h-60 h-30 bg-[#48A6A7] text-white font-[valorant] flex items-center">
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

        <h1 className="font-[valorant] md:text-6xl text-3xl md:text-end text-center pt-10 px-20">
          MEMBERS
        </h1>

        <div className="card-container w-full h-full md:p-16 p-5 flex gap-10 flex-row flex-wrap font-[valorant]">
          {members.map((item, index) => (
            <div
              key={index}
              className="card w-[85vh] h-96 hover:bg-[#48A6A7] hover:text-white transform hover:-translate-y-2 transition-all rounded-xl"
            >
              <div className="h-4/6 w-full flex justify-center items-center">
                <div className="w-1/2 h-full p-10">
                  <h1 className="font-[valorant] md:text-8xl text-4xl">{item.name}</h1>
                  <h2 className="font-[valorant] md:text-4xl text-2xl">{item.post}</h2>
                </div>
                <div className="w-1/2 h-full flex items-center justify-center mr-5">
                  <Image
                    src={item.img}
                    alt="profilePic"
                    className="rounded-3xl"
                    width={200}
                    height={200}
                  />
                </div>
              </div>
              <div className="h-1/4 w-full flex p-8 pt-0 font-[valorant] text-xs md:text-2xl">
                <h4 className="rounded-2xl">{item.description}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}