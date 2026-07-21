<div align="center">

# 🩺 AI-Powered Skin Cancer & Lesion Scanner

![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![TensorFlow](https://img.shields.io/badge/Model-MobileNetV2%20%2F%20TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)
![Flask](https://img.shields.io/badge/Backend-Flask%20REST%20API-000000?style=for-the-badge&logo=flask&logoColor=white)
![React Native](https://img.shields.io/badge/Mobile-React%20Native-61DAFB?style=for-the-badge&logo=react&logoColor=white)

*An end-to-end medical Computer Vision application that classifies dermatological skin lesions in real-time using a fine-tuned MobileNetV2 architecture trained on the HAM10000 dataset.*

</div>

---

## 🎯 Architecture & System Overview

This project links a deep learning classification model with a mobile client via a lightweight Flask REST API to deliver instant, on-device skin lesion diagnostic assistance.

```text
┌─────────────────────────┐         ┌─────────────────────────┐         ┌─────────────────────────┐
│  CiltTarayici (Mobile)  │  HTTP   │   Cilt-flask-backend    │  Inference │   MobileNetV2 Model    │
│  React Native App       │ ──────> │   Flask REST API        │ ────────> │   Fine-Tuned on         │
│  (Image Capture & UI)   │ <────── │   (Image Preprocessing) │ <──────── │   HAM10000 Dataset      │
└─────────────────────────┘  JSON   └─────────────────────────┘   Tensor │                         │
                                                                         └─────────────────────────┘
