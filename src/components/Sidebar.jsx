import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Map, Network, LineChart, ShieldAlert, UserSearch, Scale, Fingerprint, Scan } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const navItems = [
    { path: '/', label: 'Strategic Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/geospatial', label: 'Geospatial Command', icon: <Map size={20} /> },
    { path: '/network', label: 'Link Analysis', icon: <Network size={20} /> },
    { path: '/predictive', label: 'Predictive Intelligence', icon: <LineChart size={20} /> },
    { path: '/entity', label: '360° Entity Resolution', icon: <UserSearch size={20} /> },
    { path: '/pipeline', label: 'Justice Pipeline', icon: <Scale size={20} /> },
    { path: '/audit', label: 'AI Fairness Audit', icon: <Fingerprint size={20} /> },
    { path: '/forensics', label: 'Crime Scene Forensics', icon: <Scan size={20} /> },
  ];

  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-brand">
        <ShieldAlert className="brand-icon" size={28} />
        <div className="brand-text">
          <h2>KSP Nexus</h2>
          <span>Crime Intelligence Platform</span>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink 
            to={item.path} 
            key={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">A</div>
          <div className="user-info">
            <span className="user-name">Admin User</span>
            <span className="user-role">Intelligence Bureau</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
