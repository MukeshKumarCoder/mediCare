import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import logo from "../assets/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    toast.error("Invalid credentials", {
      duration: 4000,
      position: "top-right",
      style: {
        borderRadius: "10px",
        background: "#fff",
        color: "#333",
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#D1FADF] flex flex-col items-center justify-center p-4 relative">
      <Toaster />
      <button
        onClick={() => navigate("/")}
        className="absolute top-10 left-10 flex items-center gap-2 text-[#007a55] font-semibold hover:opacity-80 bg-transparent"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        <span className="text-lg">Back to Home</span>
      </button>

      <div className="bg-white p-8 rounded-3xl w-full max-w-md flex flex-col items-center shadow-[0_20px_50px_rgba(0,122,85,0.15)]">
        <img src={logo} alt="Logo" className="w-28 h-28 object-contain mb-1" />
        <h1 className="text-3xl font-bold text-[#007a55] mb-1">Doctor Admin</h1>
        <p className="text-sm text-[#14ad4c] mb-5 text-center font-medium">
          Sign in to manage your profile & schedule
        </p>

        <form onSubmit={handleLogin} className="w-full space-y-3">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-5 py-3 border border-[#b7ebc6] rounded-full focus:outline-none focus:ring-2 focus:ring-[#00b357] placeholder:text-[#16a34a]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-5 py-3 border border-[#b7ebc6] rounded-full focus:outline-none focus:ring-2 focus:ring-[#00b357] placeholder:text-[#16a34a]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#00b357] text-white font-bold py-3 rounded-full mt-2 hover:bg-[#00994a] transition-all shadow-lg active:scale-95"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
