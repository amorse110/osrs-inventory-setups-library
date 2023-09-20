import React, { useState, useContext } from 'react'
import { UserContext } from '../UserContext'
import { useHistory } from "react-router-dom"

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const[_, setUser] = useContext(UserContext)

  const history = useHistory();

  function handleLogin(e) {
    e.preventDefault();

    fetch("/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      else {
        alert("login failed")
      }
    })
      .then(user => {
        setUser(user);
        history.push('/');
      });
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