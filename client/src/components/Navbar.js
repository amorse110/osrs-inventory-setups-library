import React, { useState, useContext } from 'react';
import { Link, NavLink } from "react-router-dom"
import { UserContext } from './UserContext';

import "./Navbar.css";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    const [user, setUser] = useContext(UserContext)

    console.log(user)
    function handleLogout() {
        fetch('/logout', {
            method: 'DELETE'
        }).then((res) => {
            if (res.ok) {
                setUser(null);
            }
        });
    }

  return (
    <nav>
        <Link to="/" className="title">OSRS Setup Library</Link>
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
                <NavLink to="/setups"><strong>Setups</strong></NavLink>
            </li>
            <li>
                <NavLink to="/add_setup"><strong>Add Setup</strong></NavLink>
            </li>
            <li>
                {/* ######################### COME BACK AND FIX THIS WHEN USER IS SET UP ########################### */}
                {user ? (
                    <div>
                        <p>Welcome, {user.username}!</p>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <NavLink to="/login"><strong>Log In</strong></NavLink>
                )}
                {/* <NavLink to="/login"><strong>Log In</strong></NavLink> */}
            </li>
            <li>
                <NavLink to="/signup"><strong>Sign Up</strong></NavLink>
            </li>
        </ul>
    </nav>
    );
};
