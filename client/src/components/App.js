// import React, { useEffect, useState, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { Navbar } from "./Navbar"
import { HomePage } from "./pages/HomePage";
import { Setups } from "./pages/Setups";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { AddSetup } from "./pages/AddSetup";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" element={<HomePage />} />
        <Route path="/setups" element={<Setups />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/add_setup" element={<AddSetup />} />
      </Switch>
    </div>
  );
}

export default App;
