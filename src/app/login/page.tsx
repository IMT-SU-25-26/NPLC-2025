//
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SignInUser, GetCurrentUser } from "@/lib/user";

gsap.registerPlugin(ScrollTrigger);

// Komponen AnimatedContent seperti di business plan
function AnimatedContent({
  container,
}: {
  container: React.RefObject<HTMLDivElement>;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useGSAP(
    () => {
      gsap.killTweensOf([".city-front", ".city-back"]);

      if (typeof window !== "undefined" && window.innerWidth > 1024) {
        // Desktop: scroll animasi
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
        // Mobile/tablet: naik-turun
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

  return (
    <div ref={container} className="overflow-hidden">
      <div
        className="pt-[10%] overflow-hidden bg-[url('/backgrounds/main-color-background.svg')] flex flex-col items-center min-h-screen w-screen max-w-screen"
      >
        {/* Logo */}
        <Image
          src="/home/logo-nplc.webp"
          alt="NPLC 13th Logo"
          draggable={false}
          width={500}
          height={300}
          priority
          className="mt-12 sm:mt-5 z-20 max-w-[90%] sm:max-w-[80%] h-auto"
        />

        {/* Login Card */}
        <div className="flex flex-col z-10000 justify-center items-center bg-[url('/login/logincardmobile.svg')] sm:bg-[url('/login/logincard.svg')] bg-contain bg-center bg-no-repeat w-[90%] max-w-[400px] sm:max-w-[700px] h-[600px] sm:h-[540px] mt-4 sm:mt-7 p-6 sm:px-8 sm:py-[22%] relative mx-auto">
          {/* Login Icon */}
          <Image
            src="/login/Login.svg"
            alt="Login Card"
            draggable={false}
            width={400}
            height={250}
            priority
            className="w-16 sm:w-28 mt-2 sm:mt-8 mb-8"
          />

          {/* Form */}
          <div className="flex flex-col w-full max-w-[240px] sm:max-w-md space-y-3 sm:space-y-6 relative z-10">
            {/* Email Input */}
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-xl font-space-mono rounded-md border-2 border-purple-300 bg-[#D7FEFF] text-gray-800 placeholder-gray-600 focus:outline-none focus:border-purple-500 relative z-20"
              />
            </div>

            {/* Password Input */}
            <div>
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
              <div className="text-red-500 text-sm sm:text-base text-center">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              className="w-[150px] h-[50px] sm:w-[300px] sm:h-[80px] hover:opacity-80 transition-opacity relative z-20 mt-2 sm:mt-4 flex items-center justify-center mx-auto"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Image
                  src="/login/loginbutton.svg"
                  alt="Login Button"
                  draggable={false}
                  width={150}
                  height={50}
                  priority
                  className="w-[150px] h-[50px] sm:w-[300px] sm:h-[80px]"
                />
              )}
            </button>

            {/* Register Link */}
            <div className="text-center text-sm sm:mt-1 sm:mb-6 -mt-1 sm:text-xl font-space-mono">
              <span className="text-white">Dont have an account? </span>
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
      {/* City SVG Backgrounds - DI DALAM CONTAINER */}
      <div className="relative left-0 bottom-0 w-full pointer-events-none z-[0]">
        <div className="relative w-full h-auto">
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

export default function LoginPage() {
  const container = useRef<HTMLDivElement>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

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

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <AnimatedContent container={container} />;
}
