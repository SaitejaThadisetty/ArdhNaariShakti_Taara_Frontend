import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import "./header.css";
import { User } from "./User";
import { nav } from "../../assets/data/data";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRef } from "react";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false); // New state for profile menu
  const [showProfileOnly, setShowProfileOnly] = useState(false); // New state for profile-only view
  const navRef = useRef();

  // Add a state for window width to detect mobile view
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobileView = windowWidth <= 768; // Define mobile view breakpoint

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".header");
      if (header) {
        header.classList.toggle("active", window.scrollY > 100);
      }
    };

    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target) && (menuOpen || profileOpen || showProfileOnly)) {
        setMenuOpen(false);
        setProfileOpen(false);
        setShowProfileOnly(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen, profileOpen, showProfileOnly]);

  const closeMenu = () => { 
    setMenuOpen(false); 
    setProfileOpen(false);
    setShowProfileOnly(false);
  };

  const toggleProfileOnly = () => {
    setShowProfileOnly(!showProfileOnly);
    setMenuOpen(false); // Ensure main menu is closed when opening profile drawer
  };

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
        <div className="menu-icon" onClick={() => { 
          if (showProfileOnly) {
            setShowProfileOnly(false); // Close profile drawer
            setMenuOpen(true); // Open main menu
          } else {
            setMenuOpen(!menuOpen); // Toggle main menu
            setProfileOpen(false); // Close desktop profile if open
          }
          console.log('Menu Open:', !menuOpen, 'Profile Only:', showProfileOnly);
        }}>
          {menuOpen && !showProfileOnly ? <FaTimes /> : <FaBars />}
        </div>

        {/* Navigation Menu */}
        {!showProfileOnly && (
          <nav ref={navRef} className={menuOpen ? "nav-menu active" : "nav-menu"}>
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
                <User closeMobileMenu={closeMenu} profileOpen={profileOpen} setProfileOpen={setProfileOpen} toggleProfileOnly={toggleProfileOnly} isMobile={isMobileView} />
              </li>
            </ul>
          </nav>
        )}

        {/* Profile Drawer (Mobile Only) */}
        {isMobileView && (
          <div className={`profile-drawer ${showProfileOnly ? 'active' : ''}`} onClick={() => console.log('Clicked Profile Drawer Container')}>
            <User closeMobileMenu={closeMenu} profileOpen={profileOpen} setProfileOpen={setProfileOpen} toggleProfileOnly={toggleProfileOnly} showProfileOnly={showProfileOnly} isMobile={isMobileView} />
          </div>
        )}

        <div className="account flexCenter desktop-account">
          <User closeMobileMenu={closeMenu} isMobile={isMobileView} />
        </div>
      </div>
    </header>
  );
};
