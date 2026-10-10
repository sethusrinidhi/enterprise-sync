import React from 'react';
import { X, Cpu, Database, Layers, ShieldCheck, Sparkles, Code2 } from 'lucide-react';

export default function ProjectOverviewModal({ onClose }) {
  const overlayStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(8, 11, 18, 0.85)', backdropFilter: 'blur(8px)',
    display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000
  };

  const modalStyle = {
    backgroundColor: '#111722', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: '16px',
    width: '100%', maxWidth: '640px', padding: '32px', boxShadow: '0 0 50px rgba(6, 182, 212, 0.15)',
    color: '#ffffff', fontFamily: 'Inter, sans-serif', maxHeight: '85vh', overflowY: 'auto'
  };

  const sectionStyle = {
    backgroundColor: '#080B12', border: '1px solid #1f293d', borderRadius: '12px',
    padding: '16px', marginBottom: '16px'
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Cpu size={24} color="#06b6d4" />
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '800', margin: 0 }}>EnterpriseSync Architecture</h2>
              <span style={{ fontSize: '11px', color: '#06b6d4' }}>Brand: sunnychanu | B.Tech Computer Engineering</span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* What the project does */}
        <div style={sectionStyle}>
          <h3 style={{ fontSize: '13px', color: '#06b6d4', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={14} /> Project Mission & Scope
          </h3>
          <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>
            EnterpriseSync is a high-performance, full-stack sprint planning and issue tracking platform. It features a futuristic command-center UI, real-time drag-and-drop Kanban execution, and telemetry velocity metrics designed for enterprise engineering teams.
          </p>
        </div>

        {/* Tech Stack */}
        <div style={sectionStyle}>
          <h3 style={{ fontSize: '13px', color: '#06b6d4', textTransform: 'uppercase', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Code2 size={14} /> Full-Stack Architecture
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px' }}>
            <div style={{ padding: '8px', background: '#111722', borderRadius: '8px', border: '1px solid #1f293d' }}>
              <strong style={{ color: '#3b82f6', display: 'block', marginBottom: '2px' }}>Frontend</strong>
              React + Vite, Lucide Icons, `@hello-pangea/dnd`, Custom Dark Glass CSS
            </div>
            <div style={{ padding: '8px', background: '#111722', borderRadius: '8px', border: '1px solid #1f293d' }}>
              <strong style={{ color: '#10b981', display: 'block', marginBottom: '2px' }}>Backend</strong>
              Spring Boot (REST APIs), Spring Security, JWT Token Provider
            </div>
          </div>
        </div>

        {/* Database */}
        <div style={sectionStyle}>
          <h3 style={{ fontSize: '13px', color: '#06b6d4', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Database size={14} /> Database & Storage
          </h3>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>
            Relational storage managed via <strong>MySQL</strong>, handling entities for Projects, Issues (Tasks, Bugs, Stories), Sprints, and User Assignments with full CORS and Axios interceptors.
          </p>
        </div>
      </div>
    </div>
  );
}