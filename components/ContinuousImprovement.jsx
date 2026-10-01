import { MOTION_TIMING } from "./motionTiming";
import "./ContinuousImprovement.css";

export default function ContinuousImprovement({
  className = "",
  firstLine = "Continuos",
  secondLine = "Improvement",
  rotationDuration = MOTION_TIMING.continuousImprovement.rotationDuration,
}) {
  const classes = ["continuous-improvement", className]
    .filter(Boolean)
    .join(" ");

  return (
    <figure
      className={classes}
      aria-label="Continuous improvement diagram"
      data-node-id="2516:23779"
      style={{ "--continuous-rotation-duration": `${rotationDuration}ms` }}
    >
      <div
        className="continuous-improvement__diagram"
        data-node-id="2466:8902"
      >
        <span className="continuous-improvement__orbits" aria-hidden="true">
          <span
            className="continuous-improvement__orbit continuous-improvement__orbit--vertical"
            data-node-id="2466:8904"
          />

          <span
            className="continuous-improvement__orbit continuous-improvement__orbit--horizontal"
            data-node-id="2466:8905"
          />
        </span>

        <span
          className="continuous-improvement__ring"
          aria-hidden="true"
          data-node-id="2466:8906"
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
