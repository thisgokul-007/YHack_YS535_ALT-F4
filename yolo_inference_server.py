#!/usr/bin/env python3
"""
E-Waste Connect — Real PyTorch YOLO Inference Server
Provides REST API endpoint /api/detect for browser CameraScanner integration.
"""

import os
import sys
import base64
import io
import json

# Target E-Waste Class Mapping Dictionary (including standard COCO mappings)
CLASS_NAME_MAP = {
    "refrigerator": "Refrigerator",
    "laptop": "Laptop",
    "mobile_phone": "Mobile Phone",
    "cell phone": "Mobile Phone",
    "television": "Television",
    "tv": "Television",
    "washing_machine": "Washing Machine",
    "air_conditioner": "Air Conditioner",
    "monitor": "Monitor",
    "printer": "Printer",
    "computer_cpu": "Computer CPU",
    "microwave": "Microwave",
    "oven": "Microwave"
}

# Category metadata mapping
CATEGORY_MAP = {
    "Refrigerator": {"category": "Large Household E-Waste", "weightRange": "65–75 kg", "materials": ["Steel (55%)", "Copper (12%)", "Aluminium (8%)", "Plastic (15%)"], "handling": ["Refrigerant Evacuation", "Compressor Drain"]},
    "Laptop": {"category": "IT & Telecommunications", "weightRange": "2.0–2.8 kg", "materials": ["Gold/Silver Contacts (5%)", "Aluminium (35%)", "Li-Ion Cell (20%)"], "handling": ["Li-Ion Battery Isolation", "Data Zeroing"]},
    "Mobile Phone": {"category": "Consumer Electronics", "weightRange": "0.18–0.25 kg", "materials": ["Gold/Palladium ICs (8%)", "Copper/Cobalt (30%)", "Gorilla Glass (62%)"], "handling": ["Thermal Battery Enclosure"]},
    "Television": {"category": "Consumer Electronics", "weightRange": "24–32 kg", "materials": ["Lead Glass (45%)", "Copper Yoke (12%)", "Impact Plastic (33%)"], "handling": ["Lead Glass Separation", "High Voltage Discharge"]},
    "Washing Machine": {"category": "Large Household E-Waste", "weightRange": "58–68 kg", "materials": ["Stainless Steel (60%)", "Copper Winding (14%)", "Polypropylene (18%)"], "handling": ["Concrete Counterweight Removal"]},
    "Air Conditioner": {"category": "Large Household E-Waste", "weightRange": "35–45 kg", "materials": ["Copper Tubing (25%)", "Aluminium Fins (35%)", "Steel (30%)"], "handling": ["Refrigerant Recovery"]},
    "Monitor": {"category": "IT & Telecommunications", "weightRange": "4.5–7.0 kg", "materials": ["Display Glass (40%)", "Copper Coils (15%)", "ABS Plastic (35%)"], "handling": ["Capacitor Discharge"]},
    "Printer": {"category": "IT & Telecommunications", "weightRange": "6.0–10.0 kg", "materials": ["ABS Plastic (50%)", "Steel Screws/Gear (30%)", "Copper Wire (10%)"], "handling": ["Toner Cartridge Isolation"]},
    "Computer CPU": {"category": "IT & Telecommunications", "weightRange": "8.0–12.0 kg", "materials": ["Gold PCB Pins (6%)", "Aluminium HeatSink (40%)", "Steel Frame (45%)"], "handling": ["Data Zeroing"]},
    "Microwave": {"category": "Small Household E-Waste", "weightRange": "12–16 kg", "materials": ["Steel Frame (65%)", "Copper Magnetron (18%)", "Glass Door (10%)"], "handling": ["High Voltage Capacitor Discharge"]}
}

KNOWN_BRANDS = [
    "LG", "Samsung", "Sony", "Dell", "HP", "Apple", "Whirlpool", "Panasonic",
    "Haier", "IFB", "Godrej", "Voltas", "Toshiba", "Philips", "Xiaomi", "Lenovo",
    "Asus", "Acer", "Bosch", "Motorola", "Mi", "Carrier", "Hitachi"
]

