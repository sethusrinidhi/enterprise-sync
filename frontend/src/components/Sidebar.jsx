import React from 'react';
import { Kanban, Users, Layers, Settings, LogOut, ShieldAlert } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, currentUser, onLogout }) {
  // Retrieve clearance role (Defaults to EMPLOYEE if not found)
  const clearanceRole = localStorage.getItem('user_clearance_role') || 'EMPLOYEE';

  // Define navigation items with required minimum clearance levels
  const navItems = [
    { id: 'kanban', label: 'Kanban Board', icon: Kanban, minRole: 'EMPLOYEE' },
    { id: 'backlog', label: 'Sprint Backlog', icon: Layers, minRole: 'MANAGER' },
    { id: 'teams', label: 'Team Squads', icon: Users, minRole: 'HEAD' },
    { id: 'settings', label: 'System Settings', icon: Settings, minRole: 'HEAD' },
  ];

  // Role hierarchy mapping for permission checks
  const roleHierarchy = { 'EMPLOYEE': 1, 'MANAGER': 2, 'HEAD': 3 };
  const userLevel = roleHierarchy[clearanceRole] || 1;

  const styles = {
    sidebar: {
      width: '260px',
      backgroundColor: '#111722',
      borderRight: '1px solid #1f293d',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 16px',
      boxSizing: 'border-box',
      fontFamily: 'Inter, sans-serif'
    },
    brand: {
      fontSize: '15px',
      fontWeight: '800',
      color: '#fff',
      letterSpacing: '0.1em',
      marginBottom: '32px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    navButton: (isActive) => ({
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      borderRadius: '10px',
      backgroundColor: isActive ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
      color: isActive ? '#06b6d4' : '#94a3b8',
      border: isActive ? '1px solid rgba(6, 182, 212, 0.3)' : '1px solid transparent',
      fontWeight: isActive ? '600' : '500',
      fontSize: '14px',
      cursor: 'pointer',
      marginBottom: '8px',
      transition: 'all 0.2s ease'
    }),
    userBox: {
      marginTop: 'auto',
      backgroundColor: '#080B12',
      border: '1px solid #1f293d',
      borderRadius: '12px',
      padding: '14px',
      display: 'flex',
      flexDirection: 'column',
      gap: '6px'
    },
    logoutBtn: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      color: '#ef4444',
      border: '1px solid rgba(239, 68, 68, 0.2)',
      borderRadius: '8px',
      padding: '8px',
      fontSize: '12px',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '8px'
    }
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.brand}>
        <ShieldAlert size={20} color="#06b6d4" />
        ENTERPRISESYNC
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
        {navItems.map(item => {
          const itemLevel = roleHierarchy[item.minRole] || 1;
          const hasAccess = userLevel >= itemLevel;
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          if (!hasAccess) {
            // Render locked item for lower roles to show RBAC visibility
            return (
              <div key={item.id} style={{ ...styles.navButton(false), opacity: 0.4, cursor: 'not-allowed' }} title={`Restricted: Requires ${item.minRole} clearance`}>
                <Icon size={18} />
                <span style={{ flex: 1 }}>{item.label}</span>
                <span style={{ fontSize: '9px', backgroundColor: '#1f293d', padding: '2px 6px', borderRadius: '4px', color: '#94a3b8' }}>LOCKED</span>
              </div>
            );
          }

          return (
            <button 
              key={item.id} 
              style={styles.navButton(isActive)}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* User Session & Role Badge */}
      <div style={styles.userBox}>
        <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff', display: 'flex', justifyContent: 'space-between' }}>
          <span>{currentUser}</span>
          <span style={{ fontSize: '10px', color: '#06b6d4', backgroundColor: 'rgba(6,182,212,0.15)', padding: '2px 6px', borderRadius: '4px' }}>
            {clearanceRole}
          </span>
        </div>
        <div style={{ fontSize: '11px', color: '#64748b' }}>Clearance Level Verified</div>
        <button style={styles.logoutBtn} onClick={onLogout}>
          <LogOut size={14} /> Terminate Session
        </button>
      </div>
    </div>
  );
}