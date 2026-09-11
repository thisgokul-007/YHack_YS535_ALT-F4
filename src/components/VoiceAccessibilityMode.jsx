import React, { useState } from 'react';
import { 
  Mic, 
  Volume2, 
  Smartphone, 
  Tv, 
  Laptop, 
  Zap, 
  Globe, 
  CheckCircle, 
  X,
  Sparkles
} from 'lucide-react';
import { LOCALES } from '../data/mockData';

export default function VoiceAccessibilityMode({ 
  activeLang, 
  setActiveLang, 
  onSelectCategory, 
  onClose 
}) {
  const [isListening, setIsListening] = useState(false);
  const [spokenResult, setSpokenResult] = useState("");
  const t = LOCALES[activeLang] || LOCALES.en;

  const quickCategories = [
    { id: "fridge", nameEn: "Refrigerator", nameTa: "ஃபிரிட்ஜ் (Refrigerator)", nameHi: "रेफ्रिजरेटर", icon: "🧊", color: "#38BDF8" },
    { id: "mobile", nameEn: "Mobile Phone", nameTa: "செல்போன் (Mobile)", nameHi: "मोबाइल फोन", icon: "📱", color: "#34D399" },
    { id: "tv", nameEn: "Television", nameTa: "டிவி (TV)", nameHi: "टेलीविज़न", icon: "📺", color: "#FBBF24" },
    { id: "washing", nameEn: "Washing Machine", nameTa: "வாஷிங் மெஷின்", nameHi: "वाशिंग मशीन", icon: "🧺", color: "#A78BFA" },
    { id: "laptop", nameEn: "Laptop / Computer", nameTa: "லேப்டாப் / கணினி", nameHi: "लैपटॉप", icon: "💻", color: "#F87171" },
    { id: "cables", nameEn: "Copper Wires", nameTa: "செம்பு ஒயர்கள்", nameHi: "तांबे के तार", icon: "⚡", color: "#F59E0B" }
  ];

  const handleSimulateVoiceInput = () => {
    setIsListening(true);
    setSpokenResult("");

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToSpeak = activeLang === 'ta' ? "நீங்கள் எதை விற்க விரும்புகிறீர்கள்?" : activeLang === 'hi' ? "आप क्या बेचना चाहते हैं?" : "What electronic item do you want to sell today?";
      const u = new SpeechSynthesisUtterance(textToSpeak);
      u.lang = activeLang === 'ta' ? 'ta-IN' : activeLang === 'hi' ? 'hi-IN' : 'en-US';
      window.speechSynthesis.speak(u);
    }

    setTimeout(() => {
      setIsListening(false);
      const res = activeLang === 'ta' ? "பழைய ஃபிரிட்ஜ் (Old Refrigerator) கண்டறியப்பட்டது!" : activeLang === 'hi' ? "पुराना रेफ्रिजरेटर पाया गया!" : "Recognized: Old Refrigerator";
      setSpokenResult(res);
    }, 2500);
  };

  return (
    <div className="modal-overlay animate-fade-in" style={{ zIndex: 1200 }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '850px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '2rem',
        border: '2px solid var(--accent-emerald)',
        background: '#0B132B'
      }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="badge badge-fair" style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}>
              🎤 Voice & High Accessibility Mode
            </span>
          </div>

          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#FFF', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        {/* Language selector ribbon */}
        <div style={{ background: 'rgba(255,255,255,0.06)', padding: '0.75rem', borderRadius: '12px', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 700 }}>
            <Globe size={18} color="var(--accent-cyan)" />
            <span>Select Language / மொழியை தேர்ந்தெடுக்கவும்:</span>
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              onClick={() => setActiveLang('en')}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '8px',
                border: activeLang === 'en' ? '2px solid #10B981' : '1px solid var(--border-color)',
                background: activeLang === 'en' ? '#10B981' : 'transparent',
                color: '#FFF',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              English
            </button>
            
            <button 
              onClick={() => setActiveLang('ta')}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '8px',
                border: activeLang === 'ta' ? '2px solid #10B981' : '1px solid var(--border-color)',
                background: activeLang === 'ta' ? '#10B981' : 'transparent',
                color: '#FFF',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              தமிழ் (Tamil)
            </button>

            <button 
              onClick={() => setActiveLang('hi')}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '8px',
                border: activeLang === 'hi' ? '2px solid #10B981' : '1px solid var(--border-color)',
                background: activeLang === 'hi' ? '#10B981' : 'transparent',
                color: '#FFF',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              हिंदी (Hindi)
            </button>
          </div>
        </div>

        {/* Hero Voice Prompt Banner */}
        <div style={{ textContent: 'center', textAlign: 'center', marginBottom: '2.5rem' }}>
          <button
            onClick={handleSimulateVoiceInput}
            className={isListening ? "voice-pulse-ring" : ""}
            style={{
              width: '110px',
              height: '110px',
              borderRadius: '50%',
              background: isListening ? 'linear-gradient(135deg, #EF4444, #F59E0B)' : 'linear-gradient(135deg, #10B981, #059669)',
              border: 'none',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
              cursor: 'pointer',
              boxShadow: '0 0 30px rgba(16, 185, 129, 0.5)',
              transition: 'transform 0.2s'
            }}
          >
            <Mic size={48} />
          </button>

          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.4rem' }}>
            {isListening 
              ? (activeLang === 'ta' ? "கேட்கிறது... சொல்லுங்கள்..." : activeLang === 'hi' ? "सुन रहा हूँ... बोलिए..." : "Listening... Speak now...") 
              : (activeLang === 'ta' ? "நீங்கள் எதை விற்க விரும்புகிறீர்கள்?" : activeLang === 'hi' ? "आप क्या बेचना चाहते हैं?" : "What do you want to sell?")}
          </h2>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            {activeLang === 'ta' ? "மைக் பட்டனை கிளிக் செய்து குரல் மூலம் சொல்லவும் அல்லது கீழே உள்ள பெரிய படங்களை அழுத்தவும்." : "Tap the microphone or choose one of the giant cards below."}
          </p>

          {spokenResult && (
            <div style={{ marginTop: '1rem', background: 'rgba(16, 185, 129, 0.15)', padding: '0.75rem', borderRadius: '10px', border: '1px solid #10B981', color: '#34D399', fontWeight: 700, display: 'inline-block' }}>
              🎤 {spokenResult}
            </div>
          )}
        </div>

        {/* Giant Pictorial Touch Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
          {quickCategories.map((cat) => {
            const label = activeLang === 'ta' ? cat.nameTa : activeLang === 'hi' ? cat.nameHi : cat.nameEn;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat);
                  onClose();
                }}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '2px solid var(--border-color)',
                  borderRadius: '16px',
                  padding: '1.75rem 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = cat.color;
                  e.currentTarget.style.transform = 'scale(1.03)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.transform = 'scale(1.0)';
                }}
              >
                <span style={{ fontSize: '3rem' }}>{cat.icon}</span>
                <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFF' }}>{label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
