import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom"

import "./Navbar.css";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav>
        <Link to="/" className="title">Home</Link>
        <div 
            className="menu" 
            onClick={() => {
            setMenuOpen(!menuOpen);
        }}
        >
            <span></span>
            <span></span>
            <span></span>
        </div>
        <ul className={menuOpen ? "open" : ""}>
            <li>
                <NavLink to="/setups">Setups</NavLink>
            </li>
            <li>
                <NavLink to="/add_setup">Add Setup</NavLink>
            </li>
            <li>
                <NavLink to="/login">Login</NavLink>
            </li>
            <li>
                <NavLink to="/signup">Sign Up</NavLink>
            </li>
        </ul>
    </nav>
    );
};
