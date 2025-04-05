"use client";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import React, { useState } from "react";
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  const [loading, setLoading] = useState(false);  // Track loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);  // Set loading to true when the form is submitted
    
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post(
        "/api/mongodb",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success(res.data.message); // ✅ Fix 1

      if (res.status === 200) { // ✅ Fix 2
        localStorage.setItem('loggedIn', 'true')
        router.push("/dashboard");
      }

    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to submit data");
    } finally {
      setLoading(false);  // Set loading to false when the request finishes
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
            className="block mb-2 text-xl font-medium text-gray-900 font-[valorant]"
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

        {/* Show loader when submitting */}
        <button
          type="submit"
          className={`text-black hover:bg-sky-300 transition-all duration-200 bg-[#C5F1FF] font-[valorant] focus:ring-4 focus:outline-none  font-medium rounded-lg text-xl w-full px-5 py-2.5 text-center ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
          disabled={loading}  // Disable the button while loading
        >
          {loading ? (
            <div className="flex justify-center">
              <div className="w-6 h-6 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div> {/* Loader */}
            </div>
          ) : (
            'Submit'
          )}
        </button>
      </form>
      <ToastContainer />
    </section>
  );
}
