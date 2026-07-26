import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip, useMap } from 'react-leaflet';
import { getDistrictsData, getCrimeHotspots } from '../data/mockService';
import { Filter, Layers, MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import './GeospatialCommand.css';

// Fix for default leaflet icons not showing in React
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const KarnatakaBounds = () => {
  const map = useMap();
  useEffect(() => {
    // Approximate bounds for Karnataka
    map.fitBounds([
      [11.5, 74.0], // South-West
      [18.5, 78.5]  // North-East
    ]);
  }, [map]);
  return null;
};

const GeospatialCommand = () => {
  const districts = getDistrictsData();
  const hotspots = getCrimeHotspots();
  const [activeLayer, setActiveLayer] = useState('hotspots');

  return (
    <div className="geo-container animate-fade-in">
      <div className="geo-header">
        <div>
          <h1>Geospatial Command Center</h1>
          <p className="subtitle">Real-time mapping of incident clusters and district risk profiles.</p>
        </div>
        <div className="geo-controls">
          <button className={`control-btn ${activeLayer === 'hotspots' ? 'active' : ''}`} onClick={() => setActiveLayer('hotspots')}>
            <MapPin size={16} /> Hotspots
          </button>
          <button className={`control-btn ${activeLayer === 'districts' ? 'active' : ''}`} onClick={() => setActiveLayer('districts')}>
            <Layers size={16} /> District Risk
          </button>
          <button className="control-btn icon-only">
            <Filter size={16} />
          </button>
        </div>
      </div>

      <div className="map-wrapper glass-panel">
        <MapContainer 
          center={[15.3173, 75.7139]} // Center of Karnataka
          zoom={7} 
          style={{ height: '100%', width: '100%', borderRadius: '15px' }}
          zoomControl={false}
        >
          <KarnatakaBounds />
          
          {/* Premium Dark Map Theme */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />

          {activeLayer === 'districts' && districts.map(district => (
            <CircleMarker
              key={district.id}
              center={[district.lat, district.lng]}
              radius={district.crimeRate / 2}
              pathOptions={{
                color: district.risk === 'High' ? '#ef4444' : district.risk === 'Medium' ? '#f59e0b' : '#10b981',
                fillColor: district.risk === 'High' ? '#ef4444' : district.risk === 'Medium' ? '#f59e0b' : '#10b981',
                fillOpacity: 0.4,
                weight: 2
              }}
            >
              <Popup className="premium-popup">
                <div className="popup-content">
                  <h4>{district.name}</h4>
                  <p>Risk Level: <span style={{ color: district.risk === 'High' ? '#ef4444' : district.risk === 'Medium' ? '#f59e0b' : '#10b981' }}>{district.risk}</span></p>
                  <p>Crime Rate Index: {district.crimeRate}</p>
                </div>
              </Popup>
              <Tooltip permanent direction="bottom" opacity={0.8}>
                 {district.name}
              </Tooltip>
            </CircleMarker>
          ))}

          {activeLayer === 'hotspots' && hotspots.map((spot, idx) => (
             <CircleMarker
             key={idx}
             center={[spot[0], spot[1]]}
             radius={spot[2] / 10}
             pathOptions={{
               color: '#ef4444',
               fillColor: '#ef4444',
               fillOpacity: 0.7,
               weight: 0
             }}
           >
             <Popup>
               <div>
                 <strong>Spatiotemporal Cluster</strong>
                 <br />
                 Intensity: {Math.round(spot[2])}%
               </div>
             </Popup>
           </CircleMarker>
          ))}
        </MapContainer>
        
        {/* Map Overlay Legend */}
        <div className="map-legend glass-panel">
          <h4>Legend</h4>
          {activeLayer === 'districts' ? (
            <ul>
              <li><span className="legend-dot" style={{ background: '#ef4444' }}></span> High Risk</li>
              <li><span className="legend-dot" style={{ background: '#f59e0b' }}></span> Medium Risk</li>
              <li><span className="legend-dot" style={{ background: '#10b981' }}></span> Low Risk</li>
            </ul>
          ) : (
            <ul>
              <li><span className="legend-dot" style={{ background: '#ef4444', boxShadow: '0 0 8px #ef4444' }}></span> Incident Hotspot</li>
              <li>Pulse indicates recent activity</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeospatialCommand;
