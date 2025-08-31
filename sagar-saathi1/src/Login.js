import React from 'react';

function Login({ onLogin }) {
  const handleLogin = () => {
    // Dummy user object
    const user = { name: 'User' };
    onLogin(user);
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}

export default Login;