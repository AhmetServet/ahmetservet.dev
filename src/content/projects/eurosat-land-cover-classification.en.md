---
title: Land Use and Land Cover Classification
description: A PyTorch transfer learning pipeline that classifies EuroSAT satellite imagery into ten land-cover classes, reaching 96.7% test accuracy.
locale: en
path: eurosat-land-cover-classification
order: 4
---

Land use and land cover classification is a remote sensing task. It matters for agriculture, urban planning, environmental monitoring, and disaster response. In this project, I trained and evaluated CNNs that classify Sentinel-2 image patches from the RGB EuroSAT dataset into ten classes, from forests and rivers to highways and residential areas.

I started in a notebook on Google Colab, then turned the work into reusable scripts. The final models were trained on a rented NVIDIA RTX 6000-class GPU.

## Dataset

EuroSAT RGB has 27,000 image patches of 64 × 64 pixels across ten classes. I split it into stratified train, validation, and test sets in a 70/15/15 ratio with a fixed seed, which leaves 4,050 images for the test set.

Random samples from each class:

![A grid of random EuroSAT samples, one row per land-cover class](./images/eurosat/sample_grid.jpg)

The classes are slightly imbalanced, with 2,000 to 3,000 images each, so training uses a class-weighted loss.

![Number of images per class in EuroSAT](./images/eurosat/class_distribution.png)

![Per-class RGB pixel intensity distributions](./images/eurosat/pixel_histograms.png)

## Method

Both backbones start from ImageNet-pretrained weights in torchvision. Each one gets a new classifier head for the ten EuroSAT classes, and training runs in two phases:

1. **Frozen backbone:** train only the new head, for 10 epochs at a learning rate of 1e-3.
2. **Fine-tuning:** unfreeze the whole network and continue from the best phase-one weights, for 20 epochs at a learning rate of 1e-5.

Images are resized to 224 × 224, and training uses horizontal flips, random rotation, and color jitter. Training also uses the AdamW optimizer, class-weighted cross-entropy, ReduceLROnPlateau, early stopping on validation loss, mixed precision on CUDA, and checkpoint resume.

## Results

The evaluation used the held-out test set of 4,050 images.

| Model | Accuracy | Macro F1 | Macro AUC | ms / image | Parameters |
|---|---:|---:|---:|---:|---:|
| VGG16-BN | 96.69% | 0.9665 | 0.9993 | 139.74 | 134.3M |
| MobileNetV2 | 95.26% | 0.9511 | 0.9986 | 27.97 | 2.9M |

VGG16-BN is the most accurate model. MobileNetV2 is only 1.4 points behind, and it is about 46 times smaller and 5 times faster. That makes it the more practical choice when latency or memory matters.

![Accuracy, F1, and latency comparison of VGG16-BN and MobileNetV2](./images/eurosat/model_comparison.png)

### VGG16-BN

![VGG16-BN confusion matrix on the test set](./images/eurosat/vgg16_bn_confusion.png)

![VGG16-BN training and validation curves](./images/eurosat/vgg16_bn_training.png)

The wrong predictions with the highest confidence are useful for error analysis. For VGG16-BN, all five are annual crops predicted as permanent crops, two classes that can look almost the same from above.

![VGG16-BN's highest-confidence misclassifications](./images/eurosat/vgg16_bn_misclassifications.png)

### MobileNetV2

![MobileNetV2 confusion matrix on the test set](./images/eurosat/mobilenet_v2_confusion.png)

![MobileNetV2 training and validation curves](./images/eurosat/mobilenet_v2_training.png)

![MobileNetV2's highest-confidence misclassifications](./images/eurosat/mobilenet_v2_misclassifications.png)

## Stack

Python, PyTorch, torchvision, scikit-learn, pandas, NumPy, Matplotlib, seaborn, Google Colab.

## Links

- [Source code on GitHub](https://github.com/AhmetServet/eurosat-cnn)
