// src/models/riskModel.js

class RiskModel {
    constructor() {
        // Define thresholds for risk levels
        this.riskLevels = {
            low: { min: 0, max: 39 },
            advisory: { min: 40, max: 59 },
            watch: { min: 60, max: 79 },
            warning: { min: 80, max: 100 },
        };
    }

    calculateRiskLevel(data) {
        // Example calculation based on input data
        const { windSpeed, waveHeight, temperature, pressure } = data;

        // Simple risk calculation logic (this can be modified as per requirements)
        let riskScore = (windSpeed * 0.4) + (waveHeight * 0.3) + (temperature * 0.2) + (pressure * 0.1);

        // Determine risk level based on calculated score
        return this.getRiskLevel(riskScore);
    }

    getRiskLevel(score) {
        if (score >= this.riskLevels.warning.min) {
            return '🔴 Warning';
        } else if (score >= this.riskLevels.watch.min) {
            return '🟠 Watch';
        } else if (score >= this.riskLevels.advisory.min) {
            return '🟡 Advisory';
        } else {
            return '🟢 Normal';
        }
    }
}

module.exports = new RiskModel();