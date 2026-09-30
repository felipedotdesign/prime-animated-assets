import { useEffect, useState } from "react";
import leftLineUrl from "../assets/behavior-line-left.svg?url";
import rightLineUrl from "../assets/behavior-line-right.svg?url";
import "./CustomBehavior.css";

const CODE_SYMBOLS = "<>/{}[]#@!$%&*+=?";

function scrambleText(text, frame, revealed = 0) {
  return [...text]
    .map((character, index) => {
      if (character === " ") return " ";
      if (index < revealed) return character;
      return CODE_SYMBOLS[(frame + index * 3) % CODE_SYMBOLS.length];
    })
    .join("");
}

export default function CustomBehavior({
  label = "Custom behavior",
  baseLabel = "Base model",
  className = "",
  textDuration = 720,
  textDelay = 120,
  complete = false,
}) {
  const [displayLabel, setDisplayLabel] = useState(() =>
    complete ? label : scrambleText(label, 0),
  );
  const [textActive, setTextActive] = useState(complete);
  const classes = [
    "custom-behavior",
    textActive ? "custom-behavior--text-active" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (complete || reducedMotion) {
      setDisplayLabel(label);
      setTextActive(true);
      return undefined;
    }

    setDisplayLabel(scrambleText(label, 0));
    setTextActive(false);
    let frameId;
    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
      if (elapsed < textDelay) {
        frameId = window.requestAnimationFrame(tick);
        return;
      }
      setTextActive(true);
      const activeElapsed = elapsed - textDelay;
      const progress = Math.max(0, Math.min(activeElapsed / textDuration, 1));
      const revealed = Math.floor(progress * label.length);
      const frame = Math.floor(activeElapsed / 48);
      setDisplayLabel(progress === 1 ? label : scrambleText(label, frame, revealed));
      if (progress < 1) frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [complete, label, textDelay, textDuration]);

  return (
    <figure
      className={classes}
      aria-label={`${label}, ${baseLabel}`}
      style={{ "--behavior-text-duration": `${textDuration}ms` }}
    >
      <div className="custom-behavior__boundary" aria-hidden="true">
        <svg viewBox="0 0 244 109" preserveAspectRatio="none">
          <rect
            x="0.75"
            y="0.75"
            width="242.5"
            height="107.5"
            fill="none"
            stroke="#191a1a"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        </svg>
      </div>
      <div className="custom-behavior__card">
        <span className="custom-behavior__text" aria-hidden="true">
          {displayLabel}
        </span>
      </div>

      <div className="custom-behavior__base">
        <div className="custom-behavior__line custom-behavior__line--left">
          <img src={leftLineUrl} alt="" />
        </div>
        <span className="custom-behavior__base-label">{baseLabel}</span>
        <div className="custom-behavior__line custom-behavior__line--right">
          <img src={rightLineUrl} alt="" />
        </div>
      </div>
    </figure>
  );
}
