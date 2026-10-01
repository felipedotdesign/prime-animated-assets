import leftLineUrl from "../assets/behavior-line-left.svg?url";
import rightLineUrl from "../assets/behavior-line-right.svg?url";
import { MOTION_TIMING } from "./motionTiming";
import "./CustomBehavior.css";

export default function CustomBehavior({
  label = "Custom behavior",
  baseLabel = "Base model",
  className = "",
}) {
  const classes = ["custom-behavior", className]
    .filter(Boolean)
    .join(" ");

  return (
    <figure
      className={classes}
      aria-label={`${label}, ${baseLabel}`}
      style={{
        "--custom-behavior-delay": `${MOTION_TIMING.customBehavior.delay}ms`,
        "--custom-behavior-duration": `${MOTION_TIMING.customBehavior.duration}ms`,
      }}
    >
      <span className="custom-behavior__diagonals" aria-hidden="true" />
      <div className="custom-behavior__boundary" aria-hidden="true">
        <svg viewBox="0 0 244 109" preserveAspectRatio="none">
          <path
            className="custom-behavior__boundary-path custom-behavior__boundary-path--vertical"
            d="M 0.75 108.25 V 0.75"
          />
          <path
            className="custom-behavior__boundary-path custom-behavior__boundary-path--horizontal"
            d="M 0.75 108.25 H 243.25"
          />
          <path
            className="custom-behavior__boundary-path custom-behavior__boundary-path--horizontal"
            d="M 243.25 0.75 H 0.75"
          />
          <path
            className="custom-behavior__boundary-path custom-behavior__boundary-path--vertical"
            d="M 243.25 0.75 V 108.25"
          />
        </svg>
      </div>
      <div className="custom-behavior__card">
        <span className="custom-behavior__fill" aria-hidden="true" />
        <span className="custom-behavior__text" aria-hidden="true">
          {label}
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
