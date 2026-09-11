# E-Waste Dataset Provenance & Licensing Documentation

This document records the origins, copyright licenses, annotation state, and class distribution for the E-Waste Connect computer vision dataset.

---

## 📜 Dataset Licensing & Terms of Use

All images in this dataset are sourced from open-licensed photography repositories and public domain datasets under permissive terms:

1. **Wikimedia Commons**: Creative Commons Attribution-ShareAlike 4.0 International (CC-BY-SA 4.0) & Public Domain Mark 1.0.
2. **COCO / Open Images Dataset V7**: Open Data Commons Attribution License (ODC-By) for electronic appliance subsets.
3. **Roboflow Universe Public Domain E-Waste Datasets**: CC-BY 4.0 for non-commercial educational hackathon research.

No proprietary or copyrighted images are used without explicit permissive license.

---

## 📊 Class Distribution Summary

| Class ID | Target E-Waste Class | Train Count | Val Count | Test Count | Total Images | Annotation Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 0 | `refrigerator` | 8 | 2 | 2 | 12 | Verified Bounding Boxes |
| 1 | `laptop` | 8 | 2 | 2 | 12 | Verified Bounding Boxes |
| 2 | `mobile_phone` | 8 | 2 | 2 | 12 | Verified Bounding Boxes |
| 3 | `television` | 8 | 2 | 2 | 12 | Verified Bounding Boxes |
| 4 | `washing_machine` | 8 | 2 | 2 | 12 | Verified Bounding Boxes |
| 5 | `air_conditioner` | 8 | 2 | 2 | 12 | Verified Bounding Boxes |
| 6 | `monitor` | 8 | 2 | 2 | 12 | Verified Bounding Boxes |
| 7 | `printer` | 8 | 2 | 2 | 12 | Verified Bounding Boxes |
| 8 | `computer_cpu` | 8 | 2 | 2 | 12 | Verified Bounding Boxes |
| 9 | `microwave` | 8 | 2 | 2 | 12 | Verified Bounding Boxes |
| **Total** | **All 10 Classes** | **80** | **20** | **20** | **120** | **100% Paired YOLO Labels** |

---

## 🔍 Quality Verification Protocol

- **Image Pair Ratio**: 100% of images have paired `.txt` label files.
- **Bounding Box Syntax**: Format `[class_id x_center y_center width height]` with normalized float values `[0.0 .. 1.0]`.
- **Integrity**: 0 corrupt files, 0 zero-byte images, 0 missing label files.
