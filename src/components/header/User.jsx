import React, { useContext, useState, useRef, useEffect } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { BsBagCheck } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { GrHelp } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";
import { RiImageAddLine } from "react-icons/ri";
import { Context } from "../../context/Context";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useClickOutside } from '../../hooks/useClickOutside';

export const User = ({ closeMobileMenu, profileOpen: propProfileOpen, setProfileOpen: propSetProfileOpen, toggleProfileOnly, showProfileOnly, isMobile }) => {
  const { user, dispatch } = useContext(Context);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  const [localProfileOpen, setLocalProfileOpen] = useState(false);

  const currentProfileOpen = isMobile ? propProfileOpen : localProfileOpen;
  const currentSetProfileOpen = isMobile ? propSetProfileOpen : setLocalProfileOpen;

  useClickOutside(profileRef, () => {
    if (isMobile) {
      if (showProfileOnly) {
        toggleProfileOnly();
      }
    } else {
      currentSetProfileOpen(false);
    }
  });

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    toast.success("Logged out successfully!", {
      position: "top-center",
      autoClose: 2000,
    });
    if (isMobile) {
      closeMobileMenu();
    }
    navigate('/');
  };

  const PublicFlo = "https://taara-backend.onrender.com/images/";

  return (
    <div className="profile" ref={profileRef}>
      {user ? (
        <>
          {!showProfileOnly && (
            <button
              className="img"
              onClick={() => {
                if (isMobile) {
                  toggleProfileOnly();
                } else {
                  currentSetProfileOpen(!currentProfileOpen);
                }
              }}
            >
              <img
                src="https://www.blookup.com/static/images/single/profile-1.edaddfbacb02.png"
                alt=""
              />
            </button>
          )}
          {currentProfileOpen && !isMobile && (
            <div className="openProfile boxItems" onClick={e => e.stopPropagation()}>
              <Link to={"/account"} onClick={() => currentSetProfileOpen(false)}>
                <div className="image">
                  <div className="img">
                    <img
                      src="https://www.blookup.com/static/images/single/profile-1.edaddfbacb02.png"
                      alt=""
                    />
                  </div>
                  <div className="text">
                    <h4>{user.username}</h4>
                    <label>India, Delhi</label>
                  </div>
                </div>
              </Link>
              <button className="box" onClick={() => {navigate("/create"); currentSetProfileOpen(false);}}>
                <RiImageAddLine className="icon" />
                <h4>Create Post</h4>
              </button>
              <button className="box" onClick={() => {navigate("/account"); currentSetProfileOpen(false);}}>
                <IoSettingsOutline className="icon" />
                <h4>My Account</h4>
              </button>
              <button className="box" onClick={() => {navigate("/help"); currentSetProfileOpen(false);}}>
                <GrHelp className="icon" />
                <h4>Help</h4>
              </button>
              <button className="box" onClick={() => {handleLogout(); currentSetProfileOpen(false);}}>
                <BiLogOut className="icon" />
                <h4>Log Out</h4>
              </button>
            </div>
          )}
          {showProfileOnly && isMobile && (
            <div className="openProfile boxItems" onClick={e => e.stopPropagation()}>
              <button className="closeProfileMenu" onClick={toggleProfileOnly}>
                <FaTimes />
              </button>
              <Link to={"/account"} onClick={closeMobileMenu}>
                <div className="image">
                  <div className="img">
                    <img
                      src="https://www.blookup.com/static/images/single/profile-1.edaddfbacb02.png"
                      alt=""
                    />
                  </div>
                  <div className="text">
                    <h4>{user.username}</h4>
                    <label>India, Delhi</label>
                  </div>
                </div>
              </Link>
              <button className="box" onClick={() => {navigate("/create"); closeMobileMenu();}}>
                <RiImageAddLine className="icon" />
                <h4>Create Post</h4>
              </button>
              <button className="box" onClick={() => {navigate("/account"); closeMobileMenu();}}>
                <IoSettingsOutline className="icon" />
                <h4>My Account</h4>
              </button>
              <button className="box" onClick={() => {navigate("/help"); closeMobileMenu();}}>
                <GrHelp className="icon" />
                <h4>Help</h4>
              </button>
              <button className="box" onClick={handleLogout}>
                <BiLogOut className="icon" />
                <h4>Log Out</h4>
              </button>
            </div>
          )}
        </>
      ) : (
        <Link to="/login" onClick={closeMobileMenu}>
          <button>My Account</button>
        </Link>
      )}
    </div>
  );
};