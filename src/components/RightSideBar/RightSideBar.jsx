import React from 'react';
import { useSelector } from 'react-redux';
import SubIntro from './SubIntro';
import SubSkills from './SubSkills';


const RightSideBar = () => {
  const insideViewport = useSelector(state => state.AppState.insideViewport);
  return (
    <div className='h-screen flex flex-col justify-center items-end w-full p-4'>
        {
          insideViewport === 'intro' ? (
            <SubIntro />
          ) : (
            null
          )
        }

        {
          insideViewport === 'skills' ? (
            <SubSkills />
          ) : null
        }

        {/* {
          insideViewport === 'projects' ? (
            <SubProjects />
          ) : null
        } */}

        {/* {
          insideViewport === 'courses' ? (
            <motion.div animate={{opacity: 1}} transition={{duration:0.5, delay: 0.5}} initial={{opacity: 0}} className=''>
              <div className='bg-slate-400 h-56 p-10'>Im A very Good Boy</div>
            </motion.div>
          ) : null
        }
        
        {
          insideViewport === 'contact' ? (
            <motion.div animate={{opacity: 1}} transition={{duration:0.5, delay: 0.5}} initial={{opacity: 0}} className=''>
              <div className='bg-slate-400 h-56 p-10'>Im A very Good Boy</div>
            </motion.div>
          ) : null
        } */}
    </div>
  )
}

export default RightSideBar