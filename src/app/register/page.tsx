"use client";
// fix ai nicho
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SignUpUser, GetCurrentUser } from "@/lib/user";
import PopUp from "@/components/Popup";

gsap.registerPlugin(ScrollTrigger);

// Komponen AnimatedContent seperti di business plan
function AnimatedContent({ container }: { container: React.RefObject<HTMLDivElement | null> }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [NISN, setNISN] = useState("");
  const [accept, setAccept] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [popupSuccess, setPopupSuccess] = useState(false);

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
    } else {
      setPopupTitle("Registration Failed");
      setPopupMessage(res.error || "Registration failed.");
      setPopupSuccess(false);
      setShowPopup(true);
    }
  };

  return (
    <div ref={container} className="overflow-hidden">
      <div className="pt-[10%] overflow-x-hidden bg-[url('/backgrounds/main-color-background.svg')] flex flex-col items-center min-h-screen w-screen max-w-screen">
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

        {/* Register Card */}
        <div className="flex flex-col justify-center items-center bg-[url('/register/registercardmobile.svg')] sm:bg-[url('/register/registercard.svg')] bg-contain bg-center bg-no-repeat w-[90%] max-w-[400px] sm:max-w-[700px] h-[600px] sm:h-[800px] mt-4 sm:mt-7 p-6 sm:px-8 sm:py-12 relative mx-auto z-3">
          
          {/* Decorative Image */}
          <div className="relative mb-6">
            <Image
              src="/register/register.svg"
              alt="Decorative Image"
              width={300}
              height={300}
              className="w-[150px] sm:w-[300px] h-auto"
            />
          </div>

          {/* Form */}
          <div className="flex flex-col w-full max-w-[240px] sm:max-w-md space-y-3 sm:space-y-6 relative z-10">
            {/* Name Input */}
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-xl font-space-mono rounded-md border-2 border-purple-300 bg-[#D7FEFF] text-gray-800 placeholder-gray-600 focus:outline-none focus:border-purple-500 relative z-20"
              />
            </div>

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

            {/* NISN Input */}
            <div>
              <input
                type="text"
                placeholder="NISN"
                value={NISN}
                onChange={(e) => setNISN(e.target.value)}
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

            {/* Terms Checkbox */}
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="accept"
                checked={accept}
                onChange={(e) => setAccept(e.target.checked)}
                className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="accept" className="text-white text-sm">
                I accept all terms & conditions
              </label>
            </div>

            {/* Register Button */}
            <button
              className="w-[150px] h-[50px] sm:w-[300px] sm:h-[80px] hover:opacity-80 transition-opacity relative z-20 mt-2 sm:mt-4 flex items-center justify-center mx-auto"
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Image
                  src="/buttons/registerbutton.svg"
                  alt="Register Button"
                  draggable={false}
                  width={150}
                  height={50}
                  priority
                  className="w-[150px] h-[50px] sm:w-[300px] sm:h-[80px]"
                />
              )}
            </button>

            {/* Login Link */}
            <div className="text-center text-sm sm:mt-1 sm:mb-6 -mt-1 sm:text-xl font-space-mono">
              <span className="text-white">Already have an account? </span>
              <Link href="/login" className="text-yellow-400 hover:underline">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* City SVG Backgrounds - TAMBAHAN UNTUK ANIMASI */}
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

      {/* PopUp */}
      <PopUp
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

export default function RegisterPage() {
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
