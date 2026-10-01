import { useEffect, useState } from 'react';
import { MOTION_TIMING } from './motionTiming';
import './LiquidDiagram.css';

const gpuBlocks = Array.from({ length: 14 }, (_, index) => `2972:${12160 + index}`);
const initialFilledCount = 10;
const finalFilledCount = 13;
const totalGpuCount = 128;

export default function LiquidDiagram({ className = '', complete = false }) {
  const classes = ['liquid-diagram', className].filter(Boolean).join(' ');
  const [filledCount, setFilledCount] = useState(complete ? finalFilledCount : initialFilledCount);

  useEffect(() => {
    if (complete) {
      setFilledCount(finalFilledCount);
      return undefined;
    }

    setFilledCount(initialFilledCount);
    let fillTimer;
    const leadInTimer = window.setTimeout(() => {
      setFilledCount(initialFilledCount + 1);
      fillTimer = window.setInterval(() => {
        setFilledCount((count) => {
          const nextCount = Math.min(count + 1, finalFilledCount);
          if (nextCount === finalFilledCount) window.clearInterval(fillTimer);
          return nextCount;
        });
      }, MOTION_TIMING.liquid.fillInterval);
    }, MOTION_TIMING.liquid.initialDelay);

    return () => {
      window.clearTimeout(leadInTimer);
      window.clearInterval(fillTimer);
    };
  }, [complete]);

  const gpuCount = Math.round((filledCount / gpuBlocks.length) * totalGpuCount);

  return (
    <figure
      className={classes}
      aria-label="Liquid compute GPU utilization"
      data-node-id="2972:12109"
      style={{
        '--liquid-fill-duration': `${MOTION_TIMING.liquid.fillDuration}ms`,
      }}
    >
      <span className="liquid-diagram__heading">GPU in use</span>
      <span className="liquid-diagram__value">{gpuCount}/{totalGpuCount}</span>

      <div className="liquid-diagram__blocks" aria-hidden="true">
        {gpuBlocks.map((blockId, index) => (
          <span
            key={blockId}
            className={`liquid-diagram__block${index < filledCount ? ' is-filled' : ''}`}
            data-node-id={blockId}
          />
        ))}
      </div>

      <span className="liquid-diagram__bracket liquid-diagram__bracket--left" aria-hidden="true" />
      <span className="liquid-diagram__bracket liquid-diagram__bracket--right" aria-hidden="true" />
      <figcaption>Frontieer cluster</figcaption>
    </figure>
  );
}
