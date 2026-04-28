import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const SCROLLER_ID = "scrollable";

export const getScroller = () =>
  typeof document !== "undefined"
    ? document.getElementById(SCROLLER_ID) || undefined
    : undefined;

export const defaultEase = "power3.out";

export { gsap, ScrollTrigger };
