import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  MapPin, 
  Award, 
  ArrowRight, 
  ShieldCheck, 
  DollarSign,
  Layers,
  ChevronLeft
} from 'lucide-react';

export default function FairValueResults({ product, onAcceptOffer, onBackToScanner }) {
  const [selectedOffer, setSelectedOffer] = useState(product.sampleOffers[0]);

  const minFair = product.minFairValue;
  const maxFair = product.maxFairValue;

  const getOfferEvaluation = (price) => {
    if (price >= minFair) {
      return {
        badgeClass: "badge-fair",
        icon: <CheckCircle size={15} color="#34D399" />,
        label: "🟢 FAIR OFFER",
        explanation: "This offer falls within or above the estimated fair-value market baseline."
      };
    } else if (price >= minFair * 0.85) {
      return {
        badgeClass: "badge-below",
        icon: <AlertCircle size={15} color="#FBBF24" />,
        label: "🟡 BELOW FAIR VALUE",
        explanation: "This offer is approximately 10–15% below estimated fair-value due to transport overhead."
      };
    } else {
      return {
        badgeClass: "badge-unfair",
        icon: <XCircle size={15} color="#F87171" />,
        label: "🔴 POTENTIALLY UNFAIR OFFER",
        explanation: "This offer is approximately 20–30% below the estimated fair-value range. Authorized recyclers yield higher payout."
      };
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '2rem auto', padding: '0 1rem' }} className="animate-fade-in">
      
      {/* Back link */}
      <button 
        onClick={onBackToScanner} 
        className="btn-secondary"
        style={{ marginBottom: '1.5rem', padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
      >
        <ChevronLeft size={16} /> Back to Scanner
      </button>

      {/* Hero Header Card */}
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="badge badge-cyan" style={{ marginBottom: '0.5rem' }}>AI Valuation Report</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>{product.name}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Condition: <strong style={{ color: '#FFF' }}>{product.defaultCondition}</strong> | Weight: <strong style={{ color: '#FFF' }}>{product.estimatedWeightKg} kg</strong>
            </p>
          </div>

          <div style={{
            background: 'rgba(10, 17, 40, 0.8)',
            padding: '1.25rem 2rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--accent-emerald)',
            textAlign: 'center',
            boxShadow: 'var(--shadow-glow)'
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Estimated Fair Value Range
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#34D399' }}>
              ₹{minFair.toLocaleString()} – ₹{maxFair.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)' }}>
              Certified Recycler Baseline
            </div>
          </div>
        </div>

        {/* Material Valuation Breakdown Pills */}
        <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.65rem' }}>
            VALUATION INGREDIENT BREAKDOWN:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {product.materials.map((m, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.04)', padding: '0.4rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.78rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{m.name}: </span>
                <strong style={{ color: 'var(--accent-emerald)' }}>₹{Math.round(m.estKg * m.ratePerKg)}</strong>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)', marginLeft: '4px' }}>({m.estKg}kg @ ₹{m.ratePerKg}/kg)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recycler Offers Comparison Section */}
      <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <DollarSign size={22} color="var(--accent-emerald)" />
        Current Authorized Recycler Offers ({product.sampleOffers.length})
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
        {product.sampleOffers.map((offer, idx) => {
          const evalResult = getOfferEvaluation(offer.offerPrice);
          const isSelected = selectedOffer?.recyclerId === offer.recyclerId;

          return (
            <div 
              key={idx}
              className="glass-panel"
              style={{
                padding: '1.5rem',
                border: isSelected ? '2px solid var(--accent-emerald)' : '1px solid var(--border-color)',
                background: isSelected ? 'rgba(16, 185, 129, 0.07)' : 'var(--bg-card)',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
                
                {/* Recycler Details */}
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{offer.name}</h4>
                    {offer.isAuthorized && (
                      <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>
                        <ShieldCheck size={12} /> CPCB Authorized
                      </span>
                    )}
                    <span className="badge" style={{ background: 'rgba(255,255,255,0.06)', color: '#FFF', fontSize: '0.65rem' }}>
                      {offer.tag}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <MapPin size={14} color="var(--accent-cyan)" /> {offer.distanceKm} km away
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Award size={14} color="var(--accent-amber)" /> Rating: {offer.rating} ★
                    </span>
                  </div>
                </div>

                {/* Offer Price & Status Badge */}
                <div style={{ textAlign: 'right' }}>
                  <div className={`badge ${evalResult.badgeClass}`} style={{ marginBottom: '0.35rem' }}>
                    {evalResult.icon}
                    {evalResult.label}
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: offer.offerPrice >= minFair ? '#34D399' : '#F87171' }}>
                    ₹{offer.offerPrice.toLocaleString()}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  className={isSelected ? "btn-primary" : "btn-secondary"}
                  onClick={() => setSelectedOffer(offer)}
                  style={{ minWidth: '140px', justifyContent: 'center' }}
                >
                  {isSelected ? 'Selected' : 'Select Offer'}
                </button>

              </div>

              {/* Offer Evaluation Explanation Box */}
              <div style={{
                marginTop: '1rem',
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                background: offer.offerPrice >= minFair ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
                border: offer.offerPrice >= minFair ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(239, 68, 68, 0.2)',
                fontSize: '0.78rem',
                color: offer.offerPrice >= minFair ? '#34D399' : '#F87171',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                {evalResult.icon}
                <span>{evalResult.explanation}</span>
              </div>

            </div>
          );
        })}
      </div>

      {/* Hero Checkout Banner */}
      {selectedOffer && (
        <div className="glass-panel animate-fade-in" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(16, 27, 59, 0.9) 100%)', border: '1px solid var(--accent-emerald)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Ready to accept offer:</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFF' }}>
              {selectedOffer.name} — <span style={{ color: '#34D399' }}>₹{selectedOffer.offerPrice.toLocaleString()}</span>
            </div>
          </div>

          <button 
            className="btn-primary" 
            style={{ padding: '0.85rem 2rem', fontSize: '1.05rem' }}
            onClick={() => onAcceptOffer(product, selectedOffer)}
          >
            <span>Proceed to Schedule Pickup & Passport</span>
            <ArrowRight size={20} />
          </button>
        </div>
      )}

    </div>
  );
}
