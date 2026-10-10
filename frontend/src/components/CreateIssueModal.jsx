import React, { useState } from 'react';
import { X, Zap, Cpu } from 'lucide-react';
import { createIssue } from '../services/api';

export default function CreateIssueModal({ projectId, onClose, onIssueCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [issueType, setIssueType] = useState('TASK');
  const [priority, setPriority] = useState('MEDIUM');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      const newIssue = await createIssue({
        title,
        description,
        issueType,
        priority,
        status: 'TO_DO',
        projectId: Number(projectId) || 1
      });
      
      if (onIssueCreated) {
        onIssueCreated(newIssue);
      }
      onClose();
    } catch (error) {
      console.error("Failed to create issue:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const overlayStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(8, 11, 18, 0.85)', backdropFilter: 'blur(8px)',
    display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000
  };

  const modalStyle = {
    backgroundColor: '#111722', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: '16px',
    width: '100%', maxWidth: '480px', padding: '32px', boxShadow: '0 0 50px rgba(6, 182, 212, 0.15)',
    color: '#ffffff', fontFamily: 'Inter, sans-serif'
  };

  const inputStyle = {
    width: '100%', backgroundColor: '#080B12', border: '1px solid #1f293d',
    borderRadius: '10px', padding: '12px 14px', color: '#fff', fontSize: '14px',
    outline: 'none', marginBottom: '16px', boxSizing: 'border-box'
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu size={20} color="#06b6d4" />
            <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>Deploy New Vector</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Issue Title</label>
          <input 
            type="text" 
            placeholder="e.g., Configure Spring Security JWT Filter" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
            required
          />

          <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Description</label>
          <textarea 
            placeholder="Specify vector specifications..." 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ ...inputStyle, height: '90px', resize: 'vertical' }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            <div>
              <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Type</label>
              <select 
                value={issueType} 
                onChange={(e) => setIssueType(e.target.value)}
                style={inputStyle}
              >
                <option value="TASK">Task</option>
                <option value="BUG">Bug</option>
                <option value="STORY">Story</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Priority</label>
              <select 
                value={priority} 
                onChange={(e) => setPriority(e.target.value)}
                style={inputStyle}
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            style={{ 
              width: '100%', 
              background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)', 
              border: 'none', 
              color: '#fff', 
              padding: '12px', 
              borderRadius: '10px', 
              fontWeight: '600', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              justify: 'center', 
              gap: '8px',
              boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)'
            }}
          >
            <Zap size={16} /> {isSubmitting ? 'Deploying...' : 'Deploy to To Do'}
          </button>
        </form>
      </div>
    </div>
  );
}