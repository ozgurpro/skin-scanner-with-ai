# 🩺 AI-Powered Skin Cancer & Lesion Scanner

![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![TensorFlow](https://img.shields.io/badge/Model-MobileNetV2%20%2F%20TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)
![Flask](https://img.shields.io/badge/Backend-Flask%20REST%20API-000000?style=for-the-badge&logo=flask&logoColor=white)
![React Native](https://img.shields.io/badge/Mobile-React%20Native-61DAFB?style=for-the-badge&logo=react&logoColor=white)

An end-to-end medical Computer Vision application that classifies dermatological skin lesions in real-time using a fine-tuned MobileNetV2 architecture trained on the HAM10000 dataset.

---

## 🎯 Architecture & System Overview

This project links a deep learning classification model with a mobile client via a lightweight Flask REST API to deliver instant, on-device skin lesion diagnostic assistance.

* **CiltTarayici (Mobile App):** React Native mobile user interface for image capture and diagnostic results.
* **Cilt-flask-backend (REST API):** Flask web service for image processing and TensorFlow model inferencing.
* **MobileNetV2 Engine:** Deep learning model trained on the HAM10000 dataset for multi-class skin lesion classification.

---

## ⚡ Technical Highlights & Stack Breakdown

### 🤖 1. Deep Learning Engine (Computer Vision)
* **Dataset:** Trained and evaluated on the HAM10000 ("Human Against Machine with 10000 training images") dermatoscopic image dataset.
* **Architecture:** Transfer Learning utilizing MobileNetV2 for lightweight, low-latency, and high-accuracy mobile edge compatibility.
* **Data Preprocessing:** Image normalization, spatial resizing, and data augmentation techniques to balance class representation across skin disease categories.

### 🌐 2. Backend Microservice (Cilt-flask-backend)
* Built with Flask to serve real-time inferencing endpoints.
* Accepts multi-part image uploads, handles tensor array transformations, and returns JSON payloads containing predicted diagnostic classes and confidence scores.

### 📱 3. Mobile Frontend (CiltTarayici)
* Cross-platform mobile UI built with React Native.
* Features native camera integration for taking lesion snapshots or picking images from gallery, submitting requests to backend API, and displaying diagnostic probabilities.

---

## 📂 Repository Structure

* `CiltTarayici/` - React Native Cross-Platform Mobile Application
* `Cilt-flask-backend/` - Flask REST API & TensorFlow Inference Pipeline

---

## 🔬 Dataset Reference

The model leverages the HAM10000 dataset, containing 10,015 dermatoscopic images covering 7 diagnostic categories of pigmented skin lesions (Melanoma, Basal cell carcinoma, Actinic keratoses, etc.).
