//
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { SignInUser, GetCurrentUser } from "@/lib/user";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function LoginPage() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const container = useRef<HTMLDivElement>(null);

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

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    if (!email || !password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }
    const res = await SignInUser(email, password);
    setLoading(false);
    if (res.success) {
      router.push("/");
    } else {
      setError(res.error || "Login failed.");
    }
  };

  useGSAP(
    () => {
      gsap.killTweensOf([".city-front", ".city-back"]);
      if (typeof window !== "undefined" && window.innerWidth > 1024) {
        gsap.to(".city-front", {
          y: -150,
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
        gsap.to(".city-back", {
          y: -100,
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      } else {
        gsap.to(".city-front", {
          y: -35,
          duration: 2.5,
          yoyo: true,
          repeat: -1,
          ease: "power1.inOut",
        });
        gsap.to(".city-back", {
          y: -20,
          duration: 2.5,
          yoyo: true,
          repeat: -1,
          ease: "power1.inOut",
        });
      }
    },
    { scope: container }
  );

  // Show loading while checking authentication
  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div ref={container} className="overflow-hidden">
      <div className="pt-[10%] overflow-hidden bg-[url('/backgrounds/main-color-background.svg')] flex flex-col items-center min-h-screen w-full max-w-full">
        <Image
          src="/home/logo-nplc.webp"
          alt="NPLC 13th Logo"
          draggable={false}
          width={500}
          height={300}
          priority
          className="mt-12 sm:mt-5 z-20 max-w-[90%] sm:max-w-[80%] h-auto"
        />
        <div className="flex flex-col z-10000 justify-center items-center bg-[url('/login/logincardmobile.svg')] sm:bg-[url('/login/logincard.svg')] bg-contain bg-center bg-no-repeat w-[90%] max-w-[400px] sm:max-w-[700px] h-[600px] sm:h-[540px] mt-4 sm:mt-7 p-6 sm:px-8 sm:py-[22%] relative mx-auto">
          <Image
            src="/login/Login.svg"
            alt="Login Card"
            draggable={false}
            width={400}
            height={250}
            priority
            className="w-16 sm:w-28 mt-2 sm:mt-8"
          />
          {/* Form Login */}
          <div className="flex flex-col w-full max-w-[240px] sm:max-w-md space-y-3 sm:space-y-6 relative z-10000">
            {/* Email Address Input */}
            <div className="flex flex-col mt-3 sm:mt-8">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-xl font-space-mono rounded-md border-2 border-purple-300 bg-[#D7FEFF] text-gray-800 placeholder-gray-600 focus:outline-none focus:border-purple-500 relative z-20"
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-xl font-space-mono rounded-md border-2 border-purple-300 bg-[#D7FEFF] text-gray-800 placeholder-gray-600 focus:outline-none focus:border-purple-500 relative z-20"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-sm font-space-mono">
                {error}
              </div>
            )}

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center text-sm sm:text-xl">
              <label className="flex items-center gap-1 sm:gap-2 text-white font-space-mono">
                <input
                  type="checkbox"
                  className="w-3 h-3 sm:w-4 sm:h-4 rounded border-2 border-purple-300"
                />
                <span>Remember Me</span>
              </label>
              <Link
                href="#"
                className="text-yellow-400 hover:underline font-space-mono"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <div className="flex justify-center items-center -mt-2">
              <button
                className="w-[150px] h-[50px] sm:w-[300px] sm:h-[80px] hover:opacity-80 transition-opacity relative z-20 mt-2 sm:mt-4 flex items-center justify-center"
                onClick={handleLogin}
                disabled={loading}
              >
                <Image
                  src="/login/loginbutton.svg"
                  alt="Login Button"
                  draggable={false}
                  width={150}
                  height={50}
                  priority
                  className="w-[150px] h-[50px] sm:w-[250px] sm:h-[90px] sm:mb-4"
                />
              </button>
            </div>

            {/* Register Link */}
            <div className="text-center text-sm sm:mb-6 -mt-1 sm:text-xl font-space-mono">
              <span className="text-white">Don&#39;t have an account? </span>
              <Link
                href="/register"
                className="text-yellow-400 hover:underline"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* City SVG Backgrounds - Relative di bawah konten */}
      <div className="relative left-0 bottom-0 w-full pointer-events-none z-[0]">
        <div className="relative w-full h-[10px] sm:h-[10px]">
          <Image
            src="/business-plan-regis/city-depan.svg"
            width={100}
            height={50}
            className="city-front absolute bottom-[-3rem] sm:bottom-[-3rem] lg:bottom-[-5rem] w-full h-auto right-0 will-change-transform"
            alt="city background 2"
          />
          <Image
            src="/business-plan-regis/city-back.svg"
            width={100}
            height={100}
            className="city-back absolute bottom-[-3rem] sm:bottom-[-3rem] lg:bottom-[-5rem] w-[60%] h-auto right-0 will-change-transform"
            alt="city background 3"
          />
        </div>
      </div>
    </div>
  );
}
