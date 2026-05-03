import { useEffect, useRef } from "react";
import { SiNetlify } from "react-icons/si";
import { AiOutlineGithub } from "react-icons/ai";
import BtnPrimary from "../Buttons/BtnPrimary";
import BtnSecondary from "../Buttons/BtnSecondary";
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
      scrollY.current += 8;
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

    if (rotateXTo.current) rotateXTo.current(y * 16);
    if (rotateYTo.current) rotateYTo.current(x * -16);
  };

  const resetTilt = () => {
    if (rotateXTo.current) rotateXTo.current(0);
    if (rotateYTo.current) rotateYTo.current(0);
  };

  return (
    <div
      ref={containerRef}
      className="rounded-lg lg:rounded-2xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/10 via-blue-500/15 to-blue-900/25 ring-1 ring-white/10 hover:ring-sky-400/40 shadow-xl shadow-blue-900/30 hover:shadow-2xl hover:shadow-sky-500/20 transition-all duration-300 perspective-1000 will-change-transform"
      onMouseEnter={startScroll}
      onMouseLeave={() => {
        stopScroll();
        resetTilt();
      }}
      onMouseMove={handleMouseMove}
    >
      <div className="backdrop-blur-sm p-4 shadow-xl flex flex-col justify-center items-center gap-5">
        <div className="overflow-hidden rounded-lg bg-black">
          <div
            ref={imageContainerRef}
            className="overflow-hidden h-[300px] w-full will-change-transform"
          >
            <img
              ref={imageRef}
              src={project.image}
              alt={project.name}
              className="w-full will-change-transform"
              style={{ transform: "translateY(0)" }}
            />
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center items-center mt-4 flex-col p-4">
        <h1 className="text-xl text-gray-200 font-medium">{project.name}</h1>
        <p className="text-white font-Nunito-light hidden lg:block">
          {project.description}
        </p>
        <button className="rounded-md text-slate-200 px-2 py-1 font-Nunito-light">
          See Details
        </button>
      </div>

      <div className="flex justify-center items-center py-4 gap-4">
        <a href={project.live_link} target="_blank" rel="noopener noreferrer">
          <BtnPrimary>
            <SiNetlify /> Live
          </BtnPrimary>
        </a>
        {project.github_link && (
          <a
            href={project.github_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <BtnSecondary>
              <AiOutlineGithub /> Github
            </BtnSecondary>
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectListLg;
