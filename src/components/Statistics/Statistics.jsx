import React, { useEffect, useRef } from "react";
import GithubContributions from "./GithubContributions";
import { gsap, getScroller, defaultEase } from "../../utils/gsap";

const Statistics = () => {
  const root = useRef(null);

  useEffect(() => {
    if (!root.current) return;
    const scroller = getScroller();
    const heading = root.current.querySelector('[data-stats-heading]');
    if (!heading) return;

    const triggerCfg = scroller
      ? {
          scroller,
          trigger: root.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        }
      : undefined;

    const tween = gsap.fromTo(heading,
      { x: -40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: defaultEase,
        clearProps: 'all',
        ...(triggerCfg ? { scrollTrigger: triggerCfg } : {}),
      }
    );

    return () => {
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
      tween.kill();
    };
  }, []);

  return (
    <div ref={root} className="pt-4 pr-0 pb-3 pl-2 lg:pl-4 h-full">
      <div className="bg-blue-500 bg-opacity-20 backdrop-blur-md h-[89vh] lg:h-full w-[78.5vw] lg:w-auto rounded-md flex flex-col justify-start items-start p-4 lg:p-10">
        <div data-stats-heading className="flex gap-2 w-full justify-start items-center mb-4">
          <span className="font-DynaPuff-bold text-xl md:text-2xl text-slate-100">My Stats</span>
          <div className="h-2px w-1/2 bg-sky-600 rounded-lg"></div>
        </div>

        <GithubContributions />
      </div>
    </div>
  )
}

export default Statistics
