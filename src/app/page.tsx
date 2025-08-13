import Image from "next/image";
import "@/styles/home.css"; // keep your CSS for global background if needed
import Timeline from "@/components/Timeline";
import HomepageTabButton from "@/components/HomepageTabButton";

export default function Home() {
  return (
    <>
      <main className="pt-[8vh] min-h-screen bg-[url('/backgrounds/main-color-background.svg')] bg-cover bg-center bg-no-repeat relative overflow-hidden flex flex-col gap-10 items-center">
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
          className="mt-[5%] z-20 max-w-[80%] h-auto sm:mb-10 md:mb-60 lg:mb-0"
        />
        {/* Timeline */}
        <div className="mb-60 lg:mb-0 mt-40 md:mt-0 w-full flex justify-center items-center">
          <Timeline />
        </div>
        
        {/* Buttons */}

        <div className="flex flex-col items-center gap-4 z-20 mt-45 md:mt-0">
          <HomepageTabButton/>
        </div>
        
        <div className="pb-[5%]"></div>
      </main>
    </>
  );
}
