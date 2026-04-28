import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const SCROLLER = "#scrollable";

export const defaultEase = "power3.out";

export { gsap, ScrollTrigger };
