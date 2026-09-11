import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX, 
  ShieldAlert, 
  BatteryWarning, 
  Tv, 
  Cpu, 
  Sparkles,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { SAFETY_INSTRUCTIONS } from '../data/mockData';

export default function SafetyGuidance() {
  const [activeAudioId, setActiveAudioId] = useState(null);

  const handlePlaySpeech = (item) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      if (activeAudioId === item.id) {
        setActiveAudioId(null);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(item.speechText);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      
      utterance.onend = () => {
        setActiveAudioId(null);
      };
      
      utterance.onerror = () => {
        setActiveAudioId(null);
      };

      setActiveAudioId(item.id);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech audio is supported in your modern browser! Speech simulation activated.");
      setActiveAudioId(item.id);
      setTimeout(() => setActiveAudioId(null), 4000);
    }
  };

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'ShieldAlert': return <ShieldAlert size={28} color="#FBBF24" />;
      case 'BatteryWarning': return <BatteryWarning size={28} color="#F87171" />;
      case 'Tv': return <Tv size={28} color="#38BDF8" />;
      case 'Cpu': return <Cpu size={28} color="#34D399" />;
      default: return <ShieldAlert size={28} color="#FBBF24" />;
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }} className="animate-fade-in">
      
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="badge badge-below" style={{ marginBottom: '0.5rem' }}>
          <ShieldAlert size={13} /> Essential Pre-Handling Protocols
        </span>
        <h2 style={{ fontSize: '2.4rem', fontWeight: 800 }}>E-Waste Safety & Hazard Guidance</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '650px', margin: '0.5rem auto 0' }}>
          Simple visual cards and audio instructions to protect collectors and recyclers from toxic gases, chemical leaks, and fire hazards.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {SAFETY_INSTRUCTIONS.map((item) => {
          const isPlaying = activeAudioId === item.id;

          return (
            <div 
              key={item.id} 
              className="glass-panel"
              style={{
                padding: '1.75rem',
                border: isPlaying ? '2px solid var(--accent-emerald)' : '1px solid var(--border-color)',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.65rem', borderRadius: '12px' }}>
                  {renderIcon(item.icon)}
                </div>
                <span className="badge badge-below" style={{ fontSize: '0.65rem' }}>
                  {item.hazardTag}
                </span>
              </div>

              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.85rem' }}>{item.title}</h3>

              {/* Points */}
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {item.points.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>

              {/* 🔊 Audio Playback Button */}
              <button
                onClick={() => handlePlaySpeech(item)}
                className={isPlaying ? "btn-primary voice-pulse-ring" : "btn-secondary"}
                style={{ width: '100%', padding: '0.75rem', justifyContent: 'center', fontSize: '0.85rem' }}
              >
                {isPlaying ? <VolumeX size={16} /> : <Volume2 size={16} color="var(--accent-emerald)" />}
                <span>{isPlaying ? 'Stop Audio' : '🔊 Listen to Safety Instructions'}</span>

                {/* Animated Equalizer Visualizer */}
                {isPlaying && (
                  <div style={{ display: 'flex', gap: '3px', alignItems: 'center', marginLeft: '6px' }}>
                    <div className="equalizer-bar"></div>
                    <div className="equalizer-bar"></div>
                    <div className="equalizer-bar"></div>
                    <div className="equalizer-bar"></div>
                  </div>
                )}
              </button>

            </div>
          );
        })}
      </div>

    </div>
  );
}
