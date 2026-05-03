import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Intro from "./components/Intro/Intro";
import LeftSideBar from "./components/LeftSideBar/LeftSideBar";
import RightSideBar from "./components/RightSideBar/RightSideBar";
import { useSelector, useDispatch } from "react-redux/es/exports";
import {
  setScrollBreakPoints,
  setScrollPosition,
  setInsideViewPort,
} from "./store/AppState";
import Projects from "./components/Projects/Projects";
import SkillsSection from "./components/Skills/SkillsSection";
import Statistics from "./components/Statistics/Statistics";
import Contact from "./components/Contact/Contact";
import { AnimatePresence, motion } from "framer-motion";
import mobilelogo from "./assets/images/mlogo.png";
import Quote from "./components/Intro/Quote";
import { HiExternalLink } from "react-icons/hi";
import { BarLoader } from "react-spinners";
import { ScrollTrigger } from "./utils/gsap";

const App = () => {
  const [isAppLoading, setIsAppLoading] = useState(true);

  const introRef = useRef(null);
  const scrollRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const coursesRef = useRef(null);
  const contactRef = useRef(null);
  const mobileIntroRef = useRef(null);

  const scrollPosition = useSelector((state) => state.AppState.scrollPosition);
  const insideViewport = useSelector((state) => state.AppState.insideViewport);

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [showMobileIntro, setShowMobileIntro] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsAppLoading(false);
    }, 1000);
    if (
      introRef.current &&
      skillsRef.current &&
      projectsRef.current &&
      coursesRef.current &&
      contactRef.current
    ) {
      dispatch(
        setScrollBreakPoints({
          intro: introRef.current.getBoundingClientRect().top,
          skills: skillsRef.current.getBoundingClientRect().top,
          projects: projectsRef.current.getBoundingClientRect().top,
          courses: coursesRef.current.getBoundingClientRect().top,
          contact: contactRef.current.getBoundingClientRect().top,
        })
      );
      dispatch(setInsideViewPort("intro"));
    }
    // eslint-disable-next-line
  }, []);

  useLayoutEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    const t1 = setTimeout(refresh, 200);
    const t2 = setTimeout(refresh, 1200);
    window.addEventListener("resize", refresh);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", refresh);
    };
  }, []);

  const handleScroll = () => {
    dispatch(
      setScrollPosition({
        intro: introRef.current.getBoundingClientRect().top,
        skills: skillsRef.current.getBoundingClientRect().top,
        projects: projectsRef.current.getBoundingClientRect().top,
        courses: coursesRef.current.getBoundingClientRect().top,
        contact: contactRef.current.getBoundingClientRect().top,
      })
    );
    for (const item in scrollPosition) {
      if (
        scrollPosition[item] >= -5 &&
        scrollPosition[item] <= window.innerHeight - 10
      ) {
        dispatch(setInsideViewPort(item.toString()));
      }
    }
    ScrollTrigger.update();
  };

  const handleTransitionEnd = () => {
    if (isOpen) {
      mobileIntroRef.current.classList.remove("bg-blue-300");
      mobileIntroRef.current.classList.add("bg-slate-900");
      setShowMobileIntro(true);
    } else setShowMobileIntro(false);
  };

  return (
    <>
      {isAppLoading ? (
        <div className="fixed z-[999999] w-screen h-screen backdrop-blur-xl backdrop-brightness-50 flex justify-center items-center">
          <BarLoader color={"#ffffff"} />
        </div>
      ) : null}

      <div className="w-screen grid grid-cols-12 min-h-screen">
        <div className="relative col-span-2">
          <div className="fixed z-20 flex flex-col items-center lg:p-4 top-0 left-0 h-full  lg:bg-blue-500 lg:bg-opacity-25 lg:w-1/6">
            <LeftSideBar refData={scrollRef} />
          </div>
        </div>

        <div
          onScroll={handleScroll}
          id="scrollable"
          ref={scrollRef}
          className="col-span-10 lg:col-span-7 overflow-y-scroll hideScrollBar scroll-Container scroll-smooth"
        >
          <div className="h-20">{}</div>
          <div ref={introRef}>
            <Intro />
          </div>
          <div
            ref={skillsRef}
            className="h-screen scroll-Section overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-600"
          >
            <SkillsSection />
          </div>
          <div
            ref={projectsRef}
            className="h-screen scroll-Section pl-2 lg:pl-0 lg:pb-4"
          >
            <Projects />
          </div>
          <div ref={coursesRef} className="h-screen scroll-Section">
            <Statistics />
          </div>
          <div ref={contactRef} className="h-screen scroll-Section">
            <Contact />
          </div>
        </div>
        <div className="col-span-0 lg:col-span-3 relative">
          {
            /* { This part is for Mobile Version Intro } */
            insideViewport === "intro" ? (
              <div
                className="block lg:hidden fixed z-50 top-5 right-5 bg-blue-800/50 backdrop-blur-md rounded-full h-12 w-12 outline-2 hover:outline-4 hover:outline outline-gray-500"
                onClick={(e) => {
                  if (isOpen) {
                    setShowMobileIntro(false);
                  }
                  setIsOpen(!isOpen);
                }}
              >
                <Quote />
                <div
                  className={`transition-all
                    ease-in 
                    duration-[500ms]
                    fixed
                    bg-blue-300
                    top-0
                    right-0
                    ${isOpen ? "rounded-none" : "rounded-full"}
                    ${isOpen ? "h-[1800px]" : "h-full"}
                    ${isOpen ? "w-[1800px]" : "w-full"}
                    ${
                      isOpen
                        ? "translate-x-1/2 md:translate-x-5"
                        : "translate-x-0"
                    }
                    ${
                      isOpen
                        ? "-translate-y-1/2 md:-translate-y-5"
                        : "translate-y-0"
                    }
                  `}
                  onTransitionEnd={handleTransitionEnd}
                  ref={mobileIntroRef}
                ></div>
                {showMobileIntro ? (
                  <AnimatePresence>
                    <div
                      id="intro-container"
                      className="fixed top-0 right-0 w-screen h-screen translate-x-5 -translate-y-5 overflow-auto"
                    >
                      <div className="p-4 font-CMUSerifRoman text-blue-50/80 flex flex-col justify-start items-start gap-2">
                        <IntroSection index={0}>
                          <div
                            className="
                              flex justify-start items-center gap-2 py-3
                            "
                          >
                            <div className="w-14">
                              <img src={mobilelogo} alt="mobilelogo" />
                            </div>
                            <div className="flex flex-col justify-start items-start">
                              <span className="text-3xl font-bold ">
                                Montasir Mahmud
                              </span>
                              <span className="text-lg">
                                Full Stack Web Developer
                              </span>
                            </div>
                          </div>
                        </IntroSection>
                        <DividerLine index={0} />
                        <IntroSection index={1}>
                          <span className="text-xl font-semibold">Summery</span>
                          <div className="text-justify">
                            I am passionate about building excellent software
                            that improves the lives of those around me. I
                            specialize in creating software for clients ranging
                            from individuals and small-businesses all the way to
                            large enterprise corporations.
                          </div>
                        </IntroSection>
                        <DividerLine index={1} />
                        <IntroSection index={2}>
                          <div>
                            <span className="text-xl font-semibold">
                              Education
                            </span>
                            <div className="text-justify">
                              <span className="text-lg font-semibold">
                                B.Sc. in Computer Science and Engineering
                              </span>
                              <span className="text-lg">
                                {" "}
                                (Rajshai University of Engineering and
                                Technology)
                              </span>
                            </div>

                            <div className="text-justify">
                              <span className="text-lg font-semibold">
                                Cantoment Public School and College, Rangpur
                              </span>
                              <span className="text-lg">
                                {" "}
                                (Higher Secondary School Certificate)
                              </span>
                            </div>
                          </div>
                        </IntroSection>
                        <DividerLine index={2} />
                        <IntroSection index={2}>
                          <span className="text-xl font-semibold">
                            Experience
                          </span>
                          <div className="text-justify">
                            <span className="text-lg font-semibold">
                              1. Junior Software Engineer
                            </span>
                            <span className="text-lg">
                              {" "}
                              (Codestudio, Rajshahi)
                            </span>
                          </div>
                          <div className="text-justify">
                            <span className="text-lg font-semibold">
                              2. Level One Seller
                            </span>
                            <span className="text-lg"> (Fiverr)</span>
                          </div>

                          <div className="text-justify">
                            <span className="text-lg font-semibold">
                              3. Web Developer Internee
                            </span>
                            <span className="text-lg">
                              {" "}
                              (Qubitech Solutions, Rajshahi)
                            </span>
                          </div>
                        </IntroSection>
                        <DividerLine index={3} />
                        <IntroSection index={3}>
                          <span className="text-xl font-semibold">
                            Certificates
                          </span>
                          <div className="text-justify">
                            <span className="text-lg font-semibold">
                              1. Frontend Development with ReactJS and Bootstrap
                            </span>
                            <a
                              href="https://ude.my/"
                              target="_blank"
                              rel="noreferrer"
                              className="text-lg flex justify-start gap-1 items-center"
                            >
                              {" "}
                              (Check Credentials <HiExternalLink />)
                            </a>
                          </div>
                        </IntroSection>
                        <DividerLine index={3} />
                        <IntroSection index={3}>
                          <span className="text-xl font-semibold">Hobby</span>
                          <div className="text-justify">
                            <span className="text-lg">
                              Playing Cricket, Cycling, World Tour
                            </span>
                          </div>
                        </IntroSection>
                      </div>
                    </div>
                  </AnimatePresence>
                ) : null}
                <div
                  className={`
                    w-full h-full overflow-hidden rounded-full fixed top-0 right-0
                    ${isOpen ? "-z-10" : "z-10"}
                  `}
                >
                  <img
                    src={
                      "https://raw.githubusercontent.com/montasirm8b/data/main/montasir.jpg"
                    }
                    alt="Montasir"
                  />
                </div>
              </div>
            ) : null
          }
          <div className="hidden lg:block fixed right-0 top-0 w-1/4 h-screen z-20">
            <RightSideBar />
          </div>
        </div>
      </div>
    </>
  );
};

const DividerLine = ({ index }) => {
  return (
    <motion.div
      animate={{ translateX: 0, opacity: 1, width: "100%" }}
      initial={{ translateX: -10, opacity: 0, width: "0%" }}
      transition={{ delay: 0.5 + 0.1 * index, duration: 0.3 }}
      className="
      bg-blue-50/80 h-0.5 w-0 rounded-full
    "
    ></motion.div>
  );
};

const IntroSection = ({ index, children }) => {
  return (
    <motion.div
      animate={{ translateX: 0, opacity: 1 }}
      exit={{ opacity: 0, translateX: -10 }}
      initial={{ translateX: -10, opacity: 0 }}
      transition={{ delay: 0.5 + 0.1 * index, duration: 0.3 }}
      className="px-1"
    >
      {children}
    </motion.div>
  );
};

export default App;
