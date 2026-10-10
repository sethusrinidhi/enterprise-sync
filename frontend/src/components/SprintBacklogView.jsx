import React, { useState, useEffect } from 'react';
import { Layers, PlusCircle, ArrowRight, CheckCircle } from 'lucide-react';
import { createIssue } from '../services/api';

const INITIAL_BACKLOG = [
  { id: 101, title: 'Implement OAuth2 Google Provider', priority: 'HIGH', estimate: '5 SP', description: 'Configure Spring Security OAuth2 Client.' },
  { id: 102, title: 'Redis Distributed Caching Layer', priority: 'MEDIUM', estimate: '3 SP', description: 'Cache frequent API calls in Redis.' },
  { id: 103, title: 'Docker Multi-Stage Build Pipeline', priority: 'LOW', estimate: '8 SP', description: 'Optimize Docker container deployment image.' }
];

export default function SprintBacklogView() {
  const [backlogItems, setBacklogItems] = useState(() => {
    const saved = localStorage.getItem('enterprise_backlog_items');
    return saved ? JSON.parse(saved) : INITIAL_BACKLOG;
  });

  const [title, setTitle] = useState('');
  const [deployedMsg, setDeployedMsg] = useState('');

  useEffect(() => {
    localStorage.setItem('enterprise_backlog_items', JSON.stringify(backlogItems));
  }, [backlogItems]);

  const handleAddToBacklog = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newItem = { 
      id: Date.now(), 
      title, 
      priority: 'MEDIUM', 
      estimate: '3 SP',
      description: 'Backlog item queued for sprint allocation.'
    };
    setBacklogItems(prev => [newItem, ...prev]);
    setTitle('');
  };

  const handleDeployToSprint = async (item) => {
    try {
      // 1. Create issue on Kanban board in TO_DO status
      await createIssue({
        title: item.title,
        description: item.description || 'Deployed from Sprint Backlog pool.',
        issueType: 'TASK',
        priority: item.priority || 'MEDIUM',
        status: 'TO_DO',
        projectId: 1
      });

      // 2. Remove from Backlog queue
      setBacklogItems(prev => prev.filter(i => i.id !== item.id));

      // 3. Show feedback notification
      setDeployedMsg(`Deployed "${item.title}" to Kanban Board!`);
      setTimeout(() => setDeployedMsg(''), 3000);
    } catch (error) {
      console.error("Failed to deploy backlog item:", error);
    }
  };

  const styles = {
    container: { minHeight: '100vh', backgroundColor: '#080B12', color: '#ffffff', padding: '32px', fontFamily: 'Inter, sans-serif', flex: 1 },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', background: '#111722', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px 32px' },
    card: { backgroundColor: '#111722', border: '1px solid #1f293d', borderRadius: '12px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', margin: 0, display: 'flex', alignItems: 'center', gap: '10px', color: '#f8fafc' }}>
            <Layers size={26} color="#06b6d4" /> Sprint Backlog // Vector Pool
          </h1>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>Queue future features and unassigned operational tasks.</p>
        </div>
      </div>

      {deployedMsg && (
        <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', color: '#10b981', padding: '12px 16px', borderRadius: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
          <CheckCircle size={18} /> {deployedMsg}
        </div>
      )}

      <form onSubmit={handleAddToBacklog} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <input 
          type="text" 
          placeholder="New backlog vector item..." 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          style={{ flex: 1, backgroundColor: '#111722', border: '1px solid #1f293d', borderRadius: '10px', padding: '12px 16px', color: '#fff', outline: 'none' }} 
        />
        <button type="submit" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)', color: '#fff', border: 'none', padding: '0 24px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>
          <PlusCircle size={18} /> Push to Backlog
        </button>
      </form>

      <div>
        {backlogItems.map(item => (
          <div key={item.id} style={styles.card}>
            <div>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '6px' }}>
                <span style={{ fontSize: '10px', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', padding: '2px 8px', borderRadius: '6px', fontWeight: '700' }}>{item.priority}</span>
                <span style={{ fontSize: '10px', color: '#64748b', fontFamily: 'monospace' }}>Estimate: {item.estimate}</span>
              </div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#f8fafc', margin: 0 }}>{item.title}</h3>
            </div>
            <button 
              onClick={() => handleDeployToSprint(item)}
              style={{ background: '#080B12', border: '1px solid #1f293d', color: '#06b6d4', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '600' }}
            >
              Deploy to Sprint <ArrowRight size={14} />
            </button>
          </div>
        ))}

        {backlogItems.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#475569', fontSize: '14px', border: '1px dashed #1f293d', borderRadius: '12px' }}>
            Backlog queue empty. All vectors deployed to active sprint.
          </div>
        )}
      </div>
    </div>
  );
}