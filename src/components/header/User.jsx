import React, { useContext, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { BsBagCheck } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { GrHelp } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";
import { RiImageAddLine } from "react-icons/ri";
import { Context } from "../../context/Context";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const User = ({ closeMobileMenu, profileOpen: propProfileOpen, setProfileOpen: propSetProfileOpen, toggleProfileOnly, showProfileOnly, isMobile }) => {
  const { user, dispatch } = useContext(Context);
  const navigate = useNavigate();

  const [localProfileOpen, setLocalProfileOpen] = useState(false);

  const currentProfileOpen = isMobile ? propProfileOpen : localProfileOpen;
  const currentSetProfileOpen = isMobile ? propSetProfileOpen : setLocalProfileOpen;

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
    <>
      <div className="profile">
        {user ? (
          <>
            {!showProfileOnly && (
              <button
                className="img"
                onClick={() => {
                  if (isMobile) {
                    toggleProfileOnly(); // Use toggleProfileOnly for mobile
                  } else {
                    currentSetProfileOpen(!currentProfileOpen); // Toggle desktop profile dropdown
                  }
                }}
              >
                <img
                  src="https://www.blookup.com/static/images/single/profile-1.edaddfbacb02.png"
                  alt=""
                />
              </button>
            )}
            {/* Desktop Profile Dropdown */}
            {currentProfileOpen && !isMobile && (
              <div className="openProfile boxItems">
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
                <button className="box" onClick={() => {navigate("/create"); currentSetProfileOpen(false);}} >
                  <RiImageAddLine className="icon" />
                  <h4>Create Post</h4>
                </button>
                <button className="box" onClick={() => {navigate("/account"); currentSetProfileOpen(false);}} >
                  <IoSettingsOutline className="icon" />
                  <h4>My Account</h4>
                </button>
                <button className="box" onClick={() => {navigate("/help"); currentSetProfileOpen(false);}} >
                  <GrHelp className="icon" />
                  <h4>Help</h4>
                </button>
                <button className="box" onClick={() => {handleLogout(); currentSetProfileOpen(false);}}>
                  <BiLogOut className="icon" />
                  {user && <h4>Log Out</h4>}
                </button>
              </div>
            )}
            {/* Mobile Profile Drawer Content */}
            {showProfileOnly && isMobile && (
                <div className="openProfile boxItems">
                   <button className="closeProfileMenu" onClick={toggleProfileOnly}>
                     <FaTimes />
                   </button>
                  <Link to={"/account"} onClick={() => {console.log('Clicked My Account Link (Mobile Drawer)'); navigate("/account"); closeMobileMenu();}}>
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
                  <button className="box" onClick={() => {console.log('Clicked Create Post (Mobile Drawer)'); navigate("/create"); closeMobileMenu();}} >
                    <RiImageAddLine className="icon" />
                    <h4>Create Post</h4>
                  </button>
                  <button className="box" onClick={() => {console.log('Clicked My Account Button (Mobile Drawer)'); navigate("/account"); closeMobileMenu();}} >
                    <IoSettingsOutline className="icon" />
                    <h4>My Account</h4>
                  </button>
                  <button className="box" onClick={() => {console.log('Clicked Help (Mobile Drawer)'); navigate("/help"); closeMobileMenu();}} >
                    <GrHelp className="icon" />
                    <h4>Help</h4>
                  </button>
                  <button className="box" onClick={() => {console.log('Clicked Log Out (Mobile Drawer)'); handleLogout();}}>
                    <BiLogOut className="icon" />
                    {user && <h4>Log Out</h4>}
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
    </>
  );
};
