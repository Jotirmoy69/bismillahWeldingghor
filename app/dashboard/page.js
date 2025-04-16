"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";

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
  const [isFetched, setIsFetched] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetched(false);
      try {
        const response = await axios.get("/api/data");
        setMembers(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch members.");
      } finally {
        setIsFetched(true);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const trimmedName = name.trim().toUpperCase();

    if (!name || !post || !description || !image) {
      toast.error("Please fill in all fields");
      setIsSubmitting(false);
      return;
    }

    if (members.some((member) => member.name === trimmedName)) {
      toast.error("Member already exists");
      setIsSubmitting(false);
      return;
    }

    try {
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
        name: trimmedName,
        post: post.toUpperCase(),
        description,
        img: data.url,
      };

      const response = await axios.post("/api/add", newMember, {
        headers: { "Content-Type": "application/json" },
      });

      setMembers((prev) => [...prev, response.data.newMember || newMember]);
      setButton(false);
      setName("");
      setPost("");
      setDescription("");
      setImage(null);
      toast.success("Member added successfully");
    } catch (error) {
      console.error("Error adding member:", error);
      toast.error("Failed to add member.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      const response = await axios.post(
        "/api/delete",
        { _id: id },
        { headers: { "Content-Type": "application/json" } }
      );

      setMembers((prev) => prev.filter((member) => member._id !== id));
      toast.success("Member deleted successfully");
    } catch (error) {
      console.error("Error deleting member:", error);
      toast.error("Failed to delete member.");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen pt-[64px] dashboard">
      {/* Modal */}
      {button && (
        <div className="min-h-screen fixed inset-0 z-50 p-5 flex items-center justify-center bg-transparent backdrop-blur-md">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              onClick={() => setButton(false)}
              className="absolute top-5 right-5"
            >
              <RxCross2 className="text-2xl cursor-pointer" />
            </button>
            <h2 className="text-4xl text-center text-black font-[valorant] mb-6">
              Add Member
            </h2>
            <form onSubmit={handleSubmit}>
              {/* Input Fields */}
              {[
                { label: "Name", state: name, setter: setName, type: "text" },
                { label: "Post Title", state: post, setter: setPost, type: "text" },
              ].map(({ label, state, setter, type }) => (
                <div className="mb-4" key={label}>
                  <label className="block text-2xl font-medium text-gray-700 font-[valorant] mb-2">
                    {label}
                  </label>
                  <input
                    type={type}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#6E5AEF] focus:border-[#6E5AEF]"
                    placeholder={`Enter ${label.toLowerCase()}`}
                    value={state}
                    onChange={(e) => setter(e.target.value)}
                    required
                  />
                </div>
              ))}
              {/* Description */}
              <div className="mb-4">
                <label className="block text-2xl font-medium text-gray-700 font-[valorant] mb-2">
                  Description
                </label>
                <textarea
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
                <label className="block text-2xl font-medium text-gray-700 font-[valorant] mb-2">
                  Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#6E5AEF] focus:border-[#6E5AEF]"
                />
              </div>
              {/* Submit */}
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-[#C5F1FF] font-[valorant] text-black text-2xl py-2 px-6 rounded-lg w-full sm:w-auto transition-all duration-200 ${
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

      {/* Dashboard */}
      <div className="w-full dashboard py-5">
        <div className="flex justify-between items-center px-10">
          <button
            onClick={() => setButton(true)}
            className="font-[valorant] rounded-lg text-xl px-5 py-2.5 bg-[#C5F1FF] hover:bg-[#ACD6FF] transition-all duration-200"
          >
            Add Member
          </button>
          <h1 className="text-2xl font-[valorant]">Dashboard</h1>
        </div>

        <div className="card-container w-full h-full p-5 md:p-10 flex flex-wrap gap-5 justify-center font-[valorant]">
          {/* Loading or Empty Message */}
          {!isFetched ? (
            <h1 className="text-2xl md:text-4xl">
              Fetching Data
              <motion.span animate={{ opacity: 1 }}>{dots}</motion.span>
            </h1>
          ) : members.length === 0 ? (
            <h1 className="text-xl mt-10 text-center">No members found.</h1>
          ) : (
            members.map((item, index) => (
              <div
                key={index}
                className="card w-[85vh] relative h-96 bg-[#BBEEFF] rounded-xl"
              >
                <button
                  onClick={() => handleDelete(item._id)}
                  disabled={deletingId === item._id}
                  className={`text-white absolute top-3 right-3 bg-gradient-to-r from-red-400 via-red-500 to-red-600 rounded-lg text-xl px-5 py-2 transition-all ${
                    deletingId === item._id
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gradient-to-br focus:ring-4"
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
                <div className="h-4/6 flex">
                  <div className="w-1/2 p-10">
                    <h1 className="text-4xl md:text-8xl">{item.name}</h1>
                    <h2 className="text-2xl md:text-4xl">{item.post}</h2>
                  </div>
                  <div className="w-1/2 flex items-center justify-center">
                    <Image
                      src={item.img}
                      alt="profilePic"
                      width={200}
                      height={200}
                      className="rounded-full"
                    />
                  </div>
                </div>
                <div className="h-1/4 p-8 pt-0 text-xs sm:text-xl lg:text-2xl">
                  <h4>{item.description}</h4>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
