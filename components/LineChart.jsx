import { useEffect, useId, useState } from "react";
import guideWideUrl from "../assets/guide-wide.svg?url";
import guideShortUrl from "../assets/guide-short.svg?url";
import referenceTickUrl from "../assets/reference-tick.svg?url";
import rewardCurveUrl from "../assets/reward-curve.svg?url";
import { MOTION_TIMING } from "./motionTiming";
import "./LineChart.css";

/**
 * A fixed-size reward curve chart matching the source Figma component.
 */
export default function LineChart({
  value = "0.68",
  title = "Reward curve",
  description = "A rising, fluctuating line crossing a reference value.",
  className = "",
  animationDuration = MOTION_TIMING.rewardCurve.duration,
  animationDelay = MOTION_TIMING.rewardCurve.delay,
  valueCountDelay = MOTION_TIMING.rewardCurve.delay,
  valueCountDuration = MOTION_TIMING.rewardCurve.duration,
  complete = false,
}) {
  const titleId = useId();
  const descriptionId = useId();
  const [displayValue, setDisplayValue] = useState(() => complete ? value : "0.00");
  const [valueActive, setValueActive] = useState(complete);
  const classes = [
    "reward-line-chart",
    valueActive ? "reward-line-chart--value-active" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    const target = Number.parseFloat(value);
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (complete || Number.isNaN(target) || reducedMotion) {
      setDisplayValue(Number.isNaN(target) ? value : target.toFixed(2));
      setValueActive(true);
      return undefined;
    }

    setDisplayValue("0.00");
    setValueActive(false);
    let frameId;
    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
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
  }, [complete, value, valueCountDelay, valueCountDuration]);

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
