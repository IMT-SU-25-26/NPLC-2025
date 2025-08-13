import React from 'react'
import Image from 'next/image'
import Button from '@/components/Button'

const SubmissionPage = () => {
  return (
    <>
        <div className='h-[10vh]'></div>
        <div className='relative w-[100vw] overflow-hidden min-h-[90vh]'>
          {/* decor image bg */}
          <Image
            className='absolute -top-15 left-50 -z-2'
            src="/submission/dot-design.webp"
            alt='Decorative Dot Design Background'
            width={500}
            height={500}
          />
          
          <Image
            className='absolute -bottom-0 right-50 -z-2'
            src="/submission/nodes-design.webp"
            alt='Nodes Design Background'
            width={450}
            height={500}
          />

          <Image
            className='absolute top-35 right-0 -z-2'
            src="/submission/lockOnTarget.webp"
            alt='Lock On Target Design'
            width={150}
            height={150}
          />

          <Image
            className='absolute bottom-20 left-0 -z-2'
            src="/submission/hexagon-design.webp"
            alt='Hexagon Design'
            width={200}
            height={200}
          />

          <Image
            className='absolute bottom-8 left-70 -z-2'
            src="/submission/lockOnTarget2.webp"
            alt='Lock On Target Design 2'
            width={300}
            height={300}
          />

          <Image
            className='absolute bottom-0 right-0 -z-2'
            src="/submission/bottom-design.webp"
            alt='Bottom Design'
            width={1000}
            height={300}
          />

          <Image
            className='absolute bottom-0 left-0 -z-2'
            src="/submission/city.webp"
            alt='City'
            width={600}
            height={300}
          />




            <div className='flex justify-center items-center min-h-[80vh] w-full'>
            <div className='relative m-auto flex flex-col w-[22rem] sm:w-[60vw] md:w-[50rem] h-[28rem] items-start px-15 md:px-28 pt-15'>

              {/* Desktop/Laptop Image */}
              <Image
                src="/submission/background-card-submission.webp"
                alt="Submission Page"
                width={300}
                height={200}
                className="absolute -z-1 top-0 left-0 right-0 bottom-0 w-full h-auto hidden md:block"
                draggable={false}
              />

              {/* Mobile Image */}
              <Image
                src="/submission/background-card-mobile.webp"
                alt="Submission Page Mobile"
                width={300}
                height={200}
                className="absolute -z-1 top-0 left-0 right-0 bottom-0 w-full h-auto block md:hidden"
                draggable={false}
              />

                <h1 className=' text-[#FCF551] font-rubik-glitch text-[2em] text-shadow-[-4px_0px_0px_#D379F1] m-0'>Submission</h1>
                <p className='font-space-mono text-white'><b>Opened: </b> Sunday, 28 September 2025</p>
                <p className='font-space-mono text-white'><b>Due: </b> Monday, 29 September 2025</p>
                <Image
                  className='aspect-[1/1] mt-4 ml-0'
                  src="/submission/code-logo.svg"
                  alt="Code Logo"
                  width={120}
                  height={200}
                  draggable={false}
                />
                <div className='flex w-full justify-end items-center gap-1 md:gap-3'>
                  <Button type={1} width='170px'  isDisabled={true}>Remove</Button>
                  <Button type={2} width='170px'  isDisabled={false}>Submit</Button>
                </div>
            </div>
          </div>
        </div>

    </>
  )
}

export default SubmissionPage