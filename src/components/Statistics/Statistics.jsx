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
      <div className="relative bg-gradient-to-br from-white/10 via-blue-500/15 to-blue-900/25 h-[89vh] lg:h-full w-[78.5vw] lg:w-auto rounded-2xl flex flex-col justify-start items-start p-4 lg:p-8 ring-1 ring-white/10 shadow-2xl shadow-blue-900/40 overflow-hidden">
        <div className='pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl'></div>
        <div className='pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl'></div>
        <div data-stats-heading className="relative z-10 flex gap-3 w-full justify-start items-center mb-4 shrink-0">
          <span className="font-Merriweather-bold text-xl md:text-2xl text-slate-100">My Stats</span>
          <div className="h-px flex-1 bg-gradient-to-r from-sky-400/60 via-blue-500/40 to-transparent rounded-lg"></div>
        </div>

        <div className="relative z-10 flex-1 min-h-0 w-full">
          <GithubContributions />
        </div>
      </div>
    </div>
  )
}

export default Statistics
