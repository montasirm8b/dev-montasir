import React, { useEffect, useRef } from 'react';
import { gsap, defaultEase } from '../../utils/gsap';
import { SiNextdotjs, SiReact, SiTailwindcss, SiTypescript, SiNodedotjs, SiMongodb } from 'react-icons/si';
import { HiOutlineLightBulb, HiOutlineSparkles } from 'react-icons/hi';

const featured = [
  { Icon: SiNextdotjs, name: 'Next.js', tone: 'text-white' },
  { Icon: SiReact, name: 'React', tone: 'text-sky-400' },
  { Icon: SiTypescript, name: 'TypeScript', tone: 'text-blue-400' },
  { Icon: SiTailwindcss, name: 'Tailwind', tone: 'text-cyan-400' },
  { Icon: SiNodedotjs, name: 'Node.js', tone: 'text-green-400' },
  { Icon: SiMongodb, name: 'MongoDB', tone: 'text-emerald-400' },
];

const SubSkills = () => {
  const root = useRef(null);

  useEffect(() => {
    if (!root.current) return;
    const items = root.current.querySelectorAll('[data-sub-item]');
    if (!items || !items.length) return;

    const tween = gsap.fromTo(
      items,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: defaultEase, clearProps: 'all' }
    );

    return () => tween.kill();
  }, []);

  return (
    <div
      ref={root}
      className='relative flex flex-col justify-start items-stretch bg-gradient-to-br from-white/10 via-blue-500/15 to-blue-900/25 backdrop-blur-xl rounded-2xl h-full w-full p-5 ring-1 ring-white/10 shadow-2xl shadow-blue-900/40'
    >
      <div className='pointer-events-none absolute inset-0 rounded-2xl overflow-hidden'>
        <div className='absolute -top-24 -right-16 h-56 w-56 rounded-full bg-sky-400/20 blur-3xl'></div>
        <div className='absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl'></div>
      </div>

      <div data-sub-item className='relative z-10 text-center'>
        <div className='inline-flex items-center gap-2 text-sky-300'>
          <HiOutlineSparkles size={18} />
          <span className='font-DynaPuff-bold text-lg text-white'>My Stack</span>
        </div>
        <div className='mx-auto mt-2 mb-1 h-px w-16 bg-gradient-to-r from-transparent via-sky-300/60 to-transparent'></div>
        <p className='text-slate-300/90 font-Nunito-light text-xs'>What I reach for first</p>
      </div>

      <div data-sub-item className='relative z-10 mt-5 grid grid-cols-2 gap-2.5'>
        {featured.map(({ Icon, name, tone }) => (
          <div
            key={name}
            className='group flex items-center gap-2 bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-sky-400/40 rounded-xl px-3 py-2.5 transition-all duration-300'
          >
            <Icon size={20} className={`shrink-0 ${tone}`} />
            <span className='text-slate-100 font-Nunito-regular text-sm truncate'>{name}</span>
          </div>
        ))}
      </div>

      <div data-sub-item className='relative z-10 mt-5 rounded-xl p-4 bg-gradient-to-br from-sky-500/15 to-indigo-500/10 ring-1 ring-sky-400/20'>
        <div className='flex items-center gap-2 mb-1.5'>
          <HiOutlineLightBulb size={18} className='text-amber-300' />
          <span className='text-slate-100 font-Nunito-regular text-sm'>Currently exploring</span>
        </div>
        <p className='text-slate-300 font-Nunito-light text-xs leading-relaxed'>
          AI integrations, edge functions, and crafting interfaces that feel as good as they look.
        </p>
      </div>

      <div data-sub-item className='relative z-10 mt-auto pt-4 flex items-center justify-between text-[11px] uppercase tracking-widest font-Nunito-light text-slate-400'>
        <span>5+ years</span>
        <span className='h-1 w-1 rounded-full bg-sky-400/60'></span>
        <span>20+ shipped</span>
        <span className='h-1 w-1 rounded-full bg-sky-400/60'></span>
        <span>Always learning</span>
      </div>
    </div>
  );
};

export default SubSkills;
