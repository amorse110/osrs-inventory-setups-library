import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import AddSetup from "./AddSetup";
import Homepage from "./HomePage";
import Login from "./Login";
import Setups from "./Setups";
import SignUp from "./SignUp";

function App() {
  return(
  <div>
    <Switch>
      <Route path="/"><Homepage /></Route>
      <Route path="/login"><Login /></Route>
      <Route path="/signup"><SignUp /></Route>
      <Route path="/setups"><Setups /></Route>
      <Route path="/add_setup"><AddSetup /></Route>
    </Switch>
  </div>
  );
}

export default App;
