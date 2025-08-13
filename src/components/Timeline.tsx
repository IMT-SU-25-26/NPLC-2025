import Image from "next/image";

export default function EventTimeline() {
  return (
    <>
  <Image
      src="/home/Timeline-Desktop.svg"
      alt="Event timeline background for mobile"
      draggable={false}
      width={800}
      height={1471}
      className="hidden sm:flex w-[80%] h-auto"
    />
    <Image
      src="/home/Timeline-Mobile.svg"
      alt="Event timeline background for mobile"
      draggable={false}
      width={800}
      height={1471}
      className="sm:hidden w-[90%] h-auto"
    />
    </>
  );
}
