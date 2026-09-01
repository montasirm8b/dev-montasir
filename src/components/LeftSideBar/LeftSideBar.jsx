import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { TiInfoLarge } from "react-icons/ti";
import { FaProjectDiagram } from "react-icons/fa";
import { GiSkills } from "react-icons/gi";
import { ImStatsBars } from "react-icons/im";
import { HiOutlineMail, HiOutlineNewspaper } from "react-icons/hi";
import mobilelogo from "../../assets/images/mlogo.png";

const navItems = [
  { id: "intro", label: "Introduction", Icon: TiInfoLarge },
  { id: "skills", label: "Skills", Icon: GiSkills },
  { id: "projects", label: "Projects", Icon: FaProjectDiagram },
  { id: "blog", label: "Writing", Icon: HiOutlineNewspaper },
  { id: "courses", label: "Statistics", Icon: ImStatsBars },
  { id: "contact", label: "Contact", Icon: HiOutlineMail },
];

const LeftSideBar = ({ refData }) => {
  const scrollBreakPoints = useSelector(
    (state) => state.AppState.scrollBreakPoints
  );
  const insideViewport = useSelector((state) => state.AppState.insideViewport);

  const goTo = (id) => {
    const target = scrollBreakPoints[id];
    if (refData.current && typeof target === "number") {
      refData.current.scrollTo({ top: target, behavior: "smooth" });
    }
  };

  return (
    <div className="relative h-full w-full flex flex-col items-stretch lg:gap-6">
      {/* Logo */}
      <div
        onClick={() => goTo("intro")}
        className="group cursor-pointer flex justify-center items-center gap-2 mt-2 lg:mt-1"
      >
        <div className="relative w-12 lg:w-11 transition-transform duration-300 group-hover:scale-105">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-sky-400/40 via-blue-500/30 to-indigo-500/40 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
          <img src={mobilelogo} alt="logo" className="relative" />
        </div>
        <div className="hidden lg:flex flex-col leading-none">
          <span className="font-Josefin-Slab-600 text-2xl text-white tracking-wide">
            devtasir
          </span>
          <span className="text-[9px] uppercase tracking-[0.25em] text-sky-300/80 font-Nunito-regular mt-0.5">
            Portfolio
          </span>
        </div>
      </div>

      {/* Divider (lg only) */}
      <div className="hidden lg:block mx-3 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col items-center lg:items-stretch lg:px-2 gap-3 lg:gap-1.5 mt-8 lg:mt-0">
        {navItems.map(({ id, label, Icon }) => {
          const active = insideViewport === id;
          return (
            <button
              key={id}
              onClick={() => goTo(id)}
              aria-label={label}
              aria-current={active ? "page" : undefined}
              className={`relative w-full flex justify-center lg:justify-start items-center gap-3 lg:px-3 py-2 lg:py-2.5 rounded-xl transition-all duration-300 group
                ${
                  active
                    ? "lg:bg-white/10 lg:ring-1 lg:ring-white/15 lg:shadow-lg lg:shadow-sky-500/10"
                    : "hover:lg:bg-white/5"
                }
              `}
            >
              {/* Active indicator bar (lg only) */}
              {active && (
                <motion.span
                  layoutId="left-nav-indicator"
                  className="hidden lg:block absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full bg-gradient-to-b from-sky-300 to-blue-500 shadow-[0_0_12px_rgba(56,189,248,0.6)]"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}

              {/* Icon */}
              <span
                className={`shrink-0 flex items-center justify-center transition-all duration-300
                  ${
                    active
                      ? "text-sky-300 lg:text-sky-300 lg:scale-100 bg-sky-500/20 lg:bg-transparent ring-1 ring-sky-400/40 lg:ring-0 rounded-lg lg:rounded-none w-10 h-10 lg:w-auto lg:h-auto"
                      : "text-slate-300 group-hover:text-sky-300 lg:bg-transparent w-10 h-10 lg:w-auto lg:h-auto rounded-lg flex items-center justify-center"
                  }
                `}
              >
                <Icon size={20} />
              </span>

              {/* Label (lg only) */}
              <span
                className={`hidden lg:inline font-Nunito-regular text-base tracking-wide transition-colors duration-300
                  ${active ? "text-white" : "text-slate-300 group-hover:text-white"}
                `}
              >
                {label}
              </span>

              {/* Tiny dot for active state on mobile */}
              {active && (
                <span className="lg:hidden absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]"></span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer status (lg only) */}
      <div className="hidden lg:flex flex-col gap-2 px-3 pb-3">
        <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>
        <div className="flex items-center gap-2 px-1 py-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <div className="flex flex-col leading-none">
            <span className="text-[11px] uppercase tracking-widest text-slate-300 font-Nunito-regular">
              Available
            </span>
            <span className="text-[10px] text-slate-400 font-Nunito-light mt-0.5">
              for new projects
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
