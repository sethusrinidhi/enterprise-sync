import React, { useState, useEffect } from 'react';
import LoginModal from './components/LoginModal';
import KanbanBoard from './components/KanbanBoard';
import TeamsView from './components/TeamsView';
import SprintBacklogView from './components/SprintBacklogView';
import SystemSettingsView from './components/SystemSettingsView';
import BootLoadingScreen from './components/BootLoadingScreen';
import Sidebar from './components/Sidebar';
import { logoutUser } from './services/api';
import { ShieldAlert } from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem('token')));
  const [isBooting, setIsBooting] = useState(false);
  const [activeTab, setActiveTab] = useState('kanban');
  const [isTimedOut, setIsTimedOut] = useState(false);

  const handleLoginSuccess = () => {
    setIsTimedOut(false);
    setIsBooting(true); // Triggers the 3-second cyber-boot animation sequence
  };

  const handleLogout = () => {
    logoutUser();
    localStorage.removeItem('token');
    localStorage.removeItem('user_clearance_role');
    setIsAuthenticated(false);
  };

  // 10-Minute Inactivity Timeout Hook
  useEffect(() => {
    if (!isAuthenticated || isBooting) return;

    let timeoutId;

    const resetTimer = () => {
      if (timeoutId) clearTimeout(timeoutId);
      // 10 minutes = 10 * 60 * 1000 ms = 600,000 ms
      timeoutId = setTimeout(() => {
        setIsTimedOut(true);
        handleLogout();
      }, 10 * 60 * 1000);
    };

    // Events that signal active user engagement
    const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];

    events.forEach(event => {
      window.addEventListener(event, resetTimer);
    });

    // Initialize timer on mount
    resetTimer();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [isAuthenticated, isBooting]);

  // 1. Show the 3-second sci-fi boot sequence after login
  if (isBooting) {
    return (
      <BootLoadingScreen 
        onComplete={() => {
          setIsBooting(false);
          setIsAuthenticated(true);
        }} 
      />
    );
  }

  // 2. Show Login (with optional inactivity notice) if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        {isTimedOut && (
          <div style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#ef4444', padding: '10px 20px', borderRadius: '8px', zIndex: 10000, fontSize: '13px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert size={16} /> Security Notice: Session terminated due to 10 minutes of inactivity.
          </div>
        )}
        <LoginModal onLoginSuccess={handleLoginSuccess} />
      </>
    );
  }

  // 3. Show main command center layout once authenticated
  return (
    <>
      <style>{`
        @keyframes pageShiftSlide {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.99);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .page-shift {
          animation: pageShiftSlide 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="page-shift" style={{ backgroundColor: '#080B12', minHeight: '100vh', display: 'flex', width: '100vw', margin: 0, padding: 0, overflowX: 'hidden' }}>
        {/* Dark Glass Collapsible Sidebar */}
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          currentUser={localStorage.getItem('username') || 'sunnychanu'} 
          onLogout={handleLogout} 
        />

        {/* Dynamic View Loader with Shifting Animation */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {activeTab === 'kanban' && <KanbanBoard projectId={1} />}
          {(activeTab === 'teams' || activeTab === 'team') && <TeamsView />}
          {(activeTab === 'backlog' || activeTab === 'sprint') && <SprintBacklogView />}
          {(activeTab === 'settings' || activeTab === 'system') && <SystemSettingsView />}
          
          {/* Fallback for any other unmapped tabs */}
          {activeTab !== 'kanban' && 
           activeTab !== 'teams' && activeTab !== 'team' && 
           activeTab !== 'backlog' && activeTab !== 'sprint' && 
           activeTab !== 'settings' && activeTab !== 'system' && (
            <div style={{ flex: 1, padding: '40px', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', background: '#080B12' }}>
              Sector <span style={{ color: '#06b6d4', marginLeft: '6px', marginRight: '6px' }}>[{activeTab.toUpperCase()}]</span> initialized and online.
            </div>
          )}
        </div>
      </div>
    </>
  );
}