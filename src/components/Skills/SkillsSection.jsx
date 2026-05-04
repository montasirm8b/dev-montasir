import React, { useEffect, useRef } from "react";
import ProgrammingLanguages from "./SkillSet/ProgrammingLanguages"
import { useDispatch, useSelector } from 'react-redux';
import { changeIndex } from '../../store/SkillsState';
import FronteEnd from "./SkillSet/FrontEnd";
import UiFrameWork from './SkillSet/UiFrameWorks';
import BackEnd from "./SkillSet/BackEnd";
import ToolsPlatform from './SkillSet/ToolsPlatform';
import DataBase from "./SkillSet/DataBase";
import { gsap, getScroller, defaultEase } from "../../utils/gsap";
import { HiOutlineCode } from "react-icons/hi";
import { MdWeb, MdPalette } from "react-icons/md";
import { FaServer, FaTools, FaDatabase } from "react-icons/fa";

const categories = [
  { index: '0', label: 'Programming Languages', short: 'Languages', Icon: HiOutlineCode },
  { index: '1', label: 'Front-End Technologies', short: 'Front-End', Icon: MdWeb },
  { index: '2', label: 'UI Frameworks', short: 'UI', Icon: MdPalette },
  { index: '3', label: 'Back-End Technologies', short: 'Back-End', Icon: FaServer },
  { index: '4', label: 'Tools and Platforms', short: 'Tools', Icon: FaTools },
  { index: '5', label: 'Database', short: 'Database', Icon: FaDatabase },
];

const SkillsSection = () => {
  const skillState = useSelector(store => store.SkillState);
  const dispatch = useDispatch();
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
      <div className="relative bg-gradient-to-br from-white/10 via-blue-500/15 to-blue-900/25 backdrop-blur-xl h-[89vh] lg:h-full w-[78.5vw] lg:w-auto rounded-2xl flex flex-col justify-start items-start p-4 lg:p-8 ring-1 ring-white/10 shadow-2xl shadow-blue-900/40 overflow-hidden">
        <div className='pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl'></div>
        <div className='pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl'></div>

        <div data-skills-heading className="relative z-10 flex gap-3 w-full justify-start items-center">
          <span className="font-Merriweather-bold text-2xl text-slate-100">Skills</span>
          <div className="h-px flex-1 bg-gradient-to-r from-sky-400/60 via-blue-500/40 to-transparent rounded-lg"></div>
          <span className="hidden md:inline text-xs uppercase tracking-widest text-slate-400 font-Nunito-light">{categories.length} categories</span>
        </div>

        <div className="relative z-10 w-full mt-5 lg:mt-7 overflow-x-auto scrollbar-thin scrollbar-thumb-sky-500/40 scrollbar-track-transparent">
          <div className="flex gap-2 lg:flex-wrap pb-2">
            {categories.map(({ index, label, short, Icon }) => {
              const active = skillState.index === index;
              return (
                <button
                  key={index}
                  data-skills-name
                  onClick={() => dispatch(changeIndex(index))}
                  className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl ring-1 transition-all duration-300 font-Nunito-regular text-sm
                    ${active
                      ? 'bg-sky-500/20 text-white ring-sky-400/50 shadow-lg shadow-sky-500/20'
                      : 'bg-white/5 text-slate-200 ring-white/10 hover:bg-white/10 hover:text-white hover:ring-white/20'}
                  `}
                >
                  <Icon size={16} className={active ? 'text-sky-300' : 'text-slate-300'} />
                  <span className="hidden md:inline whitespace-nowrap">{label}</span>
                  <span className="md:hidden whitespace-nowrap">{short}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative z-10 mt-4 lg:mt-6 w-full flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-sky-500/40 scrollbar-track-transparent pr-1">
          {skillState.index === '0' ? (<ProgrammingLanguages />) : null}
          {skillState.index === '1' ? (<FronteEnd />) : null}
          {skillState.index === '2' ? (<UiFrameWork />) : null}
          {skillState.index === '3' ? (<BackEnd />) : null}
          {skillState.index === '4' ? (<ToolsPlatform />) : null}
          {skillState.index === '5' ? (<DataBase />) : null}
        </div>
      </div>
    </div>
  )
}

export default SkillsSection
