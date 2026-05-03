import React from 'react';
import { useSelector } from 'react-redux';
import SubIntro from './SubIntro';
import SubSkills from './SubSkills';

const RightSideBar = () => {
  const insideViewport = useSelector(state => state.AppState.insideViewport);
  return (
    <div className='h-screen flex flex-col justify-center items-end w-full p-4'>
      {insideViewport === 'intro' ? <SubIntro /> : null}
      {insideViewport === 'skills' ? <SubSkills /> : null}
    </div>
  );
};

export default RightSideBar;
