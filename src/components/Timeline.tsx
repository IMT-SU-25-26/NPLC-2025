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
        width={800}
        height={1471}
        className="sm:w-[1000px] lg:w-[900px] h-auto z-0 rotate-90 lg:rotate-0"
      />

      {/* Timeline */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="relative w-full lg:w-[80%]">
          {/* ======= Desktop Horizontal Timeline (lg+) ======= */}
          <div className="hidden lg:block">
            {/* Horizontal line */}
            <div className="absolute top-1/2 left-[7%] w-[86%] h-[8px] bg-gradient-to-r from-[#99E8F0] to-[#FCF5C5] rounded-full transform -translate-y-1/2"></div>

            {/* Event Items */}
            <div className="flex justify-between w-[86%] ml-[7%]">
              {events.map((event, index) => {
                const isUp = index % 2 === 1;
                return (
                  <div key={index} className="flex flex-col items-center relative">
                    {/* Connector */}
                    {isUp ? (
                      <div className="absolute bottom-full -mb-2 w-[8px] h-10 bg-gradient-to-b from-[#99E8F0] to-[#FCF5C5] rounded-full"></div>
                    ) : (
                      <div className="absolute top-full -mt-2 w-[8px] h-10 bg-gradient-to-b from-[#99E8F0] to-[#FCF5C5] rounded-full"></div>
                    )}

                    {/* Circle */}
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#99E8F0] to-[#FCF5C5] z-10"></div>

                    {/* Text */}
                    <div
                      className={`text-center text-white font-space-mono whitespace-nowrap ${
                        isUp ? "absolute -top-20" : "absolute top-16"
                      }`}
                    >
                      <p className="opacity-80 text-xs sm:text-sm">{event.date}</p>
                      <p className="text-sm font-ibmplex-mono-bold">{event.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ======= Mobile & Tablet Vertical Timeline ======= */}
          <div className="lg:hidden relative flex justify-center">
            {/* Vertical line */}
            <div
            className="absolute left-1/2 -translate-x-1/2 w-[6px] bg-gradient-to-b from-[#99E8F0] to-[#FCF5C5] rounded-full z-0"
            style={{
              top: "10px",
              bottom: "10px",
            }}
          ></div>

            {/* Event Items */}
            <div className="flex flex-col gap-14 relative z-10 py-4">
              {events.map((event, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <div key={index} className="relative flex items-center w-full min-h-[60px]">
                    {/* Circle */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-r from-[#99E8F0] to-[#FCF5C5]"></div>

                    {/* Text */}
                    <div
                      className={`max-w-[140px] text-white font-space-mono ${
                        isLeft
                          ? "mr-32 pr-8 text-center"
                          : "ml-auto pl-8 text-center"
                      }`}
                    >
                      <p className="opacity-80 text-xs">{event.date}</p>
                      <p className="text-sm font-ibmplex-mono-bold">{event.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
