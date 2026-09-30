import circleMarkup from "../assets/circle-motion.svg?raw";
import { MOTION_TIMING } from "./motionTiming";
import "./RadialCircle.css";

export default function RadialCircle({ className = "" }) {
  const classes = ["radial-circle", className].filter(Boolean).join(" ");

  return (
    <figure
      className={classes}
      aria-label="Radial circle diagram"
      style={{
        "--production-traces-delay": `${MOTION_TIMING.productionTraces.delay}ms`,
        "--production-traces-duration": `${MOTION_TIMING.productionTraces.duration}ms`,
      }}
    >
      <div
        className="radial-circle__graphic"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: circleMarkup }}
      />
    </figure>
  );
}
