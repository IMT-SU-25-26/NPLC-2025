import Image from "next/image";

export default function EventTimeline() {
  return (
    <div className="w-full flex justify-center">
      {/* Desktop */}
      <Image
        src="/home/Timeline-Desktop.svg"
        alt="Event timeline background for desktop"
        draggable={false}
        width={800}
        height={1471}
        className="hidden sm:block h-auto mx-auto"
      />

      {/* Mobile */}
      <Image
        src="/home/Timeline-Mobile.svg"
        alt="Event timeline background for mobile"
        draggable={false}
        width={800}
        height={1471}
        className="block sm:hidden w-[80%] h-auto mx-auto"
      />
    </div>
  );
}
