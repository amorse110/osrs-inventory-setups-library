import React, { useState } from 'react'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(username);
  }

  return (
    <div className='center-container'>
      <form>
        <h1>Login</h1>
        <div />
        <label htmlFor='Username'>Username:</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} 
          type="text" placeholder='Username'/>
        <label htmlFor='Password'>Password:</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} 
          type="password" placeholder='Password'/>
        <button type="submit">Submit</button>
      </form>
      <button>Don't have an account yet? Register Here!</button>
    </div>
  );
}

export default Login;