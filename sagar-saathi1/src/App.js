import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './SignUp';
import Login from './Login';
import CoastalWarningDashboard from './CoastalWarningDashboard';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/" element={<CoastalWarningDashboard user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;