def check_model_exists():
    project_root = os.path.dirname(os.path.abspath(__file__))
    best_pt = os.path.join(project_root, "weights", "best.pt")
    runs_best = os.path.join(project_root, "runs", "ewaste_yolov8n", "weights", "best.pt")
    return os.path.exists(best_pt) or os.path.exists(runs_best)

def get_model_path():
    project_root = os.path.dirname(os.path.abspath(__file__))
    best_pt = os.path.join(project_root, "weights", "best.pt")
    runs_best = os.path.join(project_root, "runs", "ewaste_yolov8n", "weights", "best.pt")
    if os.path.exists(best_pt):
        return best_pt
    if os.path.exists(runs_best):
        return runs_best
    return None

def extract_brand_model_from_image(img_pil):
    """
    Extract visible brand and model text from captured camera frame using OCR string matching.
    Returns (detected_brand, detected_model) or (None, None)
    """
    detected_brand = None
    detected_model = None

    try:
        import pytesseract
        import re

        text = pytesseract.image_to_string(img_pil)
        if text and len(text.strip()) > 0:
            print(f"OCR Extracted Text: {text[:100].strip()}...")
            for brand in KNOWN_BRANDS:
                if re.search(r'\b' + re.escape(brand) + r'\b', text, re.IGNORECASE):
                    detected_brand = brand
                    break

            model_match = re.search(r'\b([A-Z0-9]{2,5}[-_\s]?[A-Z0-9]{3,6})\b', text)
            if model_match:
                candidate = model_match.group(1).strip()
                if candidate.upper() not in [b.upper() for b in KNOWN_BRANDS]:
                    detected_model = candidate
    except Exception as err:
        print(f"OCR note: {err}")

    return detected_brand, detected_model

