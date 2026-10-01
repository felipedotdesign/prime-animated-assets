import connectorUrl from '../assets/docker-connector.svg?url';
import activePromptUrl from '../assets/docker-prompt-active.svg?url';
import inactivePromptUrl from '../assets/docker-prompt-inactive.svg?url';
import activeStatusUrl from '../assets/docker-status-active.svg?url';
import inactiveStatusUrl from '../assets/docker-status-inactive.svg?url';
import { MOTION_TIMING } from './motionTiming';
import './DockerDiagram.css';

const virtualMachines = [
  { label: '0042', active: false },
  { label: '0043', active: true },
  { label: '0044', active: false },
];

export default function DockerDiagram({ className = '' }) {
  const classes = ['docker-diagram', className].filter(Boolean).join(' ');

  return (
    <figure
      className={classes}
      aria-label="Docker virtual machines"
      style={{
        '--docker-flow-delay': `${MOTION_TIMING.docker.flowDelay}ms`,
        '--docker-flow-duration': `${MOTION_TIMING.docker.flowDuration}ms`,
        '--docker-activation-duration': `${MOTION_TIMING.docker.activationDuration}ms`,
      }}
    >
      <div className="docker-diagram__items">
        <figcaption>Docker</figcaption>
        <div className="docker-diagram__topology">
          <div className="docker-diagram__connector" aria-hidden="true">
            <img src={connectorUrl} alt="" />
          </div>
          <div className="docker-diagram__machines">
            {virtualMachines.map((machine) => (
              <section
                className={`docker-diagram__machine${machine.active ? ' is-active' : ''}`}
                key={machine.label}
              >
                <header>
                  <span className="docker-diagram__status" aria-hidden="true">
                    <img src={inactiveStatusUrl} alt="" />
                    {machine.active ? <img className="is-active-asset" src={activeStatusUrl} alt="" /> : null}
                  </span>
                  <span className="docker-diagram__machine-label">{machine.label}</span>
                </header>
                <div className="docker-diagram__prompt">
                  <span aria-hidden="true">&gt;_</span>
                  <span className="docker-diagram__prompt-line" aria-hidden="true">
                    <img src={inactivePromptUrl} alt="" />
                    {machine.active ? <img className="is-active-asset" src={activePromptUrl} alt="" /> : null}
                  </span>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </figure>
  );
}
