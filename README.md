# 🌊 SAGAR SAATHI — Coastal Hazard Early Warning System

> Built at **Hackout'25** — DA-IICT Annual Tech Festival (72-hour Hackathon)

SAGAR SAATHI is a full-stack coastal hazard early warning platform that provides real-time risk assessment for **cyclones** and **tsunamis** using machine learning. It is designed to help coastal communities and authorities respond faster to life-threatening maritime disasters.

---

## 🚀 Features

- 🔴 **Real-time Risk Assessment** — Predicts cyclone and tsunami risk within a 2-hour window
- 🗺️ **Geospatial Dashboard** — Interactive map with hazard zone visualization
- 🤖 **ML-Powered Prediction** — Trained models for high-accuracy disaster forecasting
- 📲 **Multilingual Alerts** — Automated SMS and push notifications in regional languages
- 🗃️ **PostgreSQL Integration** — Persistent storage of hazard data and alerts
- 📱 **Responsive Design** — Mobile-first UI accessible on all devices

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js, HTML5, CSS3 |
| Backend | Python, Flask |
| Machine Learning | Python (scikit-learn / custom ML models) |
| Database | PostgreSQL |
| Notifications | SMS API, Push Notifications |
| Data | Jupyter Notebook (model training & dataset analysis) |

---

## 📁 Project Structure

```
Hackout/
├── sagar-saathi1/          # Frontend - React application
├── sagar-saathi2/
│   └── sagar-saathi-backend/  # Backend - Flask API server
├── dahack/                 # Hackathon prototype files
├── da hack/                # Initial ideation files
├── dataset/                # Training datasets
├── instance/               # Flask instance config
├── index.html              # Entry HTML file
├── package.json            # Node dependencies
├── run_all.bat             # Windows script to run all services
└── SAGAR SAATHI.pdf        # Project presentation / report
```

---

## ⚙️ Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- PostgreSQL

### 1. Clone the Repository

```bash
git clone https://github.com/rudra-dudhat/Hackout.git
cd Hackout
```

### 2. Set Up the Backend

```bash
cd sagar-saathi2/sagar-saathi-backend
pip install -r requirements.txt
python app.py
```

### 3. Set Up the Frontend

```bash
cd sagar-saathi1
npm install
npm start
```

### 4. Quick Start (Windows)

```bash
run_all.bat
```

---

## 🧠 ML Models

The prediction models were trained on historical coastal hazard data stored in the `dataset/` directory. Model training notebooks are available in the Jupyter Notebook files.

- **Cyclone Risk Model** — Predicts cyclone probability based on meteorological parameters
- **Tsunami Risk Model** — Predicts tsunami risk based on seismic and oceanic data

---

## 👥 Team

Built by a 4-member team at **Hackout'25**, DA-IICT Annual Tech Festival, Gandhinagar.

- **Rudra Dudhat** — Team Lead, Full-stack & ML  
  [![GitHub](https://img.shields.io/badge/GitHub-rudra--dudhat-black?logo=github)](https://github.com/rudra-dudhat)

---


## 🏆 Hackathon

**Event:** Hackout'25 — DA-IICT Annual Tech Festival  
**Duration:** 72-hour sprint  
**Location:** Gandhinagar, India  
**Date:** January 2025
