import { useEffect, useId, useRef, useState } from "react";
import guideWideUrl from "../assets/guide-wide.svg";
import guideShortUrl from "../assets/guide-short.svg";
import referenceTickUrl from "../assets/reference-tick.svg";
import rewardCurveUrl from "../assets/reward-curve.svg";
import "./LineChart.css";

/**
 * A fixed-size reward curve chart matching the source Figma component.
 */
export default function LineChart({
  value = "0.68",
  title = "Reward curve",
  description = "A rising, fluctuating line crossing a reference value.",
  className = "",
  animationDuration = 1450,
  animationDelay = 150,
  valueCountDelay = 150,
  valueCountDuration = 1450,
  paused = false,
}) {
  const titleId = useId();
  const descriptionId = useId();
  const [displayValue, setDisplayValue] = useState("0.00");
  const [valueActive, setValueActive] = useState(false);
  const pausedRef = useRef(paused);
  const classes = [
    "reward-line-chart",
    valueActive ? "reward-line-chart--value-active" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const target = Number.parseFloat(value);
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (Number.isNaN(target) || reducedMotion) {
      setDisplayValue(Number.isNaN(target) ? value : target.toFixed(2));
      setValueActive(true);
      return undefined;
    }

    setDisplayValue("0.00");
    setValueActive(false);
    let frameId;
    const start = performance.now();
    let pausedAt = pausedRef.current ? start : null;
    let pausedDuration = 0;

    const tick = (now) => {
      if (pausedRef.current) {
        pausedAt ??= now;
        frameId = window.requestAnimationFrame(tick);
        return;
      }

      if (pausedAt !== null) {
        pausedDuration += now - pausedAt;
        pausedAt = null;
      }

      const elapsed = now - start - pausedDuration;
      if (elapsed < valueCountDelay) {
        frameId = window.requestAnimationFrame(tick);
        return;
      }

      setValueActive(true);
      const progress = Math.max(0, Math.min((elapsed - valueCountDelay) / valueCountDuration, 1));
      const eased = progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
      setDisplayValue((target * eased).toFixed(2));

      if (progress < 1) frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [value, valueCountDelay, valueCountDuration]);

  return (
    <figure
      className={classes}
      aria-labelledby={`${titleId} ${descriptionId}`}
      style={{
        "--reward-line-duration": `${animationDuration}ms`,
        "--reward-line-delay": `${animationDelay}ms`,
        "--reward-value-duration": `${valueCountDuration}ms`,
      }}
    >
      <figcaption className="reward-line-chart__visually-hidden">
        <span id={titleId}>{title}</span>
        <span id={descriptionId}>{description}</span>
      </figcaption>

      <img
        className="reward-line-chart__guide reward-line-chart__guide--top"
        src={guideWideUrl}
        alt=""
      />
      <img
        className="reward-line-chart__guide reward-line-chart__guide--middle"
        src={guideShortUrl}
        alt=""
      />
      <img
        className="reward-line-chart__guide reward-line-chart__guide--bottom"
        src={guideWideUrl}
        alt=""
      />
      <img
        className="reward-line-chart__reference-tick"
        src={referenceTickUrl}
        alt=""
      />
      <img
        className="reward-line-chart__curve reward-line-chart__curve--base"
        src={rewardCurveUrl}
        alt=""
      />
      <img
        className="reward-line-chart__curve reward-line-chart__curve--active"
        src={rewardCurveUrl}
        alt=""
      />
      <span className="reward-line-chart__label">{displayValue}</span>
    </figure>
  );
}
