import React, { useLayoutEffect, useRef } from 'react';
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

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: defaultEase } });
      tl.from(root.current, { opacity: 0, y: 30, duration: 0.7 })
        .from(root.current.querySelector('[data-photo]'), {
          scale: 0.6,
          opacity: 0,
          duration: 0.8,
          ease: 'back.out(1.7)',
        }, '-=0.4')
        .from(root.current.querySelectorAll('[data-stagger]'), {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
        }, '-=0.5');
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className='flex flex-col justify-start items-center bg-blue-500 bg-opacity-20 rounded-lg h-full pt-10'>
      <div className='absolute w-full'>
        <Quote />
      </div>
      <div data-photo className='relative w-32 h-32 bg-blue-700 rounded-full overflow-y-hidden group outline-blue-700 outline-4 outline hover:outline-blue-600 will-change-transform'>
        <img src={ProfilePhoto} alt="Montasir" />
        <div className='top-0 absolute z-30 bg-gradient-to-tr from-stone-800 to-blue-700 opacity-25 hover:opacity-0 transition-all duration-300 w-32 h-32'></div>
      </div>
      <h1 data-stagger className='mt-4 px-4 text-white font-Nunito-regular'>About Me</h1>
      <p data-stagger className='px-4 text-white font-Nunito-light text-center'>
        I am passionate about building excellent software that improves the lives of those around me. I specialize in creating software for clients ranging from individuals and small-businesses all the way to large enterprise corporations.
      </p>
      <h1 data-stagger className='mt-6 px-4 text-white font-Nunito-regular'>Education</h1>
      <div data-stagger className='flex flex-col px-4 text-white'>
        <div className='flex justify-start items-start gap-2'>
          <FaGraduationCap size={24} />
          <div>
            <span className='font-Nunito-light'>Studies</span>
            <span className='font-Nunito-regular'> Computer Science and Engineering</span>
          </div>
        </div>
        <div className='flex justify-start items-start gap-2 font-Nunito-light'>
          <FaUniversity size={28} />
          <div>
            <span className='font-Nunito-light'>Goes to</span> <span className='font-Nunito-regular'>Rajshahi University of Engineering and Technology</span>
          </div>
        </div>
      </div>
      <h1 data-stagger className='mt-auto px-4 text-white font-Nunito-regular'>Find out more on</h1>
      <div data-stagger className='flex gap-6 mb-4 mt-2'>
        <ToolTip title='Github'>
          <button className='text-gray-100' onClick={() => window.open(Links.github, '_blank')}><BsGithub size={24} /></button>
        </ToolTip>
        <ToolTip title='Linkedin'>
          <button className='text-gray-100' onClick={() => window.open(Links.linkedin, '_blank')}><BsLinkedin size={22} /></button>
        </ToolTip>
        <ToolTip title='Facebook'>
          <button className='text-gray-100' onClick={() => window.open(Links.facebook, '_blank')}><BsFacebook size={23} /></button>
        </ToolTip>
        <ToolTip title='Twitter'>
          <button className='text-gray-100' onClick={() => window.open(Links.twitter, '_blank')}><AiFillTwitterCircle size={28} /></button>
        </ToolTip>
      </div>
    </div>
  )
}

export default SubIntro
