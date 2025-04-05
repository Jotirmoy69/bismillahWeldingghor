"use client";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import React from "react";
import { useRouter } from 'next/navigation'

const page = () => {
    const router = useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post("/api/mongodb",{ username, password },{ headers: { "Content-Type": "application/json" } } // Add headers in the config object
      );

      toast.success(res.message); 

       if(res.status === 200){
        router.push("/dashboard");
       }
    } catch (error) {
      console.error(error); // Log any errors
      toast.error("Failed to submit data"); // Show error message
    }
  };

  return (
    <section className="login h-screen">
      <form className="max-w-sm mx-auto pt-30" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-xl font-medium text-gray-900 font-[valorant]"
          >
            Your username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Username"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-xl font-medium text-gray-900  font-[valorant]"
          >
            Your password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="text-black hover:bg-sky-300 transition-all duration-200 bg-[#C5F1FF] font-[valorant] focus:ring-4 focus:outline-none  font-medium rounded-lg text-xl w-full px-5 py-2.5 text-center "
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </section>
  );
};

export default page;
