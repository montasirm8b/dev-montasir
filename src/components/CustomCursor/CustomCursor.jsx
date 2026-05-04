import { useEffect, useRef } from "react";
import { gsap } from "../../utils/gsap";

const HOVER_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const glow = glowRef.current;
    if (!dot || !glow) return;

    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.documentElement.classList.add("cursor-custom");

    gsap.set([dot, glow], { x: -100, y: -100, force3D: true });

    const glowX = gsap.quickTo(glow, "x", { duration: 0.32, ease: "power3.out" });
    const glowY = gsap.quickTo(glow, "y", { duration: 0.32, ease: "power3.out" });

    let rafId = 0;
    let pendingX = -100;
    let pendingY = -100;
    const flushDot = () => {
      dot.style.transform = `translate3d(${pendingX}px, ${pendingY}px, 0)`;
      rafId = 0;
    };

    const onMove = (e) => {
      pendingX = e.clientX;
      pendingY = e.clientY;
      if (!rafId) rafId = requestAnimationFrame(flushDot);
      glowX(e.clientX);
      glowY(e.clientY);
    };

    const onDown = () => glow.classList.add("is-down");
    const onUp = () => glow.classList.remove("is-down");

    const onOver = (e) => {
      if (e.target.closest && e.target.closest(HOVER_SELECTOR)) {
        glow.classList.add("is-hover");
      }
    };
    const onOut = (e) => {
      if (e.target.closest && e.target.closest(HOVER_SELECTOR)) {
        glow.classList.remove("is-hover");
      }
    };

    const onEnter = () => {
      dot.style.opacity = "1";
      glow.style.opacity = "1";
    };
    const onLeave = () => {
      dot.style.opacity = "0";
      glow.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointerover", onOver);
    window.addEventListener("pointerout", onOut);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("cursor-custom");
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="custom-cursor-glow" aria-hidden="true" />
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
    </>
  );
};

export default CustomCursor;
