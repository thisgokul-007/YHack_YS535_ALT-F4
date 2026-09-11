import React, { useState } from 'react';
import Header from './components/Header';
import CollectorDashboard from './components/CollectorDashboard';
import RecyclerDashboard from './components/RecyclerDashboard';
import AIScanner from './components/AIScanner';
import FairValueResults from './components/FairValueResults';
import DigitalPassportView from './components/DigitalPassportView';
import TransactionFlow from './components/TransactionFlow';
import SafetyGuidance from './components/SafetyGuidance';
import VoiceAccessibilityMode from './components/VoiceAccessibilityMode';
import AdminDashboard from './components/AdminDashboard';
import { LOCALES, PRESET_PRODUCTS, MOCK_COLLECTOR_LOTS } from './data/mockData';
import { Camera, Home, ShieldAlert, FileText, Mic } from 'lucide-react';

export default function App() {
  const [activeRole, setActiveRole] = useState('collector'); // 'collector' | 'recycler' | 'admin'
  const [activeView, setActiveView] = useState('dashboard'); // 'dashboard' | 'scanner' | 'valuation' | 'passport' | 'checkout' | 'safety' | 'admin'
  const [activeLang, setActiveLang] = useState('en');
  const [isVoiceModeActive, setIsVoiceModeActive] = useState(false);

  const [currentScannedProduct, setCurrentScannedProduct] = useState(PRESET_PRODUCTS[0]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [selectedPassportLot, setSelectedPassportLot] = useState(MOCK_COLLECTOR_LOTS[0]);

  const t = LOCALES[activeLang] || LOCALES.en;

  // Navigation handler
  const handleNavigate = (view) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScanResult = (product) => {
    setCurrentScannedProduct(product);
    setActiveView('valuation');
  };

  const handleAcceptOffer = (product, offer) => {
    setCurrentScannedProduct(product);
    setSelectedOffer(offer);
    setActiveView('checkout');
  };

  const handleCompleteTransaction = () => {
    const newLot = {
      lotId: "EW-2026-" + Math.floor(10000 + Math.random() * 90000),
      product: currentScannedProduct.name,
      category: currentScannedProduct.category,
      weightKg: currentScannedProduct.estimatedWeightKg,
      condition: currentScannedProduct.defaultCondition,
      fairValueRange: `₹${currentScannedProduct.minFairValue} – ₹${currentScannedProduct.maxFairValue}`,
      currentOffer: selectedOffer?.offerPrice || 3400,
      recyclerName: selectedOffer?.name || "GreenCycle Recycling Unit",
      collectorLocation: "Peelamedu, Coimbatore",
      collectionDate: new Date().toISOString().slice(0, 10),
      handoverDate: "Scheduled",
      recoveredMaterials: currentScannedProduct.materials.map(m => `${m.name} (${m.estKg}kg)`),
      timeline: [
        { step: "Collected", date: "Today", status: "completed", desc: "Pickup confirmed" },
        { step: "AI Classified", date: "Today", status: "completed", desc: "AI Fair Value estimated" },
        { step: "Offer Accepted", date: "Today", status: "completed", desc: `Agreed payout: ₹${selectedOffer?.offerPrice || 3400}` },
        { step: "Picked Up", date: "Scheduled", status: "current", desc: "EcoVan dispatched" },
        { step: "Received by Recycler", date: "Pending", status: "upcoming", desc: "Inward entry" },
        { step: "Dismantled", date: "Pending", status: "upcoming", desc: "Material recovery" },
        { step: "Recycling Completed", date: "Pending", status: "upcoming", desc: "Carbon certificate" }
      ]
    };

    setSelectedPassportLot(newLot);
    setActiveView('passport');
  };

  const handleSelectCategoryFromVoice = (cat) => {
    const matchedPreset = PRESET_PRODUCTS.find(p => p.id.startsWith(cat.id)) || PRESET_PRODUCTS[0];
    setCurrentScannedProduct(matchedPreset);
    setActiveView('scanner');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Header Navigation */}
      <Header 
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        activeLang={activeLang}
        setActiveLang={setActiveLang}
        onToggleVoiceMode={() => setIsVoiceModeActive(!isVoiceModeActive)}
        isVoiceModeActive={isVoiceModeActive}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1, paddingBottom: '5rem' }}>
        
        {activeRole === 'admin' ? (
          <AdminDashboard />
        ) : activeRole === 'recycler' ? (
          activeView === 'passport' ? (
            <DigitalPassportView lot={selectedPassportLot} onBack={() => handleNavigate('dashboard')} />
          ) : (
            <RecyclerDashboard onViewPassport={(lot) => { setSelectedPassportLot(lot); setActiveView('passport'); }} />
          )
        ) : (
          /* Collector Role Views */
          <>
            {activeView === 'dashboard' && (
              <CollectorDashboard 
                onStartScan={() => handleNavigate('scanner')}
                onViewPassport={(lot) => { setSelectedPassportLot(lot); setActiveView('passport'); }}
                onSelectDemand={(demand) => {
                  const matched = PRESET_PRODUCTS[0];
                  setCurrentScannedProduct(matched);
                  setActiveView('scanner');
                }}
                t={t}
              />
            )}

            {activeView === 'scanner' && (
              <AIScanner 
                onSelectScanResult={handleScanResult}
                onNavigateBack={() => handleNavigate('dashboard')}
              />
            )}

            {activeView === 'valuation' && (
              <FairValueResults 
                product={currentScannedProduct}
                onAcceptOffer={handleAcceptOffer}
                onBackToScanner={() => handleNavigate('scanner')}
              />
            )}

            {activeView === 'checkout' && (
              <TransactionFlow 
                product={currentScannedProduct}
                offer={selectedOffer}
                onCompleteTransaction={handleCompleteTransaction}
              />
            )}

            {activeView === 'passport' && (
              <DigitalPassportView 
                lot={selectedPassportLot}
                onBack={() => handleNavigate('dashboard')}
              />
            )}

            {activeView === 'safety' && (
              <SafetyGuidance />
            )}
          </>
        )}

      </main>

      {/* Voice Mode Modal Overlay */}
      {isVoiceModeActive && (
        <VoiceAccessibilityMode 
          activeLang={activeLang}
          setActiveLang={setActiveLang}
          onSelectCategory={handleSelectCategoryFromVoice}
          onClose={() => setIsVoiceModeActive(false)}
        />
      )}

      {/* Bottom Sticky Navigation Bar for Quick Role Navigation */}
      <nav className="glass-panel" style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: 0,
        borderBottom: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        zIndex: 90,
        padding: '0.65rem 1.5rem',
        background: 'rgba(10, 17, 40, 0.92)',
        backdropFilter: 'blur(12px)'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          
          <button 
            onClick={() => handleNavigate('dashboard')}
            style={{
              background: 'transparent',
              border: 'none',
              color: activeView === 'dashboard' ? 'var(--accent-emerald)' : 'var(--text-muted)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.2rem',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: 600
            }}
          >
            <Home size={20} />
            <span>Dashboard</span>
          </button>

          <button 
            onClick={() => handleNavigate('scanner')}
            style={{
              background: activeView === 'scanner' ? 'var(--accent-emerald)' : 'rgba(16, 185, 129, 0.15)',
              border: 'none',
              color: activeView === 'scanner' ? '#FFF' : 'var(--accent-emerald)',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 700,
              boxShadow: '0 0 15px rgba(16, 185, 129, 0.3)'
            }}
          >
            <Camera size={18} />
            <span>Scan AI</span>
          </button>

          <button 
            onClick={() => handleNavigate('safety')}
            style={{
              background: 'transparent',
              border: 'none',
              color: activeView === 'safety' ? 'var(--accent-amber)' : 'var(--text-muted)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.2rem',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: 600
            }}
          >
            <ShieldAlert size={20} />
            <span>Safety 🔊</span>
          </button>

          <button 
            onClick={() => handleNavigate('passport')}
            style={{
              background: 'transparent',
              border: 'none',
              color: activeView === 'passport' ? 'var(--accent-cyan)' : 'var(--text-muted)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.2rem',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: 600
            }}
          >
            <FileText size={20} />
            <span>Passport</span>
          </button>

        </div>
      </nav>

    </div>
  );
}
