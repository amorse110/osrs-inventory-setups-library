import React, { useState } from 'react'
import { useHistory } from "react-router-dom";


function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  function handleSignup(e) {
    e.preventDefault();

    fetch("/signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
    .then(res => res.json())
    .then((data) => {
      if (data.success) {
        history.push('/login');
      } else {
        alert(data.message);
      }
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
  }

  return (
    <div className="center-container">
      <form onSubmit={handleSignup}>
        <h1>Sign Up</h1>
        <div></div>
        <label htmlFor='username'>Username:</label>
        <input type="text" name='username' id='username' placeholder='Username'
          value={username} onChange={(e) => setUsername(e.target.value)}/>
        <label htmlFor='password'>Password:</label>
        <input type="password" name='password' id='password' placeholder='Password'
          value={password} onChange={(e) => setPassword(e.target.value)}/>
        <div></div>
        <button type='submit'>Create Account</button>
      </form>
      <button onClick={() => history.push('/login')}>Already have an account? Log In Here!</button>
    </div>
  );
}

export default SignUp;