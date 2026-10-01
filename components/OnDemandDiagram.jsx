import { useEffect, useState } from 'react';
import { MOTION_TIMING } from './motionTiming';
import './OnDemandDiagram.css';

const gpuOptions = [
  { id: 'h200', price: '$5.48/HR', nodeId: '2972:12204' },
  { id: 'b300', price: '$6.64/HR', nodeId: '2972:12207' },
  { id: 'h100', price: '$3.50/HR', nodeId: '2972:12210' },
];

const TARGET_GPU_COUNT = 64;
const GPU_COUNT_STEPS = 10;

const getGpuCountAtStep = (stepIndex) => (
  Math.round((stepIndex / GPU_COUNT_STEPS) * TARGET_GPU_COUNT)
);

export default function OnDemandDiagram({ className = '', complete = false }) {
  const classes = ['on-demand-diagram', className].filter(Boolean).join(' ');
  const [gpuCount, setGpuCount] = useState(complete ? TARGET_GPU_COUNT : 0);

  useEffect(() => {
    if (complete) {
      setGpuCount(TARGET_GPU_COUNT);
      return undefined;
    }

    setGpuCount(0);
    const stepDuration = MOTION_TIMING.onDemand.duration / GPU_COUNT_STEPS;
    let completedSteps = 0;
    let countTimer;
    const advanceCount = () => {
      completedSteps += 1;
      setGpuCount(getGpuCountAtStep(completedSteps));
      if (completedSteps === GPU_COUNT_STEPS) window.clearInterval(countTimer);
    };
    const leadInTimer = window.setTimeout(() => {
      advanceCount();
      countTimer = window.setInterval(advanceCount, stepDuration);
    }, MOTION_TIMING.onDemand.delay + stepDuration);

    return () => {
      window.clearTimeout(leadInTimer);
      window.clearInterval(countTimer);
    };
  }, [complete]);

  return (
    <figure
      className={classes}
      aria-label="On-demand GPU count selector"
      data-node-id="2972:12182"
      style={{
        '--on-demand-delay': `${MOTION_TIMING.onDemand.delay}ms`,
        '--on-demand-duration': `${MOTION_TIMING.onDemand.duration}ms`,
      }}
    >
      <span className="on-demand-diagram__heading">GPU count</span>
      <span className="on-demand-diagram__value">{gpuCount}</span>

      <div className="on-demand-diagram__track" aria-hidden="true">
        <span className="on-demand-diagram__progress" />
        <span className="on-demand-diagram__handle" />
      </div>

      <div className="on-demand-diagram__options">
        {gpuOptions.map((option) => (
          <section key={option.id} className="on-demand-diagram__option" data-node-id={option.nodeId}>
            <h3>{option.id}</h3>
            <p>{option.price}</p>
          </section>
        ))}
      </div>
    </figure>
  );
}
