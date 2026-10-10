import React, { useEffect, useState } from 'react';
import { Cpu, Globe, Bot } from 'lucide-react';

export default function BootLoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING KERNEL...');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        const next = prev + 2;
        if (next === 30) setStatusText('ESTABLISHING SECURE JWT HANDSHAKE...');
        if (next === 65) setStatusText('MOUNTING MYSQL RELATIONAL DATABASE...');
        if (next === 90) setStatusText('CALIBRATING COMMAND CENTER VECTORS...');
        return next;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  const styles = {
    screen: {
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: '#080B12', color: '#ffffff', zIndex: 9999,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Inter, sans-serif', backgroundImage: 'radial-gradient(rgba(6, 182, 212, 0.08) 1px, transparent 1px)',
      backgroundSize: '24px 24px', overflow: 'hidden'
    },
    sceneContainer: {
      position: 'relative', width: '160px', height: '160px', marginBottom: '32px',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    },
    planet: {
      width: '90px', height: '90px', borderRadius: '50%',
      background: 'radial-gradient(circle at 30% 30%, #3b82f6 0%, #080B12 70%)',
      border: '1px solid rgba(6, 182, 212, 0.5)',
      boxShadow: '0 0 30px rgba(59, 130, 246, 0.4), inset 0 0 15px rgba(6, 182, 212, 0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative'
    },
    orbitRing: {
      position: 'absolute', width: '150px', height: '150px', borderRadius: '50%',
      border: '1px dashed rgba(6, 182, 212, 0.3)',
      animation: 'orbitSpin 4s linear infinite'
    },
    movingRobot: {
      position: 'absolute',
      animation: 'robotMove 4s linear infinite',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      filter: 'drop-shadow(0 0 8px #06b6d4)'
    },
    title: {
      fontSize: '20px', fontWeight: '800', letterSpacing: '0.15em',
      background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      marginBottom: '8px', textTransform: 'uppercase'
    },
    subtext: {
      fontSize: '12px', color: '#06b6d4', fontFamily: 'monospace',
      letterSpacing: '0.1em', marginBottom: '24px', height: '18px'
    },
    progressBarBg: {
      width: '320px', height: '6px', backgroundColor: '#111722',
      border: '1px solid #1f293d', borderRadius: '4px', overflow: 'hidden',
      boxShadow: 'inset 0 0 10px rgba(0,0,0,0.8)'
    },
    progressBarFill: {
      width: `${progress}%`, height: '100%',
      background: 'linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)',
      boxShadow: '0 0 15px #06b6d4',
      transition: 'width 0.06s linear'
    },
    percentage: {
      marginTop: '12px', fontSize: '13px', fontWeight: '700', color: '#94a3b8', fontFamily: 'monospace'
    }
  };

  return (
    <div style={styles.screen}>
      <style>{`
        @keyframes orbitSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes robotMove {
          0% { transform: rotate(0deg) translateX(75px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(75px) rotate(-360deg); }
        }
        @keyframes pulsePlanet {
          0% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          100% { box-shadow: 0 0 45px rgba(6, 182, 212, 0.6); }
        }
      `}</style>

      {/* Cyber Planet & Orbiting Robot Animation */}
      <div style={styles.sceneContainer}>
        <div style={styles.orbitRing} />
        
        {/* Central Glowing Planet/Globe */}
        <div style={styles.planet}>
          <Globe size={42} color="#06b6d4" style={{ opacity: 0.8 }} />
        </div>

        {/* Moving Robot/Droid Orbiting the Planet */}
        <div style={styles.movingRobot}>
          <div style={{ backgroundColor: '#111722', padding: '6px', borderRadius: '50%', border: '1px solid #06b6d4', boxShadow: '0 0 12px #06b6d4' }}>
            <Bot size={20} color="#06b6d4" />
          </div>
        </div>
      </div>

      <div style={styles.title}>EnterpriseSync // Boot Sequence</div>
      <div style={styles.subtext}>{statusText}</div>

      {/* Loading Bar */}
      <div style={styles.progressBarBg}>
        <div style={styles.progressBarFill} />
      </div>
      
      <div style={styles.percentage}>{progress}% COMPLETE</div>
    </div>
  );
}