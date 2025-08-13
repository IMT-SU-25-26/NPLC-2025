import React from "react";
import PageGuard from "@/components/PageGuard";
import Link from "next/link";
function page() {
  return (
    <PageGuard competitionId="1" houldRedirectOnClose={true}>
    <div className="flex min-h-screen w-screen pt-[10%] flex-col justify-center items-center">
      <div className="grid grid-cols-2 sm:grid-cols-4 justify-items-center">
        {Array.from({ length: 8 }, (_, i) => (
          <Link
            key={i + 1}
            href={`/competitive-programming/${i + 1}`}
            className="w-full h-full text-4xl text-white font-bold"
          >
            <div className="border p-4 m-2 transition-transform duration-200 ease-in-out hover:scale-95 hover:bg-white hover:borde-white hover:text-black">
              {`Soal CP ${i + 1}`}
            </div>
          </Link>
        ))}
      </div>
    </div>
    </PageGuard>
  )
}

export default page;
