import React, { useEffect, useRef } from 'react';
import ToolTip from '../ToolTip/ToolTip';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { BsFacebook, BsGithub, BsLinkedin } from 'react-icons/bs';
import { FaUniversity, FaGraduationCap } from 'react-icons/fa';
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
      tl.fromTo(
        photo,
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.7)', clearProps: 'all' }
      );
    }
    if (items && items.length) {
      tl.fromTo(
        items,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, clearProps: 'all' },
        '-=0.4'
      );
    }

    return () => tl.kill();
  }, []);

  return (
    <div ref={root} className='relative h-full w-full'>
      <div className='absolute w-full z-20'>
        <Quote />
      </div>

      <div className='relative h-full w-full flex flex-col items-center bg-gradient-to-br from-white/10 via-blue-500/15 to-blue-900/25 backdrop-blur-xl rounded-2xl pt-6 pb-4 ring-1 ring-white/10 shadow-2xl shadow-blue-900/40 overflow-hidden'>
        <div className='pointer-events-none absolute inset-0'>
          <div className='absolute -top-24 -right-16 h-56 w-56 rounded-full bg-sky-400/20 blur-3xl'></div>
          <div className='absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl'></div>
        </div>

        <div data-photo className='relative group will-change-transform shrink-0 z-10'>
          <div className='absolute -inset-2 rounded-full bg-gradient-to-br from-sky-400/40 via-blue-500/30 to-indigo-500/40 blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500'></div>
          <div className='relative w-32 aspect-square rounded-full overflow-hidden ring-2 ring-white/30 group-hover:ring-sky-300/60 shadow-2xl shadow-blue-900/50 transition-all duration-300'>
            <img src={ProfilePhoto} alt='Montasir Mahmud' className='w-full h-full object-cover' />
          </div>
        </div>

        <div data-stagger className='relative z-10 mt-3 flex flex-col items-center gap-0.5 shrink-0'>
          <span className='font-Josefin-Slab-600 text-xl text-white tracking-wide leading-none'>
            Montasir Mahmud
          </span>
          <span className='text-[11px] uppercase tracking-[0.2em] text-sky-300/90 font-Nunito-regular'>
            Full Stack Developer
          </span>
        </div>

        <div className='relative z-10 flex-1 min-h-0 w-full flex flex-col items-center overflow-hidden mt-4 px-1'>
          <h1 data-stagger className='text-white font-Nunito-regular tracking-wide shrink-0'>
            About Me
          </h1>
          <div
            data-stagger
            className='mx-auto mt-1 mb-2 h-px w-12 bg-gradient-to-r from-transparent via-sky-300/60 to-transparent shrink-0'
          ></div>
          <p
            data-stagger
            className='px-4 text-white font-Nunito-light text-center shrink-0'
          >
            I am passionate about building excellent software that improves the lives of those around me. I specialize in creating software for clients ranging from individuals and small-businesses all the way to large enterprise corporations.
          </p>

          <h1 data-stagger className='mt-5 text-white font-Nunito-regular tracking-wide shrink-0'>
            Education
          </h1>
          <div
            data-stagger
            className='mx-auto mt-1 mb-2 h-px w-12 bg-gradient-to-r from-transparent via-sky-300/60 to-transparent shrink-0'
          ></div>
          <div data-stagger className='flex flex-col px-4 text-white gap-2 w-full shrink-0'>
            <div className='flex items-start gap-2.5 bg-white/5 hover:bg-white/10 transition-colors duration-300 rounded-xl p-3 ring-1 ring-white/5'>
              <span className='shrink-0 text-sky-300 mt-0.5'>
                <FaGraduationCap size={22} />
              </span>
              <div className='leading-snug min-w-0'>
                <span className='font-Nunito-light text-slate-300'>Studies</span>
                <span className='font-Nunito-regular'> Computer Science and Engineering</span>
              </div>
            </div>
            <div className='flex items-start gap-2.5 bg-white/5 hover:bg-white/10 transition-colors duration-300 rounded-xl p-3 ring-1 ring-white/5'>
              <span className='shrink-0 text-sky-300 mt-0.5'>
                <FaUniversity size={26} />
              </span>
              <div className='leading-snug min-w-0'>
                <span className='font-Nunito-light text-slate-300'>Goes to</span>{' '}
                <span className='font-Nunito-regular'>Rajshahi University of Engineering and Technology</span>
              </div>
            </div>
          </div>
        </div>

        <h1 data-stagger className='relative z-10 pt-3 text-white font-Nunito-regular tracking-wide shrink-0'>
          Find out more on
        </h1>
        <div
          data-stagger
          className='relative z-10 mx-auto mt-1 mb-2 h-px w-12 bg-gradient-to-r from-transparent via-sky-300/60 to-transparent shrink-0'
        ></div>
        <div data-stagger className='relative z-10 flex gap-2 shrink-0'>
          <ToolTip title='Github'>
            <button
              className='w-9 h-9 rounded-lg bg-white/5 hover:bg-sky-500/20 hover:text-sky-300 text-slate-100 flex items-center justify-center ring-1 ring-white/10 transition-all duration-300'
              onClick={() => window.open(Links.github, '_blank')}
            >
              <BsGithub size={16} />
            </button>
          </ToolTip>
          <ToolTip title='Linkedin'>
            <button
              className='w-9 h-9 rounded-lg bg-white/5 hover:bg-sky-500/20 hover:text-sky-300 text-slate-100 flex items-center justify-center ring-1 ring-white/10 transition-all duration-300'
              onClick={() => window.open(Links.linkedin, '_blank')}
            >
              <BsLinkedin size={16} />
            </button>
          </ToolTip>
          <ToolTip title='Facebook'>
            <button
              className='w-9 h-9 rounded-lg bg-white/5 hover:bg-sky-500/20 hover:text-sky-300 text-slate-100 flex items-center justify-center ring-1 ring-white/10 transition-all duration-300'
              onClick={() => window.open(Links.facebook, '_blank')}
            >
              <BsFacebook size={16} />
            </button>
          </ToolTip>
          <ToolTip title='Twitter'>
            <button
              className='w-9 h-9 rounded-lg bg-white/5 hover:bg-sky-500/20 hover:text-sky-300 text-slate-100 flex items-center justify-center ring-1 ring-white/10 transition-all duration-300'
              onClick={() => window.open(Links.twitter, '_blank')}
            >
              <AiFillTwitterCircle size={18} />
            </button>
          </ToolTip>
        </div>
      </div>
    </div>
  );
};

export default SubIntro;
