import React, { useState } from 'react';
import { Users, UserPlus, Shield, Trash2, AlertCircle } from 'lucide-react';

const STATIC_MEMBERS = [
  { id: 1, name: 'Sunny Chanu', role: 'Lead Architect', squad: 'Core Backend', status: 'ONLINE' },
  { id: 2, name: 'Sethu', role: 'Frontend Engineer', squad: 'UI / UX Vector', status: 'ACTIVE' },
  { id: 3, name: 'Srinidhi', role: 'Security Ops', squad: 'Spring Security', status: 'ONLINE' },
  { id: 4, name: 'Chandini', role: 'DevOps Lead', squad: 'Infrastructure', status: 'OFFLINE' }
];

export default function TeamsView() {
  const clearanceRole = localStorage.getItem('user_clearance_role') || 'EMPLOYEE';
  const isHead = clearanceRole === 'HEAD';

  const [teamMembers, setTeamMembers] = useState(() => {
    try {
      const saved = localStorage.getItem('enterprise_team_members');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn("Reading local storage failed");
    }
    return STATIC_MEMBERS;
  });

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('Fullstack Developer');

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newAgent = {
      id: Date.now(),
      name,
      role: role || 'Developer',
      squad: 'Engineering Squad A',
      status: 'ONLINE'
    };

    const updated = [newAgent, ...teamMembers];
    setTeamMembers(updated);
    localStorage.setItem('enterprise_team_members', JSON.stringify(updated));

    setName('');
    setIsOpen(false);
  };

  const handleRemoveMember = (id) => {
    if (!isHead) return;
    const updated = teamMembers.filter(m => m.id !== id);
    setTeamMembers(updated);
    localStorage.setItem('enterprise_team_members', JSON.stringify(updated));
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#080B12', color: '#ffffff', minHeight: '100vh', flex: 1, width: '100%', boxSizing: 'border-box' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', backgroundColor: '#111722', padding: '24px', borderRadius: '14px', border: '1px solid #1f293d' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Users size={24} color="#06b6d4" /> Team Telemetry & Squads
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
            Clearance Tier: <span style={{ color: isHead ? '#10b981' : '#06b6d4', fontWeight: 'bold' }}>[{clearanceRole}]</span>
          </p>
        </div>

        {/* Add Agent Button - Enabled for Head & Managers */}
        {isHead && (
          <button 
            onClick={() => setIsOpen(true)}
            style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <UserPlus size={16} /> Recruit Agent
          </button>
        )}
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: '#111722', padding: '16px', borderRadius: '10px', border: '1px solid #1f293d', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#06b6d4' }}>{teamMembers.length}</div>
          <div style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase' }}>Active Agents</div>
        </div>
        <div style={{ backgroundColor: '#111722', padding: '16px', borderRadius: '10px', border: '1px solid #1f293d', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>{teamMembers.filter(m => m.status !== 'OFFLINE').length}</div>
          <div style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase' }}>Online Units</div>
        </div>
        <div style={{ backgroundColor: '#111722', padding: '16px', borderRadius: '10px', border: '1px solid #1f293d', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6' }}>4</div>
          <div style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase' }}>Active Squads</div>
        </div>
        <div style={{ backgroundColor: '#111722', padding: '16px', borderRadius: '10px', border: '1px solid #1f293d', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#a855f7' }}>98.4%</div>
          <div style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase' }}>Efficiency</div>
        </div>
      </div>

      {/* Agent Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
        {teamMembers.map((member) => (
          <div key={member.id} style={{ backgroundColor: '#111722', border: '1px solid #1f293d', borderRadius: '12px', padding: '20px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '11px', backgroundColor: 'rgba(6,182,212,0.1)', color: '#06b6d4', padding: '4px 8px', borderRadius: '6px', fontWeight: 'bold' }}>
                {member.status}
              </span>
              
              {/* Head Exclusive Delete Agent Option */}
              {isHead ? (
                <button 
                  onClick={() => handleRemoveMember(member.id)}
                  title="Head Clearance: Decommission Agent"
                  style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}
                >
                  <Trash2 size={14} />
                </button>
              ) : (
                <Shield size={16} color="#3b82f6" />
              )}
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 4px 0', color: '#ffffff' }}>{member.name}</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>{member.role} // {member.squad}</p>
          </div>
        ))}
      </div>

      {/* Recruit Modal */}
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ backgroundColor: '#111722', border: '1px solid #06b6d4', padding: '30px', borderRadius: '12px', width: '360px' }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#fff', fontSize: '18px' }}>Recruit Agent (Head Override)</h3>
            <form onSubmit={handleAddMember}>
              <input 
                type="text" 
                placeholder="Agent Name" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                style={{ width: '100%', padding: '10px', backgroundColor: '#080B12', border: '1px solid #1f293d', color: '#fff', borderRadius: '6px', marginBottom: '12px', boxSizing: 'border-box' }} 
                required 
              />
              <input 
                type="text" 
                placeholder="Role / Specialization" 
                value={role} 
                onChange={e => setRole(e.target.value)} 
                style={{ width: '100%', padding: '10px', backgroundColor: '#080B12', border: '1px solid #1f293d', color: '#fff', borderRadius: '6px', marginBottom: '20px', boxSizing: 'border-box' }} 
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" style={{ flex: 1, padding: '10px', backgroundColor: '#06b6d4', color: '#000', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Recruit Agent</button>
                <button type="button" onClick={() => setIsOpen(false)} style={{ padding: '10px', backgroundColor: 'transparent', color: '#94a3b8', border: '1px solid #1f293d', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}