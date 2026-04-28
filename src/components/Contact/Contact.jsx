import React, { useLayoutEffect, useRef } from 'react';
import { gsap, SCROLLER, defaultEase } from '../../utils/gsap';

const Contact = () => {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const card = root.current.querySelector('[data-contact-card]');
      const heading = root.current.querySelector('[data-contact-heading]');
      gsap.from(card, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: defaultEase,
        scrollTrigger: {
          scroller: SCROLLER,
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
      gsap.from(heading, {
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: defaultEase,
        scrollTrigger: {
          scroller: SCROLLER,
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="pt-4 pr-0 pb-3 pl-2 lg:pl-4 h-full">
      <div data-contact-card className="bg-blue-500 bg-opacity-20 backdrop-blur-md h-[89vh] lg:h-full w-[78.5vw] lg:w-auto rounded-md flex flex-col justify-start items-start p-4 lg:p-10">
        <div data-contact-heading className="flex gap-2 w-full justify-start items-center">
          <span className="font-DynaPuff-bold text-xl md:text-2xl text-slate-100">Contact</span>
          <div className="h-2px w-1/2 bg-sky-600 rounded-lg"></div>
        </div>
      </div>
    </div>
  )
}

export default Contact
