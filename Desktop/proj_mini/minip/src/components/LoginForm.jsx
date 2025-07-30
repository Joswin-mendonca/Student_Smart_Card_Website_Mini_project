import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate hook

const LoginForm = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Styles for the button and form
  const WebStyle = {
    color: 'white',
    backgroundColor: 'black',
    padding: '50 20 50 20',
    margin: 50,
    borderRadius: 20,
    borderColor: 'blue',
    borderWidth: 20,
    fontFamily: 'monospace',
    fontSize: 20,
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Hardcoded correct username and password
    const correctUsername = 'Joswin';
    const correctPassword = 'Joswin@2004';

    // Check if the entered username and password match
    if (username === correctUsername && password === correctPassword) {
      setMessage('Login successful!');
      navigate('/Adminhome'); // Navigate to the Adminhome route on successful login
    } else {
      setMessage('Password is incorrect.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>} {/* Display message */}
    </div>
  );
};

export default LoginForm;
