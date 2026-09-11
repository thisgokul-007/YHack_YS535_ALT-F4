import React from 'react';
import { 
  Camera, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Recycle, 
  MapPin, 
  ArrowRight, 
  ExternalLink,
  ShieldCheck,
  BellRing
} from 'lucide-react';
import { INITIAL_RECYCLER_DEMANDS, MOCK_COLLECTOR_LOTS } from '../data/mockData';

export default function CollectorDashboard({ 
  onStartScan, 
  onViewPassport, 
  onSelectDemand,
  t 
}) {
  return (
    <div style={{ maxWidth: '1300px', margin: '2rem auto', padding: '0 1rem' }} className="animate-fade-in">
      
      {/* Welcome & Stats Row */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Collector Dashboard</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Manage your scanned electronic inventory, inspect recycler offers, and track recycling passports.
        </p>
      </div>

      {/* 4 Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Active Lots</span>
            <Clock size={20} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#FFF' }}>02</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)' }}>1 lot awaiting pickup</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--accent-amber)', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Pending Offers</span>
            <BellRing size={20} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#FFF' }}>03</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--accent-amber)' }}>Highest offer: ₹3,450</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--accent-emerald)', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Total Earnings</span>
            <DollarSign size={20} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#34D399' }}>₹14,850</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)' }}>+₹3,400 pending payout</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--accent-purple)', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Items Recycled</span>
            <Recycle size={20} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#FFF' }}>162 kg</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--accent-purple)' }}>142 kg CO₂ diverted</div>
        </div>
      </div>

      {/* Primary Action Hero Banner Card */}
      <div className="glass-panel" style={{
        padding: '2.5rem',
        marginBottom: '2.5rem',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 182, 212, 0.1) 100%)',
        border: '1px solid var(--accent-emerald)',
        borderRadius: 'var(--radius-lg)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '650px', position: 'relative', zIndex: 2 }}>
          <span className="badge badge-cyan" style={{ marginBottom: '0.75rem' }}>
            AI Fair-Value Powered
          </span>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Scan Your E-Waste
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Know what you have and what it may be worth. Take a quick photo to get instant material breakdown and fair market prices from authorized recyclers.
          </p>

          <button 
            className="btn-primary" 
            onClick={onStartScan}
            style={{ padding: '1rem 2.2rem', fontSize: '1.1rem', borderRadius: 'var(--radius-md)' }}
          >
            <Camera size={22} />
            <span>Scan / Upload E-Waste Now</span>
          </button>
        </div>

        {/* Decorative graphic background element */}
        <div style={{
          position: 'absolute',
          right: '-20px',
          bottom: '-30px',
          opacity: 0.15,
          pointerEvents: 'none'
        }}>
          <Recycle size={320} color="#10B981" />
        </div>
      </div>

      {/* Recycler Demand Section */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Recycler Demand Near You</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Authorized recycling units seeking immediate e-waste supply</p>
          </div>
          <span className="badge badge-fair">4 Active Buying Posts</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {INITIAL_RECYCLER_DEMANDS.map((demand) => (
            <div key={demand.id} className="glass-card-interactive" style={{ padding: '1.25rem' }} onClick={() => onSelectDemand(demand)}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>{demand.badge}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                  <MapPin size={12} style={{ display: 'inline' }} /> {demand.distanceKm} km away
                </span>
              </div>

              <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.2rem' }}>{demand.productNeeded}</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
                By {demand.recyclerName} • {demand.location}
              </p>

              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Offered Rate</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#34D399' }}>
                    ₹{demand.offeredPricePerUnit.toLocaleString()}/{demand.unit.replace('units', 'unit')}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quantity Needed</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#FFF' }}>
                    {demand.qtyRequired} {demand.unit}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn-secondary" style={{ flex: 1, padding: '0.5rem', fontSize: '0.78rem', justifyContent: 'center' }}>
                  View Demand
                </button>
                <button className="btn-primary" style={{ flex: 1, padding: '0.5rem', fontSize: '0.78rem', justifyContent: 'center' }}>
                  Sell to Recycler
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* My E-Waste Lots Section */}
      <div>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>My Registered E-Waste Lots</h3>
        
        <div className="glass-panel" style={{ padding: '1rem', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem' }}>Lot Passport ID</th>
                <th style={{ padding: '0.75rem' }}>Product Name</th>
                <th style={{ padding: '0.75rem' }}>Weight</th>
                <th style={{ padding: '0.75rem' }}>AI Fair Value</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
                <th style={{ padding: '0.75rem' }}>Recycler</th>
                <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_COLLECTOR_LOTS.map((lot) => (
                <tr key={lot.lotId} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                    {lot.lotId}
                  </td>
                  <td style={{ padding: '0.75rem', fontWeight: 600 }}>{lot.product}</td>
                  <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{lot.weightKg} kg</td>
                  <td style={{ padding: '0.75rem', color: '#34D399', fontWeight: 700 }}>{lot.fairValueRange}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span className={lot.status === 'Recycling Completed' ? 'badge badge-fair' : 'badge badge-cyan'}>
                      {lot.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{lot.recyclerName}</td>
                  <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                    <button 
                      className="btn-secondary" 
                      onClick={() => onViewPassport(lot)}
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                    >
                      <ExternalLink size={13} /> Digital Passport
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
