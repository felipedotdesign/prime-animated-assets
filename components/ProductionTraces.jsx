import { MOTION_TIMING } from "./motionTiming";
import "./ProductionTraces.css";

const markers = [
  {
    id: "left",
    x: 74,
    lineTop: 121,
    lineHeight: 68,
    labelTop: 113,
    direction: "up",
    lineNodeId: "2764:15192",
    containerNodeId: "2764:15197",
    pointNodeId: "2764:15198",
    labelNodeId: "2764:15199",
  },
  {
    id: "right",
    x: 254,
    lineTop: 121,
    lineHeight: 68,
    labelTop: 113,
    direction: "up",
    lineNodeId: "2764:15193",
    containerNodeId: "2764:15200",
    pointNodeId: "2764:15201",
    labelNodeId: "2764:15202",
  },
  {
    id: "center",
    x: 164,
    lineTop: 141,
    lineHeight: 68,
    labelTop: 205,
    direction: "down",
    lineNodeId: "2764:15194",
    containerNodeId: "2764:15203",
    pointNodeId: "2764:15204",
    labelNodeId: "2764:15205",
  },
];

export default function ProductionTraces({ className = "" }) {
  const classes = ["production-traces", className].filter(Boolean).join(" ");

  return (
    <figure
      className={classes}
      aria-label="Production traces progress diagram"
      data-node-id="2764:9971"
      style={{
        "--traces-delay": `${MOTION_TIMING.productionTraces.delay}ms`,
        "--traces-duration": `${MOTION_TIMING.productionTraces.duration}ms`,
      }}
    >
      <div
        className="production-traces__progress"
        aria-hidden="true"
        data-node-id="2764:15159"
      >
        {Array.from({ length: 32 }, (_, index) => (
          <span
            key={index}
            className="production-traces__segment"
            data-node-id={`2764:${15160 + index}`}
          />
        ))}
      </div>

      {markers.map((marker) => (
        <div key={marker.id}>
          <span
            className={`production-traces__line production-traces__line--${marker.direction}`}
            aria-hidden="true"
            data-node-id={marker.lineNodeId}
            style={{
              left: `${marker.x}px`,
              top: `${marker.lineTop}px`,
              height: `${marker.lineHeight}px`,
            }}
          />
          <span
            className="production-traces__coordinate"
            data-node-id={marker.containerNodeId}
            style={{ left: `${marker.x}px`, top: `${marker.labelTop}px` }}
          >
            <span
              className="production-traces__point"
              data-node-id={marker.pointNodeId}
              aria-hidden="true"
            />
            <span
              className="production-traces__label"
              data-node-id={marker.labelNodeId}
            >
              Success
            </span>
          </span>
        </div>
      ))}

      <span className="production-traces__axis-label production-traces__axis-label--start">0</span>
      <span className="production-traces__axis-label production-traces__axis-label--end">100</span>
    </figure>
  );
}
