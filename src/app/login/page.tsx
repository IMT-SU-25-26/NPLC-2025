"use client";

import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="pt-[10%] overflow-hidden bg-[url('/backgrounds/main-color-background.svg')] flex flex-col items-center min-h-screen w-screen max-w-screen">
        <Image
          src="/home/logo-nplc.webp"
          alt="NPLC 13th Logo"
          draggable={false}
          width={500}
          height={300}
          priority
          className="mt-12 sm:mt-5 z-20 max-w-[90%] sm:max-w-[80%] h-auto"
        />
        <div className="flex flex-col justify-center items-center bg-[url('/login/logincardmobile.svg')] sm:bg-[url('/login/logincard.svg')] bg-contain bg-center bg-no-repeat w-[90%] max-w-[400px] sm:max-w-[700px] h-[600px] sm:h-[540px] mt-4 sm:mt-7 p-6 sm:px-8 sm:py-12 relative mx-auto">
          <Image
            src="/login/login.svg"
            alt="Login Card"
            draggable={false}
            width={400}
            height={250}
            priority
            className="w-16 sm:w-28 mt-2 sm:mt-8"
          />
          {/* Form Login */}
          <div className="flex flex-col w-full max-w-[240px] sm:max-w-md space-y-3 sm:space-y-6 relative z-10">
            {/* Email Address Input */}
            <div className="flex flex-col mt-3 sm:mt-8">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-xl font-space-mono rounded-md border-2 border-purple-300 bg-[#D7FEFF] text-gray-800 placeholder-gray-600 focus:outline-none focus:border-purple-500 relative z-20"
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col">
              <input
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-xl font-space-mono rounded-md border-2 border-purple-300 bg-[#D7FEFF] text-gray-800 placeholder-gray-600 focus:outline-none focus:border-purple-500 relative z-20"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center text-sm sm:text-xl">
              <label className="flex items-center gap-1 sm:gap-2 text-white font-space-mono">
                <input
                  type="checkbox"
                  className="w-3 h-3 sm:w-4 sm:h-4 rounded border-2 border-purple-300"
                />
                <span>Remember Me</span>
              </label>
              <a
                href="#"
                className="text-yellow-400 hover:underline font-space-mono"
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <div className="flex justify-center items-center -mt-2">
              <button
                className="w-[150px] h-[50px] sm:w-[300px] sm:h-[80px] hover:opacity-80 transition-opacity relative z-20 mt-2 sm:mt-4 flex items-center justify-center"
                onClick={() => (window.location.href = "/")}
              >
                <Image
                  src="/login/loginbutton.svg"
                  alt="Login Button"
                  draggable={false}
                  width={150}
                  height={50}
                  priority
                  className="w-[150px] h-[50px] sm:w-[300px] sm:h-[100px]"
                />
              </button>
            </div>

            {/* Register Link */}
            <div className="text-center text-sm sm:mb-6 -mt-4 sm:text-xl font-space-mono">
              <span className="text-white">Don&#39;t have an account? </span>
              <a
                href="#"
                className="text-yellow-400 hover:underline"
              >
                Register
              </a>
            </div>
          </div>
        </div>
      </div>
  );
}
