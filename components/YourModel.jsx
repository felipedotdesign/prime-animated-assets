import flowUrl from "../assets/model-flow.svg?url";
import { MOTION_TIMING } from "./motionTiming";
import "./YourModel.css";

const GRID_COLUMNS = [0.25, 40.9668, 79.9633, 120.107, 160.25];
const GRID_ROWS = [0.25, 41.1011, 80.8174, 120.534, 160.25];

function ModelGrid() {
  return (
    <svg
      className="your-model__grid"
      viewBox="0 0 160.5 160.5"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {GRID_ROWS.map((y) => (
        <line
          key={`row-${y}`}
          className="your-model__grid-line your-model__grid-line--horizontal"
          x1="0.25"
          y1={y}
          x2="160.25"
          y2={y}
        />
      ))}
      {GRID_COLUMNS.map((x) => (
        <line
          key={`column-${x}`}
          className="your-model__grid-line your-model__grid-line--vertical"
          x1={x}
          y1="0.25"
          x2={x}
          y2="160.25"
        />
      ))}
    </svg>
  );
}

export default function YourModel({
  label = "Your model",
  className = "",
  plusDuration = MOTION_TIMING.yourModel.plusDuration,
  plusDelay = MOTION_TIMING.yourModel.plusDelay,
  flowDuration = MOTION_TIMING.yourModel.flowDuration,
  flowDelay = MOTION_TIMING.yourModel.flowDelay,
}) {
  const classes = ["your-model", className].filter(Boolean).join(" ");

  return (
    <figure
      className={classes}
      aria-label={label}
      style={{
        "--model-plus-duration": `${plusDuration}ms`,
        "--model-plus-delay": `${plusDelay}ms`,
        "--model-flow-duration": `${flowDuration}ms`,
        "--model-flow-delay": `${flowDelay}ms`,
      }}
    >
      <ModelGrid />
      <span className="your-model__label">{label}</span>
      <span className="your-model__center" aria-hidden="true">
        <span className="your-model__plus" />
      </span>
      <img
        className="your-model__flow your-model__flow--left"
        src={flowUrl}
        alt=""
      />
      <img
        className="your-model__flow your-model__flow--right"
        src={flowUrl}
        alt=""
      />
    </figure>
  );
}
