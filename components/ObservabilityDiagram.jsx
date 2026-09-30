import ringUrl from "../assets/diagram-ring.svg";
import diagonalsUrl from "../assets/diagram-diagonals.svg";
import centerUrl from "../assets/diagram-center.svg";
import horizontalUrl from "../assets/diagram-horizontal.svg";
import "./ObservabilityDiagram.css";

export default function ObservabilityDiagram({
  className = "",
  animationDuration = 880,
  animationDelay = 120,
  crossDuration = 280,
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
