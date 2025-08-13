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
            width={120}
            height={40}
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
      className="relative w-full p-6 min-h-[140px] mb-6" // p-6 biar ada jarak & min height supaya icon + text muat
    >
      {/* Background card */}
      <div className="absolute inset-0 scale-110"> 
        <Image
          src="/buttons/Card.svg"
          alt="Card background"
          fill
          className="object-contain"
        />
      </div>

      {/* Card content */}
      <div className="pl-20 relative z-10 flex items-start gap-4">
        <Image
          src={getUnselectedImage(btn.id)}
          alt={`${btn.title} icon`}
          width={100}
          height={100}
          draggable={false}
        />
        <div className="flex flex-col w-[calc(100%-200px)] break-words">
          <h2 className="text-[#FCF552] font-rubik-glitch text-xl mb-1">
            {btn.title}
          </h2>
          <p className="text-white font-space-mono text-sm break-words">
            {btn.desc}
          </p>
          <small className="text-gray-300 text-xs break-words">
            {btn.rules}
          </small>
          <a href={`/register/${btn.id}`}>
          <Image
            src="/buttons/Register-Competition-Button.svg"
            alt="Register button"
            width={120}
            height={40}
            draggable={false}
            className="object-contain mt-4"
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
