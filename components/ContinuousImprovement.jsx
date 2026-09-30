import verticalOrbitUrl from "../assets/continuous-orbit-vertical.png?url";
import horizontalOrbitUrl from "../assets/continuous-orbit-horizontal.png?url";
import ringUrl from "../assets/continuous-orbit-ring.svg?url";
import rightArrowUrl from "../assets/continuous-arrow-right.svg?url";
import leftArrowUrl from "../assets/continuous-arrow-left.svg?url";
import "./ContinuousImprovement.css";

function OrbitArrow({ side, src, nodeId }) {
  return (
    <span
      className={`continuous-improvement__arrow continuous-improvement__arrow--${side}`}
      data-node-id={nodeId}
      aria-hidden="true"
    >
      <span className="continuous-improvement__arrow-transform">
        <img src={src} alt="" />
      </span>
    </span>
  );
}

export default function ContinuousImprovement({
  className = "",
  firstLine = "Continuos",
  secondLine = "Improvement",
  orbitDuration = 900,
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

        <img
          className="continuous-improvement__ring"
          src={ringUrl}
          alt=""
          data-node-id="2466:8906"
        />

        <OrbitArrow
          side="right"
          src={rightArrowUrl}
          nodeId="2466:8907"
        />
        <OrbitArrow
          side="left"
          src={leftArrowUrl}
          nodeId="2466:8908"
        />
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