def run_server():
    try:
        from flask import Flask, request, jsonify
        from flask_cors import CORS
    except ImportError:
        os.system("pip install flask flask-cors pillow")
        from flask import Flask, request, jsonify
        from flask_cors import CORS

    app = Flask(__name__)
    CORS(app)

    model_path = get_model_path()
    yolo_model = None
    if model_path:
        try:
            from ultralytics import YOLO
            print(f"✓ Loading PyTorch YOLO model from {model_path}...")
            yolo_model = YOLO(model_path)
        except Exception as e:
            print(f"Warning loading YOLO model: {e}")

    coco_model = None
    try:
        from ultralytics import YOLO
        coco_model = YOLO("yolov8n.pt")
        print("✓ Loaded COCO base model (yolov8n.pt) for supplementary e-waste detection.")
    except Exception as e:
        print(f"COCO base model notice: {e}")

    @app.route("/api/status", methods=["GET"])
    def status():
        trained = check_model_exists()
        class_names = list(yolo_model.names.values()) if yolo_model and hasattr(yolo_model, 'names') else []
        return jsonify({
            "isTrained": (trained and yolo_model is not None) or (coco_model is not None),
            "modelPath": get_model_path(),
            "modelClasses": class_names,
            "message": "Trained PyTorch YOLO model active" if (trained and yolo_model) else "COCO base YOLO model active"
        })

    @app.route("/api/detect", methods=["POST"])
    def detect():
        if yolo_model is None and coco_model is None:
            return jsonify({
                "isTrained": False,
                "message": "YOLO MODEL NOT LOADED. Please connect the trained YOLO model (python yolo_inference_server.py).",
                "detections": []
            }), 400

        try:
            data = request.get_json() or {}
            image_b64 = data.get("image")
            conf_thresh = float(data.get("conf_threshold", 0.25))

            if not image_b64:
                return jsonify({"error": "No image data provided"}), 400

            if "," in image_b64:
                image_b64 = image_b64.split(",")[1]
            image_bytes = base64.b64decode(image_b64)

            from PIL import Image
            img = Image.open(io.BytesIO(image_bytes)).convert("RGB")

            # OCR Brand / Model Detection
            det_brand, det_model = extract_brand_model_from_image(img)

            detections = []
            model_names_used = []

            print("\n--- INCOMING INFERENCE REQUEST ---")
            print(f"Image size: {img.size[0]}x{img.size[1]}")
            print(f"Configured confidence threshold: {conf_thresh}")
            print(f"OCR Brand Detected: {det_brand or 'None'}")
            print(f"OCR Model Detected: {det_model or 'None'}")

            # 1. Try Custom E-Waste Model (best.pt)
            if yolo_model is not None:
                model_names_used = list(yolo_model.names.values())
                results = yolo_model(img, conf=conf_thresh)
                for r in results:
                    boxes = r.boxes
                    for box in boxes:
                        cls_id = int(box.cls[0])
                        raw_cls_name = str(yolo_model.names[cls_id]).lower()
                        conf = float(box.conf[0])
                        xywh = box.xywhn[0].tolist()

                        print("RAW YOLO RESULT:")
                        print(f"class_id: {cls_id}")
                        print(f"class_name: {raw_cls_name}")
                        print(f"confidence: {conf:.4f}")

                        mapped_class = CLASS_NAME_MAP.get(raw_cls_name, raw_cls_name.capitalize())
                        meta = CATEGORY_MAP.get(mapped_class, {
                            "category": "Electronic Scrap",
                            "weightRange": "5–15 kg",
                            "materials": ["Metal (50%)", "Plastic (40%)"],
                            "handling": ["Component Separation"]
                        })

                        detections.append({
                            "class_id": cls_id,
                            "raw_class": raw_cls_name,
                            "class": mapped_class,
                            "confidence": round(conf, 4),
                            "bbox": xywh,
                            "category": meta["category"],
                            "weightRange": meta["weightRange"],
                            "materials": meta["materials"],
                            "handling": meta["handling"]
                        })

            # 2. Supplementary check with COCO pretrained model if no detections found
            if len(detections) == 0 and coco_model is not None:
                coco_results = coco_model(img, conf=conf_thresh)
                for r in coco_results:
                    for box in r.boxes:
                        cls_id = int(box.cls[0])
                        raw_cls_name = str(coco_model.names[cls_id]).lower()
                        conf = float(box.conf[0])
                        xywh = box.xywhn[0].tolist()

                        if raw_cls_name in CLASS_NAME_MAP:
                            mapped_class = CLASS_NAME_MAP[raw_cls_name]
                            print("RAW YOLO RESULT (COCO):")
                            print(f"class_id: {cls_id}")
                            print(f"class_name: {raw_cls_name}")
                            print(f"confidence: {conf:.4f}")

                            meta = CATEGORY_MAP.get(mapped_class, {
                                "category": "Consumer Electronics",
                                "weightRange": "2–10 kg",
                                "materials": ["Circuit Board (30%)", "Plastics (40%)", "Metals (30%)"],
                                "handling": ["Component Recycling"]
                            })
                            detections.append({
                                "class_id": cls_id,
                                "raw_class": raw_cls_name,
                                "class": mapped_class,
                                "confidence": round(conf, 4),
                                "bbox": xywh,
                                "category": meta["category"],
                                "weightRange": meta["weightRange"],
                                "materials": meta["materials"],
                                "handling": meta["handling"]
                            })

            # Sort detections by highest confidence
            detections.sort(key=lambda d: d["confidence"], reverse=True)

            print(f"Final detections returned to client: {len(detections)}")

            return jsonify({
                "isTrained": True,
                "isDemoMode": False,
                "modelClasses": model_names_used,
                "detectedBrand": det_brand,
                "detectedModel": det_model,
                "detections": detections
            })

        except Exception as err:
            print(f"Error during detection: {err}")
            return jsonify({"error": str(err)}), 500

    print("\n" + "=" * 65)
    print("  E-WASTE CONNECT — PYTORCH YOLO INFERENCE SERVER LISTENING ON http://localhost:5000")
    print("=" * 65)
    print(f"Model Status: {'LOADED (best.pt)' if yolo_model else 'NOT LOADED'}")
    print("=" * 65 + "\n")

    app.run(host="0.0.0.0", port=5000, debug=False)

if __name__ == "__main__":
    run_server()
