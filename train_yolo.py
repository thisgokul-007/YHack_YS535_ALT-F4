#!/usr/bin/env python3
"""
E-Waste Connect — PyTorch YOLOv8 Training Script
Fine-tunes YOLOv8n (nano) on 10 E-Waste Classes.
"""

import os
import sys
import argparse

def main():
    parser = argparse.ArgumentParser(description="Train YOLOv8 on E-Waste Dataset")
    parser.add_argument("--epochs", type=int, default=30, help="Number of training epochs")
    parser.add_argument("--imgsz", type=int, default=640, help="Image size")
    parser.add_argument("--batch", type=int, default=16, help="Batch size")
    args = parser.parse_args()

    project_root = os.path.dirname(os.path.abspath(__file__))
    data_yaml = os.path.join(project_root, "dataset", "data.yaml")
    train_images_dir = os.path.join(project_root, "dataset", "images", "train")

    print("=" * 65)
    print("  E-WASTE CONNECT — YOLOv8 TRAINING PIPELINE")
    print("=" * 65)
    print(f"Data Config: {data_yaml}")
    print(f"Target Epochs: {args.epochs} | Image Size: {args.imgsz} | Batch: {args.batch}")

    # Check if dataset images exist
    if not os.path.exists(train_images_dir) or len(os.listdir(train_images_dir)) == 0:
        print("\n[WARNING] DATASET IMAGES MISSING!")
        print("---------------------------------------------------------------")
        print("No training images found in dataset/images/train/.")
        print("To train a custom real model:")
        print("  1. Import YOLO-formatted images to dataset/images/train/ and dataset/labels/train/.")
        print("  2. Run `python train_yolo.py` again.")
        print("Refer to dataset/README.md for download instructions.")
        print("---------------------------------------------------------------\n")
        sys.exit(1)

    try:
        from ultralytics import YOLO
    except ImportError:
        print("\n[ERROR] Ultralytics package is not installed.")
        print("Please install requirements using: pip install ultralytics torch torchvision\n")
        sys.exit(1)

    print("\n[1/3] Loading pretrained YOLOv8n base model...")
    model = YOLO("yolov8n.pt")

    print("\n[2/3] Starting model fine-tuning on e-waste classes...")
    results = model.train(
        data=data_yaml,
        epochs=args.epochs,
        imgsz=args.imgsz,
        batch=args.batch,
        project=os.path.join(project_root, "runs"),
        name="ewaste_yolov8n",
        exist_ok=True
    )

    # Save best model to weights/best.pt
    weights_dir = os.path.join(project_root, "weights")
    os.makedirs(weights_dir, exist_ok=True)
    best_pt_path = os.path.join(weights_dir, "best.pt")

    # Export ONNX format for browser inference
    print("\n[3/3] Exporting trained model to weights/best.pt and ONNX format...")
    best_model = YOLO(model.trainer.best)
    best_model.save(best_pt_path)
    onnx_path = best_model.export(format="onnx")

    print("\n" + "=" * 65)
    print("  TRAINING COMPLETE! METRICS SUMMARY:")
    print("=" * 65)
    print(f"✓ Saved Best Model: {best_pt_path}")
    print(f"✓ Saved ONNX Model: {onnx_path}")
    print("You can now launch the inference server: python yolo_inference_server.py")
    print("=" * 65)

if __name__ == "__main__":
    main()
