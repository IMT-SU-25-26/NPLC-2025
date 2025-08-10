import React from 'react'
import Image from 'next/image';


export default function TopDecorations() {
  return (
    <div className='overflow-hidden'>
      <Image
        src="/backgrounds/asetkiri.svg"
        alt="Top left decoration"
        draggable={false}
        width={650}
        height={362}
        priority
        className="absolute top-0 left-0 w-1/3 h-auto z-10 overflow-hidden"
      />

      <Image
        src="/backgrounds/asetkiri.svg"
        alt="Top right decoration"
        draggable={false}
        width={650}
        height={362}
        priority
        className="absolute top-0 rotate-y-180 right-0 w-1/3 h-auto z-10 overflow-hidden"
      />
    </div>
  )
}