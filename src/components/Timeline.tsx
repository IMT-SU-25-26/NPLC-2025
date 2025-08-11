import Image from "next/image";

export default function EventTimeline() {
  const events = [
    { date: "1 Jan – 2 Jan 2025", label: "Registration Period" },
    { date: "1 Jan – 2 Jan 2025", label: "Registration Period" },
    { date: "1 Jan – 2 Jan 2025", label: "Registration Period" },
    { date: "1 Jan – 2 Jan 2025", label: "Registration Period" },
    { date: "1 Jan – 2 Jan 2025", label: "Registration Period" },
    { date: "1 Jan – 2 Jan 2025", label: "Registration Period" },
  ];

  return (
    <div className="relative flex items-center justify-center">
      {/* Background */}
      <Image
        src="/home/date-bg.svg"
        alt="Event timeline background"
        draggable={false}
        width={514}
        height={1471}
        className="w-[70vw] h-auto z-0"
      />

      {/* Timeline */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[60%]">
          {/* Horizontal Line */}
          <div className="absolute top-1/2 left-0 w-full h-[8px] bg-gradient-to-r from-[#99E8F0] to-[#FCF5C5] rounded-full transform -translate-y-1/2"></div>

          {/* Event Items */}
          <div className="flex justify-between w-full">
            {events.map((event, index) => {
              const isFirst = index === 0;
              const isLast = index === events.length - 1;
              const isUp = index % 2 === 1; // Alternate up/down

              return (
                <div
                  key={index}
                  className="flex flex-col items-center relative"
                >
                  {/* Up connector */}
                  {isUp && !isFirst && !isLast && (
                    <div className="absolute bottom-full -mb-2 w-[8px] h-10 bg-gradient-to-b from-[#99E8F0] to-[#FCF5C5] rounded-full"></div>
                  )}

                  {/* Down connector */}
                  {!isUp && !isFirst && !isLast && (
                    <div className="absolute top-full -mt-2 w-[8px] h-10 bg-gradient-to-b from-[#99E8F0] to-[#FCF5C5] rounded-full"></div>
                  )}

                  {/* Circle */}
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#99E8F0] to-[#FCF5C5] z-10"></div>

                  {/* Text */}
                  <div
                    className={`mt-4 text-center text-white ${
                      isUp ? "absolute -top-28" : "absolute top-16"
                    }`}
                  >
                    <p className="opacity-80 font-space-mono">{event.date}</p>
                    <p className="text-sm font-ibmplex-mono-bold">{event.label}</p>
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
