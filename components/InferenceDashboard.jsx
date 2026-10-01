'use client';

import { useEffect, useState } from 'react';
import chevronDownUrl from '../assets/ui/inference-chevron-down-medium.svg?url';
import chevronTopUrl from '../assets/ui/inference-chevron-top-medium.svg?url';
import UiSidebar from './UiSidebar';
import { MOTION_TIMING } from './motionTiming';
import './UiScreens.css';

const MAX_BACKGROUND_UPDATES = 30;
const INITIAL_SUCCESS_RATE = 88;
const MAX_SUCCESS_RATE = 99;
const SUCCESS_RATE_STEP = 0.5;

const adapters = [
  'All LoRA adapters',
  'meta-llama/Llama-3.2-3B-Instruct:b8jqe3m0xi18u6xdsrdx2029',
  'meta-llama/Llama-3.2-3B-Instruct:fv0c7ay8lleoylpcgtzmq8dn',
  'meta-llama/Llama-3.2-3B-Instruct:g6gnbz19a41qorjrols4budd',
  'nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B-BF16:vpczm7ggrqhy2yuih5l0147z',
  'poolside/Laguna-XS-2:kc1201qryvwio36iv1jwm3sva',
  'poolside/Laguna-XS-2:mbv389lt4nhmskrb72m584j0',
  'Qwen/Qwen3.5-0.8B:f3wavnrl1fsvos4kegj1kqyu7',
  'Qwen/Qwen3.5-4B:cbpmmm807ixmbaplg99h08ht',
  'Qwen/Qwen3.5-4B:um000zj2b0kdft94e6pbike5',
];

function SelectBox({ children, open = false }) {
  return <div className={`inference-select${open ? ' is-open' : ''}`}><span>{children}</span><img src={open ? chevronTopUrl : chevronDownUrl} alt="" /></div>;
}

function Metric({ label, value }) {
  return <section className="inference-metric"><span>{label}</span><strong>{value}</strong></section>;
}

export default function InferenceDashboard() {
  const [requests, setRequests] = useState(0);
  const [successRate, setSuccessRate] = useState(INITIAL_SUCCESS_RATE);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const interval = window.setInterval(() => {
      setRequests((value) => {
        const nextValue = Math.min(value + 1, MAX_BACKGROUND_UPDATES);
        if (nextValue === MAX_BACKGROUND_UPDATES) window.clearInterval(interval);
        return nextValue;
      });
    }, MOTION_TIMING.inferenceUi.requestInterval);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const interval = window.setInterval(() => {
      setSuccessRate((value) => {
        const nextValue = Math.min(value + SUCCESS_RATE_STEP, MAX_SUCCESS_RATE);
        if (nextValue === MAX_SUCCESS_RATE) window.clearInterval(interval);
        return nextValue;
      });
    }, MOTION_TIMING.inferenceUi.successRateInterval);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="ui-screen inference-screen">
      <UiSidebar />
      <div className="inference-app">
        <header className="inference-heading"><h2>Inference</h2><p>Observe inference traffic and manage your deployed LoRA adapters.</p></header>
        <nav className="inference-tabs"><span className="is-active">Overview</span><span>Deployments</span></nav>
        <main className="inference-content">
          <section className="inference-filters">
            <label><span>Time Range</span><SelectBox>Last 24h</SelectBox></label>
            <label><span>Base Model</span><SelectBox>All deployed LoRA base models</SelectBox></label>
            <label className="inference-adapter"><span>Deployed LoRA Adapter</span><SelectBox open>All LoRA adapters</SelectBox>
              <div className="inference-menu">
                {adapters.map((adapter, index) => <div key={adapter} className={index === 0 ? 'is-current' : ''}>{adapter}</div>)}
              </div>
            </label>
          </section>
          <div className="inference-metrics">
            <Metric label="Requests" value={requests} /><Metric label="Success Rate" value={`${successRate.toFixed(1)}%`} />
            <Metric label="p95 Total Latency" value="--" /><Metric label="Errors" value="0" />
          </div>
          <section className="inference-requests"><h3>Requests Over Time</h3><p>Hourly successful, errored, and throttled request counts</p></section>
        </main>
      </div>
    </div>
  );
}
