# E-Waste Connect YOLO Dataset Directory

This directory contains the YOLO format dataset structure for training the e-waste object detection model.

## Directory Structure Required:

```text
dataset/
├── data.yaml
├── images/
│   ├── train/     # Training image files (.jpg, .png)
│   ├── val/       # Validation image files
│   └── test/      # Test evaluation image files
└── labels/
    ├── train/     # YOLO format label files (.txt)
    ├── val/       # Validation label files
    └── test/      # Test label files
```

## How to Import a Real E-Waste Dataset:

1. Download an e-waste dataset from Roboflow Universe or Kaggle (Search for "E-Waste Detection" or "Electronic Waste YOLO").
2. Export the dataset in **YOLOv8 PyTorch format**.
3. Extract the image files into `dataset/images/train/` and `dataset/images/val/`.
4. Extract the `.txt` label files into `dataset/labels/train/` and `dataset/labels/val/`.
5. Run the training script:
   ```bash
   python train_yolo.py
   ```
6. Upon completion, the trained weights will be saved to `weights/best.pt` and `weights/best.onnx`.
