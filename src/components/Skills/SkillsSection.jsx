import React, { useEffect, useRef } from "react";
import ProgrammingLanguages from "./SkillSet/ProgrammingLanguages"
import SkillName from "./SkillName";
import { useSelector } from 'react-redux';
import FronteEnd from "./SkillSet/FrontEnd";
import UiFrameWork from './SkillSet/UiFrameWorks';
import BackEnd from "./SkillSet/BackEnd";
import ToolsPlatform from './SkillSet/ToolsPlatform';
import DataBase from "./SkillSet/DataBase";
import { gsap, getScroller, defaultEase } from "../../utils/gsap";

const SkillsSection = () => {
  const skillState = useSelector(store => store.SkillState);
  const root = useRef(null);

  useEffect(() => {
    if (!root.current) return;
    const scroller = getScroller();
    const heading = root.current.querySelector('[data-skills-heading]');
    const names = root.current.querySelectorAll('[data-skills-name]');

    const tweens = [];
    const triggerCfg = scroller
      ? {
          scroller,
          trigger: root.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        }
      : undefined;

    if (heading) {
      tweens.push(
        gsap.fromTo(heading,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: defaultEase,
            clearProps: 'all',
            ...(triggerCfg ? { scrollTrigger: triggerCfg } : {}),
          }
        )
      );
    }

    if (names && names.length) {
      tweens.push(
        gsap.fromTo(names,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: defaultEase,
            clearProps: 'all',
            ...(triggerCfg ? { scrollTrigger: triggerCfg } : {}),
          }
        )
      );
    }

    return () => {
      tweens.forEach((t) => {
        if (t.scrollTrigger) t.scrollTrigger.kill();
        t.kill();
      });
    };
  }, []);

  return (
    <div ref={root} className="pt-4 pr-0 pb-3 pl-2 lg:pl-4 h-full">
      <div className="relative bg-gradient-to-br from-white/10 via-blue-500/15 to-blue-900/25 backdrop-blur-xl h-[89vh] lg:h-full w-[78.5vw] lg:w-auto rounded-2xl flex flex-col justify-start items-start p-4 lg:p-10 ring-1 ring-white/10 shadow-2xl shadow-blue-900/40 overflow-hidden">
        <div className='pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl'></div>
        <div className='pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl'></div>
        <div data-skills-heading className="relative z-10 flex gap-3 w-full justify-start items-center">
          <span className="font-DynaPuff-bold text-2xl text-slate-100">Skills</span>
          <div className="h-px flex-1 bg-gradient-to-r from-sky-400/60 via-blue-500/40 to-transparent rounded-lg"></div>
        </div>
        <div className="relative z-10 flex flex-col lg:flex-row justify-start items-start mt-4 lg:mt-10">
          <div className="track-line hidden lg:block">
            <div className="position-line"></div>
          </div>
          <div className="w-[70vw] lg:w-auto overflow-auto mb-2 lg:mb-0">
            <div className="flex flex-row lg:flex-col">
              <div data-skills-name><SkillName index='0'><span className="whitespace-nowrap">Programming Languages</span></SkillName></div>
              <div data-skills-name><SkillName index='1'><span className="whitespace-nowrap">Front-End Technologies</span></SkillName></div>
              <div data-skills-name><SkillName index='2'><span className="whitespace-nowrap">UI Frameworks</span></SkillName></div>
              <div data-skills-name><SkillName index='3'><span className="whitespace-nowrap">Back-End Technologies</span></SkillName></div>
              <div data-skills-name><SkillName index='4'><span className="whitespace-nowrap">Tools and Platforms</span></SkillName></div>
              <div data-skills-name><SkillName index='5'><span className="whitespace-nowrap">Database</span></SkillName></div>
            </div>
          </div>
          <div className="px-2 lg:px-6">
            {
              skillState.index === '0' ? (<ProgrammingLanguages />) : null
            }

            {
              skillState.index === '1' ? (<FronteEnd />) : null
            }

            {
              skillState.index === '2' ? (<UiFrameWork />) : null
            }

            {
              skillState.index === '3' ? (<BackEnd />) : null
            }

            {
              skillState.index === '4' ? (<ToolsPlatform />) : null
            }

            {
              skillState.index === '5' ? (<DataBase />) : null
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkillsSection
