'use client'
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { JoinCompetition } from "@/lib/competition";
import { User } from "@supabase/supabase-js";
import { GetCurrentUser } from "@/lib/user";
import Popup from "@/components/Popup";

gsap.registerPlugin(ScrollTrigger);

function Page() {
  const container = useRef(null);

  useGSAP(() => {
    // Animate the front city image
    gsap.to(".city-front", {
      y: -100, // Moves up more
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5, // Smoother scrubbing
      },
    });

    // Animate the back city image
    gsap.to(".city-back", {
      y: -50, // Moves up less to create depth
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
    });
  }, { scope: container });

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await GetCurrentUser();
      setUser(currentUser);
    };
    fetchUser();
  }, []);

  // Add state for each input
  const [user, setUser] = useState<User | null>(null);
  const [twiboon, setTwiboon] = useState("");
  const [teamName, setTeamName] = useState("");
  const [school, setSchool] = useState("");
  const [contact, setContact] = useState("");
  const [member1Name, setMember1Name] = useState("");
  const [member1Id, setMember1Id] = useState("");
  const [member2Name, setMember2Name] = useState("");
  const [member2Id, setMember2Id] = useState("");
  const [member3Name, setMember3Name] = useState("");
  const [member3Id, setMember3Id] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Tambahkan state untuk popup
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [popupSuccess, setPopupSuccess] = useState(false);

  // TODO: Replace with actual user_id and competition_id from your auth/session logic
  const user_id = user?.id;

  const handleRegister = async () => {
    setLoading(true);
    setMessage(null);

    const members = [
      { name: member1Name, id: member1Id },
      { name: member2Name, id: member2Id },
      { name: member3Name, id: member3Id },
    ];

    let success = true;
    let errorMsg = "";

    for (const member of members) {
      if (!member.name && !member.id) continue;
      const res = await JoinCompetition({
        user_id: user_id ?? "",
        competition_id: "4",
        student_id: member.id,
        team_name: teamName,
        link_twiboon: twiboon,
        school_name: school,
        contact_person_number: contact,
      });

      if (!res.success) {
        success = false;
        errorMsg = res.error || "Registration failed.";
        break;
      }
    }

    setLoading(false);

    // Tampilkan popup sesuai hasil registrasi
    if (success) {
      setPopupTitle("Registrasi Berhasil");
      setPopupMessage("Tim Anda berhasil didaftarkan!");
      setPopupSuccess(true);
    } else {
      setPopupTitle("Registrasi Gagal");
      setPopupMessage(errorMsg);
      setPopupSuccess(false);
    }
    setPopupOpen(true);
  };

  return (
    <div ref={container} className="relative pt-[20%] sm:pt-[10%] overflow-hidden bg-[url('/backgrounds/main-color-background.svg')] flex flex-col items-center min-h-screen w-screen max-w-screen">
      <Image
        src="/home/logo-nplc.webp"
        alt="NPLC 13th Logo"
        draggable={false}
        width={500}
        height={300}
        priority
        className="mt-12 sm:mt-5 w-[80%] sm:w-[40%] h-auto"
      />
      {/* Added classNames for GSAP targeting and performance */}
      <Image src={"/business-plan-regis/dot-bg.webp"} width={100} height={50} className="dot-bg absolute bottom-[-20%] w-full h-auto right-0 z-0 will-change-transform" alt="city background 1"/>
      <Image src={"/business-plan-regis/city-depan.svg"} width={100} height={50} className="city-front absolute bottom-[-5%] w-full h-auto right-0 z-1 will-change-transform" alt="city background 1"/>
      <Image src={"/business-plan-regis/city-back.svg"} width={100} height={100} className="city-back absolute bottom-0 w-[60%] h-auto right-0 z-0 will-change-transform" alt="city background 1"/>

      <div className="z-2 mt-[10%] sm:mt-[1.5%] tab-button-container flex w-full justify-center items-center">
        <Image
          src="/buttons/selected-business-plan-button.svg"
          alt="button3"
          draggable={false}
          width={200}
          height={200}
          priority
          className="w-[8rem] sm:w-[11rem] h-auto"
        />
      </div>
      <div className="z-3 mt-[5%] flex flex-col justify-center items-center bg-[url('/business-plan-regis/mobile-business-plan-competition-panel.svg')] sm:bg-[url('/business-plan-regis/business-plan-competition-panel.svg')] bg-contain bg-center bg-no-repeat w-[90%] max-w-[400px] sm:max-w-[1325px] h-[600px] sm:h-[1000px] relative mx-auto">
        <Image
          src="/business-plan-regis/business-plan-competition-panel-title-text.svg"
          alt="text"
          draggable={false}
          width={500}
          height={300}
          priority
          className="w-1/2 h-auto mt-[5%]"
        />
        {/* Form Login */}
          <div className="flex flex-col w-full max-w-[240px] sm:max-w-md space-y-3 sm:space-y-6 relative z-10">
            {/* Email Address Input */}
            <div className="flex flex-col mt-3 sm:mt-8">
              <input
                type="text"
                placeholder="Twiboon Link"
                value={twiboon}
                onChange={(e) => setTwiboon(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-xl font-space-mono rounded-md border-2 border-purple-300 bg-[#D7FEFF] text-gray-800 placeholder-gray-600 focus:outline-none focus:border-purple-500 relative z-20"
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Team Name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-xl font-space-mono rounded-md border-2 border-purple-300 bg-[#D7FEFF] text-gray-800 placeholder-gray-600 focus:outline-none focus:border-purple-500 relative z-20"
              />
            </div>
            
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="School / Institution..."
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-xl font-space-mono rounded-md border-2 border-purple-300 bg-[#D7FEFF] text-gray-800 placeholder-gray-600 focus:outline-none focus:border-purple-500 relative z-20"
              />
            </div>

            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Contact Person Number..."
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-xl font-space-mono rounded-md border-2 border-purple-300 bg-[#D7FEFF] text-gray-800 placeholder-gray-600 focus:outline-none focus:border-purple-500 relative z-20"
              />
            </div>

            {/* Member Inputs */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-x-4 gap-y-3 sm:gap-y-6">
              <input
                type="text"
                placeholder="Member 1 - Full Name..."
                value={member1Name}
                onChange={(e) => setMember1Name(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-xl font-space-mono rounded-md border-2 border-purple-300 bg-[#D7FEFF] text-gray-800 placeholder-gray-600 focus:outline-none focus:border-purple-500"
              />
              <input
                type="text"
                placeholder="Member 1 - Student ID..."
                value={member1Id}
                onChange={(e) => setMember1Id(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-xl font-space-mono rounded-md border-2 border-purple-300 bg-[#D7FEFF] text-gray-800 placeholder-gray-600 focus:outline-none focus:border-purple-500"
              />
              <input
                type="text"
                placeholder="Member 2 - Full Name..."
                value={member2Name}
                onChange={(e) => setMember2Name(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-xl font-space-mono rounded-md border-2 border-purple-300 bg-[#D7FEFF] text-gray-800 placeholder-gray-600 focus:outline-none focus:border-purple-500"
              />
              <input
                type="text"
                placeholder="Member 2 - Student ID..."
                value={member2Id}
                onChange={(e) => setMember2Id(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-xl font-space-mono rounded-md border-2 border-purple-300 bg-[#D7FEFF] text-gray-800 placeholder-gray-600 focus:outline-none focus:border-purple-500"
              />
              <input
                type="text"
                placeholder="Member 3 - Full Name..."
                value={member3Name}
                onChange={(e) => setMember3Name(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-xl font-space-mono rounded-md border-2 border-purple-300 bg-[#D7FEFF] text-gray-800 placeholder-gray-600 focus:outline-none focus:border-purple-500"
              />
              <input
                type="text"
                placeholder="Member 3 - Student ID..."
                value={member3Id}
                onChange={(e) => setMember3Id(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-xl font-space-mono rounded-md border-2 border-purple-300 bg-[#D7FEFF] text-gray-800 placeholder-gray-600 focus:outline-none focus:border-purple-500"
              />
            </div>
            
            {/* Register Button */}
            <div className="flex justify-center items-center -mt-2">
              <button
                className="w-[150px] h-[50px] sm:w-[300px] sm:h-[80px] hover:opacity-80 transition-opacity relative z-20 mt-2 sm:mt-4 flex items-center justify-center"
                onClick={handleRegister}
                disabled={loading}
              >
                <Image
                  src="/buttons/register-button.svg"
                  alt="Register Button"
                  draggable={false}
                  width={150}
                  height={50}
                  priority
                  className="w-[150px] h-[50px] sm:w-[300px] sm:h-[100px]"
                />
              </button>
            </div>
            {message && (
              <div className="text-center mt-2 text-lg font-space-mono text-purple-700">{message}</div>
            )}
          </div>
      </div>
      <Popup
        open={popupOpen}
        title={popupTitle}
        message={popupMessage}
        success={popupSuccess}
        loading={loading}
        onClose={() => setPopupOpen(false)}
      />
    </div>
  );
}

export default Page;
