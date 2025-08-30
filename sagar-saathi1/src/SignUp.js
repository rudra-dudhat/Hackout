import React, { useState } from 'react';

export default function SignUp() {
  const [form, setForm] = useState({ email: '', username: '', password: '', mobile: '' });
  const [msg, setMsg] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setMsg(data.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="username" placeholder="Username" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <input name="mobile" placeholder="Mobile Number" onChange={handleChange} required />
      <button type="submit">Sign Up</button>
      <div>{msg}</div>
    </form>
  );
}