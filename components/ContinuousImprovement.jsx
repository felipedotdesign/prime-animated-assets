import verticalOrbitUrl from "../assets/continuous-orbit-vertical.png?url";
import horizontalOrbitUrl from "../assets/continuous-orbit-horizontal.png?url";
import { MOTION_TIMING } from "./motionTiming";
import "./ContinuousImprovement.css";

export default function ContinuousImprovement({
  className = "",
  firstLine = "Continuos",
  secondLine = "Improvement",
  orbitDuration = MOTION_TIMING.continuousImprovement.dashDuration,
  dotDuration = MOTION_TIMING.continuousImprovement.dotDuration,
}) {
  const classes = ["continuous-improvement", className]
    .filter(Boolean)
    .join(" ");

  return (
    <figure
      className={classes}
      aria-label="Continuous improvement diagram"
      data-node-id="2516:23779"
      style={{ "--continuous-orbit-duration": `${orbitDuration}ms` }}
    >
      <div
        className="continuous-improvement__diagram"
        data-node-id="2466:8902"
      >
        <span
          className="continuous-improvement__orbit continuous-improvement__orbit--vertical"
          data-node-id="2466:8904"
          aria-hidden="true"
        >
          <img
            className="continuous-improvement__orbit-static"
            src={verticalOrbitUrl}
            width="112"
            height="220"
            alt=""
          />
          <svg
            className="continuous-improvement__orbit-motion"
            viewBox="0 0 112 220"
            preserveAspectRatio="none"
          >
            <ellipse
              className="continuous-improvement__orbit-path"
              cx="56"
              cy="110"
              rx="55.5"
              ry="109.5"
            />
          </svg>
        </span>

        <span
          className="continuous-improvement__orbit-horizontal"
          data-node-id="2466:8905"
          aria-hidden="true"
        >
          <img
            className="continuous-improvement__orbit-static"
            src={horizontalOrbitUrl}
            width="80"
            height="220"
            alt=""
          />
          <svg
            className="continuous-improvement__orbit-motion"
            viewBox="0 0 220 80"
            preserveAspectRatio="none"
          >
            <ellipse
              className="continuous-improvement__orbit-path"
              cx="110"
              cy="40"
              rx="109.5"
              ry="39.5"
            />
          </svg>
        </span>

        <span
          className="continuous-improvement__ring"
          aria-hidden="true"
          data-node-id="2466:8906"
        />

        <svg
          className="continuous-improvement__dot-layer"
          viewBox="0 0 356 330"
          aria-hidden="true"
        >
          <circle className="continuous-improvement__orbit-dot" r="5">
            <animateMotion
              dur={`${dotDuration}ms`}
              repeatCount="indefinite"
              path="M 181 55.5 A 55.5 109.5 0 1 0 181 274.5 A 55.5 109.5 0 1 0 181 55.5"
            />
          </circle>
          <circle className="continuous-improvement__orbit-dot" r="5">
            <animateMotion
              dur={`${dotDuration}ms`}
              repeatCount="indefinite"
              path="M 181 125.5 A 109.5 39.5 0 1 1 181 204.5 A 109.5 39.5 0 1 1 181 125.5"
            />
          </circle>
        </svg>
      </div>

      <figcaption
        className="continuous-improvement__label"
        data-node-id="2516:23798"
      >
        <span>{firstLine}</span>
        <span>{secondLine}</span>
      </figcaption>
    </figure>
  );
}
