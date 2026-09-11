import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Scale, 
  ArrowRight,
  RefreshCw,
  Cpu,
  HelpCircle,
  ChevronLeft,
  AlertCircle,
  Tag,
  Edit3,
  Info,
  DollarSign,
  Terminal,
  ChevronDown,
  ChevronUp,
  XCircle
} from 'lucide-react';
import { PRESET_PRODUCTS } from '../data/mockData';
import { defaultYoloDetector } from '../utils/yoloDetector';
import { 
  calculateFairValue, 
  evaluateRecyclerOffer, 
  CATEGORY_REFERENCE_DATA, 
  BRAND_TAXONOMY 
} from '../utils/fairValueEngine';
import CameraScanner from './CameraScanner';

export const CATEGORY_BRANDS = {
  "Mobile Phone": [
    "Samsung", "Apple", "OnePlus", "Xiaomi", "Redmi", "Realme", "Vivo", "Oppo", "Motorola", "Google"
  ],
  "Laptop": [
    "Dell", "HP", "Lenovo", "Asus", "Acer", "Apple", "MSI", "Samsung", "Microsoft"
  ],
  "Refrigerator": [
    "LG", "Samsung", "Whirlpool", "Godrej", "Haier", "Panasonic", "IFB", "Bosch", "Voltas Beko"
  ],
  "Air Conditioner": [
    "LG", "Samsung", "Daikin", "Voltas", "Blue Star", "Panasonic", "Carrier", "Hitachi", "Lloyd"
  ],
  "Television": [
    "Samsung", "LG", "Sony", "OnePlus", "Xiaomi", "TCL", "Hisense", "Panasonic"
  ],
  "Washing Machine": [
    "LG", "Samsung", "Whirlpool", "IFB", "Bosch", "Godrej", "Haier", "Panasonic"
  ],
  "Monitor": [
    "Dell", "LG", "Samsung", "Acer", "Asus", "HP", "Lenovo", "BenQ", "AOC"
  ],
  "Microwave": [
    "LG", "Samsung", "IFB", "Whirlpool", "Panasonic", "Godrej", "Haier"
  ],
  "Printer": [
    "HP", "Canon", "Epson", "Brother", "Samsung", "Ricoh", "Xerox"
  ],
  "Computer CPU": [
    "Dell", "HP", "Lenovo", "Asus", "Acer", "Apple", "Intel", "AMD", "Custom Built"
  ]
};

