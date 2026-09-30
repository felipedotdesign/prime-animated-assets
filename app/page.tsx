'use client';

import type { ReactNode } from 'react';
import { useLayoutEffect, useRef, useState } from 'react';
import LineChart from '../components/LineChart';
import EvaluationTable from '../components/EvaluationTable';
import ObservabilityDiagram from '../components/ObservabilityDiagram';
import YourModel from '../components/YourModel';
import CustomBehavior from '../components/CustomBehavior';
import ModelsDiagram from '../components/ModelsDiagram';
import EnvironmentsGrid from '../components/EnvironmentsGrid';
import ContinuousImprovement from '../components/ContinuousImprovement';
import './page.css';

type AnimationRender = (complete: boolean) => ReactNode;
type AnimationStudy = { id: string; label: string; render: AnimationRender };

const studies: AnimationStudy[] = [
  { id: 'line-chart', label: 'Reward curve', render: (complete) => <LineChart complete={complete} /> },
  { id: 'evaluation-table', label: 'Evaluation table', render: (complete) => <EvaluationTable complete={complete} /> },
  { id: 'observability', label: 'Observability', render: () => <ObservabilityDiagram /> },
  { id: 'your-model', label: 'Your model', render: () => <YourModel /> },
  { id: 'custom-behavior', label: 'Custom behavior', render: (complete) => <CustomBehavior complete={complete} /> },
  { id: 'models', label: 'Models', render: () => <ModelsDiagram /> },
  { id: 'production-traces', label: 'Production traces', render: () => null },
  { id: 'environments', label: 'Environments', render: () => <EnvironmentsGrid /> },
  { id: 'continuous-improvement', label: 'Continuous improvement', render: () => <ContinuousImprovement /> },
];

function AnimationTile({ study }: { study: AnimationStudy }) {
  const [showCompletedFrame, setShowCompletedFrame] = useState(true);
  const [revision, setRevision] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const animations = stageRef.current?.getAnimations({ subtree: true }) ?? [];
    animations.forEach((animation) => {
      if (showCompletedFrame) {
        const endTime = Number(animation.effect?.getComputedTiming().endTime);
        if (Number.isFinite(endTime)) {
          animation.currentTime = endTime;
          animation.pause();
        } else {
          animation.play();
        }
      } else {
        animation.cancel();
        animation.play();
      }
    });
  }, [showCompletedFrame, revision]);

  function replay() {
    setShowCompletedFrame(false);
    setRevision((value) => value + 1);
  }

  return (
    <article className="animation-tile">
      <header className="animation-tile__header">
        <h2>{study.label}</h2>
        <div className="animation-tile__actions" aria-label={`${study.label} animation control`}>
          <button type="button" onClick={replay}>Play</button>
        </div>
      </header>
      <div ref={stageRef} className="animation-tile__stage">
        <div key={revision}>{study.render(showCompletedFrame)}</div>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <main className="motion-gallery">
      <header className="motion-gallery__intro">
        <h1>Animation gallery</h1>
      </header>
      <section className="motion-gallery__grid" aria-label="Animation studies">
        {studies.map((study) => <AnimationTile key={study.id} study={study} />)}
      </section>
    </main>
  );
}
