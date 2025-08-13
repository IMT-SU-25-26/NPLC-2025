'use client'

import React, { useState } from 'react'
import Image from 'next/image'

type Button1Props = {
  className?: string,
  width?: string,
  type: number,
  children?: React.ReactNode,
  isDisabled?: boolean,
}

const Button1 = ({className, width, type, children, isDisabled = false}:Button1Props) => {
  // images style images url
  const buttonImages = [
    [
      "/button/button1.svg",
      "/button/button1-disabled.svg",
    ],
    [
      "/button/button2.svg",
      "/button/button2-disabled.svg",
    ],
  ]

  width = width || '200px';
  const fontSize = (Math.round((parseFloat(width) / 130) * 100) / 100).toFixed(2);
  
  let activeEffect = '';
  if(!isDisabled){
    activeEffect = 'hover:brightness-90 duration-200 active:brightness-80';
  }

  return (
    <button
      style={{ fontSize: `${fontSize}em`, width: `${width}` }}
      disabled={isDisabled}
      className={`relative flex items-center justify-center ml-4 p-0 border-none bg-transparent ${className} aspect-[2/1]  ${activeEffect}`}
    >
      <Image
        src={buttonImages[type-1][isDisabled ? 1 : 0]}
        alt="Submit Button Shape"
        fill
        className="pointer-events-none select-none object-contain"
        draggable={false}
      />
      <span className={`absolute text-[#661108] font-thin font-mono`}>
        {children }
      </span>
    </button>
  )
}

export default Button1
