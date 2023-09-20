import React, { useEffect, useState, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { Navbar } from "./Navbar"
import HomePage from "./pages/HomePage";
import Setups from "./pages/Setups";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AddSetup from "./pages/AddSetup";
import EditSetup from "./pages/EditSetup"
import { UserContext } from "./UserContext";

function App() {

  const [user, setUser] = useContext(UserContext)
  useEffect(() => {
    // auto-login
    fetch("/autologin").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  // if (!user) return 
  // <Switch>
  //   <Route path="/login" component={Login}/>
  //   <Route path="/signup" component={SignUp}/>
  // </Switch>

  return (
    <div className="App">
      <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/setups" component={Setups} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/add_setup" component={AddSetup} />
          <Route path="/edit-setup/:setupId" component={EditSetup} />
        </Switch>
    </div>
  );
}

export default App;
