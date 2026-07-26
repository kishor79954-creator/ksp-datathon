import React, { useRef, useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { getNetworkData } from '../data/mockService';
import { Network, ZoomIn, ZoomOut, Maximize, FileUp, FolderOpen, ChevronRight } from 'lucide-react';
import './LinkAnalysis.css';

const MOCK_CASES = [
  { id: 'c1', title: 'Operation Cyber Storm', date: '24 Jul 2026', type: 'Cyber Crime', status: 'Active' },
  { id: 'c2', title: 'Hubballi Smuggling Ring', date: '18 Jul 2026', type: 'Organized Crime', status: 'Active' },
  { id: 'c3', title: 'Financial Fraud Nexus', date: '02 Jun 2026', type: 'White Collar', status: 'Closed' }
];

const LinkAnalysis = () => {
  const fgRef = useRef();
  const [data, setData] = useState({ nodes: [], links: [] });
  const [windowWidth, setWindowWidth] = useState(800);
  const [activeCaseId, setActiveCaseId] = useState('c1');
  const [isImporting, setIsImporting] = useState(false);
  
  useEffect(() => {
    setData(getNetworkData());
    
    const updateSize = () => {
      const wrapper = document.querySelector('.network-wrapper');
      if (wrapper) setWindowWidth(wrapper.clientWidth);
    };
    window.addEventListener('resize', updateSize);
    // Initial size
    setTimeout(updateSize, 100);
    
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleImport = () => {
    setIsImporting(true);
    setTimeout(() => setIsImporting(false), 1500); // Mock import delay
  };

  return (
    <div className="network-container animate-fade-in">
      <div className="network-header">
        <div>
          <h1>Criminological Link Analysis</h1>
          <p className="subtitle">Discover organized crime structures and Modus Operandi (MO) connections.</p>
        </div>
        <div className="network-controls">
          <button className="control-btn icon-only" onClick={() => fgRef.current.zoom(fgRef.current.zoom() * 1.2, 400)}><ZoomIn size={16} /></button>
          <button className="control-btn icon-only" onClick={() => fgRef.current.zoom(fgRef.current.zoom() / 1.2, 400)}><ZoomOut size={16} /></button>
          <button className="control-btn icon-only" onClick={() => fgRef.current.zoomToFit(400)}><Maximize size={16} /></button>
        </div>
      </div>

      <div className="network-content">
        {/* LEFT: The Graph */}
        <div className="network-wrapper glass-panel">
          <div className="graph-legend">
            <h4>Node Types</h4>
            <div className="legend-item"><span className="node-color person"></span> Suspect / Person</div>
            <div className="legend-item"><span className="node-color case"></span> Criminal Org</div>
            <div className="legend-item"><span className="node-color location"></span> Location</div>
          </div>
          
          <ForceGraph2D
            ref={fgRef}
            width={windowWidth}
            height={700}
            graphData={data}
            nodeAutoColorBy="group"
            nodeRelSize={6}
            linkColor={() => 'rgba(255, 255, 255, 0.15)'}
            linkWidth={1.5}
            linkDirectionalParticles={2}
            linkDirectionalParticleSpeed={0.005}
            nodeCanvasObject={(node, ctx, globalScale) => {
              const label = node.name;
              const fontSize = 12 / globalScale;
              ctx.font = `${fontSize}px Inter`;
              
              ctx.beginPath();
              ctx.arc(node.x, node.y, node.val / 1.5, 0, 2 * Math.PI, false);
              ctx.fillStyle = node.color;
              
              if (node.group === 4) {
                 ctx.shadowColor = node.color;
                 ctx.shadowBlur = 15;
              }
              ctx.fill();
              ctx.shadowBlur = 0;

              const textWidth = ctx.measureText(label).width;
              const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); 
              ctx.fillStyle = 'rgba(10, 11, 16, 0.85)';
              ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y + node.val / 1.5 + 4, bckgDimensions[0], bckgDimensions[1]);
              
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
              ctx.fillText(label, node.x, node.y + node.val / 1.5 + 4 + fontSize / 2);
            }}
          />
        </div>
        
        {/* RIGHT: Case Management Sidebar */}
        <div className="case-manager-sidebar glass-panel">
          
          <div className="sidebar-section">
            <button className={`import-btn ${isImporting ? 'importing' : ''}`} onClick={handleImport}>
              <FileUp size={20} />
              {isImporting ? 'Importing Data...' : 'Import Case Data (.CSV/.JSON)'}
            </button>
          </div>

          <div className="sidebar-section">
            <h3 className="section-title"><FolderOpen size={18} /> Active Cases</h3>
            <div className="case-list">
              {MOCK_CASES.map(c => (
                <div 
                  key={c.id} 
                  className={`case-card ${activeCaseId === c.id ? 'active' : ''}`}
                  onClick={() => setActiveCaseId(c.id)}
                >
                  <div className="case-info">
                    <h4>{c.title}</h4>
                    <div className="case-meta">
                      <span className="case-type">{c.type}</span>
                      <span className="case-date">{c.date}</span>
                    </div>
                  </div>
                  <ChevronRight size={18} className="case-arrow" />
                </div>
              ))}
            </div>
          </div>

          <div className="mo-insights">
            <h4><Network size={18} /> AI Graph Insights</h4>
            <div className="insight-card">
              <p>Strong correlation detected between <strong>Ravi K.</strong> and <strong>Vehicle Theft Ring</strong> based on recent geolocation overlap.</p>
            </div>
            <div className="insight-card warning">
              <p>Unknown suspect node connected to 3 open FIRs in <strong>Mysuru</strong>.</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default LinkAnalysis;
