import Image from "next/image";
import "@/app/styles/home.css"; // keep your CSS for global background if needed
import Timeline from "@/app/components/Timeline"; 

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col items-center">
      {/* Top Decorations */}
      <Image
        src="/home/top-left.png"
        alt="Top left decoration"
        draggable={false}
        width={650}
        height={362}
        priority
        className="absolute top-0 left-0 w-[40vw] h-auto z-10"
      />

      <Image
        src="/home/top-right.png"
        alt="Top right decoration"
        draggable={false}
        width={575}
        height={281}
        priority
        className="absolute top-0 right-0 w-[35vw] h-auto z-10"
      />

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

      {/* Timeline */}
      <Timeline/>
    </main>
  );
}
