import React, { useRef, useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { getNetworkData } from '../data/mockService';
import { Network, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import './LinkAnalysis.css';

const LinkAnalysis = () => {
  const fgRef = useRef();
  const [data, setData] = useState({ nodes: [], links: [] });
  const [windowWidth, setWindowWidth] = useState(800); // Default placeholder
  
  useEffect(() => {
    setData(getNetworkData());
    
    // Quick resize handler
    const updateSize = () => {
      const wrapper = document.querySelector('.network-wrapper');
      if (wrapper) setWindowWidth(wrapper.clientWidth);
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    
    return () => window.removeEventListener('resize', updateSize);
  }, []);

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
          <ForceGraph2D
            ref={fgRef}
            width={windowWidth}
            height={600}
            graphData={data}
            nodeAutoColorBy="group"
            nodeRelSize={6}
            linkColor={() => 'rgba(255, 255, 255, 0.2)'}
            linkWidth={1.5}
            linkDirectionalParticles={2}
            linkDirectionalParticleSpeed={0.005}
            nodeCanvasObject={(node, ctx, globalScale) => {
              const label = node.name;
              const fontSize = 12 / globalScale;
              ctx.font = `${fontSize}px Inter`;
              
              // Draw node
              ctx.beginPath();
              ctx.arc(node.x, node.y, node.val / 2, 0, 2 * Math.PI, false);
              ctx.fillStyle = node.color;
              ctx.fill();
              
              // Add glow for main suspects/orgs
              if (node.group === 4) {
                 ctx.shadowColor = node.color;
                 ctx.shadowBlur = 15;
                 ctx.fill();
                 ctx.shadowBlur = 0;
              }

              // Draw label background
              const textWidth = ctx.measureText(label).width;
              const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); 
              ctx.fillStyle = 'rgba(11, 15, 25, 0.8)';
              ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y + node.val / 2 + 2, bckgDimensions[0], bckgDimensions[1]);
              
              // Draw text
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
              ctx.fillText(label, node.x, node.y + node.val / 2 + 2 + fontSize / 2);
            }}
          />
        </div>
        
        <div className="network-sidebar glass-panel">
          <h3>Entity Relationships</h3>
          <p className="sidebar-desc">Select a node in the graph to view detailed MO associations.</p>
          
          <div className="entity-legend">
            <h4>Node Types</h4>
            <ul>
              <li><span className="dot" style={{background: '#3b82f6'}}></span> Suspect</li>
              <li><span className="dot" style={{background: '#10b981'}}></span> Victim / Target</li>
              <li><span className="dot" style={{background: '#f59e0b'}}></span> Location</li>
              <li><span className="dot" style={{background: '#ef4444'}}></span> Criminal Org</li>
            </ul>
          </div>
          
          <div className="mo-insights">
            <h4>AI Insights</h4>
            <div className="insight-card">
              <Network size={16} className="insight-icon" />
              <p>Strong correlation detected between <strong>Ravi K.</strong> and <strong>Vehicle Theft Ring</strong> based on recent geolocation overlap.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkAnalysis;
