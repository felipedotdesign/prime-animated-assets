import providerUrl from '../assets/ui/inference-provider.svg?url';
import UiSidebar from './UiSidebar';
import './UiScreens.css';

const models = [
  { name: 'GLM 5.3', slug: 'z-ai/glm-5.3', type: 'Hosted', input: '$1.40', output: '$4.40', selected: true, logo: true },
  { name: 'Qwen3.5-122B-A10B', slug: 'Qwen/Qwen3.5-122B-A10B', type: 'Hosted', input: '$0.30', output: '$0.90', logo: true },
  { name: 'Qwen3.5-0.8B', slug: 'Qwen/Qwen3.5-0.8B', type: 'Hosted', input: '$0.04', output: '$0.08', logo: true },
  { name: 'Qwen3.5-2B', slug: 'Qwen/Qwen3.5-2B', type: 'Hosted', input: '$0.06', output: '$0.18', logo: true },
  { name: 'Qwen3.5-4B', slug: 'Qwen/Qwen3.5-4B', type: 'Hosted', input: '$0.10', output: '$0.30', logo: true },
  { name: 'Qwen3.5-9B', slug: 'Qwen/Qwen3.5-9B', type: 'Hosted', input: '$0.18', output: '$0.54', logo: true },
  { name: 'Grok 4.7', slug: 'x-ai/grok-4.7', type: 'Gateway', input: '$1.60', output: '$4.80' },
  { name: 'GPT-6 Luna', slug: 'openai/gpt-6-luna', type: 'Gateway', input: '$0.10', output: '$0.50' },
];

function ModelIdentity({ model, detail = false }) {
  return (
    <div className={`inference-model-identity${detail ? ' is-detail' : ''}`}>
      <span className="inference-provider-logo">
        {model.logo ? <img src={providerUrl} alt="" /> : null}
      </span>
      <span className="inference-model-names">
        <strong>{model.name}</strong>
        <small>{model.slug}</small>
      </span>
    </div>
  );
}

export default function InferenceDashboard() {
  const selectedModel = models[0];

  return (
    <div className="ui-screen inference-screen">
      <UiSidebar variant="inference" selected="activity" />
      <div className="inference-app">
        <header className="inference-heading"><h2>Inference</h2><p>Observe inference traffic and manage your deployed LoRA adapters.</p></header>
        <nav className="inference-tabs"><span className="is-active">Models</span><span>Dedicated Endpoints</span><span>LoRA Adapters</span></nav>
        <main className="inference-workspace">
          <section className="inference-browser">
            <div className="inference-search">Search models...</div>
            <div className="inference-table-head">
              <span>Model</span><span>Type</span><span>Input $/M</span><span>Output $/M</span>
            </div>
            <div className="inference-model-list">
              {models.map((model, index) => (
                <article
                  key={model.slug}
                  className={`inference-model-row${model.selected ? ' is-selected' : ''}`}
                  style={{ '--inference-row-index': index }}
                >
                  <ModelIdentity model={model} />
                  <span><b className={`inference-model-type${model.type === 'Gateway' ? ' is-gateway' : ''}`}>{model.type}</b></span>
                  <span className="inference-model-price">{model.input}</span>
                  <span className="inference-model-price">{model.output}</span>
                </article>
              ))}
            </div>
          </section>
          <aside className="inference-details">
            <section className="inference-details__model">
              <ModelIdentity model={selectedModel} detail />
              <b className="inference-model-type">Hosted</b>
            </section>
            <section className="inference-details__section">
              <h3>PRICING</h3>
              <div className="inference-detail-grid">
                <div><span>Input</span><strong>$4.40 <small>/Mtok</small></strong></div>
                <div><span>Output</span><strong>$4.40 <small>/Mtok</small></strong></div>
              </div>
              <div className="inference-detail-stack"><span>Prices effective since</span><strong>Aug 20, 2026</strong></div>
            </section>
            <section className="inference-details__section">
              <h3>SPECIFICATIONS</h3>
              <div className="inference-detail-grid">
                <div><span>Context window</span><strong>1M</strong></div>
                <div><span>Max output tokens</span><strong>131K</strong></div>
              </div>
              <div className="inference-detail-stack"><span>Modalities</span><strong>T - T</strong></div>
              <div className="inference-detail-stack"><span>Reasoning</span><strong>Yes</strong></div>
            </section>
          </aside>
        </main>
      </div>
    </div>
  );
}
