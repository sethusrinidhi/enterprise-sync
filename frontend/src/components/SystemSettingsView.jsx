import React, { useState } from 'react';
import { Settings, Shield, Database, Cpu, Lock, Save, RefreshCw } from 'lucide-react';

export default function SystemSettingsView() {
  const [jwtExpiration, setJwtExpiration] = useState('86400');
  const [dbPoolSize, setDbPoolSize] = useState('10');
  const [autoSync, setAutoSync] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const styles = {
    container: { minHeight: '100vh', backgroundColor: '#080B12', color: '#ffffff', padding: '32px', fontFamily: 'Inter, sans-serif', flex: 1 },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', background: '#111722', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px 32px' },
    card: { backgroundColor: '#111722', border: '1px solid #1f293d', borderRadius: '14px', padding: '24px', marginBottom: '20px' },
    input: { width: '100%', backgroundColor: '#080B12', border: '1px solid #1f293d', borderRadius: '8px', padding: '10px 14px', color: '#fff', marginTop: '6px', fontSize: '14px' },
    primaryBtn: { display: 'flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Settings size={26} color="#06b6d4" /> System Telemetry & Configuration
          </h1>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>Tune JWT Security, HikariCP Connection Pools, and Local Storage Caching.</p>
        </div>
      </div>

      <form onSubmit={handleSave}>
        {/* Security / JWT Panel */}
        <div style={styles.card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Shield size={20} color="#3b82f6" />
            <h2 style={{ fontSize: '16px', margin: 0 }}>Security & JWT Authentication</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '12px', color: '#94a3b8' }}>Token TTL Expiration (Seconds)</label>
              <input type="text" value={jwtExpiration} onChange={e => setJwtExpiration(e.target.value)} style={styles.input} />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#94a3b8' }}>Signature Algorithm</label>
              <input type="text" value="HS256 (HMAC SHA-256)" disabled style={{ ...styles.input, opacity: 0.6 }} />
            </div>
          </div>
        </div>

        {/* Database & Pool Settings */}
        <div style={styles.card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Database size={20} color="#06b6d4" />
            <h2 style={{ fontSize: '16px', margin: 0 }}>MySQL & HikariCP Connection Pool</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '12px', color: '#94a3b8' }}>Maximum Pool Size</label>
              <input type="text" value={dbPoolSize} onChange={e => setDbPoolSize(e.target.value)} style={styles.input} />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#94a3b8' }}>Database Dialect</label>
              <input type="text" value="org.hibernate.dialect.MySQL8Dialect" disabled style={{ ...styles.input, opacity: 0.6 }} />
            </div>
          </div>
        </div>

        <button type="submit" style={styles.primaryBtn}>
          <Save size={16} /> {isSaved ? 'Parameters Saved!' : 'Apply System Config'}
        </button>
      </form>
    </div>
  );
}