export default function AIScanner({ onSelectScanResult, onNavigateBack }) {
  const [activeInputMode, setActiveInputMode] = useState('camera'); // 'camera' | 'captured' | 'preset'
  const [capturedImage, setCapturedImage] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(PRESET_PRODUCTS[0]);
  
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  
  // Model Training Status
  const [modelStatus, setModelStatus] = useState({ isTrained: false, message: "Checking model status..." });

  // YOLO Detection State & Telemetry
  const [detectionResult, setDetectionResult] = useState({ isModelAvailable: true, status: 'IDLE', detections: [], telemetry: {} });
  const [selectedDetectionIdx, setSelectedDetectionIdx] = useState(0);

  // Developer Debug Panel Toggle State
  const [showDebugPanel, setShowDebugPanel] = useState(true);

  // Canvas Refs
  const canvasRef = useRef(null);
  const imageElementRef = useRef(null);

  // Brand / Model Identification State
  const [manualBrand, setManualBrand] = useState("");
  const [manualModel, setManualModel] = useState("");

  // Condition Questionnaire State
  const [powerOn, setPowerOn] = useState("Yes");
  const [functionsNormally, setFunctionsNormally] = useState("Partially");
  const [physicalDamage, setPhysicalDamage] = useState("Minor");
  const [approxAge, setApproxAge] = useState("3–5 years");

  // Weight State
  const [customWeightKg, setCustomWeightKg] = useState("");

  const scanLogs = [
    "Capturing image frame buffer...",
    "Initializing YOLO Computer Vision Engine...",
    "Extracting bounding boxes, class labels & OCR text...",
    "Inference Complete!"
  ];

  // Check model status on mount
  useEffect(() => {
    async function initModelCheck() {
      const status = await defaultYoloDetector.checkModelStatus();
      setModelStatus(status);
    }
    initModelCheck();
  }, []);

  // Run YOLO Inference pipeline
  const processImageWithYOLO = async (imgUrl, baseProduct = null) => {
    setCapturedImage(imgUrl);
    setActiveInputMode('captured');
    setIsScanning(true);
    setScanStep(0);

    const interval = setInterval(() => {
      setScanStep((prev) => {
        if (prev >= scanLogs.length - 1) {
          clearInterval(interval);
          setIsScanning(false);
          return prev;
        }
        return prev + 1;
      });
    }, 450);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imgUrl;
    if (baseProduct) img.alt = baseProduct.name;

    img.onload = async () => {
      const result = await defaultYoloDetector.detectObjects(img, { enableMultiObject: true, confThreshold: 0.25 });
      setDetectionResult(result);
      setSelectedDetectionIdx(0);

      // Auto-set OCR detected brand/model if present
      if (result.detectedBrand) {
        setManualBrand(result.detectedBrand);
      } else if (baseProduct && baseProduct.name) {
        const firstWord = baseProduct.name.split(' ')[0];
        if (["LG", "Samsung", "Sony", "Dell", "HP", "Apple", "Whirlpool", "Panasonic"].includes(firstWord)) {
          setManualBrand(firstWord);
        } else {
          setManualBrand("");
        }
      } else {
        setManualBrand("");
      }

      if (result.detectedModel) {
        setManualModel(result.detectedModel);
      } else {
        setManualModel("");
      }

      // Initialize default weight for detected category
      const detClass = (result.detections && result.detections.length > 0) ? result.detections[0].class : "Refrigerator";
      const defaultWt = CATEGORY_REFERENCE_DATA[detClass]?.defaultWeightKg || 25;
      setCustomWeightKg(defaultWt.toString());

      if (canvasRef.current) {
        defaultYoloDetector.drawBoundingBoxes(canvasRef.current, img, result.detections, 0);
      }
    };
  };

  const handleCameraPhotoCaptured = (dataUrl) => {
    processImageWithYOLO(dataUrl, null);
  };

  const handleUploadImageChosen = (url) => {
    processImageWithYOLO(url, null);
  };

  const handlePresetSelect = (prod) => {
    setSelectedProduct(prod);
    processImageWithYOLO(prod.image, prod);
  };

  const currentDetections = detectionResult.detections || [];
  const hasDetections = currentDetections.length > 0;
  const activeDetection = hasDetections ? currentDetections[selectedDetectionIdx] : null;  // Active Category Name
  const activeCategory = activeDetection ? activeDetection.class : "Refrigerator";
  const availableBrands = CATEGORY_BRANDS[activeCategory] || [
    "LG", "Samsung", "Sony", "Dell", "HP", "Apple", "Whirlpool", "Panasonic"
  ];

  // Effective Brand & Model
  const effectiveBrand = manualBrand || detectionResult.detectedBrand || "";
  const effectiveModel = manualModel || detectionResult.detectedModel || "";
  const effectiveWeight = parseFloat(customWeightKg) > 0 ? parseFloat(customWeightKg) : (CATEGORY_REFERENCE_DATA[activeCategory]?.defaultWeightKg || 25);

  // Dynamic Fair-Value Calculation
  const valuation = calculateFairValue({
    category: activeCategory,
    brand: effectiveBrand,
    model: effectiveModel,
    powerOn,
    functionsNormally,
    physicalDamage,
    approxAge,
    weightKg: effectiveWeight
  });

  // Sample Recycler Offer Price for comparison
  const sampleRecyclerOfferPrice = Math.round((valuation.minFairValue * 0.70) / 100) * 100 || 1500;
  const offerEvaluation = evaluateRecyclerOffer(sampleRecyclerOfferPrice, valuation.minFairValue, valuation.maxFairValue);

  return (
    <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }} className="animate-fade-in">
      
      {/* Back button */}
      <button onClick={onNavigateBack} className="btn-secondary" style={{ marginBottom: '1.25rem', padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>
        <ChevronLeft size={16} /> Back to Dashboard
      </button>

      {/* Header Title */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div className="badge badge-cyan" style={{ marginBottom: '0.5rem' }}>
          <Sparkles size={13} /> Real YOLO Model + ONNX Web Engine
        </div>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>AI E-Waste Scanner & Valuation</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Real YOLO classification & multi-attribute fair value estimation.
        </p>
      </div>

      {/* Developer Telemetry & Debug Panel Toggle */}
      <div className="glass-panel" style={{ marginBottom: '1.5rem', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
        <button
          onClick={() => setShowDebugPanel(!showDebugPanel)}
          style={{
            width: '100%',
            padding: '0.65rem 1rem',
            background: 'rgba(0,0,0,0.3)',
            border: 'none',
            color: 'var(--accent-cyan)',
            fontWeight: 700,
            fontSize: '0.78rem',
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Terminal size={15} /> DEVELOPER DIAGNOSTICS & TELEMETRY PANEL
          </span>
          {showDebugPanel ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {showDebugPanel && (
          <div style={{ padding: '0.85rem 1rem', fontSize: '0.75rem', fontFamily: 'monospace', background: '#0a0e1a', color: '#34D399', borderTop: '1px solid var(--border-color)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Host Environment: </span>
                <strong style={{ color: '#FFF' }}>{window.location.origin}</strong>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)' }}>Model Status: </span>
                <strong style={{ color: modelStatus.isTrained ? '#34D399' : '#F87171' }}>
                  {defaultYoloDetector.debugTelemetry.modelStatus}
                </strong>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)' }}>Inference Source: </span>
                <strong style={{ color: '#38BDF8' }}>
                  {defaultYoloDetector.debugTelemetry.modelSource || modelStatus.mode || 'None'}
                </strong>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)' }}>Inference Status: </span>
                <strong style={{ color: '#FBBF24' }}>
                  {defaultYoloDetector.debugTelemetry.inferenceStatus}
                </strong>
              </div>
            </div>

            <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px dashed rgba(255,255,255,0.1)', color: 'var(--text-muted)' }}>
              <div>Raw Detections Count: <strong style={{ color: '#FFF' }}>{defaultYoloDetector.debugTelemetry.rawDetections.length}</strong></div>
              <div>Filtered Output Count: <strong style={{ color: '#FFF' }}>{currentDetections.length}</strong></div>
              {hasDetections && (
                <div style={{ color: '#34D399', marginTop: '0.2rem' }}>
                  Top Object: {activeDetection.class} ({Math.round(activeDetection.confidence * 100)}% conf) | BBox: [{activeDetection.bbox.map(n => n.toFixed(2)).join(', ')}]
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Top Controls Ribbon */}
      <div className="glass-panel" style={{ padding: '1rem', marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setActiveInputMode('camera')}
            className={activeInputMode === 'camera' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
          >
            <Camera size={16} /> Live Camera
          </button>
          
          <button
            onClick={() => setActiveInputMode('preset')}
            className={activeInputMode === 'preset' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
          >
            <Layers size={16} /> Test Presets
          </button>
        </div>

        {/* Preset Selector Ribbon */}
        {activeInputMode === 'preset' && (
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.2rem' }}>
            {PRESET_PRODUCTS.map((prod) => (
              <button
                key={prod.id}
                onClick={() => handlePresetSelect(prod)}
                style={{
                  background: selectedProduct.id === prod.id ? 'var(--accent-emerald-glow)' : 'rgba(255, 255, 255, 0.04)',
                  border: selectedProduct.id === prod.id ? '2px solid var(--accent-emerald)' : '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '0.4rem 0.75rem',
                  color: selectedProduct.id === prod.id ? '#FFF' : 'var(--text-muted)',
                  fontWeight: 600,
                  fontSize: '0.78rem',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer'
                }}
              >
                {prod.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Primary View Area */}
      {activeInputMode === 'camera' ? (
        <CameraScanner 
          onCaptureImage={handleCameraPhotoCaptured}
          onFallbackUpload={handleUploadImageChosen}
          onCancel={onNavigateBack}
        />
      ) : (
        /* Captured / Processed Photo & YOLO Results View */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
          
          {/* Left Column: Image Viewport with YOLO Canvas Overlay */}
          <div>
            <div className="scanner-viewport" style={{ minHeight: '340px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              
              {/* Hidden source image element */}
              <img 
                ref={imageElementRef}
                src={capturedImage || selectedProduct.image} 
                alt={selectedProduct.name} 
                style={{ display: 'none' }}
                onLoad={() => {
                  if (canvasRef.current && imageElementRef.current) {
                    defaultYoloDetector.drawBoundingBoxes(canvasRef.current, imageElementRef.current, currentDetections, selectedDetectionIdx);
                  }
                }}
              />

              {/* YOLO Bounding Box Canvas Overlay */}
              <canvas 
                ref={canvasRef} 
                style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 'var(--radius-md)' }}
              />

              {/* Scanning Laser Bar */}
              {isScanning && <div className="scanner-laser"></div>}
            </div>

            {/* Retake / Rescan Controls */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button 
                className="btn-accent-cyan" 
                onClick={() => setActiveInputMode('camera')}
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <Camera size={16} />
                <span>Retake with Camera</span>
              </button>
              
              <label className="btn-secondary" style={{ flex: 1, justifyContent: 'center', cursor: 'pointer' }}>
                <Upload size={16} />
                <span>Upload New Photo</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => {
                    const f = e.target.files[0];
                    if (f) handleUploadImageChosen(URL.createObjectURL(f));
                  }} 
                  style={{ display: 'none' }} 
                />
              </label>
            </div>

            {/* Multi-Object Detection Selector */}
            {hasDetections && (
              <div className="glass-panel" style={{ marginTop: '1.25rem', padding: '1rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.65rem' }}>
                  YOLO DETECTED OBJECTS ({currentDetections.length}):
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {currentDetections.map((det, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedDetectionIdx(idx);
                        const defaultWt = CATEGORY_REFERENCE_DATA[det.class]?.defaultWeightKg || 25;
                        setCustomWeightKg(defaultWt.toString());
                        if (canvasRef.current && imageElementRef.current) {
                          defaultYoloDetector.drawBoundingBoxes(canvasRef.current, imageElementRef.current, currentDetections, idx);
                        }
                      }}
                      style={{
                        padding: '0.45rem 0.85rem',
                        borderRadius: '8px',
                        border: selectedDetectionIdx === idx ? '2px solid var(--accent-emerald)' : '1px solid var(--border-color)',
                        background: selectedDetectionIdx === idx ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.04)',
                        color: selectedDetectionIdx === idx ? '#FFF' : 'var(--text-muted)',
                        fontWeight: 600,
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem'
                      }}
                    >
                      <Cpu size={14} color={selectedDetectionIdx === idx ? "#34D399" : "var(--accent-cyan)"} />
                      <span>{det.class} ({Math.round(det.confidence * 100)}%)</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Mode Banner Indicator */}
            <div className="glass-panel" style={{ marginTop: '1rem', padding: '0.85rem 1rem', fontSize: '0.78rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)' }}>Inference Engine:</span>
                <span className="badge badge-fair" style={{ fontSize: '0.68rem' }}>
                  {defaultYoloDetector.debugTelemetry.modelSource || 'REAL YOLO MODEL'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Object Result, Questionnaire & Fair-Value Engine */}
          <div>
            {!isScanning ? (
              hasDetections ? (
                <div className="glass-panel animate-fade-in" style={{ padding: '1.5rem', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                  
                  {/* Detected Object Summary Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                    <div>
                      <span className="badge badge-cyan" style={{ marginBottom: '0.4rem' }}>{activeDetection.category}</span>
                      <h3 style={{ fontSize: '1.7rem', fontWeight: 800 }}>{activeDetection.class}</h3>
                      <div style={{ fontSize: '0.82rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                        YOLO Confidence: {Math.round(activeDetection.confidence * 100)}%
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Ref. Material Scrap</span>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#34D399' }}>
                        ₹{valuation.totalScrapValue.toLocaleString()}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>
                        @{valuation.scrapRatePerKg}/kg scrap
                      </div>
                    </div>
                  </div>

                  {/* Section: Improve Valuation (Brand, Model, Condition, Weight) */}
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.25rem', borderRadius: '12px', marginBottom: '1.5rem', border: '1px solid var(--border-color)' }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.6rem' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FFF', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Edit3 size={16} color="var(--accent-cyan)" />
                        Improve Valuation Characteristics
                      </h4>
                      <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>Dynamic Engine</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.82rem' }}>
                      
                      {/* Category-Specific Brand & Model Identification Card */}
                      <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <label style={{ fontWeight: 700, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <Tag size={14} color="var(--accent-cyan)" /> 
                            Brand: <span style={{ color: '#FFF', fontWeight: 800 }}>{effectiveBrand || "Select brand"}</span>
                          </label>

                          {effectiveBrand ? (
                            <span className="badge badge-fair" style={{ fontSize: '0.65rem' }}>
                              ✓ {effectiveBrand} {effectiveModel ? `(${effectiveModel})` : ''}
                            </span>
                          ) : (
                            <span className="badge badge-below" style={{ fontSize: '0.65rem' }}>
                              Brand: Select brand
                            </span>
                          )}
                        </div>

                        {/* Category-Specific Brand Selector */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                            Available brands for <strong style={{ color: 'var(--accent-cyan)' }}>{activeCategory}</strong>:
                          </div>

                          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', paddingBottom: '0.2rem' }}>
                            {availableBrands.map((b) => (
                              <button
                                key={b}
                                onClick={() => setManualBrand(b)}
                                style={{
                                  padding: '0.35rem 0.75rem',
                                  borderRadius: '6px',
                                  border: effectiveBrand.toLowerCase() === b.toLowerCase() ? '1.5px solid var(--accent-emerald)' : '1px solid var(--border-color)',
                                  background: effectiveBrand.toLowerCase() === b.toLowerCase() ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255,255,255,0.04)',
                                  color: effectiveBrand.toLowerCase() === b.toLowerCase() ? '#FFF' : 'var(--text-muted)',
                                  fontWeight: 600,
                                  fontSize: '0.75rem',
                                  cursor: 'pointer',
                                  whiteSpace: 'nowrap'
                                }}
                              >
                                {b}
                              </button>
                            ))}
                          </div>

                          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.35rem' }}>
                            <input 
                              type="text"
                              placeholder={`Custom Brand for ${activeCategory}`}
                              value={manualBrand}
                              onChange={(e) => setManualBrand(e.target.value)}
                              style={{
                                flex: 1,
                                background: 'rgba(0,0,0,0.4)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '6px',
                                padding: '0.4rem 0.75rem',
                                color: '#FFF',
                                fontSize: '0.78rem'
                              }}
                            />
                            <input 
                              type="text"
                              placeholder="Enter Model (e.g. GL-T402)"
                              value={manualModel}
                              onChange={(e) => setManualModel(e.target.value)}
                              style={{
                                flex: 1,
                                background: 'rgba(0,0,0,0.4)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '6px',
                                padding: '0.4rem 0.75rem',
                                color: '#FFF',
                                fontSize: '0.78rem'
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Condition Questionnaire */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        
                        {/* Q1: Power On */}
                        <div>
                          <label style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem', fontSize: '0.78rem' }}>1. Does it power on?</label>
                          <div style={{ display: 'flex', gap: '0.4rem' }}>
                            {["Yes", "No", "Don't Know"].map((opt) => (
                              <button
                                key={opt}
                                onClick={() => setPowerOn(opt)}
                                style={{
                                  padding: '0.3rem 0.75rem',
                                  borderRadius: '6px',
                                  border: powerOn === opt ? '1px solid var(--accent-emerald)' : '1px solid var(--border-color)',
                                  background: powerOn === opt ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                                  color: powerOn === opt ? '#FFF' : 'var(--text-muted)',
                                  fontSize: '0.75rem',
                                  cursor: 'pointer'
                                }}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Q2: Function normal */}
                        <div>
                          <label style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem', fontSize: '0.78rem' }}>2. Does it function normally?</label>
                          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                            {["Yes", "Partially", "No", "Don't Know"].map((opt) => (
                              <button
                                key={opt}
                                onClick={() => setFunctionsNormally(opt)}
                                style={{
                                  padding: '0.3rem 0.75rem',
                                  borderRadius: '6px',
                                  border: functionsNormally === opt ? '1px solid var(--accent-emerald)' : '1px solid var(--border-color)',
                                  background: functionsNormally === opt ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                                  color: functionsNormally === opt ? '#FFF' : 'var(--text-muted)',
                                  fontSize: '0.75rem',
                                  cursor: 'pointer'
                                }}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Q3: Visible damage */}
                        <div>
                          <label style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem', fontSize: '0.78rem' }}>3. Visible physical damage?</label>
                          <div style={{ display: 'flex', gap: '0.4rem' }}>
                            {["None", "Minor", "Major"].map((opt) => (
                              <button
                                key={opt}
                                onClick={() => setPhysicalDamage(opt)}
                                style={{
                                  padding: '0.3rem 0.75rem',
                                  borderRadius: '6px',
                                  border: physicalDamage === opt ? '1px solid var(--accent-emerald)' : '1px solid var(--border-color)',
                                  background: physicalDamage === opt ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                                  color: physicalDamage === opt ? '#FFF' : 'var(--text-muted)',
                                  fontSize: '0.75rem',
                                  cursor: 'pointer'
                                }}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Q4: Age */}
                        <div>
                          <label style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem', fontSize: '0.78rem' }}>4. Approximate age?</label>
                          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                            {["Less than 3 years", "3–5 years", "5–10 years", "10+ years"].map((opt) => (
                              <button
                                key={opt}
                                onClick={() => setApproxAge(opt)}
                                style={{
                                  padding: '0.3rem 0.65rem',
                                  borderRadius: '6px',
                                  border: approxAge === opt ? '1px solid var(--accent-emerald)' : '1px solid var(--border-color)',
                                  background: approxAge === opt ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                                  color: approxAge === opt ? '#FFF' : 'var(--text-muted)',
                                  fontSize: '0.72rem',
                                  cursor: 'pointer'
                                }}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Weight Field */}
                        <div>
                          <label style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem', fontSize: '0.78rem' }}>
                            Approximate Weight (kg):
                          </label>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Scale size={16} color="var(--accent-cyan)" />
                            <input 
                              type="number" 
                              step="0.1"
                              value={customWeightKg}
                              onChange={(e) => setCustomWeightKg(e.target.value)}
                              style={{
                                width: '110px',
                                background: 'rgba(0,0,0,0.4)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '6px',
                                padding: '0.35rem 0.65rem',
                                color: '#FFF',
                                fontSize: '0.85rem',
                                fontWeight: 700
                              }}
                            />
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                              (Category default ref: {CATEGORY_REFERENCE_DATA[activeCategory]?.defaultWeightKg || 25} kg)
                            </span>
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>

                  {/* Calculated Fair Value Range Output & Recycler Offer Comparison */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(10, 17, 40, 0.8) 100%)',
                    border: '1.5px solid var(--accent-emerald)',
                    padding: '1.25rem',
                    borderRadius: '12px',
                    marginBottom: '1.5rem',
                    boxShadow: 'var(--shadow-glow)'
                  }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Estimated Fair Value Range
                        </div>
                        <div style={{ fontSize: '2.0rem', fontWeight: 800, color: '#34D399' }}>
                          ₹{valuation.minFairValue.toLocaleString()} – ₹{valuation.maxFairValue.toLocaleString()}
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <span className={valuation.conditionCategory === 'SCRAP' || valuation.conditionCategory === 'DAMAGED' ? 'badge badge-unfair' : 'badge badge-fair'}>
                          {valuation.conditionCategory} ({valuation.conditionScorePercent}%)
                        </span>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', marginTop: '0.3rem' }}>
                          {valuation.brandTier}
                        </div>
                      </div>
                    </div>

                    {/* Recycler Offer & Comparison Badge */}
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.4)',
                      padding: '0.85rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      justify: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.85rem'
                    }}>
                      <div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Sample Recycler Offer:</div>
                        <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFF' }}>
                          ₹{sampleRecyclerOfferPrice.toLocaleString()}
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div className={`badge ${offerEvaluation.badgeClass}`} style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}>
                          {offerEvaluation.symbol} {offerEvaluation.label}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '0.25rem', maxWidth: '200px' }}>
                          {offerEvaluation.explanation}
                        </div>
                      </div>
                    </div>

                    <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Info size={12} color="var(--accent-cyan)" />
                      <span>Reference / Demo Market Data Baseline (Replaceable with live exchange price feed)</span>
                    </div>
                  </div>

                  {/* Action Trigger */}
                  <button 
                    className="btn-primary" 
                    style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1rem' }}
                    onClick={() => onSelectScanResult({
                      ...selectedProduct,
                      name: `${effectiveBrand ? effectiveBrand + ' ' : ''}${activeDetection.class}${effectiveModel ? ' (' + effectiveModel + ')' : ''}`,
                      category: activeDetection.category,
                      brand: effectiveBrand || "Unspecified",
                      model: effectiveModel || "Standard",
                      defaultCondition: `${valuation.conditionCategory} (${valuation.conditionScorePercent}% Rating)`,
                      estimatedWeightKg: valuation.weightKg,
                      minFairValue: valuation.minFairValue,
                      maxFairValue: valuation.maxFairValue,
                      sampleOffers: [
                        { recyclerId: "r1", name: "GreenRecycle Solutions", isAuthorized: true, tag: "Certified CPCB", distanceKm: 3.2, rating: 4.9, offerPrice: Math.round(valuation.minFairValue * 1.02 / 50)*50 },
                        { recyclerId: "r2", name: "EcoMetals Processing Co.", isAuthorized: true, tag: "Best Price Guaranteed", distanceKm: 5.8, rating: 4.7, offerPrice: Math.round(valuation.minFairValue * 0.94 / 50)*50 },
                        { recyclerId: "r3", name: "City Scrappers Hub", isAuthorized: false, tag: "Quick Pickup", distanceKm: 2.1, rating: 4.3, offerPrice: sampleRecyclerOfferPrice }
                      ]
                    })}
                  >
                    <span>Estimate Fair Value & View Recycler Offers</span>
                    <ArrowRight size={18} />
                  </button>

                </div>
              ) : (
                /* STEP 3 — 3 DISTINCT FAILURE CARDS */
                <div className="glass-panel animate-fade-in" style={{ padding: '2rem', textAlign: 'center' }}>
                  
                  {/* CASE 1: YOLO MODEL NOT LOADED */}
                  {detectionResult.status === 'MODEL_NOT_LOADED' || defaultYoloDetector.debugTelemetry.modelStatus === 'FAILED' ? (
                    <div>
                      <XCircle size={48} color="#F87171" style={{ margin: '0 auto 1rem' }} />
                      <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#F87171', marginBottom: '0.5rem' }}>
                        YOLO MODEL NOT LOADED
                      </h3>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                        The YOLO model file could not be loaded from backend server or browser ONNX asset (<code style={{ color: 'var(--accent-cyan)' }}>/models/best.onnx</code>). Please check backend server status.
                      </p>
                      <button className="btn-accent-cyan" onClick={() => setActiveInputMode('camera')} style={{ justifyContent: 'center' }}>
                        <Camera size={16} /> Retake Photo
                      </button>
                    </div>
                  ) : detectionResult.status === 'INFERENCE_FAILED' ? (
                    /* CASE 2: YOLO INFERENCE FAILED */
                    <div>
                      <AlertCircle size={48} color="#F87171" style={{ margin: '0 auto 1rem' }} />
                      <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#F87171', marginBottom: '0.5rem' }}>
                        YOLO INFERENCE FAILED
                      </h3>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                        Inference execution failed during tensor preprocessing or model evaluation: <code style={{ color: 'var(--accent-amber)' }}>{detectionResult.message}</code>
                      </p>
                      <button className="btn-accent-cyan" onClick={() => setActiveInputMode('camera')} style={{ justifyContent: 'center' }}>
                        <Camera size={16} /> Retake Photo
                      </button>
                    </div>
                  ) : (
                    /* CASE 3: UNSUPPORTED E-WASTE ITEM DETECTED */
                    <div>
                      <AlertTriangle size={48} color="#FBBF24" style={{ margin: '0 auto 1rem' }} />
                      <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FBBF24', marginBottom: '0.5rem' }}>
                        Unsupported e-waste item
                      </h3>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                        The object in this image was not recognized as a supported e-waste item. Please align a supported appliance (Mobile Phone, Laptop, Refrigerator, Air Conditioner, Television, Washing Machine, Monitor, Printer, CPU, Microwave) in clear lighting and retake.
                      </p>
                      <button className="btn-primary" onClick={() => setActiveInputMode('camera')} style={{ justifyContent: 'center', margin: '0 auto' }}>
                        <Camera size={16} /> Retake Photo
                      </button>
                    </div>
                  )}

                </div>
              )
            ) : (
              <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '380px' }}>
                <div className="animate-spin" style={{ marginBottom: '1rem', color: 'var(--accent-emerald)' }}>
                  <RefreshCw size={42} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Analyzing Captured E-Waste Image...</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: '300px', marginTop: '0.5rem' }}>
                  Evaluating image with YOLO model & Fair-Value Engine.
                </p>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
