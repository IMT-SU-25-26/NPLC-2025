import Image from "next/image";
import "@/styles/home.css"; // keep your CSS for global background if needed
import Timeline from "@/components/Timeline";
import Button from "@/components/Button";

export default function Home() {
  return (
    <>
      <div className="mt-[8vh]"></div>
      <main className="min-h-screen relative overflow-hidden flex flex-col items-center">
        {/* Logo */}
        <Image
          src="/home/logo-nplc.webp"
          alt="NPLC 13th Logo"
          draggable={false}
          width={500}
          height={300}
          priority
          className="mt-24 z-20 max-w-[80%] h-auto"
        />

        <div className="mt-10"></div>

        {/* Timeline */}
        <Timeline />

        {/* Buttons */}
        <Button />

        {/* Layer */}
      </main>
    </>
  );
}
