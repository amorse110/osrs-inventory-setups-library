import React, { useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import { UserContext } from '../UserContext';


function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [user, setUser] = useContext(UserContext)

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
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      else {
        alert("invalid credentials")
      }
    })
    .then((user) => {
        setUser(user);
        history.push('/');
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