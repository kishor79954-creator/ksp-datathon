import React from 'react';
import { getSocioEconomicData } from '../data/mockService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';
import { TrendingUp, Users, MapPin } from 'lucide-react';
import './PredictiveIntelligence.css';

const PredictiveIntelligence = () => {
  const data = getSocioEconomicData();

  return (
    <div className="predictive-container animate-fade-in">
      <div className="predictive-header">
        <h1>Predictive Intelligence & Sociological Correlation</h1>
        <p className="subtitle">Understanding the "why" behind the "where" using socio-economic indicators.</p>
      </div>

      <div className="predictive-grid">
        <div className="chart-panel glass-panel">
          <div className="panel-header">
            <h3>Crime Rate vs Unemployment Rate</h3>
            <span className="ai-tag">Correlation: 0.82 (High)</span>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="district" stroke="#94a3b8" />
                <YAxis yAxisId="left" orientation="left" stroke="#ef4444" />
                <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" />
                <RechartsTooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} />
                <Legend />
                <Bar yAxisId="left" dataKey="crimeRate" name="Crime Rate Index" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="unemployment" name="Unemployment (%)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-panel glass-panel">
          <div className="panel-header">
            <h3>Population Density vs Incident Frequency</h3>
            <span className="ai-tag">Cluster Analysis</span>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" dataKey="populationDensity" name="Pop Density (per sq km)" stroke="#94a3b8" />
                <YAxis type="number" dataKey="crimeRate" name="Crime Rate" stroke="#94a3b8" />
                <ZAxis type="category" dataKey="district" name="District" />
                <RechartsTooltip cursor={{strokeDasharray: '3 3'}} />
                <Legend />
                <Scatter name="Districts" data={data} fill="#10b981" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="insights-panel glass-panel">
        <h3>Sociological AI Insights</h3>
        <div className="insights-grid">
          <div className="insight-card-large">
            <div className="icon-wrapper bg-blue"><Users size={24} /></div>
            <div className="insight-content">
              <h4>Urbanization Impact</h4>
              <p>Rapid urbanization in Bengaluru Urban correlates strongly with a 15% YoY increase in cyber and financial crimes. Traditional violent crimes remain statistically stable.</p>
            </div>
          </div>
          <div className="insight-card-large">
            <div className="icon-wrapper bg-red"><TrendingUp size={24} /></div>
            <div className="insight-content">
              <h4>Unemployment Spike</h4>
              <p>A recent 1.2% spike in localized unemployment in Hubballi region shows a predictive leading indicator for property-related offenses in the next 30-60 days.</p>
            </div>
          </div>
          <div className="insight-card-large">
            <div className="icon-wrapper bg-green"><MapPin size={24} /></div>
            <div className="insight-content">
              <h4>Resource Allocation</h4>
              <p>Based on current socio-economic trends, reallocating 12% of patrol units to Tier-2 expanding cities (Mysuru, Mangaluru) is recommended to prevent emerging hotspots.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveIntelligence;
