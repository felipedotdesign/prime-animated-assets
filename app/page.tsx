'use client';

import type { ReactNode } from 'react';
import { useLayoutEffect, useRef, useState } from 'react';
import LineChart from '../components/LineChart';
import EvaluationTable from '../components/EvaluationTable';
import ObservabilityDiagram from '../components/ObservabilityDiagram';
import YourModel from '../components/YourModel';
import CustomBehavior from '../components/CustomBehavior';
import ModelsDiagram from '../components/ModelsDiagram';
import ProductionTraces from '../components/ProductionTraces';
import EnvironmentsGrid from '../components/EnvironmentsGrid';
import ContinuousImprovement from '../components/ContinuousImprovement';
import DockerDiagram from '../components/DockerDiagram';
import LoopDiagram from '../components/LoopDiagram';
import TrainingDashboard from '../components/TrainingDashboard';
import InferenceDashboard from '../components/InferenceDashboard';
import ClusterDashboard from '../components/ClusterDashboard';
import UiPreview from '../components/UiPreview';
import './page.css';

type AnimationRender = (complete: boolean) => ReactNode;
type AnimationStudy = { id: string; label: string; span?: 2; render: AnimationRender };
type UiStudyDefinition = { id: string; label: string; width: number; height: number; render: () => ReactNode };

const studies: AnimationStudy[] = [
  { id: 'line-chart', label: 'Reward curve', render: (complete) => <LineChart complete={complete} /> },
  { id: 'evaluation-table', label: 'Evaluation table', render: (complete) => <EvaluationTable complete={complete} /> },
  { id: 'observability', label: 'Observability', render: () => <ObservabilityDiagram /> },
  { id: 'your-model', label: 'Your model', render: () => <YourModel /> },
  { id: 'custom-behavior', label: 'Custom behavior', render: (complete) => <CustomBehavior complete={complete} /> },
  { id: 'models', label: 'Models', render: () => <ModelsDiagram /> },
  { id: 'production-traces', label: 'Production traces', render: () => <ProductionTraces /> },
  { id: 'environments', label: 'Environments', render: () => <EnvironmentsGrid /> },
  { id: 'continuous-improvement', label: 'Continuous improvement', render: () => <ContinuousImprovement /> },
  { id: 'docker', label: 'Docker', render: () => <DockerDiagram /> },
  { id: 'loop', label: 'Loop', span: 2, render: () => <LoopDiagram /> },
];

const uiStudies: UiStudyDefinition[] = [
  { id: 'training-ui', label: 'Training overview', width: 1280, height: 824, render: () => <TrainingDashboard /> },
  { id: 'inference-ui', label: 'Inference', width: 1280, height: 655, render: () => <InferenceDashboard /> },
  { id: 'cluster-ui', label: 'Cluster overview', width: 1280, height: 796, render: () => <ClusterDashboard /> },
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
    <article className={`animation-tile${study.span === 2 ? ' animation-tile--wide' : ''}`}>
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

function UiStudyRow({ study }: { study: UiStudyDefinition }) {
  const [revision, setRevision] = useState(0);

  return (
    <article className="ui-study">
      <header className="ui-study__header">
        <h2>{study.label}</h2>
        <div className="animation-tile__actions" aria-label={`${study.label} animation control`}>
          <button type="button" onClick={() => setRevision((value) => value + 1)}>Play</button>
        </div>
      </header>
      <UiPreview width={study.width} height={study.height} label={`${study.label} interface`}>
        <div key={revision}>{study.render()}</div>
      </UiPreview>
    </article>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'diagrams' | 'ui'>('diagrams');

  return (
    <main className={`motion-gallery${activeTab === 'ui' ? ' motion-gallery--ui' : ''}`}>
      <header className="motion-gallery__intro">
        <h1>Animation gallery</h1>
      </header>
      <nav className="motion-gallery__tabs" role="tablist" aria-label="Gallery sections">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'diagrams'}
          className={activeTab === 'diagrams' ? 'is-active' : ''}
          onClick={() => setActiveTab('diagrams')}
        >Diagrams</button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'ui'}
          className={activeTab === 'ui' ? 'is-active' : ''}
          onClick={() => setActiveTab('ui')}
        >UI</button>
      </nav>
      {activeTab === 'diagrams' ? (
        <section className="motion-gallery__grid" role="tabpanel" aria-label="Animation studies">
          {studies.map((study) => <AnimationTile key={study.id} study={study} />)}
        </section>
      ) : (
        <section className="motion-gallery__ui" role="tabpanel" aria-label="UI studies">
          {uiStudies.map((study) => <UiStudyRow key={study.id} study={study} />)}
        </section>
      )}
    </main>
  );
}
