// Real YOLO Computer Vision Engine & Status Detector for E-Waste Connect

export const EWASTE_CLASSES = [
  "Refrigerator",
  "Laptop",
  "Mobile Phone",
  "Television",
  "Washing Machine",
  "Air Conditioner",
  "Monitor",
  "Printer",
  "Computer CPU",
  "Microwave"
];

// Presets metadata mapping for explicit preset selection
const PRESET_METADATA_MAP = {
  refrigerator: {
    class: "Refrigerator",
    confidence: 0.96,
    bbox: [0.15, 0.1, 0.7, 0.8],
    category: "Large Household E-Waste",
    weightRange: "65–75 kg",
    materials: ["Steel (55%)", "Copper (12%)", "Aluminium (8%)", "Plastic (15%)"],
    handling: ["Refrigerant Evacuation", "Compressor Oil Drain"]
  },
  washing: {
    class: "Washing Machine",
    confidence: 0.94,
    bbox: [0.1, 0.15, 0.8, 0.75],
    category: "Large Household E-Waste",
    weightRange: "58–68 kg",
    materials: ["Stainless Steel (60%)", "Copper Winding (14%)", "Polypropylene (18%)"],
    handling: ["Concrete Counterweight Removal"]
  },
  laptop: {
    class: "Laptop",
    confidence: 0.93,
    bbox: [0.2, 0.25, 0.6, 0.55],
    category: "IT & Telecommunications",
    weightRange: "2.0–2.8 kg",
    materials: ["Gold/Silver Contacts (5%)", "Aluminium (35%)", "Li-Ion Cell (20%)"],
    handling: ["Li-Ion Battery Isolation", "Data Storage Zeroing"]
  },
  phone: {
    class: "Mobile Phone",
    confidence: 0.95,
    bbox: [0.3, 0.2, 0.4, 0.6],
    category: "Consumer Electronics",
    weightRange: "0.18–0.25 kg",
    materials: ["Gold/Palladium ICs (8%)", "Copper/Cobalt (30%)", "Gorilla Glass (62%)"],
    handling: ["Thermal Battery Safety Enclosure"]
  },
  mobile: {
    class: "Mobile Phone",
    confidence: 0.95,
    bbox: [0.3, 0.2, 0.4, 0.6],
    category: "Consumer Electronics",
    weightRange: "0.18–0.25 kg",
    materials: ["Gold/Palladium ICs (8%)", "Copper/Cobalt (30%)", "Gorilla Glass (62%)"],
    handling: ["Thermal Battery Safety Enclosure"]
  },
  tv: {
    class: "Television",
    confidence: 0.91,
    bbox: [0.12, 0.15, 0.76, 0.7],
    category: "Consumer Electronics",
    weightRange: "24–32 kg",
    materials: ["Lead Glass (45%)", "Copper Yoke (12%)", "Impact Plastic (33%)"],
    handling: ["Lead Glass Separation", "Capacitor Discharge"]
  },
  cable: {
    class: "Copper Cable",
    confidence: 0.92,
    bbox: [0.15, 0.2, 0.7, 0.6],
    category: "Cable & Wiring Scrap",
    weightRange: "12–18 kg",
    materials: ["Pure Electrolytic Copper (68%)", "PVC Plastic (32%)"],
    handling: ["Mechanical Stripping"]
  }
};

export class YOLODetector {
  constructor(apiBaseUrl = "http://localhost:5000") {
    this.apiBaseUrl = apiBaseUrl;
    this.isTrained = false;
    this.modelClasses = [];
  }

  // Check backend inference server status
  async checkModelStatus() {
    try {
      const res = await fetch(`${this.apiBaseUrl}/api/status`);
      if (res.ok) {
        const data = await res.json();
        this.isTrained = data.isTrained;
        this.modelClasses = data.modelClasses || [];
        return data;
      }
    } catch (err) {
      console.log("PyTorch YOLO Inference Server offline:", err.message);
    }
    this.isTrained = false;
    return {
      isTrained: false,
      message: "YOLO MODEL NOT CONNECTED. Please ensure best.pt is present and yolo_inference_server.py is running."
    };
  }

  // Real inference execution on image source
  async detectObjects(imageElement, options = {}) {
    const status = await this.checkModelStatus();

    // Check if input is a camera base64 data URL
    const imgSrc = imageElement.src || "";
    const isCameraCapture = imgSrc.startsWith("data:image/");
    const confThreshold = options.confThreshold || 0.25;

    // If server is online, query PyTorch YOLO model
    if (this.isTrained) {
      try {
        const res = await fetch(`${this.apiBaseUrl}/api/detect`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: imgSrc, conf_threshold: confThreshold })
        });

