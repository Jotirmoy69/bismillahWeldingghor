"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import axios from "axios";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, []);

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

  const [name, setName] = useState("");
  const [post, setPost] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [button, setButton] = useState(false);
  const [members, setMembers] = useState([]);
  const [member, setmember] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name || !post || !description || !image) {
      alert("Please fill in all fields");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "bismillah");
    formData.append("cloud_name", "dkti0j10w");
  
    const response = await fetch(`https://api.cloudinary.com/v1_1/dkti0j10w/image/upload`, {
      method: "POST",
      body: formData,
    });
  
    const data = await response.json();
  
    const newMember = {
      name: name.toUpperCase(),
      post: post.toUpperCase(),
      description: description,
      img: data.url, // Make sure this matches your MongoDB schema (you used 'img' in frontend)
    };
  
    try {
      const response = await axios.post('/api/add', newMember, {
        headers: { "Content-Type": "application/json" },
      });
  
      console.log(response.data);
      setMembers([...members, newMember]); // Update UI immediately
      setButton(false); // Close modal
      setName("");
      setPost("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error(error);
    }
  };
  

  // const [members, setMembers] = useState([
  //   {
  //     name: "RAGIB",
  //     post: "FOUNDER",
  //     description:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  //     img: "/ragib2.svg",
  //   },
  //   {
  //     name: "SADIK",
  //     post: "HANDLING MASTER",
  //     description:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  //     img: "/sadik2.svg",
  //   },
  //   {
  //     name: "MIFTAHUL",
  //     post: "SUIPER",
  //     description:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  //     img: "/miftahul2.svg",
  //   },
  //   {
  //     name: "TAHIAT",
  //     post: "METHOR",
  //     description:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  //     img: "/tahiat2.svg",
  //   },
  //   {
  //     name: "MUSFIK",
  //     post: "WELDER",
  //     description:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  //     img: "/musfik2.svg",
  //   },
  // ]);

  return (
    <section>
      {button && (
        <div className="min-h-screen fixed p-5 buttom-[50%]  w-full flex items-center justify-center inset-0 bg-transparent backdrop-blur-md ">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
            <div className="flex justify-end absolute top-5  right-5">
              <button onClick={() => setButton(false)}>
                <RxCross2 className="text-2xl cursor-pointer" />
              </button>
            </div>
            <h2 className="text-4xl  text-center text-black font-[valorant] mb-6">
              Add Member
            </h2>
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className=" font-[valorant] block text-2xl font-medium text-gray-700 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#6E5AEF] focus:border-[#6E5AEF]"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Post */}
              <div className="mb-4">
                <label
                  htmlFor="post"
                  className=" font-[valorant] block text-2xl font-medium text-gray-700 mb-2"
                >
                  Post Title
                </label>
                <input
                  type="text"
                  id="post"
                  name="post"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#6E5AEF] focus:border-[#6E5AEF]"
                  placeholder="Enter post title"
                  value={post}
                  onChange={(e) => setPost(e.target.value)}
                  required
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className=" font-[valorant] block text-2xl font-medium text-gray-700 mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#6E5AEF] focus:border-[#6E5AEF]"
                  placeholder="Write a description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              {/* Image */}
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className=" font-[valorant] block text-2xl font-medium text-gray-700 mb-2"
                >
                  Upload Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#6E5AEF] focus:border-[#6E5AEF]"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="bg-[#C5F1FF] font-[valorant] text-black text-2xl py-2 px-6 rounded-lg hover:bg-[#A9D9F9] transition-colors w-full sm:w-auto"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className=" w-full dashboard py-5">
        <div className="flex justify-between items-center px-10">
          <button
            type="button"
            onClick={() => setButton(true)}
            className=" font-[valorant] rounded-lg text-xl px-5 py-2.5 me-2 mb-2 bg-[#C5F1FF] hover:bg-[#ACD6FF] transition-all duration-200 cursor-pointer"
          >
            Add Member
          </button>
          <h1 className="text-2xl font-[valorant] text-end">Dashboard</h1>
        </div>

        <div className="card-container w-full h-full  md:p-10 p-5 justify-center flex md:gap-10  gap-5 flex-wrap font-[valorant] ">
          {/* card */}
          {members.map((item, index) => (
            <div
              key={index}
              className="card w-[85vh] h-96 bg-[#BBEEFF] rounded-xl"
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
                    width={230}
                    height={230}
                  />
                </div>
              </div>
              <div className="h-1/4 w-full flex p-8 pt-0 font-[valorant] text-xs md:text-2xl ">
                <h4>{item.description}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
