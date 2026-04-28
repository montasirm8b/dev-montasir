import React, { useEffect, useRef } from 'react';
import ProjectListLg from './ProjectListLg';
import Projects_data from './../../assets/data/projects.data';
import { gsap, getScroller, defaultEase } from '../../utils/gsap';

const Projects = () => {
  const root = useRef(null);

  useEffect(() => {
    if (!root.current) return;
    const scroller = getScroller();
    const cards = root.current.querySelectorAll('[data-project-card]');
    if (!cards || !cards.length) return;

    const triggerCfg = scroller
      ? {
          scroller,
          trigger: root.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        }
      : undefined;

    const tween = gsap.fromTo(cards,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: defaultEase,
        clearProps: 'all',
        ...(triggerCfg ? { scrollTrigger: triggerCfg } : {}),
      }
    );

    return () => {
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
      tween.kill();
    };
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
