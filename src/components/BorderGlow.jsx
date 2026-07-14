import { useRef, useCallback, useEffect } from "react";
import "./BorderGlow.css";

function parseHSL(hslStr) {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildGlowVars(glowColor, intensity) {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const opacities = [100, 60, 50, 40, 30, 20, 10];
  const keys = ["-100", "-60", "-50", "-40", "-30", "-20", "-10"];
  const vars = {};
  for (let i = 0; i < opacities.length; i++) {
    vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(opacities[i] * intensity, 100)}%)`;
  }
  return vars;
}

const GRADIENT_POSITIONS = ["80% 55%", "69% 34%", "8% 6%", "41% 38%", "86% 85%", "82% 18%", "51% 4%"];
const GRADIENT_KEYS = ["--gradient-one", "--gradient-two", "--gradient-three", "--gradient-four", "--gradient-five", "--gradient-six", "--gradient-seven"];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function buildGradientVars(colors) {
  const vars = {};
  for (let i = 0; i < 7; i++) {
    const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
    vars[GRADIENT_KEYS[i]] = `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`;
  }
  vars["--gradient-base"] = `linear-gradient(${colors[0]} 0 100%)`;
  return vars;
}

function easeOutCubic(x) { return 1 - Math.pow(1 - x, 3); }

function animateValue({ start = 0, end = 100, duration = 1000, delay = 0, ease = easeOutCubic, onUpdate, onEnd }) {
  const t0 = performance.now() + delay;
  function tick() {
    const elapsed = performance.now() - t0;
    const t = Math.min(elapsed / duration, 1);
    onUpdate(start + (end - start) * ease(t));
    if (t < 1) requestAnimationFrame(tick);
    else if (onEnd) onEnd();
  }
  setTimeout(() => requestAnimationFrame(tick), delay);
}

const BorderGlow = ({
  children,
  className = "",
  edgeSensitivity = 30,
  glowColor = "30 90 65",
  backgroundColor = "rgba(255,255,255,0.72)",
  borderRadius = 16,
  glowRadius = 40,
  glowIntensity = 1.0,
  coneSpread = 25,
  animated = false,
  colors = ["#f97316", "#fbbf24", "#fb923c"],
  fillOpacity = 0.25,
}) => {
  const cardRef = useRef(null);

  const getCenterOfElement = useCallback((el) => {
    const { width, height } = el.getBoundingClientRect();
    return [width / 2, height / 2];
  }, []);

  const getEdgeProximity = useCallback((el, x, y) => {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx;
    const dy = y - cy;
    let kx = Infinity;
    let ky = Infinity;
    if (dx !== 0) kx = cx / Math.abs(dx);
    if (dy !== 0) ky = cy / Math.abs(dy);
    return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
  }, [getCenterOfElement]);

  const getCursorAngle = useCallback((el, x, y) => {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx;
    const dy = y - cy;
    if (dx === 0 && dy === 0) return 0;
    const radians = Math.atan2(dy, dx);
    let degrees = radians * (180 / Math.PI) + 90;
    if (degrees < 0) degrees += 360;
    return degrees;
  }, [getCenterOfElement]);

  const handlePointerMove = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const proximity = getEdgeProximity(el, x, y) * 100;
    const angle = getCursorAngle(el, x, y);
    const finalProximity = Math.min(proximity, 100);
    el.style.setProperty("--edge-proximity", `${finalProximity}`);
    el.style.setProperty("--cursor-angle", `${angle}deg`);
    el.style.setProperty("--brightness", `${0.3 + (finalProximity / 100) * 0.7}`);
  }, [getEdgeProximity, getCursorAngle]);

  const handlePointerLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--edge-proximity", "0");
    el.style.setProperty("--cursor-angle", "0deg");
    el.style.setProperty("--brightness", "0.3");
  }, []);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || !animated) return;
    el.style.setProperty("--edge-proximity", "0");
    el.style.setProperty("--cursor-angle", "0deg");

    animateValue({
      start: 0,
      end: 360,
      duration: 1200,
      ease: easeOutCubic,
      onUpdate: (val) => {
        el.style.setProperty("--cursor-angle", `${val % 360}deg`);
        el.style.setProperty("--edge-proximity", `${75 + 25 * Math.sin(val * Math.PI / 180)}`);
      },
      onEnd: () => {
        el.style.setProperty("--edge-proximity", "0");
        el.style.setProperty("--cursor-angle", "0deg");
      },
    });
  }, [animated]);

  const style = {
    "--border-radius": borderRadius,
    "--glow-padding": `${glowRadius}px`,
    "--edge-sensitivity": edgeSensitivity,
    "--color-sensitivity": edgeSensitivity * 0.75,
    "--cone-spread": coneSpread,
    "--fill-opacity": fillOpacity,
    "--edge-proximity": "0",
    "--cursor-angle": "0deg",
    "--brightness": "0.3",
    "--bg": backgroundColor,
    backgroundColor: backgroundColor,
    ...buildGlowVars(glowColor, glowIntensity),
    ...buildGradientVars(colors),
  };

  return (
    <div className={`border-glow-outer ${className}`}>
      <div
        ref={cardRef}
        className="border-glow-card"
        style={style}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div className="edge-light" />
        <div className="border-glow-inner" style={{ filter: "brightness(var(--brightness))", transition: "filter 0.3s ease" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default BorderGlow;
