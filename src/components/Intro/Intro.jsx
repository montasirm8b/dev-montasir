import React, { useEffect, useRef } from 'react';
import { gsap, defaultEase } from '../../utils/gsap';

const Intro = () => {
  const headlineRef = useRef(null);
  const subRef = useRef(null);

  useEffect(() => {
    if (!headlineRef.current || !subRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: defaultEase } });
    tl.fromTo(headlineRef.current,
      { y: 60, opacity: 0, scale: 0.94 },
      { y: 0, opacity: 1, scale: 1, duration: 1, delay: 0.2, clearProps: 'all' }
    ).fromTo(subRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, clearProps: 'all' },
      '-=0.5'
    );

    return () => tl.kill();
  }, []);

  return (
    <div className='intro scroll-Section'>
      <div id='intro' className='h-screen px-4 flex flex-col justify-center items-center'>
        <div className='flex flex-col justify-center items-center'>
          <span ref={headlineRef} className='font-Josefin-Slab text-6xl text-slate-100'>
            Hey, I'm Montasir Mahmud
          </span>
          <span ref={subRef} className='font-Josefin-Slab text-2xl text-slate-100'>
            Passionate Web Developer
          </span>
        </div>
      </div>
    </div>
  );
};

export default Intro;
