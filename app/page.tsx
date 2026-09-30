'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import LineChart from '../components/LineChart';
import EvaluationTable from '../components/EvaluationTable';
import ObservabilityDiagram from '../components/ObservabilityDiagram';
import YourModel from '../components/YourModel';
import CustomBehavior from '../components/CustomBehavior';
import ModelsDiagram from '../components/ModelsDiagram';
import RadialCircle from '../components/RadialCircle';
import EnvironmentsGrid from '../components/EnvironmentsGrid';
import ContinuousImprovement from '../components/ContinuousImprovement';
import './page.css';

type AnimationRender = (paused: boolean) => ReactNode;
type AnimationStudy = { id: string; label: string; render: AnimationRender };

const studies: AnimationStudy[] = [
  { id: 'line-chart', label: 'Reward curve', render: (paused) => <LineChart paused={paused} /> },
  { id: 'evaluation-table', label: 'Evaluation table', render: (paused) => <EvaluationTable paused={paused} /> },
  { id: 'observability', label: 'Observability', render: () => <ObservabilityDiagram /> },
  { id: 'your-model', label: 'Your model', render: () => <YourModel /> },
  { id: 'custom-behavior', label: 'Custom behavior', render: (paused) => <CustomBehavior paused={paused} /> },
  { id: 'models', label: 'Models', render: () => <ModelsDiagram /> },
  { id: 'production-traces', label: 'Production traces', render: () => <RadialCircle /> },
  { id: 'environments', label: 'Environments', render: () => <EnvironmentsGrid /> },
  { id: 'continuous-improvement', label: 'Continuous improvement', render: () => <ContinuousImprovement /> },
];

function AnimationTile({ study }: { study: AnimationStudy }) {
  const [paused, setPaused] = useState(true);
  const [revision, setRevision] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animations = stageRef.current?.getAnimations({ subtree: true }) ?? [];
    animations.forEach((animation) => paused ? animation.pause() : animation.play());
  }, [paused, revision]);

  function reset() {
    setPaused(true);
    setRevision((value) => value + 1);
  }

  return (
    <article className="animation-tile">
      <header className="animation-tile__header">
        <h2>{study.label}</h2>
        <div className="animation-tile__actions" aria-label={`${study.label} animation controls`}>
          <button type="button" onClick={() => setPaused((value) => !value)}>{paused ? 'Play' : 'Pause'}</button>
          <button type="button" onClick={reset}>Reset</button>
        </div>
      </header>
      <div ref={stageRef} className={`animation-tile__stage${paused ? ' is-paused' : ''}`}>
        <div key={revision}>{study.render(paused)}</div>
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