        if (res.ok) {
          const data = await res.json();
          const detections = data.detections || [];
          const highestConf = detections.length > 0 ? detections[0].confidence : 0;
          const finalClass = detections.length > 0 ? detections[0].class : "None";

          // STEP 7 — DEVELOPER CONSOLE DIAGNOSTICS LOGGING
          console.log("==================================================");
          console.log("Image captured: YES");
          console.log(`Image size: ${imageElement.naturalWidth || imageElement.width || 640}x${imageElement.naturalHeight || imageElement.height || 480}`);
          console.log(`Model loaded: ${data.isTrained ? 'YES' : 'NO'}`);
          console.log("Model classes:", data.modelClasses || this.modelClasses || []);
          console.log("Inference completed: YES");
          console.log("Raw detections:", detections);
          console.log("Highest confidence:", highestConf);
          console.log("Final detected class:", finalClass);
          console.log("==================================================");

          return {
            isModelAvailable: true,
            isDemoMode: false,
            modelClasses: data.modelClasses || this.modelClasses,
            detectedBrand: data.detectedBrand || null,
            detectedModel: data.detectedModel || null,
            detections: detections
          };
        }
      } catch (err) {
        console.warn("PyTorch YOLO server request error:", err);
      }
    }

    // For camera captures when model is offline: DO NOT default to Refrigerator!
    if (isCameraCapture) {
      console.log("==================================================");
      console.log("Image captured: YES");
      console.log(`Image size: ${imageElement.naturalWidth || imageElement.width || 640}x${imageElement.naturalHeight || imageElement.height || 480}`);
      console.log("Model loaded: NO (YOLO Inference Server Offline)");
      console.log("Inference completed: NO");
      console.log("==================================================");

      return {
        isModelAvailable: false,
        isDemoMode: false,
        message: "YOLO MODEL NOT CONNECTED. Please start the backend server (python yolo_inference_server.py).",
        detections: []
      };
    }

    // Explicit Preset Selection Mode (when user manually picks preset buttons)
    const srcLower = (imageElement.alt || imgSrc).toLowerCase();
    let matchedPreset = null;

    for (const [key, meta] of Object.entries(PRESET_METADATA_MAP)) {
      if (srcLower.includes(key)) {
        matchedPreset = meta;
        break;
      }
    }

    if (matchedPreset) {
      return {
        isModelAvailable: true,
        isDemoMode: true,
        message: "DEMO MODE — PRESET TEST",
        detections: [matchedPreset]
      };
    }

    // No matching preset & model offline: return empty detections
    return {
      isModelAvailable: false,
      isDemoMode: false,
      message: "YOLO MODEL NOT CONNECTED",
      detections: []
    };
  }

  // Draw bounding boxes on target canvas element
  drawBoundingBoxes(canvas, image, detections, selectedIndex = 0) {
    if (!canvas || !image) return;

    const ctx = canvas.getContext('2d');
    canvas.width = image.width || image.naturalWidth || 600;
    canvas.height = image.height || image.naturalHeight || 400;

    // Draw image background
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    if (!detections || detections.length === 0) return;

    // Draw detection boxes
    detections.forEach((det, idx) => {
      const [x, y, w, h] = det.bbox;
      const rectX = x * canvas.width;
      const rectY = y * canvas.height;
      const rectW = w * canvas.width;
      const rectH = h * canvas.height;

      const isSelected = idx === selectedIndex;

      ctx.lineWidth = isSelected ? 4 : 2;
      ctx.strokeStyle = isSelected ? '#10B981' : '#06B6D4';
      ctx.fillStyle = isSelected ? 'rgba(16, 185, 129, 0.15)' : 'rgba(6, 182, 212, 0.1)';

      ctx.fillRect(rectX, rectY, rectW, rectH);
      ctx.strokeRect(rectX, rectY, rectW, rectH);

      // Label Badge
      const labelText = `YOLO: ${det.class} (${Math.round(det.confidence * 100)}%)`;
      ctx.font = 'bold 14px "Outfit", sans-serif';
      const textWidth = ctx.measureText(labelText).width;

      ctx.fillStyle = isSelected ? '#10B981' : '#06B6D4';
      ctx.fillRect(rectX, Math.max(0, rectY - 26), textWidth + 16, 26);

      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(labelText, rectX + 8, Math.max(18, rectY - 8));
    });
  }
}

export const defaultYoloDetector = new YOLODetector();
