import upperInnerBranchUrl from "../assets/models-branch-upper-inner.svg";
import outerBranchUrl from "../assets/models-branch-outer.svg";
import lowerInnerBranchUrl from "../assets/models-branch-lower-inner.svg";
import middleBranchUrl from "../assets/models-branch-middle.svg";
import dotUrl from "../assets/models-dot.svg";
import lightItemsUrl from "../assets/models-items-light.svg";
import darkItemsUrl from "../assets/models-items-dark.svg";
import originUrl from "../assets/models-origin.svg";
import "./ModelsDiagram.css";

const defaultModels = [
  { label: "Qwen3.5-0.8B", items: "light" },
  { label: "Qwen3.5-9B", items: "dark" },
  { label: "Nemotron-3.5", items: "dark" },
  { label: "GPT-OSS-20B", items: "light" },
  { label: "Qwen3.5-0.8B", items: "light" },
];

export default function ModelsDiagram({
  models = defaultModels,
  className = "",
  flowDuration = 480,
  flowDelay = 120,
  branchStagger = 100,
  dotDuration = 100,
}) {
  const classes = ["models-diagram", className].filter(Boolean).join(" ");

  return (
    <figure
      className={classes}
      aria-label="Model comparison"
      style={{
        "--models-flow-duration": `${flowDuration}ms`,
        "--models-flow-delay": `${flowDelay}ms`,
        "--models-dot-duration": `${dotDuration}ms`,
      }}
    >
      <img
        className="models-diagram__branch models-diagram__branch--outer-top"
        src={outerBranchUrl}
        alt=""
        style={{ "--models-stagger-offset": "0ms" }}
      />
      <img
        className="models-diagram__branch models-diagram__branch--upper-inner"
        src={upperInnerBranchUrl}
        alt=""
        style={{ "--models-stagger-offset": `${branchStagger}ms` }}
      />
      <img
        className="models-diagram__branch models-diagram__branch--middle"
        src={middleBranchUrl}
        alt=""
        style={{ "--models-stagger-offset": `${branchStagger * 2}ms` }}
      />
      <img
        className="models-diagram__branch models-diagram__branch--lower-inner"
        src={lowerInnerBranchUrl}
        alt=""
        style={{ "--models-stagger-offset": `${branchStagger * 3}ms` }}
      />
      <img
        className="models-diagram__branch models-diagram__branch--outer-bottom"
        src={outerBranchUrl}
        alt=""
        style={{ "--models-stagger-offset": `${branchStagger * 4}ms` }}
      />

      <img className="models-diagram__origin" src={originUrl} alt="" />

      <ol className="models-diagram__models">
        {models.map((model, index) => (
          <li
            className={`models-diagram__model models-diagram__model--${index + 1}`}
            style={{ "--models-stagger-offset": `${branchStagger * index}ms` }}
            key={`${model.label}-${index}`}
          >
            <span className="models-diagram__terminal" aria-hidden="true">
              <img className="models-diagram__dot" src={dotUrl} alt="" />
            </span>
            <span className="models-diagram__label">{model.label}</span>
            <img
              className="models-diagram__items"
              src={model.items === "dark" ? darkItemsUrl : lightItemsUrl}
              alt=""
            />
          </li>
        ))}
      </ol>
    </figure>
  );
}

export { defaultModels };
