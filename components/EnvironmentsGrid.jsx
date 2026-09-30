import { MOTION_TIMING } from "./motionTiming";
import "./EnvironmentsGrid.css";

const CELLS = [
  {
    label: "Push",
    command: "prime env push",
    className: "environments-grid__cell--push",
    nodeId: "2466:8880",
    labelNodeId: "2466:8881",
    commandNodeId: "2466:8882",
  },
  {
    label: "Init",
    command: "prime env init",
    className: "environments-grid__cell--init",
    nodeId: "2466:8883",
    labelNodeId: "2466:8884",
    commandNodeId: "2466:8885",
  },
  {
    label: "Eval",
    command: "prime env eval",
    className: "environments-grid__cell--eval",
    nodeId: "2466:8887",
    labelNodeId: "2466:8888",
    commandNodeId: "2466:8889",
  },
  {
    label: "Develop",
    command: "prime env develop",
    className: "environments-grid__cell--develop",
    nodeId: "2466:8890",
    labelNodeId: "2466:8891",
    commandNodeId: "2466:8892",
  },
];

function StreamingLabel({ label, delay, duration, nodeId }) {
  return (
    <span
      className="environments-grid__label"
      data-node-id={nodeId}
      aria-label={label}
    >
      <span
        className="environments-grid__label-text"
        style={{
          "--environments-label-delay": `${delay}ms`,
          "--environments-label-duration": `${duration}ms`,
          "--environments-label-steps": label.length,
        }}
        aria-hidden="true"
      >
        {label}
      </span>
    </span>
  );
}

function EnvironmentCell({ cell, labelDelay, labelDuration }) {
  return (
    <div
      className={`environments-grid__cell ${cell.className}`}
      data-node-id={cell.nodeId}
    >
      <StreamingLabel
        label={cell.label}
        delay={labelDelay}
        duration={labelDuration}
        nodeId={cell.labelNodeId}
      />
      <span
        className="environments-grid__command"
        data-node-id={cell.commandNodeId}
      >
        <span className="environments-grid__prompt">$</span>
        <span className="environments-grid__command-text">
          {cell.command}
        </span>
      </span>
    </div>
  );
}

export default function EnvironmentsGrid({
  className = "",
  textDelay = MOTION_TIMING.environments.textDelay,
  characterDuration = MOTION_TIMING.environments.characterDuration,
  durationOffset = MOTION_TIMING.environments.durationOffset,
  textGap = MOTION_TIMING.environments.textGap,
}) {
  const classes = ["environments-grid", className].filter(Boolean).join(" ");
  let nextLabelDelay = textDelay;
  const labelTimings = CELLS.map((cell) => {
    const duration = cell.label.length * characterDuration + durationOffset;
    const timing = { delay: nextLabelDelay, duration };
    nextLabelDelay += duration + textGap;
    return timing;
  });

  return (
    <figure
      className={classes}
      aria-label="Prime environment commands"
      data-node-id="2516:23744"
    >
      <div
        className="environments-grid__stage"
        data-node-id="2466:8878"
      >
        <div className="environments-grid__lines" aria-hidden="true">
          <span className="environments-grid__line environments-grid__line--top-boundary" />
          <span className="environments-grid__line environments-grid__line--bottom-boundary" />
          <span className="environments-grid__line environments-grid__line--left-boundary" />
          <span className="environments-grid__line environments-grid__line--right-boundary" />
          <span className="environments-grid__line environments-grid__line--horizontal" />
          <span className="environments-grid__line environments-grid__line--top-vertical" />
          <span className="environments-grid__line environments-grid__line--bottom-vertical" />
        </div>

        <div className="environments-grid__content">
          <div className="environments-grid__row" data-node-id="2466:8879">
            {CELLS.slice(0, 2).map((cell, index) => (
              <EnvironmentCell
                key={cell.label}
                cell={cell}
                labelDelay={labelTimings[index].delay}
                labelDuration={labelTimings[index].duration}
              />
            ))}
          </div>
          <div className="environments-grid__row" data-node-id="2466:8886">
            {CELLS.slice(2).map((cell, index) => (
              <EnvironmentCell
                key={cell.label}
                cell={cell}
                labelDelay={labelTimings[index + 2].delay}
                labelDuration={labelTimings[index + 2].duration}
              />
            ))}
          </div>
        </div>
      </div>
    </figure>
  );
}
