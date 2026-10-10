import React from 'react';
import { X, Clock, Tag, Shield, Terminal, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function IssueDetailModal({ issue, onClose, onStatusChange }) {
  if (!issue) return null;

  const overlayStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(8, 11, 18, 0.85)', backdropFilter: 'blur(8px)',
    display: 'flex', justifyContent: 'flex-end', zIndex: 1000
  };

  const panelStyle = {
    backgroundColor: '#111722', borderLeft: '1px solid rgba(6, 182, 212, 0.3)',
    width: '100%', maxWidth: '520px', padding: '32px', height: '100vh',
    overflowY: 'auto', boxSizing: 'border-box', color: '#ffffff', fontFamily: 'Inter, sans-serif'
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={panelStyle} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <span style={{ fontSize: '12px', fontFamily: 'monospace', color: '#06b6d4', backgroundColor: '#080B12', padding: '4px 10px', borderRadius: '6px', border: '1px solid #1f293d' }}>
            VECTOR ID: #ES-{issue.id}
          </span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '16px', color: '#f8fafc' }}>{issue.title}</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
          <div style={{ backgroundColor: '#080B12', border: '1px solid #1f293d', padding: '12px', borderRadius: '10px' }}>
            <span style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Status</span>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#06b6d4' }}>{issue.status}</span>
          </div>
          <div style={{ backgroundColor: '#080B12', border: '1px solid #1f293d', padding: '12px', borderRadius: '10px' }}>
            <span style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Priority</span>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#f59e0b' }}>{issue.priority || 'MEDIUM'}</span>
          </div>
        </div>

        <div style={{ marginBottom: '28px' }}>
          <h4 style={{ fontSize: '12px', color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
            Description
          </h4>
          <div style={{ backgroundColor: '#080B12', border: '1px solid #1f293d', padding: '16px', borderRadius: '10px', color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>
            {issue.description || 'No detailed telemetry specified.'}
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '12px', color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
            Quick Status Transition
          </h4>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => { onStatusChange(issue.id, 'TO_DO'); onClose(); }}
              style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #1f293d', backgroundColor: '#080B12', color: '#3b82f6', cursor: 'pointer', fontWeight: '600', fontSize: '12px' }}
            >
              To Do
            </button>
            <button 
              onClick={() => { onStatusChange(issue.id, 'IN_PROGRESS'); onClose(); }}
              style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid rgba(6,182,212,0.3)', backgroundColor: '#080B12', color: '#06b6d4', cursor: 'pointer', fontWeight: '600', fontSize: '12px' }}
            >
              In Progress
            </button>
            <button 
              onClick={() => { onStatusChange(issue.id, 'DONE'); onClose(); }}
              style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid rgba(16,185,129,0.3)', backgroundColor: '#080B12', color: '#10b981', cursor: 'pointer', fontWeight: '600', fontSize: '12px' }}
            >
              Done ✓
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}