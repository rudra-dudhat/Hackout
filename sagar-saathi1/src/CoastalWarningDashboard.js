import React, { useState, useEffect } from 'react';
import { AlertTriangle, Waves, Thermometer, Cloud, Droplets, TrendingUp, Bell, MapPin, Clock, Shield } from 'lucide-react';

const CoastalWarningDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alerts, setAlerts] = useState([]);
  
  // Mock data for demonstration
  const [hazardData, setHazardData] = useState({
    marineHeatwave: { risk: 35, status: 'normal', color: 'green' },
    tsunami: { risk: 15, status: 'normal', color: 'green' },
    cyclone: { risk: 65, status: 'watch', color: 'orange' },
    storm: { risk: 45, status: 'advisory', color: 'yellow' },
    pollution: { risk: 25, status: 'normal', color: 'green' },
    seaLevelRise: { risk: 55, status: 'advisory', color: 'yellow' }
  });

  const [sensorData, setSensorData] = useState({
    windSpeed: '28 km/h',
    waveHeight: '2.3 m',
    temperature: '28.5°C',
    pressure: '1013.2 hPa',
    tide: 'High Tide',
    lastUpdate: '2 min ago'
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      const hazards = Object.keys(hazardData);
      const randomHazard = hazards[Math.floor(Math.random() * hazards.length)];
      const newRisk = Math.floor(Math.random() * 100);
      
      let status = 'normal';
      let color = 'green';
      
      if (newRisk >= 40 && newRisk < 60) {
        status = 'advisory';
        color = 'yellow';
      } else if (newRisk >= 60 && newRisk < 80) {
        status = 'watch';
        color = 'orange';
      } else if (newRisk >= 80) {
        status = 'warning';
        color = 'red';
      }
      
      setHazardData(prev => ({
        ...prev,
        [randomHazard]: { risk: newRisk, status, color }
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'warning': return 'bg-red-500';
      case 'watch': return 'bg-orange-500';
      case 'advisory': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'warning': return 'WARNING';
      case 'watch': return 'WATCH';
      case 'advisory': return 'ADVISORY';
      default: return 'NORMAL';
    }
  };

  const hazardIcons = {
    marineHeatwave: <Thermometer className="w-6 h-6" />,
    tsunami: <Waves className="w-6 h-6" />,
    cyclone: <Cloud className="w-6 h-6" />,
    storm: <Cloud className="w-6 h-6" />,
    pollution: <Droplets className="w-6 h-6" />,
    seaLevelRise: <TrendingUp className="w-6 h-6" />
  };

  const hazardNames = {
    marineHeatwave: 'Marine Heatwave',
    tsunami: 'Tsunami',
    cyclone: 'Cyclone',
    storm: 'Storm',
    pollution: 'Pollution',
    seaLevelRise: 'Sea Level Rise'
  };

  const handlePredict = async (features, mobile) => {
    const res = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ features, mobile })
    });
    const data = await res.json();
    // Show prediction and alert to user
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 text-white">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-cyan-400" />
              <div>
                <h1 className="text-2xl font-bold">SAGAR SAATHI</h1>
                <p className="text-sm text-cyan-300">Coastal Early Warning System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{currentTime.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Ahmedabad, Gujarat</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Risk Assessment */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-yellow-400" />
                Current Risk Assessment (2-Hour Outlook)
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(hazardData).map(([hazard, data]) => (
                  <div key={hazard} className="bg-black/20 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {hazardIcons[hazard]}
                        <span className="font-medium">{hazardNames[hazard]}</span>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(data.status)} text-white`}>
                        {getStatusText(data.status)}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">Risk Level</span>
                        <span className="text-lg font-bold">{data.risk}%</span>
                      </div>
                      
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getStatusColor(data.status)}`}
                          style={{ width: `${data.risk}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sensor Data */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Waves className="w-5 h-5 mr-2 text-cyan-400" />
                Live Sensor Data
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-black/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-400">{sensorData.windSpeed}</div>
                  <div className="text-sm text-gray-300">Wind Speed</div>
                </div>
                <div className="bg-black/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">{sensorData.waveHeight}</div>
                  <div className="text-sm text-gray-300">Wave Height</div>
                </div>
                <div className="bg-black/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-red-400">{sensorData.temperature}</div>
                  <div className="text-sm text-gray-300">Sea Temp</div>
                </div>
                <div className="bg-black/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-400">{sensorData.pressure}</div>
                  <div className="text-sm text-gray-300">Pressure</div>
                </div>
                <div className="bg-black/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">{sensorData.tide}</div>
                  <div className="text-sm text-gray-300">Tide Status</div>
                </div>
                <div className="bg-black/20 rounded-lg p-4 text-center">
                  <div className="text-sm font-bold text-gray-400">{sensorData.lastUpdate}</div>
                  <div className="text-sm text-gray-300">Last Update</div>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts Panel */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Bell className="w-5 h-5 mr-2 text-yellow-400" />
                Active Alerts
              </h2>
              
              <div className="space-y-3">
                {Object.entries(hazardData)
                  .filter(([_, data]) => data.status !== 'normal')
                  .map(([hazard, data], index) => ( // <-- FIX APPLIED HERE: Added `index`
                    <div key={index} className={`p-4 rounded-lg border-l-4 ${
                      data.status === 'warning' ? 'bg-red-900/30 border-red-500' :
                      data.status === 'watch' ? 'bg-orange-900/30 border-orange-500' :
                      'bg-yellow-900/30 border-yellow-500'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {hazardIcons[hazard]}
                          <span className="font-semibold">{hazardNames[hazard]}</span>
                        </div>
                        <span className="text-sm font-bold">{data.risk}%</span>
                      </div>
                      <div className="mt-2 text-sm text-gray-300">
                        {data.status === 'warning' ? 'Execute SOPs; evacuate if directed.' :
                          data.status === 'watch' ? 'Prepare response assets; pre-notify stakeholders.' :
                          'Increased vigilance; check resources.'}
                      </div>
                    </div>
                  ))}
              </div>
              
              {Object.values(hazardData).every(data => data.status === 'normal') && (
                <div className="text-center py-8 text-gray-400">
                  <Shield className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No active alerts</p>
                  <p className="text-sm">All systems normal</p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                  Send Test Alert
                </button>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
                  View Historical Data
                </button>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors">
                  Generate Report
                </button>
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg transition-colors">
                  Emergency Contacts
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoastalWarningDashboard;
