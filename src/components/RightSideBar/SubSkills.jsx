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
      className='flex flex-col justify-start items-center bg-blue-500 bg-opacity-20 rounded-lg h-full py-6 w-full px-4 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-indigo-500'>
      <div data-sub-item>
        <h1 className='font-Nunito-regular text-white mb-4 text-lg'>Projects Done With Nextjs</h1>
      </div>

      <div className='flex flex-col gap-4 w-full'>
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
