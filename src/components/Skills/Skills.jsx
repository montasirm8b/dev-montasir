import React, { useEffect, useRef } from 'react';
import ToolTip from '../ToolTip/ToolTip'
import SkillCard from './SkillCard';
import { themeMode } from '../../utils/enums';
import { gsap, getScroller, defaultEase } from '../../utils/gsap';

const Skills = () => {
  const root = useRef(null);

  useEffect(() => {
    if (!root.current) return;
    const scroller = getScroller();
    const cards = root.current.querySelectorAll('[data-skill-card]');
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
      { y: 30, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.06,
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
    <div ref={root} className='pb-14 lg:pl-4 lg:pt-4 lg:pb-4 lg:pr-0 mx-2'>
    <div className='lg:hidden flex justify-center items-center bg-blue-500 bg-opacity-30 p-2 text-slate-100 text-xl font-semibold mb-6 rounded-md sticky top-0 z-20 mt-2 shadow-md'>My Skills are</div>
    <div className='bg-blue-500 bg-opacity-20 py-2 pb-4 lg:p-4 rounded-xl shadow-xl lg:min-h-full mx-1'>
      <div className='w-full flex justify-center items-center'>
        <h1 className='hidden lg:block text-3xl font-Merriweather-bold text-gray-100'>Web Technologies I use:</h1>
      </div>
        <div className='flex flex-col lg:py-8 px-4'>
            <h1 className='text-white text-lg font-Nunito-regular mb-2'>Web Programming / Frameworks</h1>
          <div className='flex justify-center items-center flex-wrap gap-2 lg:gap-6'>
            <ToolTip title="Next JS">
              <div data-skill-card>
                <SkillCard
                  imgSrc="https://seeklogo.com/images/N/next-js-logo-8FCFF51DD2-seeklogo.com.png"
                  altText="nextjs"
                />
              </div>
            </ToolTip>
            <ToolTip title="React JS">
              <div data-skill-card>
                <SkillCard
                    imgSrc="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png"
                    altText="reactjs"
                    vairant={themeMode.DARK}
                  />
              </div>
            </ToolTip>

            <ToolTip title="Javascript">
              <div data-skill-card>
                <SkillCard
                  imgSrc='https://www.seekpng.com/png/full/80-803385_open-javascript-logo-png-white.png'
                  altText='javascript'
                  bgColor='bg-yellow-400'
                />
              </div>
            </ToolTip>

            <ToolTip title="Typescript">
              <div data-skill-card>
                <SkillCard
                  imgSrc="https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_typescript_icon_130108.png"
                  altText="typescript"
                />
              </div>
            </ToolTip>

          </div>

          <h1 className='text-white text-lg font-Nunito-regular mt-6 mb-2'>UI / UX design</h1>
          <div className='flex justify-center items-center flex-wrap gap-2 lg:gap-6'>
            <ToolTip title="Tailwindcss">
              <div data-skill-card>
                <SkillCard
                  imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/900px-Tailwind_CSS_Logo.svg.png"
                  altText="tailwindcss"
                />
              </div>
            </ToolTip>
            <ToolTip title="Bootstrap">
              <div data-skill-card>
                <SkillCard
                  imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/768px-Bootstrap_logo.svg.png"
                  altText="bootstrap"
                />
              </div>
            </ToolTip>
            <ToolTip title="MaterialUI">
              <div data-skill-card>
                <SkillCard
                  imgSrc="https://seeklogo.com/images/M/material-ui-logo-5BDCB9BA8F-seeklogo.com.png"
                  altText="materialui"
                />
              </div>
            </ToolTip>
          </div>

          <h1 className='text-white text-lg font-Nunito-regular mt-6 mb-2'>Database / CMS </h1>

          <div className='flex justify-center items-center flex-wrap gap-2 lg:gap-6'>
            <ToolTip title="Firebase">
              <div data-skill-card>
                <SkillCard
                  imgSrc="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-firebase-icon.png"
                  altText="firebase"
                />
              </div>
            </ToolTip>
            <ToolTip title="Sanity.io">
              <div data-skill-card>
                <SkillCard
                  imgSrc="https://avatars.githubusercontent.com/u/17177659?s=200&v=4"
                  altText="sanity"
                />
              </div>
            </ToolTip>
            <ToolTip title="GraphQL">
              <div data-skill-card>
                <SkillCard
                  imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/768px-GraphQL_Logo.svg.png?20161105194737"
                  altText="graphql"
                />
              </div>
            </ToolTip>
            <ToolTip title="Socket.io">
              <div data-skill-card>
                <SkillCard
                  imgSrc="https://cdn.freebiesupply.com/logos/large/2x/socket-io-logo-png-transparent.png"
                  altText="socket.io"
                />
              </div>
            </ToolTip>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skills
