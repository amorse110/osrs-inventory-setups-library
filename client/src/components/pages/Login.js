import React, { useState } from 'react'
import { useHistory } from "react-router-dom"

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  function handleLogin(e) {
    e.preventDefault();
    console.log(username);
  }

  return (
    <div className='center-container'>
      <form onSubmit={handleLogin}>
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
      <button onClick={() => history.push('/signup')}>Don't have an account yet? Register Here!</button>
    </div>
  );
}

export default Login;