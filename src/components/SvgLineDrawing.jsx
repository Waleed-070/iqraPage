import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import "./SvgLineDrawing.css";

gsap.registerPlugin(DrawSVGPlugin);

/**
 * SvgLineDrawing
 * Loads SVGs from the public folder and animates them with GSAP DrawSVG:
 *   - paths scatter/fly-in from random directions
 *   - lines draw themselves onto the screen
 *   - fill fades in as stroke fades out
 *   - paths fly back out in random directions
 *
 * Props:
 *   svgs         – array of public-folder SVG urls  (default: wave + stand)
 *   loop         – repeat forever (default true)
 *   holdTime     – seconds to hold the finished character (default 1.5)
 *   showControls – render prev / play-pause / next bar (default true)
 */
export default function SvgLineDrawing({
  svgs = ["/character_wave.svg", "/character_stand.svg"],
  loop = true,
  holdTime = 1.5,
  showControls = true,
}) {
  const containerRef   = useRef(null);
  const masterRef      = useRef(null);
  const progressBarRef = useRef(null);
  const currentIdxRef  = useRef(0);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides,  setTotalSlides]  = useState(svgs.length);
  const [isPlaying,    setIsPlaying]    = useState(true);
  const [svgEls,       setSvgEls]       = useState([]);

  /* ── 1. Fetch SVGs and inject into the container ─────────────────── */
  useEffect(() => {
    if (!containerRef.current) return;
    let cancelled = false;

    (async () => {
      const texts = await Promise.all(svgs.map((u) => fetch(u).then((r) => r.text())));
      if (cancelled) return;

      const container = containerRef.current;
      container.innerHTML = "";

      const els = texts.map((text) => {
        const tmp = document.createElement("div");
        tmp.innerHTML = text;
        const svg = tmp.querySelector("svg");
        if (!svg) return null;
        svg.setAttribute("width",  "100%");
        svg.setAttribute("height", "100%");
        svg.style.cssText =
          "display:block;overflow:visible;position:absolute;inset:0;";
        svg.classList.add("sdl-slide");
        container.appendChild(svg);
        return svg;
      }).filter(Boolean);

      setSvgEls(els);
      setTotalSlides(els.length);
    })();

    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [svgs.join(",")]);

  /* ── 2. Build GSAP master timeline once SVGs are in the DOM ────────── */
  useEffect(() => {
    if (svgEls.length === 0) return;
    if (masterRef.current) masterRef.current.kill();

    const master = gsap.timeline({ repeat: loop ? -1 : 0 });
    masterRef.current = master;

    svgEls.forEach((svg, index) => {
      // Grab drawable paths (skip <defs> children)
      let paths = Array.from(
        svg.querySelectorAll("path,circle,rect,polygon,polyline,ellipse,line")
      ).filter((p) => !p.closest("defs"));

      if (!paths.length) return;

      // Show temporarily so getBBox() works
      svg.style.visibility = "visible";

      // Sort bottom-edge → top so feet appear before head
      paths.sort((a, b) => {
        try {
          const aB = a.getBBox();
          const bB = b.getBBox();
          return (bB.y + bB.height) - (aB.y + aB.height);
        } catch { return 0; }
      });

      svg.style.visibility = "";

      // Store fill, set up stroke
      paths.forEach((p) => {
        const fill = p.getAttribute("fill") || "#000";
        p.dataset.fill = fill;
        p.style.fill        = fill;
        p.style.fillOpacity = "0";
        p.style.stroke      = fill;
        p.style.strokeWidth = "2";
        p.style.strokeLinecap  = "round";
        p.style.strokeLinejoin = "round";
      });

      // Initial scatter – invisible and spread out
      gsap.set(paths, {
        drawSVG: 0,
        x: "random(-220, 220)",
        y: "random(-220, 220)",
        opacity: 0,
      });

      const stagger = Math.min(0.08, 3 / paths.length);

      master.addLabel("slide-" + index);

      const slideTl = gsap.timeline({
        defaults: { duration: 1, ease: "none" },
        onStart() {
          currentIdxRef.current = index;
          setCurrentSlide(index);
          svgEls.forEach((s) => s.classList.remove("sdl-active"));
          svg.classList.add("sdl-active");
          if (progressBarRef.current) {
            gsap.set(progressBarRef.current, {
              scaleX: 0,
              transformOrigin: "left center",
            });
          }
        },
      });

      // Phase 1 – fly in and draw strokes
      slideTl.to(paths, {
        drawSVG: "100%",
        x: 0,
        y: 0,
        opacity: 1,
        ease: "power2.out",
        stagger,
      }, 0);

      // Phase 2 – stroke → fill
      slideTl.to(
        paths,
        { duration: 0.5, fillOpacity: 1, strokeOpacity: 0, stagger },
        "<20%"
      );

      // Phase 3 – hold then fly out
      slideTl.to(
        paths,
        {
          duration: 1,
          drawSVG: 0,
          x: "random(-220, 220)",
          y: "random(-220, 220)",
          opacity: 0,
          fillOpacity: 0,
          ease: "power2.in",
          stagger,
        },
        "+=" + holdTime
      );

      // Progress bar tracks whole slide
      if (progressBarRef.current) {
        slideTl.to(
          progressBarRef.current,
          { scaleX: 1, duration: slideTl.duration() },
          0
        );
      }

      master.add(slideTl);
    });

    // Kick off first slide
    svgEls[0]?.classList.add("sdl-active");

    return () => master.kill();
  }, [svgEls, loop, holdTime]);

  /* ── Helpers ─────────────────────────────────────────────────────── */
  const pad2 = (n) => String(n).padStart(2, "0");

  const goTo = (n) => {
    if (!masterRef.current) return;
    masterRef.current.play("slide-" + n);
    masterRef.current.paused(false);
    setIsPlaying(true);
  };

  const handlePrev  = () => goTo((currentIdxRef.current - 1 + totalSlides) % totalSlides);
  const handleNext  = () => goTo((currentIdxRef.current + 1) % totalSlides);
  const handleToggle = () => {
    if (!masterRef.current) return;
    const pausing = !masterRef.current.paused();
    masterRef.current.paused(pausing);
    setIsPlaying(!pausing);
  };

  /* ── Render ──────────────────────────────────────────────────────── */
  return (
    <div className="sdl-wrapper">
      <div ref={containerRef} className="sdl-container" />

      {showControls && (
        <div className="sdl-controls">
          <div className="sdl-buttons">
            <button className="sdl-btn" onClick={handlePrev}   aria-label="Previous">⏮</button>
            <button className="sdl-btn" onClick={handleToggle} aria-label="Play/Pause">
              {isPlaying ? "⏸" : "▶"}
            </button>
            <button className="sdl-btn" onClick={handleNext}   aria-label="Next">⏭</button>
          </div>

          <div className="sdl-progress-track">
            <div ref={progressBarRef} className="sdl-progress-fill" />
          </div>

          <span className="sdl-counter">
            <span className="sdl-cur">{pad2(currentSlide + 1)}</span>
            {" / "}
            {pad2(totalSlides)}
          </span>
        </div>
      )}
    </div>
  );
}
