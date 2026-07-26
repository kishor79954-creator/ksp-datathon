import React, { useState } from 'react';
import { getEntityProfile } from '../data/mockService';
import { Search, UserCircle, AlertTriangle, ShieldCheck, FileText, ChevronRight } from 'lucide-react';
import './EntityResolution.css';

const EntityResolution = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [profile, setProfile] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    // Simulate API delay
    setTimeout(() => {
      setProfile(getEntityProfile());
      setIsSearching(false);
    }, 600);
  };

  const getRoleIcon = (role) => {
    switch(role) {
      case 'Victim': return <ShieldCheck className="role-icon text-green" size={20} />;
      case 'Accused': return <AlertTriangle className="role-icon text-red" size={20} />;
      case 'Complainant': return <FileText className="role-icon text-blue" size={20} />;
      default: return <UserCircle className="role-icon text-muted" size={20} />;
    }
  };

  return (
    <div className="entity-container animate-fade-in">
      <div className="entity-header">
        <h1>360° Entity Resolution</h1>
        <p className="subtitle">Breaking data silos to resolve identities across Victim, Complainant, and Accused databases.</p>
      </div>

      <div className="search-panel glass-panel">
        <form onSubmit={handleSearch} className="entity-search-form">
          <Search className="search-icon-large" size={24} />
          <input 
            type="text" 
            placeholder="Search by Name, Aadhar, or Phone Number..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">Resolve Entity</button>
        </form>
      </div>

      {isSearching && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Querying Master Databases...</p>
        </div>
      )}

      {profile && !isSearching && (
        <div className="profile-grid animate-fade-in">
          <div className="profile-card glass-panel">
            <div className="profile-header">
              <div className="avatar-large"><UserCircle size={64} /></div>
              <div className="profile-info">
                <h2>{profile.name}</h2>
                <p>{profile.demographics}</p>
                <span className="entity-id">Entity ID: {profile.id}</span>
              </div>
              <div className="risk-score-circular">
                <svg viewBox="0 0 36 36" className="circular-chart red">
                  <path className="circle-bg"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path className="circle"
                    strokeDasharray={`${profile.riskScore}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <text x="18" y="20.35" className="percentage">{profile.riskScore}</text>
                </svg>
                <span>AI Risk Score</span>
              </div>
            </div>
          </div>

          <div className="timeline-card glass-panel">
            <div className="card-header">
              <h3>Entity Cross-Reference Timeline</h3>
            </div>
            <div className="timeline-container">
              {profile.timeline.map((event, idx) => (
                <div className="timeline-item" key={idx}>
                  <div className="timeline-marker"></div>
                  <div className={`timeline-content role-${event.role.toLowerCase()}`}>
                    <div className="event-header">
                      {getRoleIcon(event.role)}
                      <span className="event-role">{event.role}</span>
                      <span className="event-date">{event.date}</span>
                    </div>
                    <div className="event-details">
                      <h4>FIR: {event.caseNo}</h4>
                      <p>Category: <strong>{event.type}</strong></p>
                      <span className="event-status">{event.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EntityResolution;
