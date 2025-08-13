"use client";
import { useState } from "react";
import Image from "next/image";

type ButtonData = {
  id: "programming" | "type-racer" | "business-plan" | "prompting";
  title: string;
  desc: string;
  rules: string;
};

export default function CompetitionSection() {
  const buttons: ButtonData[] = [
    {
      id: "programming",
      title: "Programming",
      desc: "Lorem ipsum test test test test test test test test test test test test test test",
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
      id: "prompting",
      title: "Prompting",
      desc: "Lorem ipsum test test test test test test test test test test test test",
      rules: "Ketentuan prompting...",
    },
  ];

  const [selected, setSelected] = useState<ButtonData["id"]>("programming");

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

  const selectedButton = buttons.find((b) => b.id === selected)!;

  return (
    <div className="relative z-[3] flex flex-col items-center gap-10">
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
          </div>
        </div>
      </div>
    </div>
  );
}
