import React, { useState } from 'react';
import { Shield, User, KeyRound, Mail, UserPlus, LogIn, AlertCircle, CheckCircle2 } from 'lucide-react';
import { registerUserApi, loginUserApi } from '../services/api';

export default function LoginModal({ onLoginSuccess }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('EMPLOYEE');
  
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // 1. Handle Registration (Saves to MySQL via Spring Boot)
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    try {
      await registerUserApi({ username, password, email, role });
      setSuccessMessage('Agent registered successfully in MySQL database! Switch to sign in.');
      setIsRegistering(false);
      setPassword('');
    } catch (err) {
      setErrorMessage(err.message || 'Registration failed. Check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Login (Verifies against MySQL)
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const response = await loginUserApi(username, password);
      
      // Store session context
      localStorage.setItem('username', response.username || username);
      localStorage.setItem('user_clearance_role', response.role || role);

      setTimeout(() => {
        setLoading(false);
        onLoginSuccess();
      }, 600);
    } catch (err) {
      setLoading(false);
      setErrorMessage('Invalid credentials or backend server offline.');
    }
  };

  const styles = {
    overlay: {
      position: 'fixed', inset: 0, backgroundColor: '#080B12',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999, fontFamily: 'Inter, sans-serif',
      backgroundImage: 'radial-gradient(rgba(6, 182, 212, 0.08) 1px, transparent 1px)',
      backgroundSize: '24px 24px'
    },
    card: {
      backgroundColor: '#111722', border: '1px solid #1f293d',
      borderRadius: '16px', padding: '36px', width: '420px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.6)', color: '#fff'
    },
    inputGroup: { marginBottom: '16px' },
    label: { display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' },
    input: {
      width: '100%', backgroundColor: '#080B12', border: '1px solid #1f293d',
      borderRadius: '8px', padding: '10px 14px 10px 38px', color: '#fff', fontSize: '14px',
      boxSizing: 'border-box', outline: 'none'
    },
    select: {
      width: '100%', backgroundColor: '#080B12', border: '1px solid #06b6d4',
      borderRadius: '8px', padding: '10px 14px', color: '#06b6d4', fontSize: '13px',
      fontWeight: '600', boxSizing: 'border-box', outline: 'none', cursor: 'pointer'
    },
    primaryBtn: {
      width: '100%', background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
      color: '#fff', border: 'none', padding: '12px', borderRadius: '8px',
      fontWeight: '700', fontSize: '14px', cursor: 'pointer', marginTop: '10px',
      boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
    },
    toggleBtn: {
      background: 'transparent', border: 'none', color: '#06b6d4',
      fontSize: '13px', cursor: 'pointer', marginTop: '16px', width: '100%', textAlign: 'center'
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'inline-flex', padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)', marginBottom: '12px' }}>
            <Shield size={26} color="#06b6d4" />
          </div>
          <h1 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 4px 0' }}>EnterpriseSync</h1>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
            {isRegistering ? 'Register New Agent (MySQL Persisted)' : 'Security Telemetry Verification'}
          </p>
        </div>

        {errorMessage && (
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', color: '#ef4444', padding: '10px 12px', borderRadius: '8px', marginBottom: '16px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertCircle size={15} /> {errorMessage}
          </div>
        )}

        {successMessage && (
          <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', color: '#10b981', padding: '10px 12px', borderRadius: '8px', marginBottom: '16px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={15} /> {successMessage}
          </div>
        )}

        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Agent Username</label>
            <div style={{ position: 'relative' }}>
              <User size={15} color="#64748b" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input 
                type="text" 
                placeholder="e.g. sunnychanu"
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                style={styles.input} 
                required 
              />
            </div>
          </div>

          {isRegistering && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>Official Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={15} color="#64748b" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input 
                  type="email" 
                  placeholder="agent@enterprise.sync"
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  style={styles.input} 
                  required 
                />
              </div>
            </div>
          )}

          <div style={styles.inputGroup}>
            <label style={styles.label}>Security Passkey</label>
            <div style={{ position: 'relative' }}>
              <KeyRound size={15} color="#64748b" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input 
                type="password" 
                placeholder="••••••••"
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                style={styles.input} 
                required 
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Clearance Tier</label>
            <select value={role} onChange={e => setRole(e.target.value)} style={styles.select}>
              <option value="EMPLOYEE">LEVEL 1: Employee (Kanban Operations)</option>
              <option value="MANAGER">LEVEL 2: Manager (Kanban + Backlog)</option>
              <option value="HEAD">LEVEL 3: Head of Engineering (Full Access)</option>
            </select>
          </div>

          <button type="submit" style={styles.primaryBtn}>
            {isRegistering ? (
              <><UserPlus size={16} /> {loading ? 'SAVING TO MYSQL...' : 'Register Agent'}</>
            ) : (
              <><LogIn size={16} /> {loading ? 'VERIFYING...' : 'Sign In'}</>
            )}
          </button>
        </form>

        <button 
          onClick={() => {
            setIsRegistering(!isRegistering);
            setErrorMessage('');
            setSuccessMessage('');
          }} 
          style={styles.toggleBtn}
        >
          {isRegistering ? 'Already registered? Sign in here' : 'New agent? Register account'}
        </button>
      </div>
    </div>
  );
}