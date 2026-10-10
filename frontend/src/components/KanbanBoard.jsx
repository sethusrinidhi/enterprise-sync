import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, Shield, AlertCircle } from 'lucide-react';

const INITIAL_ISSUES = [
  { id: 101, title: 'Connect Spring Boot to MySQL', status: 'TO_DO', priority: 'HIGH', user: 'sunnychanu', description: 'Configure application.yml datasource.' },
  { id: 102, title: 'Implement JWT Filter Security', status: 'IN_PROGRESS', priority: 'HIGH', user: 'sunnychanu', description: 'Add OncePerRequestFilter for tokens.' },
  { id: 103, title: 'Dark Glass UI Dashboard', status: 'DONE', priority: 'MEDIUM', user: 'sunnychanu', description: 'Apply #080B12 theme and animations.' },
];

const COLUMNS = [
  { id: 'TO_DO', title: 'To Do Vector', color: '#94a3b8' },
  { id: 'IN_PROGRESS', title: 'In Progress Vector', color: '#06b6d4' },
  { id: 'DONE', title: 'Completed Vector', color: '#10b981' },
];

export default function KanbanBoard() {
  const clearanceRole = localStorage.getItem('user_clearance_role') || 'EMPLOYEE';
  const isHead = clearanceRole === 'HEAD';

  const [issues, setIssues] = useState(() => {
    const saved = localStorage.getItem('enterprise_kanban_issues');
    return saved ? JSON.parse(saved) : INITIAL_ISSUES;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [description, setDescription] = useState('');
  const [draggedId, setDraggedId] = useState(null);

  useEffect(() => {
    localStorage.setItem('enterprise_kanban_issues', JSON.stringify(issues));
  }, [issues]);

  // Drag and Drop Handlers
  const handleDragStart = (e, id) => {
    setDraggedId(id);
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Required to allow dropping
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    if (!draggedId) return;

    setIssues(prev => prev.map(issue => {
      if (issue.id === Number(draggedId) || issue.id === draggedId) {
        return { ...issue, status: targetStatus };
      }
      return issue;
    }));
    setDraggedId(null);
  };

  const handleCreateIssue = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newIssue = {
      id: Date.now(),
      title,
      description: description || 'No operational description provided.',
      status: 'TO_DO',
      priority,
      user: localStorage.getItem('username') || 'sunnychanu'
    };

    setIssues(prev => [newIssue, ...prev]);
    setTitle('');
    setDescription('');
    setPriority('MEDIUM');
    setIsModalOpen(false);
  };

  const handleDeleteIssue = (id) => {
    setIssues(prev => prev.filter(issue => issue.id !== id));
  };

  const handleClearProject = () => {
    if (!isHead) return;
    if (window.confirm("HEAD CLEARANCE WARNING: Purge all project vectors?")) {
      setIssues([]);
      localStorage.removeItem('enterprise_kanban_issues');
    }
  };

  const styles = {
    board: { flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#080B12', color: '#ffffff', fontFamily: 'Inter, sans-serif', minHeight: '100vh' },
    header: { padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #1f293d', backgroundColor: '#111722', position: 'sticky', top: 0, zIndex: 10 },
    logoWrapper: { display: 'flex', alignItems: 'center', gap: '12px' },
    companyName: { fontSize: '20px', fontWeight: '800', letterSpacing: '0.05em', color: '#fff' },
    actionGroup: { display: 'flex', alignItems: 'center', gap: '12px' },
    mainArea: { display: 'flex', gap: '24px', padding: '32px', overflowX: 'auto', flex: 1, alignItems: 'flex-start' },
    column: { flex: '0 0 340px', backgroundColor: '#111722', borderRadius: '14px', padding: '20px', border: '1px solid #1f293d', minHeight: '550px', display: 'flex', flexDirection: 'column' },
    card: { backgroundColor: '#080B12', border: '1px solid #1f293d', borderRadius: '10px', padding: '16px', marginBottom: '16px', cursor: 'grab', position: 'relative', transition: 'border-color 0.2s' },
    primaryBtn: { background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' },
    purgeBtn: { backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', color: '#ef4444', padding: '10px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }
  };

  return (
    <div style={styles.board}>
      {/* Animated Logo CSS */}
      <style>{`
        @keyframes scanline { 0% { top: 0%; } 100% { top: 100%; } }
        @keyframes logoPulse { 0% { box-shadow: 0 0 15px #06b6d4; } 100% { box-shadow: 0 0 30px #06b6d4; } }
        @keyframes letterShift { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.08); opacity: 0.85; } 100% { transform: scale(1); opacity: 1; } }

        .sc-logo-container {
          width: 40px; height: 40px;
          background-color: #080B12;
          border: 2px solid #06b6d4; 
          border-radius: 10px; 
          position: relative;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 20px rgba(6, 182, 212, 0.4);
          animation: logoPulse 2.5s ease-in-out infinite alternate;
          overflow: hidden;
          user-select: none;
        }
        .sc-logo-container .letters {
          font-family: 'Inter', sans-serif;
          font-weight: 900; 
          font-size: 18px;
          background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.05em;
          animation: letterShift 3s ease-in-out infinite;
        }
        .sc-logo-container .scanline {
          position: absolute; left: 0; width: 100%; height: 2px;
          background: rgba(6, 182, 212, 0.6);
          animation: scanline 1.8s linear infinite;
          pointer-events: none;
        }
      `}</style>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logoWrapper}>
          <div className="sc-logo-container">
            <div className="scanline" />
            <div className="letters">SC</div>
          </div>
          <div style={styles.companyName}>EnterpriseSync <span style={{ color: '#06b6d4', fontSize: '14px' }}>// Vector Command</span></div>
        </div>

        <div style={styles.actionGroup}>
          {isHead && (
            <button onClick={handleClearProject} style={styles.purgeBtn} title="Head Clearance: Purge Vectors">
              <Trash2 size={16} /> Purge Project
            </button>
          )}
          <button style={styles.primaryBtn} onClick={() => setIsModalOpen(true)}>
            <PlusCircle size={16} /> Initialize Task
          </button>
        </div>
      </div>

      {/* Kanban Board Columns with Drag & Drop */}
      <div style={styles.mainArea}>
        {COLUMNS.map(column => {
          const colIssues = issues.filter(i => i.status === column.id);
          return (
            <div 
              key={column.id} 
              style={styles.column}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: column.color }}></span>
                  {column.title} <span style={{ color: '#64748b' }}>// {colIssues.length}</span>
                </h2>
              </div>

              <div style={{ flex: 1, minHeight: '400px' }}>
                {colIssues.map(issue => (
                  <div 
                    key={issue.id} 
                    draggable 
                    onDragStart={(e) => handleDragStart(e, issue.id)}
                    style={styles.card}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <p style={{ margin: 0, fontSize: '14px', color: '#f8fafc', fontWeight: '600' }}>{issue.title}</p>
                      <button 
                        onClick={() => handleDeleteIssue(issue.id)}
                        style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', padding: 0 }}
                        title="Delete task"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 12px 0' }}>{issue.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px' }}>
                      <span style={{ 
                        backgroundColor: issue.priority === 'HIGH' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(6,182,212,0.1)', 
                        color: issue.priority === 'HIGH' ? '#ef4444' : '#06b6d4', 
                        padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' 
                      }}>
                        {issue.priority}
                      </span>
                      <span style={{ color: '#3b82f6' }}>@{issue.user}</span>
                    </div>
                  </div>
                ))}

                {colIssues.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '40px 0', color: '#475569', fontSize: '13px', border: '1px dashed #1f293d', borderRadius: '10px' }}>
                    Drop vectors here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Advanced Task Initialization Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ backgroundColor: '#111722', border: '1px solid #06b6d4', padding: '32px', borderRadius: '14px', width: '420px', color: '#fff' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 'bold' }}>Initialize New Vector Task</h3>
            <form onSubmit={handleCreateIssue}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px', textTransform: 'uppercase' }}>Task Title</label>
                <input 
                  type="text" 
                  placeholder="e.g., Integrate Spring Security JWT" 
                  value={title} 
                  onChange={e => setTitle(e.target.value)} 
                  style={{ width: '100%', padding: '12px', backgroundColor: '#080B12', border: '1px solid #1f293d', color: '#fff', borderRadius: '8px', boxSizing: 'border-box', outline: 'none' }} 
                  required 
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px', textTransform: 'uppercase' }}>Operational Description</label>
                <textarea 
                  placeholder="Describe task parameters..." 
                  value={description} 
                  onChange={e => setDescription(e.target.value)} 
                  style={{ width: '100%', padding: '12px', backgroundColor: '#080B12', border: '1px solid #1f293d', color: '#fff', borderRadius: '8px', boxSizing: 'border-box', outline: 'none', height: '80px', resize: 'none' }} 
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px', textTransform: 'uppercase' }}>Priority Level</label>
                <select 
                  value={priority} 
                  onChange={e => setPriority(e.target.value)} 
                  style={{ width: '100%', padding: '12px', backgroundColor: '#080B12', border: '1px solid #06b6d4', color: '#06b6d4', borderRadius: '8px', boxSizing: 'border-box', outline: 'none', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  <option value="LOW">LOW PRIORITY</option>
                  <option value="MEDIUM">MEDIUM PRIORITY</option>
                  <option value="HIGH">HIGH PRIORITY</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" style={{ flex: 1, padding: '12px', background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Deploy Task</button>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '12px', backgroundColor: 'transparent', color: '#94a3b8', border: '1px solid #1f293d', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}