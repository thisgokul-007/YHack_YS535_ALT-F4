import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, Factory, MapPin } from 'lucide-react';

export default function PostRequirementModal({ onClose, onPublishSuccess }) {
  const [product, setProduct] = useState("Old Refrigerators");
  const [category, setCategory] = useState("Large Household E-Waste");
  const [quantity, setQuantity] = useState("50");
  const [unit, setUnit] = useState("units");
  const [price, setPrice] = useState("3450");
  const [location, setLocation] = useState("Coimbatore, TN");
  const [isPublishing, setIsPublishing] = useState(false);
  const [published, setPublished] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPublishing(true);

    setTimeout(() => {
      setIsPublishing(false);
      setPublished(true);
    }, 1200);
  };

  return (
    <div className="modal-overlay animate-fade-in">
      <div className="glass-panel" style={{ width: '100%', maxWidth: '620px', padding: '2rem', position: 'relative' }}>
        
        <button 
          onClick={onClose} 
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        {!published ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <Factory size={22} color="var(--accent-cyan)" />
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Post Recycler Requirement</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Specify the e-waste products or raw scrap materials your plant needs. Our AI will automatically notify nearby collectors.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                  Product / Material Name
                </label>
                <input 
                  type="text" 
                  value={product} 
                  onChange={(e) => setProduct(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#FFF', fontSize: '0.9rem' }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                    Category
                  </label>
                  <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', background: '#101B3B', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#FFF', fontSize: '0.85rem' }}
                  >
                    <option value="Large Household E-Waste">Large Household E-Waste</option>
                    <option value="IT & Telecommunications">IT & Telecommunications</option>
                    <option value="Consumer Electronics">Consumer Electronics</option>
                    <option value="Cable & Wiring Scrap">Cable & Wiring Scrap</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                    Quantity Needed
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input 
                      type="number" 
                      value={quantity} 
                      onChange={(e) => setQuantity(e.target.value)}
                      style={{ flex: 1, padding: '0.65rem 0.85rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#FFF', fontSize: '0.9rem' }}
                      required
                    />
                    <select 
                      value={unit} 
                      onChange={(e) => setUnit(e.target.value)}
                      style={{ padding: '0.65rem 0.5rem', background: '#101B3B', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#FFF', fontSize: '0.85rem' }}
                    >
                      <option value="units">units</option>
                      <option value="kg">kg</option>
                      <option value="tons">tons</option>
                    </select>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                    Offered Price per Unit/Kg (₹)
                  </label>
                  <input 
                    type="number" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#FFF', fontSize: '0.9rem' }}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                    Preferred Location
                  </label>
                  <input 
                    type="text" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#FFF', fontSize: '0.9rem' }}
                    required
                  />
                </div>
              </div>

              <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                <button type="button" className="btn-secondary" onClick={onClose} style={{ flex: 1, justifyContent: 'center' }}>
                  Cancel
                </button>
                <button type="submit" className="btn-accent-cyan" style={{ flex: 1, justifyContent: 'center', padding: '0.85rem' }} disabled={isPublishing}>
                  {isPublishing ? 'Publishing & AI Matching...' : 'Publish Requirement'}
                </button>
              </div>

            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }} className="animate-fade-in">
            <div style={{
              width: '60px',
              height: '60px',
              background: 'rgba(16, 185, 129, 0.2)',
              border: '2px solid #10B981',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem'
            }}>
              <CheckCircle2 size={34} color="#10B981" />
            </div>
            
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.4rem' }}>Requirement Published!</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Your demand for <strong style={{ color: '#FFF' }}>{quantity} {unit} of {product}</strong> at ₹{price}/{unit} is now live.
            </p>

            {/* AI Match Found Box */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(16, 185, 129, 0.15) 100%)',
              border: '1px solid var(--accent-cyan)',
              borderRadius: '12px',
              padding: '1.25rem',
              marginBottom: '1.5rem',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#38BDF8', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                <Sparkles size={16} /> AI MATCH FOUND
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFF' }}>
                23 collectors near {location} have matching e-waste!
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Push notifications have been dispatched to matching collectors near Peelamedu and Gandhipuram.
              </div>
            </div>

            <button 
              className="btn-primary" 
              onClick={() => {
                onPublishSuccess({
                  id: "dem-" + Date.now(),
                  recyclerName: "Apex Authorized Processing",
                  location,
                  distanceKm: 8,
                  productNeeded: product,
                  category,
                  qtyRequired: parseInt(quantity),
                  unit,
                  qtyFulfilled: 0,
                  offeredPricePerUnit: parseInt(price),
                  expiresAt: "2026-10-30",
                  matchingCollectorsCount: 23,
                  status: "ACTIVE",
                  badge: "AI Matched"
                });
                onClose();
              }}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Done & View Matches
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
