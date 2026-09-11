import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Truck, 
  CreditCard, 
  DollarSign, 
  FileText, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function TransactionFlow({ product, offer, onCompleteTransaction }) {
  const [pickupDate, setPickupDate] = useState("2026-09-15");
  const [timeSlot, setTimeSlot] = useState("10:00 AM - 01:00 PM");
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionCompleted, setTransactionCompleted] = useState(false);

  const handleConfirmPickupAndPay = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setTransactionCompleted(true);
      
      // Fire confetti celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log("Confetti trigger", err);
      }
    }, 1500);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }} className="animate-fade-in">
      
      <div className="glass-panel" style={{ padding: '2rem', border: '1px solid var(--accent-emerald)' }}>
        
        {!transactionCompleted ? (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="badge badge-fair" style={{ marginBottom: '0.5rem' }}>Step 2 of 2: Handover & Escrow</span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Schedule Pickup & Confirm Offer</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Confirm your pick-up date and payment preferences with authorized recycler <strong style={{ color: '#FFF' }}>{offer.name}</strong>.
              </p>
            </div>

            {/* Deal Summary Box */}
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.25rem', borderRadius: '12px', marginBottom: '1.5rem', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ color: 'var(--text-muted)' }}>E-Waste Product:</span>
                <strong style={{ color: '#FFF' }}>{product.name} ({product.estimatedWeightKg} kg)</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Agreed Recycler Payout:</span>
                <strong style={{ color: '#34D399', fontSize: '1.2rem' }}>₹{offer.offerPrice.toLocaleString()}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Payment Escrow Method:</span>
                <strong style={{ color: 'var(--accent-cyan)' }}>Instant Direct UPI / Cash on Doorstep Verification</strong>
              </div>
            </div>

            {/* Pickup Date & Slot Form */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                  <Calendar size={14} style={{ display: 'inline', marginRight: '4px' }} /> Preferred Pickup Date
                </label>
                <input 
                  type="date" 
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', background: '#101B3B', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#FFF', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                  <Clock size={14} style={{ display: 'inline', marginRight: '4px' }} /> Time Window
                </label>
                <select 
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', background: '#101B3B', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#FFF', fontSize: '0.85rem' }}
                >
                  <option value="09:00 AM - 12:00 PM">09:00 AM - 12:00 PM</option>
                  <option value="10:00 AM - 01:00 PM">10:00 AM - 01:00 PM</option>
                  <option value="02:00 PM - 05:00 PM">02:00 PM - 05:00 PM</option>
                </select>
              </div>
            </div>

            {/* Guarantee badge */}
            <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)', fontSize: '0.78rem', color: '#34D399', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={18} />
              <span>Free Doorstep Pickup & Certified Material Processing Escrow Guarantee</span>
            </div>

            <button 
              className="btn-primary" 
              onClick={handleConfirmPickupAndPay}
              disabled={isProcessing}
              style={{ width: '100%', padding: '1rem', fontSize: '1.05rem', justifyContent: 'center' }}
            >
              <Truck size={20} />
              <span>{isProcessing ? 'Confirming Logistics & Escrow...' : 'Confirm Pickup & Generate Passport'}</span>
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }} className="animate-fade-in">
            <div style={{
              width: '70px',
              height: '70px',
              background: 'rgba(16, 185, 129, 0.2)',
              border: '3px solid #10B981',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
              boxShadow: '0 0 25px rgba(16, 185, 129, 0.4)'
            }}>
              <CheckCircle2 size={42} color="#10B981" />
            </div>

            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.4rem' }}>
              Pickup Scheduled & Payment Initialized!
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Digital E-Waste Passport <strong style={{ color: 'var(--accent-cyan)' }}>EW-2026-00452</strong> generated.
            </p>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '12px', marginBottom: '1.5rem', textAlign: 'left', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Transaction Status:</span>
                <span className="badge badge-fair">Escrow Locked 🟢</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Scheduled Pickup:</span>
                <strong style={{ color: '#FFF' }}>{pickupDate} ({timeSlot})</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Logistics Vehicle:</span>
                <strong style={{ color: 'var(--accent-cyan)' }}>GreenCycle EcoVan #TN-37-AZ-8812</strong>
              </div>
            </div>

            <button 
              className="btn-primary" 
              onClick={onCompleteTransaction}
              style={{ width: '100%', padding: '1rem', fontSize: '1rem', justifyContent: 'center' }}
            >
              <span>View Digital E-Waste Passport Journey</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
