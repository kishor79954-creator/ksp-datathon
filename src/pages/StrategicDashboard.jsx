import React from 'react';
import { getStrategicKPIs, getTrendData } from '../data/mockService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { AlertTriangle, TrendingUp, ShieldAlert, Users } from 'lucide-react';
import './StrategicDashboard.css';

const StrategicDashboard = () => {
  const kpis = getStrategicKPIs();
  const trendData = getTrendData();

  const renderKPI = (title, value, trend, icon, colorClass) => (
    <div className={`kpi-card glass-panel ${colorClass}`}>
      <div className="kpi-icon">{icon}</div>
      <div className="kpi-content">
        <h3>{title}</h3>
        <div className="kpi-val-row">
          <span className="kpi-value">{value}</span>
          <span className={`kpi-trend ${trend.startsWith('+') || trend === 'High' ? 'negative' : 'positive'}`}>
            {trend}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container animate-fade-in">
      <div className="dashboard-header">
        <h1>Strategic Intelligence Dashboard</h1>
        <p className="subtitle">Real-time overview of state-wide crime metrics and AI predictive alerts.</p>
      </div>

      <div className="kpi-grid">
        {renderKPI('Total Incidents (YTD)', kpis.totalIncidents.toLocaleString(), kpis.incidentsTrend, <ShieldAlert size={28} />, 'accent-blue')}
        {renderKPI('Active Hotspots', kpis.activeHotspots, kpis.hotspotsTrend, <AlertTriangle size={28} />, 'accent-red')}
        {renderKPI('Arrests Made', kpis.arrestsMade.toLocaleString(), kpis.arrestsTrend, <Users size={28} />, 'accent-green')}
        {renderKPI('State Risk Score', kpis.predictiveRiskScore, kpis.riskTrend, <TrendingUp size={28} />, 'accent-amber')}
      </div>

      <div className="charts-grid">
        <div className="chart-card glass-panel">
          <div className="card-header">
            <h3>Crime Trend vs AI Prediction</h3>
            <span className="badge-ai">AI Forecast Active</span>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Area type="monotone" dataKey="actual" stroke="#3b82f6" fillOpacity={1} fill="url(#colorActual)" name="Recorded Incidents" />
                <Area type="monotone" dataKey="predicted" stroke="#f59e0b" strokeDasharray="5 5" fillOpacity={1} fill="url(#colorPredicted)" name="AI Prediction" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="alerts-card glass-panel">
          <div className="card-header">
            <h3>System Anomalies</h3>
            <span className="badge-critical">3 Critical</span>
          </div>
          <div className="alerts-list">
            <div className="alert-item critical">
              <AlertTriangle className="alert-icon" size={18} />
              <div className="alert-info">
                <h4>Sudden Spike in Cyber Fraud</h4>
                <p>Bengaluru Urban - 45% increase in last 72 hours</p>
                <span className="time">10 mins ago</span>
              </div>
            </div>
            <div className="alert-item warning">
              <ShieldAlert className="alert-icon" size={18} />
              <div className="alert-info">
                <h4>Organized Retail Theft Suspected</h4>
                <p>Mysuru District - Correlated incidents across 3 stations</p>
                <span className="time">2 hours ago</span>
              </div>
            </div>
            <div className="alert-item warning">
              <TrendingUp className="alert-icon" size={18} />
              <div className="alert-info">
                <h4>Predictive Risk Elevated</h4>
                <p>Hubballi - High probability of unrest during weekend</p>
                <span className="time">5 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategicDashboard;
