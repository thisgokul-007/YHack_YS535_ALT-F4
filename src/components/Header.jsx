import React, { useState } from 'react';
import { 
  Recycle, 
  UserCheck, 
  Factory, 
  ShieldCheck, 
  Mic, 
  Bell, 
  Globe 
} from 'lucide-react';
import { LOCALES } from '../data/mockData';

export default function Header({ 
  activeRole, 
  setActiveRole, 
  activeLang, 
  setActiveLang, 
  onToggleVoiceMode,
  isVoiceModeActive,
  onNavigate
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const t = LOCALES[activeLang] || LOCALES.en;

  const notifications = [
    { id: 1, title: "🔔 New Recycler Demand Found", desc: "ABC Recycling is looking for 50 Refrigerators in Coimbatore at ₹3,450/unit.", time: "10m ago" },
    { id: 2, title: "✅ Offer Accepted", desc: "GreenCycle Unit accepted your quote for EW-2026-00452.", time: "1h ago" },
    { id: 3, title: "🌱 Carbon Diverted", desc: "Your recycled items have diverted 142 kg of CO₂ from landfill.", time: "1d ago" }
  ];

  return (
    <header className="glass-panel" style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none', position: 'sticky', top: 0, zIndex: 100, padding: '0.85rem 1.5rem' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand Logo & Tagline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }} onClick={() => onNavigate('dashboard')}>
          <div style={{
            background: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)',
            padding: '0.65rem',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)'
          }}>
            <Recycle size={28} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 800, background: 'linear-gradient(90deg, #FFFFFF, #34D399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {t.appName}
              </h1>
              <span className="badge badge-cyan" style={{ fontSize: '0.65rem', padding: '0.15rem 0.45rem' }}>v2.4 Hackathon Live</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Desktop Nav Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          
          {/* Role Switcher Pill Container */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            padding: '0.25rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center'
          }}>
            <button
              onClick={() => { setActiveRole('collector'); onNavigate('dashboard'); }}
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: activeRole === 'collector' ? 'var(--accent-emerald)' : 'transparent',
                color: activeRole === 'collector' ? '#FFF' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s ease'
              }}
            >
              <UserCheck size={14} />
              {t.collector}
            </button>

            <button
              onClick={() => { setActiveRole('recycler'); onNavigate('dashboard'); }}
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: activeRole === 'recycler' ? 'var(--accent-cyan)' : 'transparent',
                color: activeRole === 'recycler' ? '#FFF' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s ease'
              }}
            >
              <Factory size={14} />
              {t.recycler}
            </button>

            <button
              onClick={() => { setActiveRole('admin'); onNavigate('admin'); }}
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: activeRole === 'admin' ? 'var(--accent-purple)' : 'transparent',
                color: activeRole === 'admin' ? '#FFF' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s ease'
              }}
            >
              <ShieldCheck size={14} />
              {t.admin}
            </button>
          </div>

          {/* Voice Mode Toggle Button */}
          <button
            onClick={onToggleVoiceMode}
            className={isVoiceModeActive ? "voice-pulse-ring" : ""}
            style={{
              background: isVoiceModeActive ? 'linear-gradient(135deg, #EF4444, #F59E0B)' : 'rgba(255, 255, 255, 0.07)',
              border: isVoiceModeActive ? 'none' : '1px solid var(--border-color)',
              color: '#FFF',
              padding: '0.5rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s ease'
            }}
            title="Enable High-Accessibility Voice Mode"
          >
            <Mic size={16} color={isVoiceModeActive ? "#FFF" : "var(--accent-emerald)"} />
            <span>
              {isVoiceModeActive ? 'Voice Active' : t.voiceMode}
            </span>
          </button>

          {/* Language Selector Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: 'rgba(255,255,255,0.05)', padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <Globe size={15} color="var(--accent-cyan)" />
            <select
              value={activeLang}
              onChange={(e) => setActiveLang(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-main)',
                fontSize: '0.8rem',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="en" style={{ background: '#101B3B' }}>English</option>
              <option value="ta" style={{ background: '#101B3B' }}>தமிழ் (Tamil)</option>
              <option value="hi" style={{ background: '#101B3B' }}>हिंदी (Hindi)</option>
            </select>
          </div>

          {/* Notifications Center */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid var(--border-color)',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                color: 'var(--text-main)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              <Bell size={18} />
              <span style={{
                position: 'absolute',
                top: '2px',
                right: '2px',
                width: '10px',
                height: '10px',
                background: 'var(--accent-emerald)',
                borderRadius: '50%',
                border: '2px solid var(--bg-primary)'
              }}></span>
            </button>

            {/* Notifications Modal Dropdown */}
            {showNotifications && (
              <div className="glass-panel animate-fade-in" style={{
                position: 'absolute',
                right: 0,
                top: '48px',
                width: '340px',
                padding: '1rem',
                zIndex: 200,
                boxShadow: '0 15px 35px rgba(0,0,0,0.5)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Notifications</h4>
                  <span style={{ fontSize: '0.7rem', color: 'var(--accent-emerald)' }}>3 Unread</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {notifications.map((n) => (
                    <div key={n.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '0.65rem', borderRadius: '8px', borderLeft: '3px solid var(--accent-emerald)' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>{n.title}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>{n.desc}</div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>{n.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}
