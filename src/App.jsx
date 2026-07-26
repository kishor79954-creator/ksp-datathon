import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import StrategicDashboard from './pages/StrategicDashboard';
import GeospatialCommand from './pages/GeospatialCommand';
import LinkAnalysis from './pages/LinkAnalysis';
import PredictiveIntelligence from './pages/PredictiveIntelligence';
import EntityResolution from './pages/EntityResolution';
import JusticePipeline from './pages/JusticePipeline';
import AIAudit from './pages/AIAudit';
import Forensics from './pages/Forensics';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<StrategicDashboard />} />
          <Route path="geospatial" element={<GeospatialCommand />} />
          <Route path="network" element={<LinkAnalysis />} />
          <Route path="predictive" element={<PredictiveIntelligence />} />
          <Route path="entity" element={<EntityResolution />} />
          <Route path="pipeline" element={<JusticePipeline />} />
          <Route path="audit" element={<AIAudit />} />
          <Route path="forensics" element={<Forensics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
