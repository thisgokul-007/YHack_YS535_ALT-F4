#!/usr/bin/env python3
"""
E-Waste Connect — Dataset Validation & Quality Auditor
Scans dataset/ structure for corruption, label syntax, bounding box bounds,
class imbalance, and train/val/test splits.
"""

import os
import sys
from collections import defaultdict

CLASSES = [
  "refrigerator",
  "laptop",
  "mobile_phone",
  "television",
  "washing_machine",
  "air_conditioner",
  "monitor",
  "printer",
  "computer_cpu",
  "microwave"
]

def audit_dataset(project_root):
    dataset_dir = os.path.join(project_root, "dataset")
    images_dir = os.path.join(dataset_dir, "images")
    labels_dir = os.path.join(dataset_dir, "labels")

    if not os.path.exists(images_dir) or not os.path.exists(labels_dir):
        print("[ERROR] dataset/ directory structure is incomplete.")
        sys.exit(1)

    split_counts = {"train": 0, "val": 0, "test": 0}
    class_counts = defaultdict(int)
    total_annotations = 0
    missing_labels = []
    invalid_boxes = []
    corrupt_files = []

    for split in ["train", "val", "test"]:
        s_img_dir = os.path.join(images_dir, split)
        s_lbl_dir = os.path.join(labels_dir, split)

        if not os.path.exists(s_img_dir):
            continue

        images = [f for f in os.listdir(s_img_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
        split_counts[split] = len(images)

        for img_name in images:
            stem = os.path.splitext(img_name)[0]
            lbl_name = f"{stem}.txt"
            lbl_path = os.path.join(s_lbl_dir, lbl_name)
            img_path = os.path.join(s_img_dir, img_name)

            if os.path.getsize(img_path) == 0:
                corrupt_files.append(img_path)
                continue

            if not os.path.exists(lbl_path):
                missing_labels.append(img_name)
                continue

            with open(lbl_path, "r") as f:
                lines = f.readlines()

            if not lines:
                missing_labels.append(lbl_name)

            for l_num, line in enumerate(lines):
                parts = line.strip().split()
                if len(parts) != 5:
                    invalid_boxes.append(f"{lbl_name}: line {l_num+1} syntax error")
                    continue

                try:
                    cls_id = int(parts[0])
                    x_c = float(parts[1])
                    y_c = float(parts[2])
                    w = float(parts[3])
                    h = float(parts[4])

                    if not (0 <= cls_id < len(CLASSES)):
                        invalid_boxes.append(f"{lbl_name}: invalid class ID {cls_id}")
                    if not (0.0 <= x_c <= 1.0 and 0.0 <= y_c <= 1.0 and 0.0 <= w <= 1.0 and 0.0 <= h <= 1.0):
                        invalid_boxes.append(f"{lbl_name}: bounding box out of bounds [0..1]")

                    class_counts[CLASSES[cls_id]] += 1
                    total_annotations += 1
                except ValueError:
                    invalid_boxes.append(f"{lbl_name}: numerical format error")

    # Generate Audit Report
    print("=" * 65)
    print("  E-WASTE DATASET QUALITY AUDIT REPORT")
    print("=" * 65)
    print(f"Total Images: {sum(split_counts.values())}")
    print(f"  * Train Split: {split_counts['train']} images")
    print(f"  * Val Split:   {split_counts['val']} images")
    print(f"  * Test Split:  {split_counts['test']} images")
    print(f"Total Annotated Bounding Boxes: {total_annotations}")
    print("-" * 65)
    print("CLASS DISTRIBUTION BREAKDOWN:")
    for cls in CLASSES:
        cnt = class_counts[cls]
        print(f"  * {cls:<20}: {cnt} annotated images")
    print("-" * 65)
    print(f"Corrupt Files: {len(corrupt_files)}")
    print(f"Missing Labels: {len(missing_labels)}")
    print(f"Invalid Bounding Boxes: {len(invalid_boxes)}")
    print("=" * 65)

    is_ready = len(corrupt_files) == 0 and len(missing_labels) == 0 and len(invalid_boxes) == 0 and total_annotations > 0
    if is_ready:
        print("[OK] DATASET AUDIT PASSED: Ready for YOLO Training!")
    else:
        print("[WARN] AUDIT WARN: Please resolve listed errors before training.")

    return {
        "split_counts": split_counts,
        "class_counts": class_counts,
        "total_annotations": total_annotations,
        "is_ready": is_ready
    }

def main():
    project_root = os.path.dirname(os.path.abspath(__file__))
    audit_dataset(project_root)

if __name__ == "__main__":
    main()
