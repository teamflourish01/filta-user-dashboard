import React, { useEffect, useState } from "react";
import mycard from "../../images/mycard.svg";
import nfccard from "../../images/nfccard.svg";
import digitalreviewcard from "../../images/digitalreviewcard.svg";
import emailsignature from "../../images/emailsignature.svg";
import virtualbackground from "../../images/virtualbackground.svg";
import contact from "../../images/contact.svg";
import myleads from "../../images/myleads.svg";
import setting from "../../images/setting.svg";
import { Link, useLocation } from "react-router-dom";
import "../Hamburger/Hamburger.css";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { CgClose } from "react-icons/cg";

const Hamburger = ({ isMenuOpen, closeHamburgerMenu, menuRef }) => {
  const location = useLocation();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const closeProfileMenu = () => {
    setIsProfileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-section-ham")) {
        closeProfileMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className='hamburger'>
     

<div className={`hamburger-container ${isMenuOpen ? "open" : ""}`}>

          <div className="close-ham-menu" onClick={closeHamburgerMenu}>
            <CgClose />
          </div>

          <div className="profile-section-ham">
            <img
              src="https://via.placeholder.com/50"
              alt="Profile"
              className="profile-img-ham"
            />
            <div className="profile-info">
              <p>Ajay Gadhavi</p>
              <span>User</span>
            </div>
            <button className="profile-menu-btn" onClick={toggleProfileMenu}>
              <HiOutlineDotsVertical />
            </button>

            {/* Overlay for dimming background */}
            {isProfileMenuOpen && (
              <div className="overlay" onClick={closeProfileMenu}></div>
            )}

            {/* Profile Dropdown Menu */}
            {isProfileMenuOpen && (
              <div className="profile-dropdown-menu">
                <ul>
                  <li>
                    <Link to="/request-feature">Request a feature</Link>
                  </li>
                  <li>
                    <Link to="/logout">Logout</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="menu-ham">
            <Link
              to="/"
              className={`menu-item-ham ${
                location.pathname === "/" ? "active" : ""
              }`}
              onClick={closeHamburgerMenu}
            >
              {/* <FaUser className="menu-icon" /> */}
              <img src={mycard} className="menu-icon" alt="" />
              <span>My Card</span>
            </Link>
            <Link
              to="/nfc-card"
              className={`menu-item-ham ${
                location.pathname === "/nfc-card" ? "active" : ""
              }`}
              onClick={closeHamburgerMenu}
            >
              {/* <FaSignal className="menu-icon" /> */}
              <img src={nfccard} className="menu-icon" alt="" />
              <span>NFC Card</span>
            </Link>
            <Link
              to="/digital-review-card"
              className={`menu-item-ham ${
                location.pathname === "/digital-review-card" ? "active" : ""
              }`}
              onClick={closeHamburgerMenu}
            >
              {/* <FaClipboardList className="menu-icon" /> */}
              <img src={digitalreviewcard} className="menu-icon" alt="" />
              <span>Digital Review Card</span>
            </Link>
            <Link
              to="/email-signature"
              className={`menu-item-ham ${
                location.pathname === "/email-signature" ? "active" : ""
              }`}
              onClick={closeHamburgerMenu}
            >
              {/* <FaEnvelope className="menu-icon" /> */}
              <img src={emailsignature} className="menu-icon" alt="" />
              <span>Email Signature</span>
            </Link>
            <Link
              to="/virtual-background"
              className={`menu-item-ham ${
                location.pathname === "/virtual-background" ? "active" : ""
              }`}
              onClick={closeHamburgerMenu}
            >
              {/* <FaCamera className="menu-icon" /> */}
              <img src={virtualbackground} className="menu-icon" alt="" />
              <span>Virtual Background</span>
            </Link>
            <Link
              to="/contacts"
              className={`menu-item-ham ${
                location.pathname === "/contacts" ? "active" : ""
              }`}
              onClick={closeHamburgerMenu}
            >
              {/* <FaUserFriends className="menu-icon" /> */}
              <img src={contact} className="menu-icon" alt="" />
              <span>Contacts</span>
            </Link>
            <Link
              to="/my-leads"
              className={`menu-item-ham ${
                location.pathname === "/my-leads" ? "active" : ""
              }`}
              onClick={closeHamburgerMenu}
            >
              {/* <FaClipboardList className="menu-icon" /> */}
              <img src={myleads} className="menu-icon" alt="" />
              <span>My Leads</span>
            </Link>
            <Link
              to="/settings"
              className={`menu-item-ham ${
                location.pathname === "/settings" ? "active" : ""
              }`}
              onClick={closeHamburgerMenu}
            >
              {/* <FaCog className="menu-icon" /> */}
              <img src={setting} className="menu-icon" alt="" />
              <span>Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hamburger;
