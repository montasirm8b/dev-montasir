import React, { useEffect, useRef } from 'react';
import ProjectListSm from './ProjectListSm';
import { gsap, defaultEase } from '../../utils/gsap';

const SubSkills = () => {
  const root = useRef(null);

  useEffect(() => {
    if (!root.current) return;
    const items = root.current.querySelectorAll('[data-sub-item]');
    if (!items || !items.length) return;

    const tween = gsap.fromTo(items,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: defaultEase, clearProps: 'all' }
    );

    return () => tween.kill();
  }, []);

  return (
    <div
      ref={root}
      className='relative flex flex-col justify-start items-center bg-gradient-to-br from-white/10 via-blue-500/15 to-blue-900/25 backdrop-blur-xl rounded-2xl h-full py-6 w-full px-4 ring-1 ring-white/10 shadow-2xl shadow-blue-900/40 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-sky-500/60'>
      <div className='pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full bg-sky-400/20 blur-3xl'></div>
      <div className='pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl'></div>
      <div data-sub-item className='relative z-10 w-full text-center'>
        <h1 className='font-Nunito-regular text-white text-lg tracking-wide'>Projects Done With Next.js</h1>
        <div className='mx-auto mt-2 mb-4 h-px w-16 bg-gradient-to-r from-transparent via-sky-300/60 to-transparent'></div>
      </div>

      <div className='relative z-10 flex flex-col gap-4 w-full'>
        <div data-sub-item>
          <ProjectListSm
            project_img='https://seeklogo.com/images/N/next-js-logo-8FCFF51DD2-seeklogo.com.png'
            project='Montasir Blog'
            details='This is my blog site'
            github_link='https://'
            live_link='h'
            key='MyBlogSite'
          />
        </div>

        <div data-sub-item>
          <ProjectListSm
            project_img='https://mllj2j8xvfl0.i.optimole.com/Lsv2lkg.pJlS~36fbd/w:auto/h:auto/q:90/f:avif/https://s15165.pcdn.co/wp-content/uploads/2018/05/linkedin.jpg'
            project='mePhoto'
            details='Photo sharing social media site'
            github_link='https://'
            live_link='h'
            key='PhotoSharingSite'
          />
        </div>
      </div>
    </div>
  )
}

export default SubSkills
