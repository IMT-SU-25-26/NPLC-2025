import Image from "next/image";

export default function EventTimeline() {
  const events = [
    { date: "1 Jan – 2 Jan 2025", label: "Registration Period" },
    { date: "3 Jan – 4 Jan 2025", label: "Screening" },
    { date: "5 Jan – 6 Jan 2025", label: "Announcement" },
    { date: "7 Jan – 8 Jan 2025", label: "Workshop" },
    { date: "9 Jan – 10 Jan 2025", label: "Final Round" },
    { date: "11 Jan 2025", label: "Closing" },
  ];

  return (
    <div className="relative flex items-center justify-center py-10">
      {/* Background */}
      <Image
        src="/home/date-bg.svg"
        alt="Event timeline background"
        draggable={false}
        width={600}
        height={1471}
        className="w-full max-w-[900px] h-auto z-0"
      />

      {/* Timeline */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="relative w-full lg:w-[80%]">
          {/* Horizontal line (shorter) */}
          <div className="absolute top-1/2 left-[7%] w-[86%] h-[8px] bg-gradient-to-r from-[#99E8F0] to-[#FCF5C5] rounded-full transform -translate-y-1/2"></div>

          {/* Event Items */}
          <div className="flex justify-between w-[86%] ml-[7%]">
            {events.map((event, index) => {
              const isUp = index % 2 === 1; // Alternate up/down

              return (
                <div
                  key={index}
                  className="flex flex-col items-center relative"
                >
                  {/* Connector */}
                  {isUp && (
                    <div className="absolute bottom-full -mb-2 w-[8px] h-10 bg-gradient-to-b from-[#99E8F0] to-[#FCF5C5] rounded-full"></div>
                  )}
                  {!isUp && (
                    <div className="absolute top-full -mt-2 w-[8px] h-10 bg-gradient-to-b from-[#99E8F0] to-[#FCF5C5] rounded-full"></div>
                  )}

                  {/* Circle */}
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#99E8F0] to-[#FCF5C5] z-10"></div>

                  {/* Text */}
                  <div
                    className={`text-center text-white font-space-mono whitespace-nowrap ${
                      isUp
                        ? "absolute -top-20"
                        : "absolute top-16"
                    }`}
                  >
                    <p className="opacity-80 text-xs sm:text-sm">{event.date}</p>
                    <p className="text-sm font-ibmplex-mono-bold">
                      {event.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
