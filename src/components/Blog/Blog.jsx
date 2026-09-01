import { useEffect, useRef } from "react";
import { BsMedium } from "react-icons/bs";
import { HiOutlineExternalLink } from "react-icons/hi";
import BlogCard from "./BlogCard";
import BlogPosts from "../../assets/data/blog.data";
import { gsap, getScroller, defaultEase } from "../../utils/gsap";

const MEDIUM_PROFILE = "https://medium.com/@mmcse19";

const Blog = () => {
  const root = useRef(null);

  useEffect(() => {
    if (!root.current) return;
    const scroller = getScroller();
    const heading = root.current.querySelector('[data-blog-heading]');
    const cards = root.current.querySelectorAll('[data-blog-card]');

    const triggerCfg = scroller
      ? {
          scroller,
          trigger: root.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        }
      : undefined;

    const tweens = [];
    if (heading) {
      tweens.push(
        gsap.fromTo(heading,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: defaultEase,
            clearProps: 'all',
            ...(triggerCfg ? { scrollTrigger: triggerCfg } : {}),
          }
        )
      );
    }
    if (cards && cards.length) {
      tweens.push(
        gsap.fromTo(cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: defaultEase,
            clearProps: 'all',
            ...(triggerCfg ? { scrollTrigger: triggerCfg } : {}),
          }
        )
      );
    }

    return () => {
      tweens.forEach((t) => {
        if (t.scrollTrigger) t.scrollTrigger.kill();
        t.kill();
      });
    };
  }, []);

  return (
    <div ref={root} className="h-screen relative overflow-y-auto scrollbar-rounded pb-14 pr-4 lg:pb-0">
      <div
        data-blog-heading
        className="flex flex-wrap items-center gap-3 pt-1 pb-4 lg:pb-6 pl-0 md:pl-4"
      >
        <span className="font-Merriweather-bold text-xl lg:text-2xl text-slate-100">Writing</span>
        <div className="h-px flex-1 bg-gradient-to-r from-sky-400/60 via-blue-500/40 to-transparent rounded-lg"></div>
        <a
          href={MEDIUM_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-white/5 hover:bg-sky-500/20 ring-1 ring-white/10 hover:ring-sky-400/40 text-slate-200 hover:text-sky-300 font-Nunito-regular text-xs lg:text-sm px-3 py-1.5 rounded-lg transition-all duration-200"
        >
          <BsMedium size={14} /> View all on Medium <HiOutlineExternalLink size={12} />
        </a>
      </div>

      {BlogPosts && BlogPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 px-0 md:px-4">
          {BlogPosts.map((post, index) => (
            <div data-blog-card key={post.link || index}>
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center gap-3 py-16 px-4 mx-0 md:mx-4 rounded-2xl bg-white/5 ring-1 ring-white/10">
          <BsMedium size={28} className="text-slate-400" />
          <p className="text-slate-300 font-Nunito-light text-sm max-w-xs">
            Latest articles are on the way — in the meantime, catch my writing on AI agents and full-stack engineering on Medium.
          </p>
          <a
            href={MEDIUM_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-Nunito-regular text-sm px-4 py-2 rounded-lg shadow-lg shadow-sky-500/30 transition-all duration-200"
          >
            Visit Medium profile <HiOutlineExternalLink size={14} />
          </a>
        </div>
      )}
    </div>
  );
};

export default Blog;
