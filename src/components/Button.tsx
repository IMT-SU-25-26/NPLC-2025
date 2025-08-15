'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

type Button1Props = {
  className?: string,
  width?: string,
  type: number,
  children?: React.ReactNode,
  isDisabled?: boolean,
}

const Button1 = ({className, width, type, children, isDisabled = false}: Button1Props) => {
  const buttonRef = useRef<HTMLButtonElement>(null); // to track the button element
  const [currentWidth, setCurrentWidth] = useState<number>(0);

  // Button images array
  const buttonImages = [
    ["/button/button1.svg", "/button/button1-disabled.svg"],
    ["/button/button2.svg", "/button/button2-disabled.svg"],
  ];

  // Observe width changes
  useEffect(() => {
    if (!buttonRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const newWidth = entry.contentRect.width;
        setCurrentWidth(newWidth);
      }
    });

    observer.observe(buttonRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Calculate font size from current width
  const fontSize = currentWidth
    ? (Math.round((currentWidth / 130) * 100) / 100).toFixed(2)
    : "1.00";

  let activeEffect = '';
  if (!isDisabled) {
    activeEffect = 'hover:brightness-90 duration-200 active:brightness-80';
  }

  return (
    <button
      ref={buttonRef}
      style={{ fontSize: `${fontSize}em`, width: width || '200px' }}
      disabled={isDisabled}
      className={`relative flex items-center justify-center p-0 border-none bg-transparent ${className} font-space-mono aspect-[2/1] ${activeEffect}`}
    >
      <Image
        src={buttonImages[type-1][isDisabled ? 1 : 0]}
        alt="Submit Button Shape"
        fill
        className="pointer-events-none select-none object-contain"
        draggable={false}
      />
      <span className={`absolute text-[#661108] font-thin font-mono`}>
        {children}
      </span>
    </button>
  );
}

export default Button1;
