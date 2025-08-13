"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { SignUpUser, GetCurrentUser } from "@/lib/user";
import { useRouter } from "next/navigation";
import Popup from "@/components/Popup";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [NISN, setNISN] = useState("");
  const [accept, setAccept] = useState(false);
  const [loading, setLoading] = useState(false);

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [popupSuccess, setPopupSuccess] = useState(false);
  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const user = await GetCurrentUser();
      if (user) {
        router.push("/");
        return;
      }
      setCheckingAuth(false);
    };

    checkAuth();
  }, [router]);

  const handleRegister = async () => {
    if (!accept) {
      setPopupTitle("Registration Failed");
      setPopupMessage("You must accept all terms & conditions.");
      setPopupSuccess(false);
      setShowPopup(true);
      return;
    }
    if (!name || !email || !password || !confirm) {
      setPopupTitle("Registration Failed");
      setPopupMessage("Please fill in all fields.");
      setPopupSuccess(false);
      setShowPopup(true);
      return;
    }
    if (NISN == null) {
      setPopupTitle("Registration Failed");
      setPopupMessage("NISN is required.");
      setPopupSuccess(false);
      setShowPopup(true);
      return;
    }
    setLoading(true);
    const res = await SignUpUser(email, password, name, NISN);
    setLoading(false);
    if (res.success) {
      setPopupTitle("Registration Success");
      setPopupMessage("Your account has been created successfully!");
      setPopupSuccess(true);
      setShowPopup(true);
      // Optionally redirect or clear form
    } else {
      setPopupTitle("Registration Failed");
      setPopupMessage(res.error || "Registration failed.");
      setPopupSuccess(false);
      setShowPopup(true);
    }
  };

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      <div className="pt-[10%] overflow-x-hidden bg-[url('/backgrounds/main-color-background.svg')] flex flex-col items-center min-h-screen w-screen max-w-screen">
        <Image
          src="/home/logo-nplc.webp"
          alt="NPLC 13th Logo"
          draggable={false}
          width={500}
          height={300}
          priority
          className="mt-12 sm:mt-5 z-20 max-w-[90%] sm:max-w-[80%] h-auto"
        />
        <div className="flex flex-col justify-center items-center bg-[url('/register/registercardmobile.svg')] sm:bg-[url('/register/registercard.svg')] bg-contain bg-center bg-no-repeat w-[90%] max-w-[400px] sm:max-w-[700px] h-[600px] sm:h-[800px] mt-4 sm:mt-7 p-6 sm:px-8 sm:py-12 relative mx-auto">
          <Image
            src="/register/Register.svg"
            alt="Login Card"
            draggable={false}
            width={400}
            height={250}
            priority
            className="w-16 sm:w-40 mt-2 sm:mt-8"
          />
          {/* Form Register */}
          <div className="flex flex-col w-full max-w-[240px] sm:max-w-md space-y-3 sm:space-y-6 relative z-10">
            {/* Name Input */}
            <div className="flex flex-col mt-3 sm:mt-8">
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-xl font-space-mono rounded-md border-2 border-purple-300 bg-[#D7FEFF] text-gray-800 placeholder-gray-600 focus:outline-none focus:border-purple-500 relative z-20"
              />
            </div>

            {/* email Input */}
            <div className="flex flex-col">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-xl font-space-mono rounded-md border-2 border-purple-300 bg-[#D7FEFF] text-gray-800 placeholder-gray-600 focus:outline-none focus:border-purple-500 relative z-20"
              />
            </div>

            {/* create Password Input */}
            <div className="flex flex-col">
              <input
                type="password"
                placeholder="Create a Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-xl font-space-mono rounded-md border-2 border-purple-300 bg-[#D7FEFF] text-gray-800 placeholder-gray-600 focus:outline-none focus:border-purple-500 relative z-20"
              />
            </div>

            {/* confirm Password Input */}
            <div className="flex flex-col">
              <input
                type="number"
                placeholder="Enter Your NISN"
                value={NISN}
                onChange={(e) => setNISN(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-xl font-space-mono rounded-md border-2 border-purple-300 bg-[#D7FEFF] text-gray-800 placeholder-gray-600 focus:outline-none focus:border-purple-500 relative z-20"
              />
            </div>

            {/* I accept all terms & conditions */}
            <div className="flex justify-between items-center text-sm sm:text-xl">
              <label className="flex items-center gap-1 sm:gap-2 text-white font-space-mono">
                <input
                  type="checkbox"
                  checked={accept}
                  onChange={(e) => setAccept(e.target.checked)}
                  className="w-3 h-3 sm:w-4 sm:h-4 rounded border-2 border-purple-300"
                />
                <span>I accept all terms & conditions</span>
              </label>
            </div>

            {/* Register Button */}
            <div className="flex justify-center items-center -mt-2">
              <button
                className="w-[150px] h-[50px] sm:w-[300px] sm:h-[80px] hover:opacity-80 transition-opacity relative z-20 mt-2 sm:mt-4 flex items-center justify-center"
                onClick={handleRegister}
                disabled={loading}
              >
                <Image
                  src="/register/registerbutton.svg"
                  alt="Register Button"
                  draggable={false}
                  width={150}
                  height={50}
                  priority
                  className="w-[150px] h-[50px] sm:w-[300px] sm:h-[100px]"
                />
              </button>
            </div>

            {/* Register Link */}
            <div className="text-center text-sm sm:mt-1 sm:mb-6 -mt-1 sm:text-xl font-space-mono">
              <span className="text-white">Already have an account? </span>
              <Link href="/login" className="text-yellow-400 hover:underline">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Popup
        open={showPopup}
        title={popupTitle}
        message={popupMessage}
        success={popupSuccess}
        onClose={() => setShowPopup(false)}
        loading={loading}
      />
    </div>
  );
}
