import React, { useRef, useState } from 'react'

const MobileIntro = () => {
  const cvDivRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [showCV, setShowCV] = useState(false);

  const handleTransitionEnd = () => {
    if(isOpen){
      // cvDivRef.current.classList.remove('bg-blue-300');
      // cvDivRef.current.classList.add('bg-slate-900');
      setShowCV(true);
    } else setShowCV(false);
  }
  return (
    <div className='block lg:hidden fixed z-50 top-5 right-5 bg-blue-800/50 backdrop-blur-md rounded-full h-12 w-12 hover:outline-4 hover:outline outline-gray-500' onClick={() => {
      setIsOpen(!isOpen)
    }}>
      <div className={
          `transition-all
          ease-in 
          duration-[500ms]
          fixed
          bg-blue-300
          top-0
          right-0
          ${isOpen ? 'rounded-none' : 'rounded-full'}
          ${isOpen ? 'h-[1800px]' : 'h-full'}
          ${isOpen ? 'w-[1800px]' : 'w-full'}
          ${isOpen ? 'translate-x-1/2 md:translate-x-5' : 'translate-x-0'}
          ${isOpen ? '-translate-y-1/2 md:-translate-y-5' : 'translate-y-0'}
        `
      } onTransitionEnd={handleTransitionEnd} ref={cvDivRef}>
        
      </div>
      {
        showCV ? (
          <div className='fixed top-0 right-0 text-white w-screen h-screen translate-x-5 -translate-y-5'>
            <ul>
              <li className='font-CMUSerifRoman'>Montasir Ahmed</li>
              <li className='  font-CMUSerifRoman'>Software Engineer</li>
              <li className=' font-CMUSerifRoman'>Dhaka, Bangladesh</li>
              <li className=' font-CMUSerifRoman'>+880 1711 000 000</li>
              <li className=''>
                <a href="mailto:mmcse19@gmail.com">
                  mmcse19@gmail.com
                </a>
              </li>
            </ul>
          </div>
        ) : null
      }
      <div className={`
          w-full h-full overflow-hidden rounded-full fixed top-0 right-0
          ${isOpen ? '-z-10' : 'z-10'}
        `}
      >
        <img src={'https://raw.githubusercontent.com/montasirm8b/data/main/montasir.jpg'} alt="Montasir" />
      </div>
    </div>
  )
}

export default MobileIntro
