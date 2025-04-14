"use client";
// import { motion } from "motion/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
// import LocomotiveScroll from 'locomotive-scroll';
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import axios from "axios";
import LocomotiveScroll from "locomotive-scroll";

export default function Home() {
  const refDiv = useRef(null);
  const [X, setX] = useState();
  const [Y, setY] = useState();

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, []);

  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(useGSAP);
  useGSAP(() => {
    gsap.from(".tagline h1", {
      x: -50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "easeInOut",
    });

    gsap.from(".top-right", {
      y: -50,
      stagger: 0.2,
      opacity: 0,
      duration: 2,
    });

    gsap.utils.toArray(".card").forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: card,
          start: "top 80%", // When top of card hits 80% of viewport
          end: "bottom 20%", // When bottom of card hits 20% of viewport
          toggleActions: "play none none none",
        }, // Stagger delay (0.2s between each card)
      });
    });
  });
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

  const [members, setMembers] = useState([]);

  useEffect(() => {
    // Define the async function inside useEffect
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/data");
        setMembers(response.data.data); // Assuming response.data.data contains your members
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function
  }, []);

  const handleMouse = (e) => {
    const { clientX, clientY } = e;

    // Scale and set state values

    if (refDiv.current) {
      const rect = refDiv.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const offsetX = clientX - centerX;
      const offsetY = clientY - centerY;

      console.log(offsetX, offsetY);
      setX(clientX);
      setY(clientY);
      // Optional: apply some transformation based on offset

        gsap.to(refDiv.current, {
          transform: `rotateX(${-offsetY * 0.07}deg) rotateY(${
            offsetX * 0.05
          }deg)`,
          duration:2
        });
      
    }
  };

  return (
    <main data-barba="container" data-barba-namespace="home">
      {/* hero section */}
      <div className="w-full main-cheese h-[100vh] bg-cover bg-[url('/bg.svg')] md:px-0 md:py-0 scale-x-[1.03]  flex md:flex-row flex-col">
        <div
          onMouseMove={handleMouse}
          className="absolute w-full h-full  z-99 "
        ></div>
        <div
          ref={refDiv}
          // style={{transform: `rotateX(-${Y}deg) rotateY(${X}deg)`}}
          className={`tagline md:pl-20  text-gray-800 md:w-1/2 w-full md:p-0 pl-10 py-10 md:mt-40 mt-20 `}
        >
          <h1 className="font-[valorant] lg:text-[7vw] md:text-6xl text-4xl">
            Forging Strength,
          </h1>
          <h1 className="font-[valorant] lg:text-[7vw] md:text-6xl text-4xl">
            Crafting Connections,
          </h1>
          <h1 className="font-[valorant] lg:text-[7vw] md:text-6xl text-4xl">
            Your Trusted Welding
          </h1>
          <h1 className="font-[valorant] lg:text-[7vw] md:text-6xl text-4xl">
            House.
          </h1>
        </div>

        <div className="md:w-1/2 w-full h-full  flex gap-1.5 md:gap-5 md:mt-48 md:pr-20  pr-0  mt-7 justify-center  ">
          <img
            src={"/ragib.png"}
            alt="pic"
            height={15}
            width={150}
            className="rounded-2xl object-cover h-60 md:h-96 w-24 md:w-36 mt-[5vh] top-right  md:transition-all   shadow-[0_0_30px_#2973B2]"
          />
          <img
            src={"/miftahul.png"}
            alt="pic"
            height={15}
            width={150}
            className="rounded-2xl object-cover h-60 md:h-96 w-24 md:w-36 top-right   md:transition-all   shadow-[0_0_30px_#2973B2]"
          />
          <img
            alt="pic"
            height={15}
            width={150}
            src={"/sadik.png"}
            className="rounded-2xl object-cover h-60 md:h-96 w-24 md:w-36 mt-[-5vh] top-right   md:transition-all   shadow-[0_0_30px_#2973B2]"
          />

          {/* <Image
            src="/hero-right.png"
            alt="logo"
            width={650}
            height={650}
            className="mt-5 top-right"
          /> */}
        </div>
      </div>

      {/* second section */}

      <div className="w-full  overflow-hidden rounded-bl-xl rounded-br-xl">
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
        <div className="card-container w-full h-full md:p-16 p-5 flex gap-10 flex-row flex-wrap font-[valorant] ">
          {/* card */}
          {members.map((item, index) => (
            <div
              key={index}
              className="card w-[85vh] h-96 hover:bg-[#BBEEFF transform hover:-translate-y-2 transition-all rounded-xl"
            >
              <div className="h-4/6 bg-amber-20 w-full flex justify-center items-center">
                <div className="w-1/2 h-full p-10">
                  <h1 className="font-[valorant] md:text-8xl text-4xl">
                    {item.name}
                  </h1>
                  <h2 className="font-[valorant] md:text-4xl text-2xl">
                    {item.post}
                  </h2>
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
              <div className="h-1/4 w-full flex p-8 pt-0 font-[valorant] text-xs md:text-2xl  ">
                <h4 className=" rounded-2xl pl-2xl">{item.description}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
