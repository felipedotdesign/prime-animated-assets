import baselineUrl from '../assets/loop-baseline.svg?url';
import pathUrl from '../assets/loop-path.svg?url';
import pointUrl from '../assets/loop-point.svg?url';
import { MOTION_TIMING } from './motionTiming';
import './LoopDiagram.css';

const checkpoints = [
  { id: 'baseline', label: 'Model baseline', pointX: 322.43, pointY: 267.54, labelX: 178.13, labelY: 255.91 },
  { id: 'traces', label: 'Production traces', pointX: 489.71, pointY: 455.578, labelX: 418.55, labelY: 464.8 },
  { id: 'environment', label: 'Make RL env', pointX: 626.251, pointY: 70.974, labelX: 578.63, labelY: 37.09 },
  { id: 'retrain', label: 'Retrain', pointX: 754.79, pointY: 479.701, labelX: 722.2, labelY: 487.91 },
  { id: 'repeat', label: 'Repeat', pointX: 887.711, pointY: 267.459, labelX: 858.81, labelY: 277.59 },
];

export default function LoopDiagram({ className = '' }) {
  const classes = ['loop-diagram', className].filter(Boolean).join(' ');

  return (
    <figure
      className={classes}
      aria-label="Reinforcement learning iteration loop"
      style={{
        '--loop-delay': `${MOTION_TIMING.loop.delay}ms`,
        '--loop-duration': `${MOTION_TIMING.loop.duration}ms`,
        '--loop-checkpoint-duration': `${MOTION_TIMING.loop.checkpointDuration}ms`,
        '--loop-checkpoint-stagger': `${MOTION_TIMING.loop.checkpointStagger}ms`,
      }}
    >
      <div className="loop-diagram__canvas">
        <img className="loop-diagram__baseline" src={baselineUrl} alt="" />
        <span className="loop-diagram__arrow" aria-hidden="true" />
        <span className="loop-diagram__path-frame" aria-hidden="true">
          <img src={pathUrl} alt="" />
        </span>
        <span className="loop-diagram__baseline-connector" aria-hidden="true" />
        <span className="loop-diagram__repeat-clip" aria-hidden="true" />
        {checkpoints.map((checkpoint, index) => (
          <div key={checkpoint.id}>
            <img
              className="loop-diagram__point"
              src={pointUrl}
              alt=""
              style={{
                left: `${checkpoint.pointX}px`,
                top: `${checkpoint.pointY}px`,
                '--loop-stagger-offset': `${index * MOTION_TIMING.loop.checkpointStagger}ms`,
              }}
            />
            <span
              className="loop-diagram__label"
              style={{
                left: `${checkpoint.labelX}px`,
                top: `${checkpoint.labelY}px`,
                '--loop-stagger-offset': `${index * MOTION_TIMING.loop.checkpointStagger}ms`,
              }}
            >
              {checkpoint.label}
            </span>
          </div>
        ))}
      </div>
    </figure>
  );
}
