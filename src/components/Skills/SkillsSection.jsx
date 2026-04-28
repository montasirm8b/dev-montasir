import React, { useLayoutEffect, useRef } from "react";
import ProgrammingLanguages from "./SkillSet/ProgrammingLanguages"
import SkillName from "./SkillName";
import { useSelector } from 'react-redux';
import FronteEnd from "./SkillSet/FrontEnd";
import UiFrameWork from './SkillSet/UiFrameWorks';
import BackEnd from "./SkillSet/BackEnd";
import ToolsPlatform from './SkillSet/ToolsPlatform';
import DataBase from "./SkillSet/DataBase";
import { gsap, SCROLLER, defaultEase } from "../../utils/gsap";

const SkillsSection = () => {
  const skillState = useSelector(store => store.SkillState);
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const card = root.current.querySelector('[data-skills-card]');
      const heading = root.current.querySelector('[data-skills-heading]');
      const names = root.current.querySelectorAll('[data-skills-name]');

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

      gsap.from(names, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: defaultEase,
        scrollTrigger: {
          scroller: SCROLLER,
          trigger: card,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="pt-4 pr-0 pb-3 pl-2 lg:pl-4 h-full">
      <div data-skills-card className="bg-blue-500 bg-opacity-20 backdrop-blur-md h-[89vh] lg:h-full w-[78.5vw] lg:w-auto rounded-md flex flex-col justify-start items-start p-4 lg:p-10">
        <div data-skills-heading className="flex gap-2 w-full justify-start items-center">
          <span className="font-DynaPuff-bold text-2xl text-slate-100">Skills</span>
          <div className="h-2px w-1/2 bg-blue-600 rounded-lg"></div>
        </div>
        <div className="relative flex flex-col lg:flex-row justify-start items-start mt-4 lg:mt-10">
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
