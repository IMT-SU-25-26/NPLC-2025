import React from "react";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return (
    <div className="pt-[10%] overflow-hidden bg-[url('/backgrounds/main-color-background.svg')] flex flex-col items-center min-h-screen w-screen max-w-screen">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 text-white drop-shadow-lg tracking-tight text-center">
        Competitive Programming{" "}
        <span className="text-[#FCF5C5]">({params.id})</span>
      </h1>
      <div className="w-24 h-1 bg-gradient-to-r from-[#99E8F0] to-[#FCF5C5] rounded-full mb-8"></div>
      <div className="flex flex-col lg:flex-row w-full max-w-6xl gap-8 justify-center items-stretch p-4">
        {/* Soal Panel */}
        <div className="w-full lg:w-1/2 min-h-[60vh] bg-white/30 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border-2 border-transparent bg-clip-padding hover:border-[#99E8F0] transition-all duration-300 overflow-auto custom-scroll">
          <h2 className="text-3xl font-bold mb-6 text-[#502E5E] w-full text-center tracking-wide relative">
            <span className="relative z-10">Soal</span>
            <span className="absolute left-1/2 -bottom-2 w-16 h-1 bg-gradient-to-r from-[#99E8F0] to-[#FCF5C5] rounded-full -translate-x-1/2"></span>
          </h2>
          <div className="text-white text-lg font-space-mono leading-relaxed">
            Given an array of integers{" "}
            <code className="bg-[#272930]/70 px-1 rounded text-[#FCF5C5]">
              nums
            </code>{" "}
            and an integer{" "}
            <code className="bg-[#272930]/70 px-1 rounded text-[#FCF5C5]">
              target
            </code>
            , return indices of the two numbers such that they add up to{" "}
            <code className="bg-[#272930]/70 px-1 rounded text-[#FCF5C5]">
              target
            </code>
            .
            <br />
            <br />
            You may assume that each input would have exactly one solution, and
            you may not use the same element twice.
            <br />
            <br />
            You can return the answer in any order.
            <br />
            <br />
            <b className="text-[#FCF5C5]">Example 1:</b>
            <br />
            <span className="block bg-[#272930]/60 rounded p-2 my-2 font-mono text-base text-[#99E8F0]">
              Input: nums = [2,7,11,15], target = 9
              <br />
              Output: [0,1]
              <br />
              Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
            </span>
            <b className="text-[#FCF5C5]">Example 2:</b>
            <br />
            <span className="block bg-[#272930]/60 rounded p-2 my-2 font-mono text-base text-[#99E8F0]">
              Input: nums = [3,2,4], target = 6
              <br />
              Output: [1,2]
            </span>
            <b className="text-[#FCF5C5]">Example 3:</b>
            <br />
            <span className="block bg-[#272930]/60 rounded p-2 my-2 font-mono text-base text-[#99E8F0]">
              Input: nums = [3,3], target = 6
              <br />
              Output: [0,1]
            </span>
            <b className="text-[#FCF5C5]">Constraints:</b>
            <br />
            <ul className="list-disc ml-6 mt-2 text-base text-[#FCF5C5]">
              <li>2 &le; nums.length &le; 10<sup>4</sup></li>
              <li>-10<sup>9</sup> &le; nums[i] &le; 10<sup>9</sup></li>
              <li>-10<sup>9</sup> &le; target &le; 10<sup>9</sup></li>
              <li>Only one valid answer exists.</li>
            </ul>
          </div>
        </div>
        {/* Pengerjaan Panel */}
        <div className="w-full lg:w-1/2 min-h-[60vh] bg-white/30 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border-2 border-transparent bg-clip-padding hover:border-[#FCF5C5] transition-all duration-300 flex flex-col">
          <h2 className="text-3xl font-bold mb-6 text-[#502E5E] w-full text-center tracking-wide relative">
            <span className="relative z-10">Pengerjaan</span>
            <span className="absolute left-1/2 -bottom-2 w-24 h-1 bg-gradient-to-r from-[#FCF5C5] to-[#99E8F0] rounded-full -translate-x-1/2"></span>
          </h2>
          {/* You can add a code editor or textarea here */}
          <textarea
            className="flex-1 w-full min-h-[200px] bg-[#272930]/80 text-[#FCF5C5] font-mono rounded-xl p-4 resize-y focus:outline-none focus:ring-2 focus:ring-[#99E8F0] shadow-inner transition"
            placeholder="// Tulis solusi kamu di sini..."
          />
          <button
            className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-[#99E8F0] to-[#FCF5C5] text-[#502E5E] font-bold text-lg shadow-lg hover:scale-105 transition-transform"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
