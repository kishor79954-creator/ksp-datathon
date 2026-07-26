import React, { useRef, useEffect, useState, useCallback } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { getNetworkData, getComplexNetworkData, getHubballiData, getFinancialData } from '../data/mockService';
import { Network, ZoomIn, ZoomOut, Maximize, FileUp, FolderOpen, ChevronRight, Loader2, BrainCircuit } from 'lucide-react';
import './LinkAnalysis.css';

const INITIAL_CASES = [
  { id: 'c1', title: 'Operation Cyber Storm', date: '24 Jul 2026', type: 'Cyber Crime', status: 'Active' },
  { id: 'c2', title: 'Hubballi Smuggling Ring', date: '18 Jul 2026', type: 'Organized Crime', status: 'Active' },
  { id: 'c3', title: 'Financial Fraud Nexus', date: '02 Jun 2026', type: 'White Collar', status: 'Closed' }
];

// Map node types to legend colors
const NODE_COLORS = {
  Suspect: '#3b82f6', // Blue
  Organization: '#ef4444', // Red
  Location: '#f59e0b', // Amber/Yellow
  Victim: '#10b981', // Green
  Default: '#94a3b8'
};

const LinkAnalysis = () => {
  const fgRef = useRef();
  const fileInputRef = useRef(null);
  const [data, setData] = useState({ nodes: [], links: [] });
  const [windowWidth, setWindowWidth] = useState(800);
  
  const [cases, setCases] = useState(INITIAL_CASES);
  const [activeCaseId, setActiveCaseId] = useState('c1');
  
  const [importStatus, setImportStatus] = useState('idle'); 
  const [aiInsights, setAiInsights] = useState([
    { type: 'normal', text: 'Strong correlation detected between Ravi K. and Vehicle Theft Ring based on recent geolocation overlap.' },
    { type: 'warning', text: 'Unknown suspect node connected to 3 open FIRs in Mysuru.' }
  ]);
  
  // Custom force configuration for clean, widely spaced graph
  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.d3Force('charge').strength(-400);
      fgRef.current.d3Force('link').distance(60);
    }
  }, [data]);

  useEffect(() => {
    setData(getNetworkData());
    
    const updateSize = () => {
      const wrapper = document.querySelector('.network-wrapper');
      if (wrapper) setWindowWidth(wrapper.clientWidth);
    };
    window.addEventListener('resize', updateSize);
    setTimeout(updateSize, 100);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImportStatus('analyzing');
    
    setTimeout(() => {
      setImportStatus('extracting');
    }, 1500);

    setTimeout(() => {
      setImportStatus('building');
    }, 3000);

    setTimeout(() => {
      const newCaseId = `c_${Date.now()}`;
      const newCase = {
        id: newCaseId,
        title: file.name.replace(/\.[^/.]+$/, ""), 
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        type: 'AI Imported Analysis',
        status: 'Active'
      };

      setCases([newCase, ...cases]);
      setActiveCaseId(newCaseId);
      setData(getComplexNetworkData()); 
      
      setAiInsights([
        { type: 'warning', text: `AI extracted ${getComplexNetworkData().nodes.length} entities and ${getComplexNetworkData().links.length} hidden connections from ${file.name}.` },
        { type: 'normal', text: 'Massive shell corporation cluster detected transferring funds to offshore accounts.' },
        { type: 'normal', text: 'Identified 35 unknown aliases operating under Front Company X.' }
      ]);
      
      setImportStatus('success');
      
      setTimeout(() => {
        setImportStatus('idle');
        if (fgRef.current) fgRef.current.zoomToFit(1000);
      }, 2000);
      
    }, 4500);
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
        <div className="network-wrapper glass-panel">
          
          {importStatus !== 'idle' && importStatus !== 'success' && (
            <div className="ai-loading-overlay">
              <BrainCircuit size={48} className="pulse-icon ai-glow" />
              <h2>Nexus AI Engine</h2>
              <div className="loading-steps">
                <div className={`step ${importStatus === 'analyzing' || importStatus === 'extracting' || importStatus === 'building' ? 'active' : ''}`}>
                  <Loader2 className="spin" size={16}/> Analyzing Document via NLP...
                </div>
                <div className={`step ${importStatus === 'extracting' || importStatus === 'building' ? 'active' : ''}`}>
                  {importStatus === 'analyzing' ? <span className="wait"></span> : <Loader2 className="spin" size={16}/>} 
                  Extracting Entities & Locations...
                </div>
                <div className={`step ${importStatus === 'building' ? 'active' : ''}`}>
                  {importStatus === 'building' ? <Loader2 className="spin" size={16}/> : <span className="wait"></span>} 
                  Building Topological Network...
                </div>
              </div>
            </div>
          )}

          <div className="graph-legend">
            <h4>Node Types</h4>
            <div className="legend-item"><span className="node-color" style={{backgroundColor: NODE_COLORS.Suspect}}></span> Suspect / Person</div>
            <div className="legend-item"><span className="node-color" style={{backgroundColor: NODE_COLORS.Organization}}></span> Criminal Org</div>
            <div className="legend-item"><span className="node-color" style={{backgroundColor: NODE_COLORS.Location}}></span> Location</div>
            <div className="legend-item"><span className="node-color" style={{backgroundColor: NODE_COLORS.Victim}}></span> Target / Victim</div>
          </div>
          
          <ForceGraph2D
            ref={fgRef}
            width={windowWidth}
            height={700}
            graphData={data}
            nodeRelSize={4}
            linkColor={() => 'rgba(255, 255, 255, 0.25)'}
            linkWidth={1.5}
            linkDirectionalArrowLength={3.5}
            linkDirectionalArrowRelPos={1}
            d3AlphaDecay={0.02}
            d3VelocityDecay={0.1}
            
            // Draw link labels (relationship types)
            linkCanvasObjectMode={() => 'after'}
            linkCanvasObject={(link, ctx, globalScale) => {
              if (globalScale < 1.2) return; // Only show text when zoomed in
              
              const MAX_FONT_SIZE = 4;
              const LABEL_NODE_MARGIN = fgRef.current.zoom() * 1.5;
              
              const start = link.source;
              const end = link.target;
              if (typeof start !== 'object' || typeof end !== 'object') return; // ignore if not resolved

              const textPos = Object.assign(...['x', 'y'].map(c => ({
                [c]: start[c] + (end[c] - start[c]) / 2 
              })));

              const relLink = { x: end.x - start.x, y: end.y - start.y };
              let textAngle = Math.atan2(relLink.y, relLink.x);
              
              if (textAngle > Math.PI / 2) textAngle = -(Math.PI - textAngle);
              if (textAngle < -Math.PI / 2) textAngle = -(-Math.PI - textAngle);

              const fontSize = 12 / globalScale;
              ctx.font = `${Math.min(fontSize, MAX_FONT_SIZE)}px Inter`;
              const label = link.type || '';
              
              ctx.save();
              ctx.translate(textPos.x, textPos.y);
              ctx.rotate(textAngle);
              
              // Text background
              const textWidth = ctx.measureText(label).width;
              ctx.fillStyle = 'rgba(10, 11, 16, 0.8)';
              ctx.fillRect(-textWidth / 2 - 1, -fontSize / 2 - 1, textWidth + 2, fontSize + 2);
              
              // Text
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
              ctx.fillText(label, 0, 0);
              ctx.restore();
            }}

            // Draw clean nodes
            nodeCanvasObject={(node, ctx, globalScale) => {
              const label = node.name;
              const fontSize = Math.max(12 / globalScale, 2.5);
              const nodeColor = NODE_COLORS[node.type] || NODE_COLORS.Default;
              const nodeRadius = Math.min(Math.max((node.val || 5) / 3, 3), 10); // Clamped sizing so it never looks gross

              ctx.beginPath();
              ctx.arc(node.x, node.y, nodeRadius, 0, 2 * Math.PI, false);
              ctx.fillStyle = nodeColor;
              
              if (node.group === 4 || node.type === 'Organization') {
                 ctx.shadowColor = nodeColor;
                 ctx.shadowBlur = 10;
              }
              ctx.fill();
              ctx.shadowBlur = 0;
              
              // Draw text cleanly below the node
              if (globalScale >= 1.2 || nodeRadius > 5) {
                const textWidth = ctx.measureText(label).width;
                const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); 
                
                const textY = node.y + nodeRadius + (fontSize / 2) + 1;
                
                ctx.font = `${fontSize}px Inter`;
                ctx.fillStyle = 'rgba(10, 11, 16, 0.85)';
                ctx.fillRect(node.x - bckgDimensions[0] / 2, textY - fontSize / 2, bckgDimensions[0], bckgDimensions[1]);
                
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
                ctx.fillText(label, node.x, textY);
              }
            }}
          />
        </div>
        
        {/* RIGHT: Case Management Sidebar */}
        <div className="case-manager-sidebar glass-panel">
          
          <div className="sidebar-section">
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept=".csv,.json,.txt"
              onChange={handleFileChange}
            />
            <button 
              className={`import-btn ${importStatus !== 'idle' ? 'importing' : ''} ${importStatus === 'success' ? 'success' : ''}`} 
              onClick={handleImportClick}
              disabled={importStatus !== 'idle'}
            >
              {importStatus === 'idle' && <><FileUp size={20} /> Import Case Data (.CSV/.JSON)</>}
              {importStatus !== 'idle' && importStatus !== 'success' && <><BrainCircuit size={20} className="pulse-icon" /> AI Processing...</>}
              {importStatus === 'success' && 'Import Successful!'}
            </button>
          </div>

          <div className="sidebar-section">
            <h3 className="section-title"><FolderOpen size={18} /> Active Cases</h3>
            <div className="case-list">
              {cases.map(c => (
                <div 
                  key={c.id} 
                  className={`case-card ${activeCaseId === c.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCaseId(c.id);
                    if (c.id === 'c1') {
                      setData(getNetworkData());
                      setAiInsights([
                        { type: 'normal', text: 'Strong correlation detected between Ravi K. and Vehicle Theft Ring based on recent geolocation overlap.' },
                        { type: 'warning', text: 'Unknown suspect node connected to 3 open FIRs in Mysuru.' }
                      ]);
                    } else if (c.id === 'c2') {
                      setData(getHubballiData());
                      setAiInsights([
                        { type: 'warning', text: 'Multiple suspect drivers crossed Border Checkpoint simultaneously.' },
                        { type: 'normal', text: 'Logistics Co. identified as main front for smuggling operations.' }
                      ]);
                    } else if (c.id === 'c3') {
                      setData(getFinancialData());
                      setAiInsights([
                        { type: 'warning', text: 'Crypto Wallet X and Y linked to Mastermind.' },
                        { type: 'normal', text: 'Fake Call Center scammed Victim List A and B.' }
                      ]);
                    } else {
                      setData(getComplexNetworkData());
                    }
                    if (fgRef.current) setTimeout(() => fgRef.current.zoomToFit(400), 100);
                  }}
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
            {aiInsights.map((insight, idx) => (
              <div key={idx} className={`insight-card ${insight.type === 'warning' ? 'warning' : ''}`}>
                <p>{insight.text}</p>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default LinkAnalysis;
