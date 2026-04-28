import React, { useLayoutEffect, useRef } from 'react';
import { gsap, SCROLLER, defaultEase } from '../../utils/gsap';

const Intro = () => {
  const root = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: defaultEase } });
      tl.from(headlineRef.current, {
        y: 80,
        opacity: 0,
        scale: 0.92,
        duration: 1.1,
        delay: 0.2,
      })
        .from(
          subRef.current,
          { y: 30, opacity: 0, duration: 0.9 },
          '-=0.6'
        );

      gsap.to(root.current, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          scroller: SCROLLER,
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className='intro scroll-Section'>
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
