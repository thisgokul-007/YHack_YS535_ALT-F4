import React from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  BarChart3, 
  CheckCircle, 
  Users, 
  Building2, 
  FileSpreadsheet, 
  TrendingUp,
  Download,
  Lock
} from 'lucide-react';

export default function AdminDashboard() {
  const verifiedRecyclers = [
    { id: "REC-CPCB-001", name: "GreenCycle Recycling Unit", cpcbLic: "TN/CPCB/EW/2024/089", capacity: "50 Tons/Month", compliance: "100%", status: "VERIFIED" },
    { id: "REC-CPCB-002", name: "EcoMetals Processing Ltd", cpcbLic: "TN/CPCB/EW/2025/112", capacity: "120 Tons/Month", compliance: "98.5%", status: "VERIFIED" },
    { id: "REC-CPCB-003", name: "Silicon Recovery Solutions", cpcbLic: "KA/CPCB/EW/2023/045", capacity: "30 Tons/Month", compliance: "100%", status: "VERIFIED" },
    { id: "REC-FLAG-099", name: "Uncertified Scrap Buyer (Flagged)", cpcbLic: "NO LICENSE DETECTED", capacity: "Unknown", compliance: "0%", status: "SUSPENDED" }
  ];

  return (
    <div style={{ maxWidth: '1300px', margin: '2rem auto', padding: '0 1rem' }} className="animate-fade-in">
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <span className="badge badge-cyan"><Lock size={12} /> Platform Audit Control Room</span>
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>State Circular Economy & Compliance Portal</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Real-time monitoring of formal e-waste tonnage, CPCB compliance, and illegal uncertified buyer prevention.
          </p>
        </div>

        <button className="btn-secondary" onClick={() => alert("Downloading State E-Waste Audit Report CSV...")}>
          <Download size={16} /> Export Audit Report (CSV)
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Tonnage Recycled</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#34D399', margin: '0.3rem 0' }}>1,482 Tons</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)' }}>+14.2% month-over-month</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>CPCB Authorized Units</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#38BDF8', margin: '0.3rem 0' }}>142 Units</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>100% license verified</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Circular Value Flow</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FBBF24', margin: '0.3rem 0' }}>₹4.82 Cr</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--accent-amber)' }}>Fair value distributed to collectors</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Illegal Buyers Blocked</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#F87171', margin: '0.3rem 0' }}>18 Flagged</div>
          <div style={{ fontSize: '0.72rem', color: '#F87171' }}>Prevented informal burning</div>
        </div>
      </div>

      {/* Recyclers Compliance Audit Table */}
      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.25rem' }}>Authorized Recycler License Registry</h3>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem' }}>Recycler Unit ID</th>
                <th style={{ padding: '0.75rem' }}>Company Name</th>
                <th style={{ padding: '0.75rem' }}>CPCB License Number</th>
                <th style={{ padding: '0.75rem' }}>Monthly Capacity</th>
                <th style={{ padding: '0.75rem' }}>Compliance Score</th>
                <th style={{ padding: '0.75rem' }}>Verification Status</th>
              </tr>
            </thead>
            <tbody>
              {verifiedRecyclers.map((r) => (
                <tr key={r.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>{r.id}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 600 }}>{r.name}</td>
                  <td style={{ padding: '0.75rem', fontFamily: 'monospace', color: 'var(--text-muted)' }}>{r.cpcbLic}</td>
                  <td style={{ padding: '0.75rem' }}>{r.capacity}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 700, color: '#34D399' }}>{r.compliance}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span className={r.status === 'VERIFIED' ? 'badge badge-fair' : 'badge badge-unfair'}>
                      {r.status === 'VERIFIED' ? '✓ VERIFIED' : '⚠ SUSPENDED'}
                    </span>
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
