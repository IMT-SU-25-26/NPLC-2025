import Image from "next/image";
import "@/styles/home.css"; // keep your CSS for global background if needed
import Timeline from "@/components/Timeline";
import Button from "@/components/Button";

export default function Home() {
  return (
    <>
      <div className="mt-[8vh]"></div>
      <main className="min-h-screen relative overflow-hidden flex flex-col gap-10 items-center">
        {/* Background Image */}
        <Image src={"/business-plan-regis/city-depan.svg"} width={100} height={50} className="city-front absolute bottom-[-5%] w-full h-auto right-0 z-1 will-change-transform" alt="city background 1"/>
        <Image src={"/business-plan-regis/city-back.svg"} width={100} height={100} className="city-back absolute bottom-0 w-[60%] h-auto right-0 z-0 will-change-transform" alt="city background 1"/>
        {/* Logo */}
        <Image
          src="/home/logo-nplc.webp"
          alt="NPLC 13th Logo"
          draggable={false}
          width={500}
          height={300}
          priority
          className="mt-[5%] z-20 max-w-[80%] h-auto"
        />
        {/* Timeline */}
        <Timeline />
        {/* Buttons */}
        <Button />
        <div className="pb-[5%]"></div>
      </main>
    </>
  );
}
