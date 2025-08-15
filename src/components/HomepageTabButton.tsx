"use client";
import { useState } from "react";
import Image from "next/image";

type ButtonData = {
  id: "competitive-programming" | "type-racer" | "business-plan" | "prompt-gpt";
  title: string;
  desc: string;
  rules: string;
};

export default function CompetitionSection() {
  const buttons: ButtonData[] = [
    {
      id: "competitive-programming",
      title: "Programming",
      desc: "Lorem ipsum test test test test test test test test test test test test",
      rules: "Ketentuan , dll here",
    },
    {
      id: "type-racer",
      title: "Type Racer",
      desc: "Lorem ipsum test test test test test test test test test test test test",
      rules: "Ketentuan type racer...",
    },
    {
      id: "business-plan",
      title: "Business Plan",
      desc: "Lorem ipsum test test test test test test test test test test test test",
      rules: "Ketentuan business plan...",
    },
    {
      id: "prompt-gpt",
      title: "Prompting",
      desc: "Lorem ipsum test test test test test test test test test test test test",
      rules: "Ketentuan prompting...",
    },
  ];

  const [selected, setSelected] = useState<ButtonData["id"]>("competitive-programming");

  const getButtonImage = (id: ButtonData["id"]) =>
    `/buttons/${
      selected === id
        ? `selected-${id}-button.svg`
        : `unselected-${id}-button.svg`
    }`;

  const getUnselectedImage = (id: string) => {
    if (id === "business-plan")
      return `/buttons/unselected-business-plan-button.svg`;
      return `/buttons/unselected-${id}-button.svg`;
  };

  return (
    <>
    <div className="relative hidden sm:flex z-[3] flex-col items-center gap-10">
      {/* Buttons */}
      <div className="flex gap-6">
        {buttons.map((btn) => (
          <button
            key={btn.id}
            onClick={() => setSelected(btn.id)}
            className="transition-transform hover:scale-105"
          >
            <Image
              src={getButtonImage(btn.id)}
              alt={`${btn.title} button`}
              width={150}
              height={150}
              draggable={false}
            />
          </button>
        ))}
      </div>

      <div className="relative z-[3] w-[700px] h-[350px] px-10">
        {/* Background card */}
        <Image
          src="/buttons/Card.svg"
          alt="Card background"
          fill
          className="object-contain"
        />

        {/* Card content */}
        <div className="relative z-10 flex items-center gap-6 max-w-[500px] mx-auto h-full">
          <Image
            src={getUnselectedImage(selected)}
            alt="Selected icon"
            width={180}
            height={180}
            draggable={false}
          />
          <div className="flex flex-col">
            <h2 className="text-[#FCF552] font-rubik-glitch text-3xl mb-2">
              {buttons.find((b) => b.id === selected)?.title}
            </h2>
            <p className="text-white font-space-mono">
              {buttons.find((b) => b.id === selected)?.desc}
            </p>
            {/* <small className="text-gray-300">
            {buttons.find(b => b.id === selected)?.rules}
            </small> */}
            <a href={`/register/${(selected)}`}>
          <Image
            src="/buttons/Register-Competition-Button.svg"
            alt="Register button"
            width={100}
            height={100}
            draggable={false}
            className="object-contain mt-4 w-45"
          />
          </a>
          </div>
        </div>
      </div>
    </div>

    {/* Mobile view */}
<div className="flex flex-col gap-6 sm:hidden px-4">
  {buttons.map((btn) => (
    <div
      key={btn.id}
      className="relative bg-no-repeat bg-[length:100%_100%] bg-center bg-[url('/buttons/Card.svg')] max-[333]:bg-[url('/home/max-300-bg.svg')] max-[250]:bg-[url('/home/max-250-bg.svg')] w-full overflow-hidden mx-auto p-4 gap-3 rounded-lg shadow-lg transition-transform hover:scale-105 justify-items-center"
    >
      <div className=" flex items-start gap-4 max-[361]:gap-2 max-[640]:w-[52%] max-[510]:w-[60%] max-[450]:w-[76%] max-[370]:w-[98%] max-[361]:w-[68%]  max-[333]:block max-[333]:justify-items-center">
        {/* Icon */}
      <div className="flex-shrink-0 w-14 h-14 my-auto">
        <Image
          src={getUnselectedImage(btn.id)}
          alt={`${btn.title} icon`}
          width={100}
          height={100}
          className="w-full h-full object-contain"
          draggable={false}
        />
      </div>

      {/* Text */}
      <div className="flex flex-col flex-1 min-w-0 max-[333]:text-center max-[235]:w-[80%]">
        <h2 className="text-[#FCF552] max-[370]:text-sm font-rubik-glitch text-base">
          {btn.title}
        </h2>
        <p className="text-white font-space-mono text-sm max-[361]:text-[10px] break-words">
          {btn.desc}
        </p>
        <small className="text-gray-300 text-[10px] break-words max-[382]:hidden">
          {btn.rules}
        </small>
        <a href={`/register/${btn.id}`} className="mt-3 w-fit max-[333]:mx-auto ">
          <Image
            src="/buttons/Register-Competition-Button.svg"
            alt="Register button"
            width={100}
            height={100}
            draggable={false}
            className="object-contain"
          />
        </a>
      </div>
      </div>
      
    </div>
  ))}
</div>


</>
  );
}
