import React, { useLayoutEffect, useRef } from 'react';
import ProjectListLg from './ProjectListLg';
import Projects_data from './../../assets/data/projects.data';
import { gsap, SCROLLER, defaultEase } from '../../utils/gsap';

const Projects = () => {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = root.current.querySelectorAll('[data-project-card]');
      gsap.from(cards, {
        y: 80,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: defaultEase,
        scrollTrigger: {
          scroller: SCROLLER,
          trigger: root.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <>
    <div ref={root} className='h-screen relative overflow-y-auto scrollbar-rounded pb-14 pr-4 lg:pb-0 '>
      <div className='lg:hidden flex justify-center items-center text-slate-100 text-xl font-semibold rounded-md sticky top-0 z-20 shadow-md my-4'>My Projects</div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-0 md:p-4'>
          {
            Projects_data.map((project, index) => {
              return (
                <div data-project-card key={index}>
                  <ProjectListLg project={project} />
                </div>
              );
            })

          }
      </div>
    </div>
    </>
  )
}

export default Projects
