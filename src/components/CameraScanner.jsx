import React, { useState, useEffect, useRef } from 'react';
import { Camera, Upload, RefreshCw, AlertCircle, Video, X } from 'lucide-react';

export default function CameraScanner({ onCaptureImage, onFallbackUpload, onCancel }) {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [cameraState, setCameraState] = useState('loading'); // 'loading' | 'active' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  // Start Camera Stream on Mount
  const startCamera = async () => {
    setCameraState('loading');
    setErrorMessage('');

    try {
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      if (window.location.protocol !== 'https:' && !isLocalhost) {
        throw new Error("WebRTC Camera access requires an HTTPS connection on remote URLs. Please access this app via HTTPS.");
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Browser does not support navigator.mediaDevices.getUserMedia. Please update your browser.");
      }

      // Prefer rear environment camera on mobile, fallback to default video
      let mediaStream;
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } }
        });
      } catch (err) {
        // Fallback to basic video constraint
        mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      }

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play().catch(e => console.warn("Video play error:", e));
      }
      setCameraState('active');
    } catch (err) {
      console.error("Camera access error:", err);
      setCameraState('error');
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setErrorMessage("Camera permission denied. Please allow camera access in browser site settings.");
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setErrorMessage("No camera hardware detected on this device. You can upload an image instead.");
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        setErrorMessage("Camera is currently in use by another application or tab.");
      } else {
        setErrorMessage(err.message || "Unable to access camera stream.");
      }
    }
  };

  useEffect(() => {
    startCamera();

    // Clean up MediaStream when component unmounts
    return () => {
      stopCameraStream();
    };
  }, []);

  const stopCameraStream = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  // Capture current video frame
  const handleCapture = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const capturedDataUrl = canvas.toDataURL('image/jpeg', 0.92);

      // Stop camera stream immediately
      stopCameraStream();

      // Pass captured image data to parent handler
      onCaptureImage(capturedDataUrl);
    }
  };

  const handleManualUploadClick = (e) => {
    const file = e.target.files[0];
    if (file) {
      stopCameraStream();
      const url = URL.createObjectURL(file);
      onFallbackUpload(url);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center', position: 'relative' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Camera size={22} color="var(--accent-emerald)" />
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Scan E-Waste</h3>
        </div>

        {onCancel && (
          <button onClick={() => { stopCameraStream(); onCancel(); }} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        )}
      </div>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
        Point your camera at an electronic item and click Capture & Scan.
      </p>

      {/* Live Video Viewport Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '380px',
        background: '#000',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        border: '2px dashed var(--accent-emerald)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.25rem'
      }}>
        
        {cameraState === 'active' && (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />

            {/* Subtle Scanning Laser Line */}
            <div className="scanner-laser"></div>

            {/* Corner Framing Overlays */}
            <div style={{ position: 'absolute', inset: '20px', pointerEvents: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ borderTop: '4px solid #10B981', borderLeft: '4px solid #10B981', width: '28px', height: '28px' }}></span>
                <span style={{ borderTop: '4px solid #10B981', borderRight: '4px solid #10B981', width: '28px', height: '28px' }}></span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ borderBottom: '4px solid #10B981', borderLeft: '4px solid #10B981', width: '28px', height: '28px' }}></span>
                <span style={{ borderBottom: '4px solid #10B981', borderRight: '4px solid #10B981', width: '28px', height: '28px' }}></span>
              </div>
            </div>

            {/* Live Camera Badge */}
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              background: 'rgba(10, 17, 40, 0.85)',
              backdropFilter: 'blur(8px)',
              padding: '0.35rem 0.75rem',
              borderRadius: '20px',
              border: '1px solid var(--accent-emerald)',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#34D399',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              <span style={{ width: '8px', height: '8px', background: '#10B981', borderRadius: '50%', display: 'inline-block' }}></span>
              📷 Live Camera Active
            </div>
          </>
        )}

        {cameraState === 'loading' && (
          <div style={{ color: 'var(--accent-cyan)', textAlign: 'center', padding: '2rem' }}>
            <RefreshCw size={36} className="animate-spin" style={{ margin: '0 auto 1rem' }} />
            <div style={{ fontWeight: '700', fontSize: '1rem' }}>Requesting Camera Access...</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
              Please click "Allow" when your browser prompts for permission.
            </div>
          </div>
        )}

        {cameraState === 'error' && (
          <div style={{ padding: '2rem', textAlign: 'center', maxWidth: '420px' }}>
            <AlertCircle size={42} color="#F87171" style={{ margin: '0 auto 1rem' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#F87171', marginBottom: '0.5rem' }}>
              Camera Access Failed
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              {errorMessage}
            </p>

            <label className="btn-primary" style={{ cursor: 'pointer', display: 'inline-flex', justifyContent: 'center' }}>
              <Upload size={16} />
              <span>Upload Image Instead</span>
              <input type="file" accept="image/*" onChange={handleManualUploadClick} style={{ display: 'none' }} />
            </label>
          </div>
        )}

      </div>

      {/* Camera Actions */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        {cameraState === 'active' && (
          <button
            className="btn-primary voice-pulse-ring"
            onClick={handleCapture}
            style={{ padding: '0.85rem 2.5rem', fontSize: '1.1rem' }}
          >
            <Camera size={20} />
            <span>Capture & Scan</span>
          </button>
        )}

        <label className="btn-secondary" style={{ cursor: 'pointer', padding: '0.85rem 1.5rem', fontSize: '0.9rem' }}>
          <Upload size={16} />
          <span>Upload Image Instead</span>
          <input type="file" accept="image/*" onChange={handleManualUploadClick} style={{ display: 'none' }} />
        </label>
      </div>

    </div>
  );
}
