import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import "./header.css";
import { User } from "./User";
import { nav } from "../../assets/data/data";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".header");
      if (header) {
        header.classList.toggle("active", window.scrollY > 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="scontainer flex space-between">
        
        {/* Logo + Title */}
        <div className="logo-title">
          <Link to="/" onClick={closeMenu}>
            <img src={logo} alt="logo" width="80px" />
          </Link>
          <h1 className="project-title">ArdhNaariShakti Taara</h1>
        </div>

        {/* Hamburger Icon */}
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Navigation Menu */}
        <nav className={menuOpen ? "nav-menu active" : "nav-menu"}>
          <ul>
            {nav.map((link) => (
              <li key={link.id}>
                {link.text === "taarabot" ? (
                  <a
                    href={link.url}
                    className="nav-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                  >
                    {link.text}
                  </a>
                ) : (
                  <NavLink
                    to={link.url}
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    onClick={closeMenu}
                  >
                    {link.text}
                  </NavLink>
                )}
              </li>
            ))}
            
            <li className="mobile-account">
              <User />
            </li>
          </ul>
        </nav>

       
        <div className="account flexCenter desktop-account">
          <User />
        </div>
      </div>
    </header>
  );
};
