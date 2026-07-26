import React, { useState } from 'react';
import { Upload, Scan, Crosshair, Activity, CheckCircle, Fingerprint, RefreshCw } from 'lucide-react';
import './Forensics.css';

import fpOrig from '../assets/fp_orig.png';
import fpRecon from '../assets/fp_recon.png';
import weaponImg from '../assets/weapon.png';

const Forensics = () => {
  const [activeTab, setActiveTab] = useState('fingerprint');
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultReady, setResultReady] = useState(false);
  const [progressText, setProgressText] = useState('');

  const tabs = [
    { id: 'fingerprint', label: 'Fingerprint Reconstruction', icon: <Fingerprint size={18} /> },
    { id: 'weapon', label: 'Weapon Detection (YOLO)', icon: <Crosshair size={18} /> },
    { id: 'har', label: 'Human Activity Recognition', icon: <Activity size={18} /> }
  ];

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResultReady(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setResultReady(false);
    }
  };

  const runAnalysis = () => {
    if (!file) return;
    setIsProcessing(true);
    setResultReady(false);
    
    // Simulate AI pipeline
    setProgressText('Extracting latent space vectors...');
    setTimeout(() => {
      setProgressText(activeTab === 'fingerprint' ? 'Running GAN Reconstruction...' : 'Running Deep Inference Model...');
      setTimeout(() => {
        setIsProcessing(false);
        setResultReady(true);
      }, 1500);
    }, 1000);
  };

  const reset = () => {
    setFile(null);
    setResultReady(false);
    setIsProcessing(false);
  };

  return (
    <div className="forensics-container animate-fade-in">
      <div className="forensics-header">
        <h1>Multimodal Crime Scene Analysis</h1>
        <p className="subtitle">AI-powered forensic investigation suite featuring GAN-based fingerprint reconstruction and real-time YOLO object detection.</p>
      </div>

      <div className="forensics-tabs">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => { setActiveTab(tab.id); reset(); }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="forensics-workspace glass-panel">
        {!file && (
          <div 
            className="upload-zone"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <Upload size={48} className="text-cyan mb-4" />
            <h3>Drag & Drop Crime Scene Media</h3>
            <p className="text-muted mb-4">Supports .jpg, .png, .mp4, and .avi</p>
            <label className="upload-btn">
              Browse Files
              <input type="file" hidden onChange={handleFileUpload} accept="image/*,video/*" />
            </label>
          </div>
        )}

        {file && !isProcessing && !resultReady && (
          <div className="preview-state">
            <div className="preview-media">
              {activeTab === 'fingerprint' && <img src={fpOrig} alt="Original Fingerprint" className="preview-img grayscale-blur" />}
              {activeTab === 'weapon' && <img src={weaponImg} alt="Crime Scene" className="preview-img" />}
              {activeTab === 'har' && <img src={weaponImg} alt="Crime Scene" className="preview-img" />}
            </div>
            <div className="preview-actions">
              <span className="file-name">{file.name}</span>
              <button className="run-btn" onClick={runAnalysis}>
                <Scan size={18} /> Run AI Analysis
              </button>
              <button className="text-btn text-muted" onClick={reset}>Cancel</button>
            </div>
          </div>
        )}

        {isProcessing && (
          <div className="processing-state">
            <div className="scanner-container">
              <div className="scanner-line"></div>
              {activeTab === 'fingerprint' && <img src={fpOrig} alt="Scanning" className="preview-img grayscale-blur" />}
              {activeTab !== 'fingerprint' && <img src={weaponImg} alt="Scanning" className="preview-img" />}
            </div>
            <div className="loading-spinner mt-6">
              <RefreshCw size={24} className="spin text-cyan" />
              <span className="font-mono">{progressText}</span>
            </div>
          </div>
        )}

        {resultReady && (
          <div className="result-state animate-fade-in">
            <div className="result-header">
              <CheckCircle size={24} className="text-green" />
              <h3>Analysis Complete</h3>
              <button className="text-btn ml-auto" onClick={reset}>New Analysis</button>
            </div>
            
            <div className="result-body">
              {activeTab === 'fingerprint' && (
                <div className="comparison-view">
                  <div className="comp-panel">
                    <h4>Original Input</h4>
                    <img src={fpOrig} alt="Original" />
                    <span className="metric text-red">Quality Score: 12%</span>
                  </div>
                  <div className="comp-panel">
                    <h4>Reconstructed Output (Autoencoder)</h4>
                    <img src={fpRecon} alt="Reconstructed" />
                    <span className="metric text-green">Quality Score: 94%</span>
                  </div>
                </div>
              )}

              {activeTab === 'weapon' && (
                <div className="detection-view">
                  <div className="img-wrapper">
                    <img src={weaponImg} alt="Weapon Detection" />
                    {/* Simulated Bounding Box */}
                    <div className="bounding-box">
                      <span className="box-label">Handgun - 97.8%</span>
                    </div>
                  </div>
                  <div className="detection-stats">
                    <div className="stat-card">
                      <span className="stat-label">Model</span>
                      <span className="stat-val">YOLO-NAS (mAP: 77.8%)</span>
                    </div>
                    <div className="stat-card">
                      <span className="stat-label">Detected Objects</span>
                      <span className="stat-val text-red">1 Critical Threat</span>
                    </div>
                    <div className="stat-card">
                      <span className="stat-label">Inference Time</span>
                      <span className="stat-val">42ms</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'har' && (
                <div className="detection-view">
                  <div className="img-wrapper">
                    <img src={weaponImg} alt="HAR Detection" />
                    <div className="bounding-box har-box">
                      <span className="box-label bg-purple">Suspicious Subject</span>
                    </div>
                  </div>
                  <div className="detection-stats">
                    <div className="stat-card">
                      <span className="stat-label">Behavior Classification</span>
                      <span className="stat-val text-purple">Assault / Fighting (98.21%)</span>
                    </div>
                    <div className="stat-card">
                      <span className="stat-label">Network Architecture</span>
                      <span className="stat-val">VGG-16</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Forensics;
