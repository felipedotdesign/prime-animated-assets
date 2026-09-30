import circleUrl from "../assets/circle-motion.svg";
import "./RadialCircle.css";

export default function RadialCircle({ className = "" }) {
  const classes = ["radial-circle", className].filter(Boolean).join(" ");

  return (
    <figure className={classes} aria-label="Radial circle diagram">
      <img className="radial-circle__graphic" src={circleUrl} alt="" />
    </figure>
  );
}
