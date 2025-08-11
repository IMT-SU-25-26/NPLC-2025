import React from 'react'
import Image from 'next/image'

const SubmissionPage = () => {
  return (
    <>
        <div className='h-[13vh]'></div>
        <div className='m-auto flex max-w-[50vw] h-[70vh] items-center'>
            <Image
                src="/submission/Window 2.svg"
                alt="Submission Page"
                width={200}
                height={200}
                className="w-full h-auto"
                draggable={false}
            >
            </Image>
        </div>
    </>
  )
}

export default SubmissionPage