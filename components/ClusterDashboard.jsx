import zapUrl from '../assets/ui/cluster-zap.svg?url';
import chartGreenUrl from '../assets/ui/cluster-reward-curve.svg?url';
import chartPurpleUrl from '../assets/ui/cluster-reward-curve1.svg?url';
import { MOTION_TIMING } from './motionTiming';
import './UiScreens.css';

const workloads = [
  ['INFERENCE', 'qwen3-6-35b-a3b-9e14', 'telus-canada · Qwen3.6-35B A3B · 1 minute ago'],
  ['TRAINING', 'glm45air-swe-sandbox-retest', 'telus-canada · zg-gpu/GLM-4.5-Air · 17 minutes ago'],
  ['TRAINING', 'smoke-alphabet-sot-1', 'telus-canada · Qwen/Qwen3-4B-Instruct-2507 · Jannik · 26 minutes ago'],
  ['TRAINING', 'glm52-sigmoid-8node-fixcompile', 'telus-canada · zg-gpu/GLM-5.2 · Jannik · 31 minutes ago'],
  ['INFERENCE', 'glm-inference-test', 'telus-canada · GLM 5.3 · about 15 hours ago'],
];

const metrics = [
  ['Requests', '1.017', ''], ['Time to first token', '70', 'ms · 79 ms'], ['Input tokens', '17.288', ''],
  ['Output tokens', '173.898', ''], ['Throughput', '0.19', 'tok/s'],
];

export default function ClusterDashboard() {
  return (
    <div
      className="ui-screen cluster-screen"
      style={{
        '--ui-line-delay': `${MOTION_TIMING.ui.lineDelay}ms`,
        '--ui-line-duration': `${MOTION_TIMING.ui.lineDuration}ms`,
      }}
    >
      <section className="cluster-capacity">
        <div className="cluster-actions">
          {['Start Training','Deploy Slurm','Deploy Inference','Kubernetes Access'].map(action => <button key={action} type="button">{action}</button>)}
        </div>
        <div className="cluster-stats">
          <div><span>GPU utilization</span><strong>1610<i>/1731</i></strong><b style={{ '--cluster-progress': 1610 / 1731 }} /></div>
          <div><span>Node health</span><strong>217<i>/240</i></strong><b style={{ '--cluster-progress': 217 / 240 }} /></div>
          <div><span>Running workloads</span><strong>7</strong></div>
        </div>
      </section>
      <section className="cluster-workloads">
        <h3>Workloads</h3>
        <div className="cluster-workload-list">
          {workloads.map(([type, title, meta]) => (
            <div className="cluster-workload" key={title}>
              <div className="cluster-workload__icon"><img src={zapUrl} alt="" /></div>
              <div><p><span>{type}</span><b>{title}</b></p><small>{meta}</small></div>
            </div>
          ))}
        </div>
      </section>
      <section className="cluster-serving">
        <h3>Serving Metrics</h3>
        <div className="cluster-metrics">
          {metrics.map(([label, value, unit]) => <div key={label}><span>{label}</span><p>{value}<small>{unit}</small></p></div>)}
        </div>
        <div className="cluster-charts">
          <div>
            <img className="ui-line-reveal--base" src={chartGreenUrl} alt="" />
            <img className="ui-line-reveal--active" src={chartGreenUrl} alt="" />
          </div>
          <div>
            <img className="ui-line-reveal--base" src={chartPurpleUrl} alt="" />
            <img className="ui-line-reveal--active" src={chartPurpleUrl} alt="" />
          </div>
        </div>
      </section>
    </div>
  );
}
