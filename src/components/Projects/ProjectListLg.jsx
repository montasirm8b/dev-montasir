import { useEffect, useRef } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import { AiOutlineGithub } from "react-icons/ai";
import { gsap } from "../../utils/gsap";

const ProjectListLg = ({ project }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const imageContainerRef = useRef(null);
  const animationFrame = useRef(null);
  const scrollY = useRef(0);
  const rotateXTo = useRef(null);
  const rotateYTo = useRef(null);
  const liftTo = useRef(null);

  useEffect(() => {
    const container = imageContainerRef.current;
    const card = containerRef.current;
    if (!container || !card) return;

    rotateXTo.current = gsap.quickTo(container, "rotationX", {
      duration: 0.6,
      ease: "power3.out",
    });
    rotateYTo.current = gsap.quickTo(container, "rotationY", {
      duration: 0.6,
      ease: "power3.out",
    });
    liftTo.current = gsap.quickTo(card, "y", {
      duration: 0.5,
      ease: "power3.out",
    });

    gsap.set(container, { transformPerspective: 1000, transformStyle: "preserve-3d" });
  }, []);

  const startScroll = () => {
    const image = imageRef.current;
    const container = imageContainerRef.current;
    if (!image || !container) return;

    if (liftTo.current) liftTo.current(-6);

    const maxScroll = image.scrollHeight - container.offsetHeight;

    const scroll = () => {
      scrollY.current += 6;
      if (scrollY.current >= maxScroll) {
        cancelAnimationFrame(animationFrame.current);
        return;
      }
      image.style.transform = `translateY(-${scrollY.current}px)`;
      animationFrame.current = requestAnimationFrame(scroll);
    };
    animationFrame.current = requestAnimationFrame(scroll);
  };

  const stopScroll = () => {
    cancelAnimationFrame(animationFrame.current);
    scrollY.current = 0;
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        onComplete: () => {
          if (imageRef.current) imageRef.current.style.transform = "translateY(0px)";
        },
      });
    }
    if (liftTo.current) liftTo.current(0);
  };

  const handleMouseMove = (e) => {
    const container = imageContainerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    if (rotateXTo.current) rotateXTo.current(y * 8);
    if (rotateYTo.current) rotateYTo.current(x * -8);
  };

  const resetTilt = () => {
    if (rotateXTo.current) rotateXTo.current(0);
    if (rotateYTo.current) rotateYTo.current(0);
  };

  return (
    <div
      ref={containerRef}
      className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/10 via-blue-500/15 to-blue-900/25 ring-1 ring-white/10 hover:ring-sky-400/40 shadow-xl shadow-blue-900/30 hover:shadow-2xl hover:shadow-sky-500/20 transition-all duration-300 perspective-1000 will-change-transform flex flex-col"
      onMouseEnter={startScroll}
      onMouseLeave={() => {
        stopScroll();
        resetTilt();
      }}
      onMouseMove={handleMouseMove}
    >
      <div className="p-3 lg:p-4">
        <div
          ref={imageContainerRef}
          className="relative overflow-hidden rounded-xl bg-slate-900/60 h-[200px] lg:h-[220px] w-full will-change-transform ring-1 ring-white/10"
        >
          <img
            ref={imageRef}
            src={project.image}
            alt={project.name}
            className="w-full will-change-transform"
            style={{ transform: "translateY(0)" }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
        </div>
      </div>

      <div className="px-4 lg:px-5 pb-2 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg lg:text-xl text-white font-Merriweather-bold leading-tight">
            {project.name}
          </h3>
          {project.live_link && (
            <a
              href={project.live_link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.name}`}
              className="shrink-0 mt-1 w-8 h-8 rounded-lg bg-white/5 hover:bg-sky-500/20 ring-1 ring-white/10 hover:ring-sky-400/40 text-slate-200 hover:text-sky-300 flex items-center justify-center transition-all duration-200"
            >
              <HiOutlineExternalLink size={16} />
            </a>
          )}
        </div>

        <p className="mt-2 text-slate-200/90 font-Nunito-light text-sm leading-relaxed">
          {project.description}
        </p>

        {project.used && project.used.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.used.map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-Nunito-regular text-sky-200 bg-sky-500/10 ring-1 ring-sky-400/20 rounded-full px-2.5 py-0.5"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="px-4 lg:px-5 pb-4 pt-3 mt-2 flex items-center gap-2 border-t border-white/5">
        {project.live_link && (
          <a
            href={project.live_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 active:scale-[0.98] text-white font-Nunito-regular text-sm px-3 py-2 rounded-lg shadow-lg shadow-sky-500/30 transition-all duration-200"
          >
            <HiOutlineExternalLink size={14} /> Live Demo
          </a>
        )}
        {project.github_link && (
          <a
            href={project.github_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/25 text-slate-200 font-Nunito-regular text-sm px-3 py-2 rounded-lg transition-all duration-200"
            aria-label="GitHub repository"
          >
            <AiOutlineGithub size={16} /> Code
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectListLg;
