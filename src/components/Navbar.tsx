import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
export default function Navbar() {
  return (
    <nav className='fixed h-[10vh] w-screen flex justify-center items-center'>
      <Link href="/" className='hover:cursor-pointer'>
        <Image src={"/buttons/home.svg"} alt='home' width={150} height={150} className='w-[6rem] sm:w-[10rem] h-auto '></Image>
      </Link>
      <Link href="/login" className='hover:cursor-pointer'>
        <Image src={"/buttons/LoginButton.svg"} alt='login' width={150} height={150} className='w-[6rem] sm:w-[10rem] h-auto '></Image>
      </Link>
    </nav>
  )
}
