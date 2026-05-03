import React, { useEffect, useRef } from 'react';
import ToolTip from '../ToolTip/ToolTip';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';
import { BsGithub } from 'react-icons/bs';
import { BsLinkedin } from 'react-icons/bs';
import { FaUniversity } from 'react-icons/fa';
import { FaGraduationCap } from 'react-icons/fa';
import Quote from '../Intro/Quote';
import Links from '../../assets/data/links.data';
import ProfilePhoto from '../../assets/images/Montasir-Mahmud.webp';
import { gsap, defaultEase } from '../../utils/gsap';

const SubIntro = () => {
  const root = useRef(null);

  useEffect(() => {
    if (!root.current) return;
    const photo = root.current.querySelector('[data-photo]');
    const items = root.current.querySelectorAll('[data-stagger]');

    const tl = gsap.timeline({ defaults: { ease: defaultEase } });
    if (photo) {
      tl.fromTo(photo,
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.7)', clearProps: 'all' }
      );
    }
    if (items && items.length) {
      tl.fromTo(items,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, clearProps: 'all' },
        '-=0.4'
      );
    }

    return () => tl.kill();
  }, []);

  return (
    <div ref={root} className='relative flex flex-col justify-start items-center bg-gradient-to-br from-white/10 via-blue-500/15 to-blue-900/25 backdrop-blur-xl rounded-2xl h-full pt-10 ring-1 ring-white/10 shadow-2xl shadow-blue-900/40 overflow-hidden'>
      <div className='pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full bg-sky-400/20 blur-3xl'></div>
      <div className='pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl'></div>
      <div className='absolute w-full'>
        <Quote />
      </div>
      <div data-photo className='relative w-32 h-32 bg-blue-700 rounded-full overflow-y-hidden group ring-4 ring-sky-400/40 hover:ring-sky-300/60 shadow-xl shadow-sky-500/30 transition-all duration-300 will-change-transform'>
        <img src={ProfilePhoto} alt="Montasir" />
        <div className='top-0 absolute z-30 bg-gradient-to-tr from-stone-800 to-blue-700 opacity-25 group-hover:opacity-0 transition-all duration-300 w-32 h-32'></div>
      </div>
      <h1 data-stagger className='mt-5 px-4 text-white font-Nunito-regular tracking-wide'>About Me</h1>
      <div data-stagger className='mx-auto mt-1 mb-2 h-px w-12 bg-gradient-to-r from-transparent via-sky-300/60 to-transparent'></div>
      <p data-stagger className='px-5 text-slate-100/90 font-Nunito-light text-center text-sm leading-relaxed'>
        I am passionate about building excellent software that improves the lives of those around me. I specialize in creating software for clients ranging from individuals and small-businesses all the way to large enterprise corporations.
      </p>
      <h1 data-stagger className='mt-6 px-4 text-white font-Nunito-regular tracking-wide'>Education</h1>
      <div data-stagger className='mx-auto mt-1 mb-3 h-px w-12 bg-gradient-to-r from-transparent via-sky-300/60 to-transparent'></div>
      <div data-stagger className='flex flex-col px-5 text-white gap-3 w-full'>
        <div className='flex justify-start items-start gap-3 bg-white/5 hover:bg-white/10 transition-colors duration-300 rounded-xl p-3 ring-1 ring-white/5'>
          <span className='shrink-0 text-sky-300 mt-0.5'><FaGraduationCap size={22} /></span>
          <div className='leading-snug'>
            <span className='font-Nunito-light text-slate-300 text-xs uppercase tracking-wider block'>Studies</span>
            <span className='font-Nunito-regular text-sm'>Computer Science and Engineering</span>
          </div>
        </div>
        <div className='flex justify-start items-start gap-3 bg-white/5 hover:bg-white/10 transition-colors duration-300 rounded-xl p-3 ring-1 ring-white/5'>
          <span className='shrink-0 text-sky-300 mt-0.5'><FaUniversity size={22} /></span>
          <div className='leading-snug'>
            <span className='font-Nunito-light text-slate-300 text-xs uppercase tracking-wider block'>Goes to</span>
            <span className='font-Nunito-regular text-sm'>Rajshahi University of Engineering and Technology</span>
          </div>
        </div>
      </div>
      <h1 data-stagger className='mt-auto px-4 text-white font-Nunito-regular tracking-wide'>Find out more on</h1>
      <div data-stagger className='mx-auto mt-1 mb-2 h-px w-12 bg-gradient-to-r from-transparent via-sky-300/60 to-transparent'></div>
      <div data-stagger className='flex gap-3 mb-5 mt-2'>
        <ToolTip title='Github'>
          <button className='w-10 h-10 rounded-lg bg-white/5 hover:bg-sky-500/20 hover:text-sky-300 text-slate-100 flex items-center justify-center ring-1 ring-white/10 transition-all duration-300' onClick={() => window.open(Links.github, '_blank')}><BsGithub size={20} /></button>
        </ToolTip>
        <ToolTip title='Linkedin'>
          <button className='w-10 h-10 rounded-lg bg-white/5 hover:bg-sky-500/20 hover:text-sky-300 text-slate-100 flex items-center justify-center ring-1 ring-white/10 transition-all duration-300' onClick={() => window.open(Links.linkedin, '_blank')}><BsLinkedin size={20} /></button>
        </ToolTip>
        <ToolTip title='Facebook'>
          <button className='w-10 h-10 rounded-lg bg-white/5 hover:bg-sky-500/20 hover:text-sky-300 text-slate-100 flex items-center justify-center ring-1 ring-white/10 transition-all duration-300' onClick={() => window.open(Links.facebook, '_blank')}><BsFacebook size={20} /></button>
        </ToolTip>
        <ToolTip title='Twitter'>
          <button className='w-10 h-10 rounded-lg bg-white/5 hover:bg-sky-500/20 hover:text-sky-300 text-slate-100 flex items-center justify-center ring-1 ring-white/10 transition-all duration-300' onClick={() => window.open(Links.twitter, '_blank')}><AiFillTwitterCircle size={22} /></button>
        </ToolTip>
      </div>
    </div>
  )
}

export default SubIntro
