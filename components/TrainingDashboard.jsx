'use client';

import { useEffect, useState } from 'react';
import rewardSeriesUrl from '../assets/ui/training-primary-series.svg?url';
import metricsSeriesUrl from '../assets/ui/training-vector.svg?url';
import distributionSeriesUrl from '../assets/ui/training-reward-curve.svg?url';
import UiSidebar from './UiSidebar';
import { MOTION_TIMING } from './motionTiming';
import './UiScreens.css';

const TOTAL_SUMMARY_TICKS = 250;
const INITIAL_COMPLETE_TICKS = 110;
const INITIAL_STEPS = 44;
const TOTAL_STEPS = 100;
const INITIAL_PERCENTAGE = 44;
const summaryTicks = Array.from({ length: TOTAL_SUMMARY_TICKS });

function LinePanel({ title, series, variant }) {
  return (
    <section className={`training-line-panel training-line-panel--${variant}`}>
      <h3>{title}</h3>
      <div className="training-line-panel__plot">
        <span className="training-grid training-grid--a" />
        <span className="training-grid training-grid--b" />
        <span className="training-grid training-grid--c" />
        <img className="training-line-panel__series ui-line-reveal--base" src={series} alt="" />
        <img className="training-line-panel__series ui-line-reveal--active" src={series} alt="" />
      </div>
      <div className="training-axis"><span>0</span><span>25</span><span>50</span><span>75</span><span>100</span></div>
    </section>
  );
}

function DetailPair({ label, value }) {
  return <div className="training-detail-pair"><span>{label}</span><strong>{value}</strong></div>;
}

export default function TrainingDashboard() {
  const [completeTicks, setCompleteTicks] = useState(INITIAL_COMPLETE_TICKS);
  const progress = (completeTicks - INITIAL_COMPLETE_TICKS) / (TOTAL_SUMMARY_TICKS - INITIAL_COMPLETE_TICKS);
  const currentSteps = Math.min(TOTAL_STEPS, INITIAL_STEPS + Math.round(progress * (TOTAL_STEPS - INITIAL_STEPS)));
  const currentPercentage = INITIAL_PERCENTAGE + progress * (100 - INITIAL_PERCENTAGE);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const interval = window.setInterval(() => {
      setCompleteTicks((value) => {
        if (value >= TOTAL_SUMMARY_TICKS) {
          window.clearInterval(interval);
          return value;
        }
        const nextValue = value + 1;
        if (nextValue === TOTAL_SUMMARY_TICKS) window.clearInterval(interval);
        return nextValue;
      });
    }, MOTION_TIMING.trainingUi.backgroundTickInterval);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      className="ui-screen training-screen"
      style={{
        '--ui-line-delay': `${MOTION_TIMING.ui.lineDelay}ms`,
        '--ui-line-duration': `${MOTION_TIMING.ui.lineDuration}ms`,
        '--training-next-pulse-duration': `${MOTION_TIMING.ui.nextTickPulseDuration}ms`,
      }}
    >
      <UiSidebar />
      <div className="training-app">
        <nav className="training-topbar">
          <div className="training-topbar__tabs">
            <span className="is-active">Overview</span><span>Data</span><span>System</span><span>Checkpoints</span>
          </div>
          <span>View on W&amp;B</span>
        </nav>
        <div className="training-body">
          <main className="training-main">
            <section className="training-progress">
              <div className="training-progress__value">{currentPercentage.toFixed(2)}<span>%</span></div>
              <div className="training-progress__caption">{currentSteps} / 100 STEPS</div>
              <div className="training-progress__ticks">
                {summaryTicks.map((_, index) => (
                  <i
                    key={index}
                    className={index < completeTicks ? 'is-complete' : index === completeTicks ? 'is-next' : ''}
                  />
                ))}
              </div>
            </section>
            <div className="training-charts">
              <LinePanel title="Reward" series={rewardSeriesUrl} variant="reward" />
              <LinePanel title="Metrics" series={metricsSeriesUrl} variant="metrics" />
            </div>
            <section className="training-distribution">
              <h3>Reward Distribution</h3>
              <div className="training-distribution__plot">
                <span /><span />
                <img className="ui-line-reveal--base" src={distributionSeriesUrl} alt="" />
                <img className="ui-line-reveal--active" src={distributionSeriesUrl} alt="" />
              </div>
              <div className="training-distribution__labels">
                {['0.050–0.100','0.150–0.200','0.250–0.300','0.350–0.400','0.450–0.500','0.550–0.600','0.650–0.700','0.750–0.800','0.850–0.900','0.950–1.000'].map(label => <span key={label}>{label}</span>)}
              </div>
            </section>
          </main>
          <aside className="training-details">
            <div className="training-details__top">
              <DetailPair label="Status" value="COMPLETED" />
              <DetailPair label="Duration" value="15h 13m 3s" />
            </div>
            <DetailPair label="Created At" value="2 days ago" />
            <DetailPair label="Model" value="Qwen/Qwen3-4B-Instruct-2507" />
            <div className="training-details__block">
              <span>Environments</span>
              <p>library&nbsp;&nbsp; v0.1.1</p><p>fitness_gym&nbsp;&nbsp; v0.1.1</p><p>tech_support&nbsp;&nbsp; v0.1.1</p>
            </div>
            <section className="training-details__section">
              <h3>Training</h3>
              <div className="training-details__columns">
                <div><DetailPair label="max_steps" value="100" /><DetailPair label="seq_len" value="65536" /><DetailPair label="max_tokens" value="1024" /></div>
                <div><DetailPair label="rollouts_per_example" value="8" /><DetailPair label="batch_size" value="256" /></div>
              </div>
            </section>
            <section className="training-details__section">
              <h3>Evaluations</h3>
              <div className="training-details__columns">
                <div><DetailPair label="interval" value="10" /><DetailPair label="rollouts_per_example" value="1" /><DetailPair label="environments" value="eligotillab/tau2-synth" /></div>
                <div><DetailPair label="num_examples" value="20" /><DetailPair label="eval_base_model" value="true" /></div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
