import ringUrl from "../assets/diagram-ring.svg?url";
import diagonalsUrl from "../assets/diagram-diagonals.svg?url";
import centerUrl from "../assets/diagram-center.svg?url";
import horizontalUrl from "../assets/diagram-horizontal.svg?url";
import { MOTION_TIMING } from "./motionTiming";
import "./ObservabilityDiagram.css";

export default function ObservabilityDiagram({
  className = "",
  animationDuration = MOTION_TIMING.observability.centerDuration,
  animationDelay = MOTION_TIMING.observability.delay,
  crossDuration = MOTION_TIMING.observability.crossDuration,
}) {
  const classes = ["observability-diagram", className]
    .filter(Boolean)
    .join(" ");

  return (
    <figure
      className={classes}
      aria-label="Observability diagram"
      style={{
        "--diagram-center-duration": `${animationDuration}ms`,
        "--diagram-center-delay": `${animationDelay}ms`,
        "--diagram-cross-duration": `${crossDuration}ms`,
      }}
    >
      <img
        className="observability-diagram__ring"
        src={ringUrl}
        alt=""
      />

      <div className="observability-diagram__diagonals-wrap">
        <img
          className="observability-diagram__diagonals"
          src={diagonalsUrl}
          alt=""
        />
      </div>

      <img
        className="observability-diagram__center"
        src={centerUrl}
        alt=""
      />
      <img
        className="observability-diagram__horizontal"
        src={horizontalUrl}
        alt=""
      />

      <span className="observability-diagram__label observability-diagram__label--logs">
        Logs
      </span>
      <span className="observability-diagram__label observability-diagram__label--metrics">
        Metrics
      </span>
      <span className="observability-diagram__label observability-diagram__label--traces">
        Traces
      </span>
      <span className="observability-diagram__label observability-diagram__label--alerts">
        Alerts
      </span>
    </figure>
  );
}
