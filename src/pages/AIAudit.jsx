import React from 'react';
import { getAIFairnessData } from '../data/mockService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
import { ShieldAlert, Fingerprint, Eye, Target } from 'lucide-react';
import './AIAudit.css';

const AIAudit = () => {
  const data = getAIFairnessData();

  return (
    <div className="audit-container animate-fade-in">
      <div className="audit-header">
        <h1>AI Fairness & Bias Auditing</h1>
        <p className="subtitle">Model Explainability dashboard addressing the "Black Box" problem and preventing algorithmic bias.</p>
      </div>

      <div className="audit-kpis">
        <div className="audit-kpi-card glass-panel">
          <Fingerprint className="kpi-icon text-cyan" size={32} />
          <div className="kpi-info">
            <h3>Model Transparency Score</h3>
            <span className="kpi-val">94 / 100</span>
          </div>
        </div>
        <div className="audit-kpi-card glass-panel">
          <ShieldAlert className="kpi-icon text-amber" size={32} />
          <div className="kpi-info">
            <h3>Demographic Parity Bias Risk</h3>
            <span className="kpi-val text-amber">Medium Risk</span>
          </div>
        </div>
      </div>

      <div className="audit-grid">
        <div className="audit-panel glass-panel">
          <div className="panel-header">
            <div className="header-title">
              <Eye size={20} className="text-cyan" />
              <h3>Feature Importance (SHAP Values)</h3>
            </div>
            <span className="explain-tag">Explainable AI</span>
          </div>
          <p className="panel-desc">Identifies which data points are driving the AI's predictive risk scores.</p>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={data.featureImportance} margin={{ top: 10, right: 30, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="feature" type="category" stroke="#f8fafc" width={120} tick={{ fontSize: 12 }} />
                <RechartsTooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} />
                <Bar dataKey="importance" radius={[0, 4, 4, 0]}>
                  {data.featureImportance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.biasRisk === 'High' ? '#ef4444' : entry.biasRisk === 'Medium' ? '#f59e0b' : '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="legend-row">
             <span className="legend-item"><span className="dot bg-blue"></span> Neutral Feature</span>
             <span className="legend-item"><span className="dot bg-amber"></span> Monitor for Bias</span>
             <span className="legend-item"><span className="dot bg-red"></span> High Bias Risk (e.g. Historical Arrests)</span>
          </div>
        </div>

        <div className="audit-panel glass-panel">
          <div className="panel-header">
            <div className="header-title">
              <Target size={20} className="text-purple" />
              <h3>Demographic Parity Check</h3>
            </div>
          </div>
          <p className="panel-desc">Comparing AI predicted risk vs actual incident rates across demographics.</p>
          
          <div className="parity-comparison">
            {data.demographicParity.map((group, idx) => (
              <div className="parity-card" key={idx}>
                <h4>{group.group}</h4>
                <div className="bar-row">
                  <span className="label">Predicted Risk:</span>
                  <div className="bar-bg">
                    <div className="bar-fill bg-amber" style={{width: `${group.predictedRisk}%`}}></div>
                  </div>
                  <span className="val">{group.predictedRisk}</span>
                </div>
                <div className="bar-row">
                  <span className="label">Actual Incidents:</span>
                  <div className="bar-bg">
                    <div className="bar-fill bg-cyan" style={{width: `${group.actualIncidentRate}%`}}></div>
                  </div>
                  <span className="val">{group.actualIncidentRate}</span>
                </div>
                
                {group.predictedRisk > group.actualIncidentRate + 15 && (
                  <div className="bias-alert">
                    <ShieldAlert size={14} />
                    <span>Algorithm Over-Policing Warning: Predicted risk exceeds actual incident baseline by {group.predictedRisk - group.actualIncidentRate} points.</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAudit;
