import React, { useState } from 'react';
import { 
  Factory, 
  PlusCircle, 
  Layers, 
  MapPin, 
  CheckCircle, 
  TrendingUp, 
  FileText, 
  ExternalLink,
  ShieldCheck,
  Search,
  Filter,
  DollarSign
} from 'lucide-react';
import { INITIAL_RECYCLER_DEMANDS, MOCK_COLLECTOR_LOTS } from '../data/mockData';
import PostRequirementModal from './PostRequirementModal';

export default function RecyclerDashboard({ onViewPassport }) {
  const [demands, setDemands] = useState(INITIAL_RECYCLER_DEMANDS);
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("ALL");
  const [makeOfferModalLot, setMakeOfferModalLot] = useState(null);
  const [customOfferPrice, setCustomOfferPrice] = useState("");

  const handleAddNewDemand = (newDem) => {
    setDemands([newDem, ...demands]);
  };

  const handleSendOffer = () => {
    alert(`Offer of ₹${customOfferPrice} sent to collector for ${makeOfferModalLot.lotId}!`);
    setMakeOfferModalLot(null);
  };

  return (
    <div style={{ maxWidth: '1300px', margin: '2rem auto', padding: '0 1rem' }} className="animate-fade-in">
      
      {/* Top Banner & Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <span className="badge badge-cyan">Authorized Recycler Portal</span>
            <span className="badge badge-fair"><ShieldCheck size={12} /> CPCB Certified</span>
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>GreenCycle Processing Hub</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Post material requirements, receive AI-matched collector inventory, and manage circular recycling pipelines.
          </p>
        </div>

        <button 
          className="btn-accent-cyan" 
          onClick={() => setShowPostModal(true)}
          style={{ padding: '0.85rem 1.6rem', fontSize: '1rem' }}
        >
          <PlusCircle size={20} />
          <span>Post New Requirement</span>
        </button>
      </div>

      {/* Recycler Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Active Requirements</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#38BDF8', margin: '0.3rem 0' }}>{demands.length}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>AI Auto-matching enabled</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Incoming Lots</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#FFF', margin: '0.3rem 0' }}>12</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)' }}>3 scheduled for pickup today</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Pending Offers</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-amber)', margin: '0.3rem 0' }}>05</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Avg collector acceptance: 88%</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Processed Tonnage</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#34D399', margin: '0.3rem 0' }}>48.5 Tons</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)' }}>100% CPCB compliant</div>
        </div>
      </div>

      {/* Recycler Posted Requirements Cards */}
      <div style={{ marginBottom: '3rem' }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.25rem' }}>Your Active Buying Requirements</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {demands.map((req) => (
            <div key={req.id} className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid var(--accent-cyan)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>{req.badge}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Expires: {req.expiresAt}</span>
              </div>

              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.2rem' }}>{req.productNeeded}</h4>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>{req.location}</div>

              {/* Progress bar */}
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.35rem' }}>
                  <span>Requirement Progress:</span>
                  <strong style={{ color: '#38BDF8' }}>{req.qtyFulfilled} / {req.qtyRequired} {req.unit}</strong>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min(100, (req.qtyFulfilled / req.qtyRequired) * 100)}%`, height: '100%', background: 'var(--accent-cyan)' }}></div>
                </div>
              </div>

              {/* AI Match Found Notification Pill */}
              <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)', fontSize: '0.78rem', color: '#34D399', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>🤖 {req.matchingCollectorsCount} collectors matched nearby</span>
                <button className="btn-secondary" style={{ padding: '0.2rem 0.6rem', fontSize: '0.7rem' }}>View Lots</button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Available Collector E-Waste Marketplace */}
      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Available Collector Lots Nearby</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Verified items uploaded by local collectors awaiting recycler offers</p>
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {["ALL", "Large Household", "IT & Telecom", "Cable Scrap"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategoryFilter(cat)}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  border: selectedCategoryFilter === cat ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                  background: selectedCategoryFilter === cat ? 'rgba(6, 182, 212, 0.2)' : 'transparent',
                  color: selectedCategoryFilter === cat ? '#FFF' : 'var(--text-muted)',
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {MOCK_COLLECTOR_LOTS.map((lot) => (
            <div key={lot.lotId} className="glass-panel" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <span className="badge badge-cyan">{lot.lotId}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                  <MapPin size={12} style={{ display: 'inline' }} /> {lot.collectorLocation}
                </span>
              </div>

              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.2rem' }}>{lot.product}</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Weight: <strong style={{ color: '#FFF' }}>{lot.weightKg} kg</strong> | Condition: <strong style={{ color: 'var(--accent-amber)' }}>{lot.condition}</strong>
              </p>

              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.85rem', borderRadius: '10px', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>AI Estimated Fair Value</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#34D399' }}>{lot.fairValueRange}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
                  Recoverable materials: {lot.recoveredMaterials.slice(0, 2).join(', ')}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button 
                  className="btn-accent-cyan" 
                  style={{ flex: 1, justifyContent: 'center', fontSize: '0.85rem' }}
                  onClick={() => { setMakeOfferModalLot(lot); setCustomOfferPrice("3450"); }}
                >
                  Make Offer
                </button>
                <button 
                  className="btn-secondary" 
                  onClick={() => onViewPassport(lot)}
                  style={{ justifyContent: 'center', fontSize: '0.85rem' }}
                >
                  <ExternalLink size={15} /> Passport
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Post Requirement Modal */}
      {showPostModal && (
        <PostRequirementModal 
          onClose={() => setShowPostModal(false)}
          onPublishSuccess={handleAddNewDemand}
        />
      )}

      {/* Make Offer Modal */}
      {makeOfferModalLot && (
        <div className="modal-overlay animate-fade-in">
          <div className="glass-panel" style={{ width: '100%', maxWidth: '480px', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Make Offer for Lot {makeOfferModalLot.lotId}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Product: <strong style={{ color: '#FFF' }}>{makeOfferModalLot.product} ({makeOfferModalLot.weightKg} kg)</strong>
            </p>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Your Offered Purchase Price (₹)
              </label>
              <input 
                type="number"
                value={customOfferPrice}
                onChange={(e) => setCustomOfferPrice(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--accent-cyan)', borderRadius: '8px', color: '#FFF', fontSize: '1.1rem', fontWeight: 700 }}
              />
              <div style={{ fontSize: '0.7rem', color: 'var(--accent-emerald)', marginTop: '0.35rem' }}>
                AI Recommended Baseline: {makeOfferModalLot.fairValueRange}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setMakeOfferModalLot(null)}>
                Cancel
              </button>
              <button className="btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={handleSendOffer}>
                Submit Offer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
