import React, { useEffect, useRef, useState } from 'react';
import {
  BsGithub,
  BsPeopleFill,
  BsPersonFill,
  BsCalendar3,
} from 'react-icons/bs';
import { gsap, getScroller } from '../../utils/gsap';

const GH_USER = 'montasirm8b';

const stats = [
  { label: 'Years Coding', value: 5, suffix: '+' },
  { label: 'Projects Shipped', value: 40, suffix: '+' },
  { label: 'GitHub Repos', value: 60, suffix: '+' },
  { label: 'Happy Clients', value: 20, suffix: '+' },
];

const GithubStatsCard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.github.com/users/${GH_USER}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.status))))
      .then((u) => {
        if (!cancelled) setData(u);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const items = data
    ? [
        { icon: BsPeopleFill, label: 'Followers', value: data.followers },
        { icon: BsPersonFill, label: 'Following', value: data.following },
        {
          icon: BsCalendar3,
          label: 'Member Since',
          value: new Date(data.created_at).getFullYear(),
        },
      ]
    : null;

  return (
    <div className='w-full h-full rounded-md bg-slate-900/40 border border-white/10 p-3 flex flex-col gap-1'>
      <div className='flex items-center gap-2 mb-1 pb-1.5 border-b border-white/10'>
        <BsGithub className='text-sky-300' size={12} />
        <span className='text-sky-300 font-Nunito-regular text-[11px]'>
          {GH_USER}'s GitHub Stats
        </span>
      </div>
      {error && (
        <div className='text-slate-400 text-[10px] font-Nunito-light'>
          Stats unavailable.
        </div>
      )}
      {!error && !items && (
        <div className='space-y-1.5 animate-pulse'>
          {[0, 1, 2].map((i) => (
            <div key={i} className='h-3 bg-white/5 rounded' />
          ))}
        </div>
      )}
      {items &&
        items.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className='flex items-center justify-between text-[11px]'
          >
            <span className='flex items-center gap-1.5 text-slate-300 font-Nunito-light'>
              <Icon className='text-sky-300' size={11} />
              {label}
            </span>
            <span className='text-slate-50 font-Merriweather-bold'>
              {value}
            </span>
          </div>
        ))}
    </div>
  );
};

const GithubContributions = () => {
  const root = useRef(null);

  useEffect(() => {
    if (!root.current) return;
    const scroller = getScroller();
    const cards = root.current.querySelectorAll('[data-stat-card]');
    if (!cards.length) return;

    const triggerCfg = scroller
      ? {
          scroller,
          trigger: root.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        }
      : undefined;

    const cardTween = gsap.fromTo(
      cards,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        ...(triggerCfg ? { scrollTrigger: triggerCfg } : {}),
      }
    );

    const counterTweens = [];
    cards.forEach((card) => {
      const numEl = card.querySelector('[data-stat-num]');
      if (!numEl) return;
      const target = Number(numEl.dataset.statNum || 0);
      const counter = { val: 0 };
      counterTweens.push(
        gsap.to(counter, {
          val: target,
          duration: 1.4,
          ease: 'power2.out',
          delay: 0.2,
          onUpdate: () => {
            numEl.textContent = Math.round(counter.val).toString();
          },
          ...(triggerCfg ? { scrollTrigger: triggerCfg } : {}),
        })
      );
    });

    return () => {
      [cardTween, ...counterTweens].forEach((t) => {
        if (t.scrollTrigger) t.scrollTrigger.kill();
        t.kill();
      });
    };
  }, []);

  return (
    <div ref={root} className='w-full flex flex-col gap-4 lg:gap-6 overflow-y-auto scrollbar-rounded pr-1'>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4'>
        {stats.map((s) => (
          <div
            key={s.label}
            data-stat-card
            className='bg-white/5 hover:bg-white/10 transition-colors duration-300 rounded-xl p-4 lg:p-5 border border-white/10 shadow-lg'
          >
            <div className='flex items-baseline gap-1'>
              <span
                data-stat-num={s.value}
                className='text-3xl lg:text-4xl font-Merriweather-bold text-slate-50'
              >
                0
              </span>
              <span className='text-2xl lg:text-3xl font-Merriweather-bold text-sky-300'>
                {s.suffix}
              </span>
            </div>
            <div className='mt-1 text-xs lg:text-sm text-slate-300 font-Nunito-light tracking-wide uppercase'>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className='bg-white/5 rounded-xl p-4 lg:p-5 border border-white/10 shadow-lg'>
        <div className='flex items-center justify-between mb-3'>
          <div className='flex items-center gap-2 text-slate-100'>
            <BsGithub size={20} />
            <h3 className='font-Nunito-regular text-base lg:text-lg'>
              GitHub Activity
            </h3>
          </div>
          <a
            href={`https://github.com/${GH_USER}`}
            target='_blank'
            rel='noreferrer'
            className='text-xs lg:text-sm text-sky-300 hover:text-sky-200 font-Nunito-light'
          >
            @{GH_USER}
          </a>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
          <GithubStatsCard />
          <img
            src={`https://github-readme-streak-stats.herokuapp.com?user=${GH_USER}&theme=tokyonight&hide_border=true&background=00000000&ring=7DD3FC&fire=7DD3FC&currStreakLabel=7DD3FC`}
            alt='GitHub streak'
            className='w-full h-full rounded-md object-contain'
          />
        </div>
        <div className='bg-slate-900/40 rounded-lg p-3 overflow-x-auto mt-3'>
          <img
            src={`https://ghchart.rshah.org/2563eb/${GH_USER}`}
            alt={`${GH_USER} GitHub contributions`}
            className='w-full min-w-[600px]'
          />
        </div>
      </div>
    </div>
  );
};

export default GithubContributions;
