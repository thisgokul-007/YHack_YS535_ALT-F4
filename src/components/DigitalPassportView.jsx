import React from 'react';
import { 
  FileCheck, 
  QrCode, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Download, 
  Share2, 
  Leaf, 
  Zap, 
  Award, 
  ChevronLeft,
  ArrowRight,
  Layers,
  Building2,
  UserCheck
} from 'lucide-react';

export default function DigitalPassportView({ lot, onBack }) {
  const passportData = lot || {
    lotId: "EW-2026-00452",
    product: "Old Refrigerator",
    category: "Large Household E-Waste",
    weightKg: 70,
    condition: "Non-functional",
    fairValueRange: "₹3,000 – ₹3,600",
    currentOffer: 3400,
    recyclerName: "GreenCycle Recycling Unit (CPCB Certified)",
    collectorLocation: "Peelamedu, Coimbatore",
    collectionDate: "08 Sep 2026",
    handoverDate: "12 Sep 2026",
    recoveredMaterials: ["Steel (38.5kg)", "Copper (8.4kg)", "Aluminium (5.6kg)", "Plastic (10.5kg)"],
    timeline: [
      { step: "Collected", date: "08 Sep 2026", status: "completed", desc: "Picked up from collector location in Peelamedu" },
      { step: "AI Classified", date: "08 Sep 2026", status: "completed", desc: "Scanned & categorized as Large Household E-Waste" },
      { step: "Fair Value Estimated", date: "09 Sep 2026", status: "completed", desc: "Market valuation baseline established: ₹3,000–₹3,600" },
      { step: "Recycler Matched", date: "09 Sep 2026", status: "completed", desc: "Matched with GreenCycle Recycling Unit" },
      { step: "Offer Accepted", date: "10 Sep 2026", status: "completed", desc: "Collector agreed to offer of ₹3,400" },
      { step: "Picked Up", date: "11 Sep 2026", status: "completed", desc: "Logistics truck dispatched for doorstep collection" },
      { step: "Received by Recycler", date: "12 Sep 2026", status: "completed", desc: "Inward entry logged at Coimbatore Processing Facility" },
      { step: "Dismantled", date: "13 Sep 2026", status: "completed", desc: "Gas evacuation completed & structural tearing" },
      { step: "Materials Recovered", date: "14 Sep 2026", status: "completed", desc: "Copper, Steel, and Plastics separated & refined" },
      { step: "Recycling Completed", date: "15 Sep 2026", status: "completed", desc: "Digital Carbon Certificate issued" }
    ]
  };

  const handleDownloadCertificate = () => {
    alert(`Downloading Official CPCB Green E-Waste Certificate for ID: ${passportData.lotId}...`);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '2rem auto', padding: '0 1rem' }} className="animate-fade-in">
      
      {/* Top Back Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <button className="btn-secondary" onClick={onBack} style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>
          <ChevronLeft size={16} /> Back to Dashboard
        </button>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn-secondary" onClick={() => alert("Passport link copied to clipboard!")} style={{ fontSize: '0.8rem' }}>
            <Share2 size={15} /> Share Link
          </button>
          <button className="btn-primary" onClick={handleDownloadCertificate} style={{ fontSize: '0.8rem' }}>
            <Download size={15} /> Download PDF Certificate
          </button>
        </div>
      </div>

      {/* Hero Header Card */}
      <div className="glass-panel" style={{
        padding: '2rem',
        marginBottom: '2rem',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(16, 27, 59, 0.95) 100%)',
        border: '1px solid var(--accent-emerald)',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
              <span className="badge badge-fair" style={{ fontSize: '0.7rem' }}>
                <ShieldCheck size={13} /> Blockchain Verified Traceability
              </span>
              <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>CPCB Green Tag</span>
            </div>

            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, background: 'linear-gradient(90deg, #FFF, #34D399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Digital E-Waste Passport
            </h2>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-cyan)', fontFamily: 'monospace', letterSpacing: '0.05em' }}>
              SERIAL ID: {passportData.lotId}
            </div>
          </div>

          {/* QR Code Visual Simulation */}
          <div style={{
            background: '#FFF',
            padding: '0.75rem',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)'
          }}>
            <QrCode size={90} color="#0A1128" />
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#0A1128', marginTop: '0.2rem', letterSpacing: '0.05em' }}>
              SCAN TO VERIFY
            </div>
          </div>
        </div>

        {/* Environmental Impact Counter Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.85rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Leaf size={28} color="#34D399" />
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#34D399' }}>142 kg</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>CO₂ Emissions Diverted</div>
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.85rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Zap size={28} color="#FBBF24" />
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FBBF24' }}>820 kWh</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Virgin Energy Saved</div>
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.85rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Award size={28} color="#38BDF8" />
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38BDF8' }}>100%</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Zero Landfill Diverted</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lot Metadata Breakdown Grid */}
      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.65rem' }}>
          Passport Core Attributes
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', fontSize: '0.85rem' }}>
          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>E-Waste Product</span>
            <strong style={{ color: '#FFF', fontSize: '1rem' }}>{passportData.product}</strong>
          </div>

          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Category</span>
            <strong style={{ color: 'var(--accent-cyan)' }}>{passportData.category}</strong>
          </div>

          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Weight</span>
            <strong style={{ color: '#FFF' }}>{passportData.weightKg} kg</strong>
          </div>

          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Accepted Offer</span>
            <strong style={{ color: '#34D399', fontSize: '1.1rem' }}>₹{passportData.currentOffer?.toLocaleString()}</strong>
          </div>

          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Collector Location</span>
            <strong style={{ color: '#FFF' }}>{passportData.collectorLocation}</strong>
          </div>

          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Authorized Recycler</span>
            <strong style={{ color: '#38BDF8' }}>{passportData.recyclerName}</strong>
          </div>
        </div>

        {/* Recovered materials list */}
        <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>
            RECOVERED SECONDARY MATERIALS:
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {passportData.recoveredMaterials.map((mat, i) => (
              <span key={i} className="badge badge-fair" style={{ fontSize: '0.75rem' }}>
                ✓ {mat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Visually Impressive Tracking Timeline */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Clock size={22} color="var(--accent-emerald)" />
          End-to-End Recycling Journey Timeline
        </h3>

        <div style={{ position: 'relative', paddingLeft: '1.5rem', borderLeft: '3px solid var(--accent-emerald)' }}>
          {passportData.timeline.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '1.75rem', position: 'relative' }}>
              {/* Bullet Node */}
              <div style={{
                position: 'absolute',
                left: '-1.95rem',
                top: '0px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: item.status === 'completed' ? 'var(--accent-emerald)' : item.status === 'current' ? 'var(--accent-cyan)' : '#101B3B',
                border: item.status === 'completed' ? '3px solid var(--bg-primary)' : '2px solid var(--border-color)',
                boxShadow: item.status === 'completed' ? '0 0 10px #10B981' : 'none'
              }}></div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: item.status === 'completed' ? '#FFF' : 'var(--text-muted)' }}>
                  {idx + 1}. {item.step}
                </h4>
                <span className={item.status === 'completed' ? 'badge badge-fair' : 'badge'} style={{ fontSize: '0.65rem' }}>
                  {item.date}
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                {item.desc || "Verified on platform"}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
