import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import mycard from "../../images/mycard.svg"
import nfccard from "../../images/nfccard.svg"
import digitalreviewcard from "../../images/digitalreviewcard.svg"
import emailsignature from "../../images/emailsignature.svg"
import virtualbackground from "../../images/virtualbackground.svg"
import contact from "../../images/contact.svg"
import myleads from "../../images/myleads.svg"
import setting from "../../images/setting.svg"
import "./Sidebar.css";
import { HiOutlineDotsVertical } from "react-icons/hi";


const Sidebar = () => {
    const [activeItem, setActiveItem] = useState("My Card");

    const handleMenuClick = (item) => {
        setActiveItem(item);
    };
    
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

     const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };

    const closeProfileMenu = () => {
        setIsProfileMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".profile-section")) {
                closeProfileMenu();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="sidebar">
            <div className="profile-section">
                <img
                    src="https://via.placeholder.com/50"
                    alt="Profile"
                    className="profile-img"
                />
                <div className="profile-info">
                    <p>Ajay Gadhavi</p>
                    <span>User</span>
                </div>
                <button className="profile-menu-btn" onClick={toggleProfileMenu}>
                    <HiOutlineDotsVertical />
                </button>

                {/* Overlay for dimming background */}
                {isProfileMenuOpen && <div className="overlay" onClick={closeProfileMenu}></div>}

                {/* Profile Dropdown Menu */}
                {isProfileMenuOpen && (
                    <div className="profile-dropdown-menu">
                        <ul>
                            <li><Link to="/request-feature">Request a feature</Link></li>
                            <li><Link to="/logout">Logout</Link></li>
                        </ul>
                    </div>
                )}


            </div>
            <div className="menu">
                <Link
                    to="/"
                    className={`menu-item ${activeItem === "My Card" ? "active" : ""}`}
                    onClick={() => handleMenuClick("My Card")}
                >
                    {/* <FaUser className="menu-icon" /> */}
                    <img src={mycard} className="menu-icon"  alt="" />
                    <span>My Card</span>
                </Link>
                <Link
                    to="/nfc-card"
                    className={`menu-item ${activeItem === "NFC Card" ? "active" : ""}`}
                    onClick={() => handleMenuClick("NFC Card")}
                >
                    {/* <FaSignal className="menu-icon" /> */}
                    <img src={nfccard} className="menu-icon"  alt="" />
                    <span>NFC Card</span>
                </Link>
                <Link
                    to="/digital-review-card"
                    className={`menu-item ${activeItem === "Digital Review Card" ? "active" : ""
                        }`}
                    onClick={() => handleMenuClick("Digital Review Card")}
                >
                    {/* <FaClipboardList className="menu-icon" /> */}
                    <img src={digitalreviewcard} className="menu-icon"  alt="" />
                    <span>Digital Review Card</span>
                </Link>
                <Link
                    to="/email-signature"
                    className={`menu-item ${activeItem === "Email Signature" ? "active" : ""
                        }`}
                    onClick={() => handleMenuClick("Email Signature")}
                >
                    {/* <FaEnvelope className="menu-icon" /> */}
                    <img src={emailsignature} className="menu-icon"  alt="" />
                    <span>Email Signature</span>
                </Link>
                <Link
                    to="/virtual-background"
                    className={`menu-item ${activeItem === "Virtual Background" ? "active" : ""
                        }`}
                    onClick={() => handleMenuClick("Virtual Background")}
                >
                    {/* <FaCamera className="menu-icon" /> */}
                    <img src={virtualbackground} className="menu-icon"  alt="" />
                    <span>Virtual Background</span>
                </Link>
                <Link
                    to="/contacts"
                    className={`menu-item ${activeItem === "Contacts" ? "active" : ""}`}
                    onClick={() => handleMenuClick("Contacts")}
                >
                    {/* <FaUserFriends className="menu-icon" /> */}
                    <img src={contact} className="menu-icon"  alt="" />
                    <span>Contacts</span>
                </Link>
                <Link
                    to="/my-leads"
                    className={`menu-item ${activeItem === "My Leads" ? "active" : ""}`}
                    onClick={() => handleMenuClick("My Leads")}
                >
                    {/* <FaClipboardList className="menu-icon" /> */}
                    <img src={myleads} className="menu-icon"  alt="" />
                    <span>My Leads</span>
                    
                </Link>
                <Link
                    to="/settings"
                    className={`menu-item ${activeItem === "Settings" ? "active" : ""}`}
                    onClick={() => handleMenuClick("Settings")}
                >
                    {/* <FaCog className="menu-icon" /> */}
                    <img src={setting} className="menu-icon"  alt="" />
                    <span>Settings</span>
                    
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
