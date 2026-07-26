import React from 'react';
import { getJusticePipelineData } from '../data/mockService';
import { Scale, FileText, UserMinus, FileSignature, Gavel, CheckCircle, XCircle } from 'lucide-react';
import './JusticePipeline.css';

const JusticePipeline = () => {
  const data = getJusticePipelineData();
  // Using a custom beautiful funnel/pipeline UI for the Justice flow.
  
  return (
    <div className="pipeline-container animate-fade-in">
      <div className="pipeline-header">
        <h1>Justice Pipeline & Prosecution Analytics</h1>
        <p className="subtitle">Visualizing case progression from FIR Registration (`CaseMaster`) to Court Outcome (`ChargesheetDetails`, `Court`).</p>
      </div>

      <div className="pipeline-visual glass-panel">
        <div className="pipeline-stage">
          <div className="stage-icon-box"><FileText size={24} /></div>
          <div className="stage-info">
            <h3>FIR Registered</h3>
            <span className="stage-count">10,000 Cases</span>
          </div>
        </div>

        <div className="pipeline-connector">
          <div className="line main-line"></div>
          <div className="line drop-line"></div>
          <div className="drop-stat">35% Closed (Lack of Evidence)</div>
        </div>

        <div className="pipeline-stage">
          <div className="stage-icon-box"><UserMinus size={24} /></div>
          <div className="stage-info">
            <h3>Arrest / Surrender</h3>
            <span className="stage-count">6,500 Cases</span>
          </div>
        </div>

        <div className="pipeline-connector">
          <div className="line main-line"></div>
          <div className="line drop-line"></div>
          <div className="drop-stat">15% Released without Charge</div>
        </div>

        <div className="pipeline-stage">
          <div className="stage-icon-box"><FileSignature size={24} /></div>
          <div className="stage-info">
            <h3>Charge Sheet Filed</h3>
            <span className="stage-count">5,525 Cases</span>
          </div>
        </div>

        <div className="pipeline-connector">
          <div className="line main-line"></div>
        </div>

        <div className="pipeline-stage">
          <div className="stage-icon-box"><Gavel size={24} /></div>
          <div className="stage-info">
            <h3>Court Trial</h3>
            <span className="stage-count">5,525 Cases</span>
          </div>
        </div>

        <div className="pipeline-split">
          <div className="split-branch success">
            <div className="stage-icon-box"><CheckCircle size={24} /></div>
            <div className="stage-info">
              <h3>Conviction</h3>
              <span className="stage-count">2,000 Cases (36%)</span>
            </div>
          </div>
          <div className="split-branch failure">
            <div className="stage-icon-box"><XCircle size={24} /></div>
            <div className="stage-info">
              <h3>Acquittal</h3>
              <span className="stage-count">3,525 Cases (64%)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pipeline-insights glass-panel">
        <h3>Pipeline Bottleneck Analysis</h3>
        <p><strong>Primary Insight:</strong> A 35% drop-off occurs between FIR Registration and Arrest due to insufficient initial evidence mapping in the `ActSectionAssociation` table.</p>
        <p><strong>Recommendation:</strong> Mandate digital evidence linking at the point of FIR creation to improve the charge-sheeting ratio.</p>
      </div>
    </div>
  );
};

export default JusticePipeline;
