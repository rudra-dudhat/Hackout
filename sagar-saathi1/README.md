# SAGAR SAATHI
## Coastal Early Warning and Alerting System

**Team Recursive Titan** - Hackathon Project

### 🌊 Project Overview

SAGAR SAATHI is an advanced coastal early warning system designed to protect coastal communities from various marine hazards including storms, cyclones, tsunamis, marine heatwaves, pollution, and sea-level rise.

### 🚀 Features

- **Real-time Risk Assessment**: 2-hour outlook for 6 types of coastal hazards
- **Live Sensor Data**: Wind speed, wave height, temperature, pressure, and tide status
- **Color-coded Alert System**: 
  - 🟢 Normal (0-39%)
  - 🟡 Advisory (40-59%) 
  - 🟠 Watch (60-79%)
  - 🔴 Warning (80-100%)
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Updates**: Simulated live data feeds every 5 seconds

### 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 14.0 or higher)
- **npm** (comes with Node.js)
- A modern web browser

### 🛠️ Installation Steps

1. **Install Node.js**
   - Download from [https://nodejs.org/](https://nodejs.org/)
   - Install the LTS version

2. **Create Project Directory**
   ```bash
   mkdir sagar-saathi
   cd sagar-saathi
   ```

3. **Initialize React App**
   ```bash
   npx create-react-app .
   ```

4. **Install Dependencies**
   ```bash
   npm install lucide-react
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

5. **Replace/Create Files**
   - Replace the generated files with the ones provided
   - Ensure all files are in their correct locations

### 📁 Project Structure

```
sagar-saathi/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── App.js
│   ├── App.css
│   ├── CoastalWarningDashboard.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

### 🏃‍♂️ Running the Application

1. **Start Development Server**
   ```bash
   npm start
   ```

2. **Open Browser**
   - Navigate to `http://localhost:3000`
   - The app will automatically reload if you make changes

### 🔧 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

### 📱 Key Components

#### 1. CoastalWarningDashboard.js
The main dashboard component featuring:
- Real-time hazard monitoring
- Sensor data display
- Active alerts panel
- Quick action buttons

#### 2. Responsive Design
- Mobile-first approach
- Tailwind CSS for styling
- Lucide React for icons

#### 3. Real-time Updates
- Simulated live data feeds
- Auto-updating risk assessments
- Dynamic status changes

### 🎯 Hazard Types Monitored

1. **Marine Heat