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
    <div ref={root} className='relative flex flex-col justify-start items-center bg-gradient-to-br from-white/10 via-blue-500/15 to-blue-900/25 backdrop-blur-xl rounded-2xl h-full pt-10 ring-1 ring-white/10 shadow-2xl shadow-blue-900/40'>
      <div className='pointer-events-none absolute inset-0 rounded-2xl overflow-hidden'>
        <div className='absolute -top-24 -right-16 h-56 w-56 rounded-full bg-sky-400/20 blur-3xl'></div>
        <div className='absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl'></div>
      </div>
      <div className='absolute w-full z-20'>
        <Quote />
      </div>
      <div data-photo className='relative group will-change-transform'>
        <div className='absolute -inset-2 rounded-full bg-gradient-to-br from-sky-400/40 via-blue-500/30 to-indigo-500/40 blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500'></div>
        <div className='relative w-36 h-36 rounded-full overflow-hidden ring-2 ring-white/30 group-hover:ring-sky-300/60 shadow-2xl shadow-blue-900/50 transition-all duration-300'>
          <img src={ProfilePhoto} alt="Montasir Mahmud" className='w-full h-full object-cover' />
        </div>
      </div>
      <div data-stagger className='mt-4 flex flex-col items-center gap-0.5'>
        <span className='font-Josefin-Slab-600 text-xl text-white tracking-wide'>Montasir Mahmud</span>
        <span className='text-xs uppercase tracking-[0.2em] text-sky-300/90 font-Nunito-regular'>Full Stack Developer</span>
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
