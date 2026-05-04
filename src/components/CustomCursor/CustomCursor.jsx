import { useEffect, useRef } from "react";

const HOVER_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const rippleLayerRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    const rippleLayer = rippleLayerRef.current;
    if (!dot || !ring || !label || !rippleLayer) return;

    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.documentElement.classList.add("cursor-custom");

    const FOLLOW = 0.22;
    const SIZE_LERP = 0.16;
    const OPACITY_LERP = 0.18;
    const DEFAULT_SIZE = 38;
    const UNSNAP_DELAY_MS = 90;

    let mouseX = -100;
    let mouseY = -100;
    let lastMouseX = -100;
    let lastMouseY = -100;

    let ringX = -100;
    let ringY = -100;
    let ringW = DEFAULT_SIZE;
    let ringH = DEFAULT_SIZE;
    let ringR = 9999;
    let ringOpacity = 0;

    let targetOpacity = 0;
    let snappedEl = null;
    let visible = false;
    let rafId = 0;
    let unsnapTimer = 0;

    const applySnap = (el) => {
      if (snappedEl === el) return;
      snappedEl = el;
      if (el) {
        ring.classList.add("is-hover");
        const text = el.getAttribute("data-cursor-text");
        if (text) {
          label.textContent = text;
          ring.classList.add("has-label");
        } else {
          label.textContent = "";
          ring.classList.remove("has-label");
        }
      } else {
        ring.classList.remove("is-hover", "has-label");
        label.textContent = "";
      }
    };

    const requestSnap = (el) => {
      if (el) {
        if (unsnapTimer) {
          window.clearTimeout(unsnapTimer);
          unsnapTimer = 0;
        }
        applySnap(el);
      } else {
        if (unsnapTimer) window.clearTimeout(unsnapTimer);
        unsnapTimer = window.setTimeout(() => {
          unsnapTimer = 0;
          applySnap(null);
        }, UNSNAP_DELAY_MS);
      }
    };

    const computeTargets = () => {
      if (snappedEl && !document.contains(snappedEl)) {
        applySnap(null);
      }
      if (snappedEl) {
        const rect = snappedEl.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) {
          applySnap(null);
        } else {
          const pad = 6;
          const cs = window.getComputedStyle(snappedEl);
          const br = parseFloat(cs.borderRadius) || 0;
          return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            w: rect.width + pad * 2,
            h: rect.height + pad * 2,
            r: Math.min(br + pad, Math.min(rect.width, rect.height) / 2 + pad),
          };
        }
      }
      return {
        x: mouseX,
        y: mouseY,
        w: DEFAULT_SIZE,
        h: DEFAULT_SIZE,
        r: 9999,
      };
    };

    const tick = () => {
      const vx = mouseX - lastMouseX;
      const vy = mouseY - lastMouseY;
      lastMouseX = mouseX;
      lastMouseY = mouseY;

      const t = computeTargets();

      ringX += (t.x - ringX) * FOLLOW;
      ringY += (t.y - ringY) * FOLLOW;
      ringW += (t.w - ringW) * SIZE_LERP;
      ringH += (t.h - ringH) * SIZE_LERP;
      ringR += (t.r - ringR) * SIZE_LERP;
      ringOpacity += (targetOpacity - ringOpacity) * OPACITY_LERP;

      let rot = 0;
      let scaleX = 1;
      let scaleY = 1;
      if (!snappedEl) {
        const speed = Math.hypot(vx, vy);
        if (speed > 1) {
          const stretch = Math.min(speed / 600, 0.18);
          rot = (Math.atan2(vy, vx) * 180) / Math.PI;
          scaleX = 1 + stretch;
          scaleY = 1 - stretch * 0.55;
        }
      }

      ring.style.width = `${ringW}px`;
      ring.style.height = `${ringH}px`;
      ring.style.borderRadius = `${ringR}px`;
      ring.style.opacity = ringOpacity;
      ring.style.transform = `translate3d(${ringX - ringW / 2}px, ${
        ringY - ringH / 2
      }px, 0) rotate(${rot}deg) scale(${scaleX}, ${scaleY})`;

      dot.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
      dot.style.opacity = visible ? "1" : "0";

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        targetOpacity = 1;
        ringX = mouseX;
        ringY = mouseY;
        lastMouseX = mouseX;
        lastMouseY = mouseY;
      }
    };

    const onDown = () => {
      ring.classList.add("is-down");
      const ripple = document.createElement("div");
      ripple.className = "custom-cursor-ripple";
      ripple.style.left = `${mouseX}px`;
      ripple.style.top = `${mouseY}px`;
      rippleLayer.appendChild(ripple);
      requestAnimationFrame(() => ripple.classList.add("expand"));
      window.setTimeout(() => ripple.remove(), 700);
    };
    const onUp = () => ring.classList.remove("is-down");

    const onOver = (e) => {
      const target =
        e.target && e.target.closest && e.target.closest(HOVER_SELECTOR);
      if (target) requestSnap(target);
    };
    const onOut = (e) => {
      const target =
        e.target && e.target.closest && e.target.closest(HOVER_SELECTOR);
      if (target && target === snappedEl) {
        const next =
          e.relatedTarget &&
          e.relatedTarget.closest &&
          e.relatedTarget.closest(HOVER_SELECTOR);
        if (next !== target) requestSnap(next || null);
      }
    };

    const onEnter = () => {
      visible = true;
      targetOpacity = 1;
    };
    const onLeave = () => {
      visible = false;
      targetOpacity = 0;
      ring.classList.remove("is-down");
    };

    const onBlur = () => {
      visible = false;
      targetOpacity = 0;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointerover", onOver);
    window.addEventListener("pointerout", onOut);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onBlur);

    return () => {
      cancelAnimationFrame(rafId);
      if (unsnapTimer) window.clearTimeout(unsnapTimer);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onBlur);
      document.documentElement.classList.remove("cursor-custom");
      while (rippleLayer.firstChild) rippleLayer.removeChild(rippleLayer.firstChild);
    };
  }, []);

  return (
    <>
      <div
        ref={rippleLayerRef}
        className="custom-cursor-ripple-layer"
        aria-hidden="true"
      />
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true">
        <span ref={labelRef} className="custom-cursor-label" />
      </div>
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
    </>
  );
};

export default CustomCursor;
