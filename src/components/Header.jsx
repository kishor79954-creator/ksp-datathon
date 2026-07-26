import React from 'react';
import { Bell, Search, Settings } from 'lucide-react';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header glass-panel">
      <div className="header-search">
        <Search size={18} className="search-icon" />
        <input type="text" placeholder="Search districts, suspects, FIR numbers..." />
      </div>
      
      <div className="header-actions">
        <div className="status-indicator">
          <span className="status-dot online pulse-dot"></span>
          <span>System Live</span>
        </div>
        
        <button className="icon-btn" aria-label="Notifications">
          <Bell size={20} />
          <span className="badge">3</span>
        </button>
        
        <button className="icon-btn" aria-label="Settings">
          <Settings size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
