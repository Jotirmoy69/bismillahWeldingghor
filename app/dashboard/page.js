"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
  const [name, setName] = useState("");
  const [post, setPost] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [button, setButton] = useState(false);
  const [members, setMembers] = useState([]);
  const [dots, setDots] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [member, setmember] = useState();
  const [isFetched, setisFetched] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    // Define the async function inside useEffect
    setisFetched(false);
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/data");
        console.log(response.data.data);

        setMembers(response.data.data); // Assuming response.data.data contains your members
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function
    setisFetched(true);
  }, [members]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const trimmedName = name.trim().toUpperCase();
    
    try {
      // Check if the name already exists in the members array
      if (members.some((member) => member.name.toUpperCase().trim() === trimmedName)) {
        toast.error("Member already exists");
        setIsSubmitting(false);
        return;
      }
      
      try {
      if (!name || !post || !description || !image) {
        alert("Please fill in all fields");
        return;
      }

      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "bismillah");
      formData.append("cloud_name", "dkti0j10w");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dkti0j10w/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      const newMember = {
        name: name.toUpperCase(),
        post: post.toUpperCase(),
        description: description,
        img: data.url, // Make sure this matches your MongoDB schema (you used 'img' in frontend)
      };

      const response = await axios.post("/api/add", newMember, {
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
    } finally {
      toast.success("Member added successfully");
      setIsSubmitting(false);
    }
  } catch (error) {
      console.error("Error adding member:", error);
    } 
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      const response = await axios.post(
        "/api/delete",
        { _id: id },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data);

      if (response.deleted) {
        setMembers(members.filter((member) => member._id.toString() !== id));
      } else {
        console.warn("Delete operation did not return a valid deleted object.");
      }
    } catch (error) {
      console.error("Error deleting member:", error);
    } finally {
      setDeletingId(null);
      toast.success("Member deleted successfully");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      {button && (
        <div className="min-h-screen z-99 fixed p-5 buttom-[50%]  w-full flex items-center justify-center inset-0 bg-transparent backdrop-blur-md ">
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
                  disabled={isSubmitting}
                  className={`bg-[#C5F1FF] font-[valorant] text-black text-2xl py-2 px-6 rounded-lg transition-colors w-full sm:w-auto ${
                    isSubmitting
                      ? "opacity-60 cursor-not-allowed"
                      : "hover:bg-[#A9D9F9]"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-black"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        ></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "Submit"
                  )}
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
          <h1
            className={`md:text-4xl text-2xl ${isFetched ? "hidden" : "block"}`}
          >
            Fetching Data{" "}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {dots}
            </motion.span>
          </h1>
          {/* card */}
          {members.map((item, index) => (
            <div
              key={index}
              className="card w-[85vh] relative h-96 bg-[#BBEEFF] rounded-xl"
            >
              <button
                type="button"
                onClick={() => handleDelete(item._id)}
                disabled={deletingId === item._id}
                className={`text-white absolute top-3 right-3 bg-gradient-to-r from-red-400 via-red-500 to-red-600 rounded-lg text-xl px-5 py-2 text-center transition-all duration-300 ${
                  deletingId === item._id
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800"
                }`}
              >
                {deletingId === item._id ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      ></path>
                    </svg>
                    Deleting...
                  </span>
                ) : (
                  "Delete"
                )}
              </button>

              <div className="h-4/6 bg-amber-20 w-full flex justify-center items-center">
                <div className="w-1/2 h-full p-10">
                  <h1 className="font-[valorant] md:text-8xl text-4xl">
                    {item.name}
                  </h1>
                  <h2 className="font-[valorant] md:text-4xl text-2xl">
                    {item.post}
                  </h2>
                </div>
                <div className="w-1/2 h-full flex items-center justify-center rounded-full mr-5">
                  <Image
                    src={item.img}
                    alt="profilePic"
                    width={200}
                    className="rounded-full"
                    height={200}
                  />
                </div>
              </div>
              <div className="h-1/4 w-full flex p-8 pt-0 font-[valorant] text-xs sm:text-xl lg:text-2xl ">
                <h4>{item.description}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
