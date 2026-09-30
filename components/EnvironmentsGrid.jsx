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

function StreamingLabel({ label, delay, nodeId }) {
  return (
    <span
      className="environments-grid__label"
      data-node-id={nodeId}
      aria-label={label}
    >
      <span
        className="environments-grid__label-text"
        style={{ "--environments-label-delay": `${delay}ms` }}
        aria-hidden="true"
      >
        {label}
      </span>
    </span>
  );
}

function EnvironmentCell({
  cell,
  labelDelay,
  commandDelay,
  commandStreamDelay,
}) {
  return (
    <div
      className={`environments-grid__cell ${cell.className}`}
      data-node-id={cell.nodeId}
    >
      <StreamingLabel
        label={cell.label}
        delay={labelDelay}
        nodeId={cell.labelNodeId}
      />
      <span
        className="environments-grid__command"
        data-node-id={cell.commandNodeId}
        style={{ "--environments-command-delay": `${commandDelay}ms` }}
      >
        <span className="environments-grid__prompt">$</span>
        <span
          className="environments-grid__command-text"
          style={{
            "--environments-command-stream-delay": `${commandStreamDelay}ms`,
          }}
        >
          {` ${cell.command}`}
        </span>
      </span>
    </div>
  );
}

export default function EnvironmentsGrid({
  className = "",
  gridDuration = 720,
  gridDelay = 120,
  textDuration = 360,
  symbolDelay,
  textDelay,
  textStagger = 90,
  subtextDuration = 320,
  commandStreamDuration = 360,
  commandStreamStagger = 120,
}) {
  const classes = ["environments-grid", className].filter(Boolean).join(" ");
  const resolvedSymbolDelay =
    symbolDelay ?? gridDelay + gridDuration - 80;
  const resolvedTextDelay = textDelay ?? resolvedSymbolDelay;
  const resolvedLabelsCompleteDelay =
    resolvedTextDelay + (CELLS.length - 1) * textStagger + textDuration;

  return (
    <figure
      className={classes}
      aria-label="Prime environment commands"
      data-node-id="2516:23744"
      style={{
        "--environments-grid-duration": `${gridDuration}ms`,
        "--environments-grid-delay": `${gridDelay}ms`,
        "--environments-text-duration": `${textDuration}ms`,
        "--environments-subtext-duration": `${subtextDuration}ms`,
        "--environments-command-stream-duration": `${commandStreamDuration}ms`,
      }}
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
                labelDelay={resolvedTextDelay + index * textStagger}
                commandDelay={resolvedSymbolDelay}
                commandStreamDelay={
                  resolvedLabelsCompleteDelay + index * commandStreamStagger
                }
              />
            ))}
          </div>
          <div className="environments-grid__row" data-node-id="2466:8886">
            {CELLS.slice(2).map((cell, index) => (
              <EnvironmentCell
                key={cell.label}
                cell={cell}
                labelDelay={resolvedTextDelay + (index + 2) * textStagger}
                commandDelay={resolvedSymbolDelay}
                commandStreamDelay={
                  resolvedLabelsCompleteDelay +
                  (index + 2) * commandStreamStagger
                }
              />
            ))}
          </div>
        </div>
      </div>
    </figure>
  );
}
