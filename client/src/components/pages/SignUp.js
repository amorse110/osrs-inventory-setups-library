import React, { useState } from 'react'
import { useHistory } from "react-router-dom";


function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSignup(e) {
    fetch("/signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: e['username'],
        password: e['password'],
      }),
    })//.then((res) => {
      //if (res.ok) {
        //res.json().then((user) => {
          //handleLogin(user);
          
        //})
      //}
    //})
  }

  return (
    <div className="center-container">
      <form onSubmit={handleSignup}>
        <h1>Sign Up</h1>
        <div></div>
        <label htmlFor='username'>Username:</label>
        <input type="text" name='username' id='username' placeholder='Username'/>
        <label htmlFor='password'>Password:</label>
        <input type="text" name='password' id='password' placeholder='Password'/>
        <div></div>
        <button type='submit'>Create Account</button>
      </form>
      <button>Already have an account? Log In Here!</button>
    </div>
  );
}

export default SignUp;