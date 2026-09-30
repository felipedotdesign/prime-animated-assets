import { useEffect, useState } from "react";
import tableIconUrl from "../assets/table-icon.svg?url";
import { MOTION_TIMING } from "./motionTiming";
import "./EvaluationTable.css";

const defaultRows = [
  { answer: "1, 2, 3...", score: "0.42", scoreOpacity: 0.2 },
  { answer: "1, 2, 3...", score: "0.63", scoreOpacity: 0.3 },
  { answer: "1, 2, 3...", score: "0.91", scoreOpacity: 1 },
  { answer: "1, 2, 3...", score: "0.89", scoreOpacity: 1 },
  { answer: "1, 2, 3...", score: "0.74", scoreOpacity: 0.6 },
  { answer: "1, 2, 3, 4...", score: "0.87", scoreOpacity: 1, active: true },
];

export default function EvaluationTable({
  name = "primeintellect/logic-env",
  rows = defaultRows,
  className = "",
  countDelay = MOTION_TIMING.evaluationTable.delay,
  countDuration = MOTION_TIMING.evaluationTable.duration,
  complete = false,
}) {
  const [scores, setScores] = useState(() => rows.map((row) => complete ? row.score : "0.00"));
  const [scoresActive, setScoresActive] = useState(complete);
  const classes = [
    "evaluation-table",
    scoresActive ? "evaluation-table--scores-active" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (complete || reducedMotion) {
      setScores(rows.map((row) => row.score));
      setScoresActive(true);
      return undefined;
    }

    setScores(rows.map(() => "0.00"));
    setScoresActive(false);
    let frameId;
    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
      if (elapsed < countDelay) {
        frameId = window.requestAnimationFrame(tick);
        return;
      }
      setScoresActive(true);
      const progress = Math.max(0, Math.min((elapsed - countDelay) / countDuration, 1));
      const eased = progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
      setScores(rows.map((row) => (Number.parseFloat(row.score) * eased).toFixed(2)));
      if (progress < 1) frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [complete, rows, countDelay, countDuration]);

  return (
    <section className={classes} aria-label={`${name} evaluations`}>
      <div className="evaluation-table__content">
        <header className="evaluation-table__header">
          <span className="evaluation-table__name">{name}</span>
          <img
            className="evaluation-table__icon"
            src={tableIconUrl}
            alt=""
          />
        </header>

        <ul className="evaluation-table__rows">
          {rows.map((row, index) => (
            <li
              className={`evaluation-table__row${
                row.active ? " evaluation-table__row--active" : ""
              }`}
              key={`${row.answer}-${row.score}-${index}`}
            >
              <code className="evaluation-table__answer">
                <span className="evaluation-table__syntax">&quot;</span>
                <span>Answer</span>
                <span className="evaluation-table__syntax">&quot;: [</span>
                <span>{row.answer}</span>
                <span className="evaluation-table__syntax">]</span>
              </code>
              <span
                className="evaluation-table__score"
                style={{ "--score-opacity": row.scoreOpacity }}
              >
                {scores[index] ?? "0.00"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export { defaultRows };
