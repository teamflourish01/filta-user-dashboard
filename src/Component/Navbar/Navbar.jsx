import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Navbar/Navbar.css";
import filta from "../../images/filta.png";
import dot from "../../images/dot.svg";
import { IoReorderThreeOutline } from "react-icons/io5";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Hamburger from "../Hamburger/Hamburger";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleHamburgerMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeHamburgerMenu = () => {
    setIsMenuOpen(false);
  };

  const routeTitles = {
    "/my-card": "My Card",
    "/nfc-card": "NFC Card",
    "/email-signature": "Email Signature",
    "/virtual-background": "Virtual Background",
    "/contacts": "Contacts",
    "/my-leads": "My Leads",
    "/settings": "Settings",
  };

  // Determine the current title
  const currentTitle = routeTitles[location.pathname] || "Default Title";
  const isMyCardRoute = location.pathname.includes("my-card");
  const isNfcCardRoute = location.pathname.includes("nfc-card");

  return (
    <>
      {isOpen && <div className="overlay" onClick={closeMenu}></div>}

      <div className="nav-width-100">
        <div className="flex-logo-hambergur">
          <div className="hamburger-menu-icon" onClick={toggleHamburgerMenu}>
            <IoReorderThreeOutline />
          </div>
          <div>
            <img src={filta} alt="" style={{ width: "74px", height: "29px" }} />
          </div>
        </div>

        <div className="nav-title">
          <img
            src={filta}
            alt=""
            style={{
              width: "68px",
              height: "32px",
              padding: "23px 11px 18px 0px",
            }}
          />
        </div>

        <div className="style-navbar-add">
          <div className="filta-logo-web">
            {/* Conditional back button */}
            {location.pathname === "/my-card/edit" ||
            location.pathname === "/nfc-card/standardplan" ||
            location.pathname === "/nfc-card/premium-plan" ? (
              <button
                className="my-back-btn-navbar"
                onClick={() =>
                  navigate(isMyCardRoute ? "/my-card" : "/nfc-card")
                }
              >
                <AiOutlineArrowLeft
                  className="arrow-button"
                  style={{ width: "16px", height: "14px", marginRight: "8px" }}
                />
                <span className="back-to-text">
                  {isMyCardRoute ? " My Card" : "NFC Card"}
                </span>
                <span
                  className={`${
                    isMyCardRoute ? "my-card-text" : "nfc-card-text"
                  }`}
                >
                  {isMyCardRoute ? "Back to My Card" : " Back to NFC Card"}
                </span>
              </button>
            ) : (
              <p className="filta-logo-web-t">{currentTitle}</p>
            )}
          </div>

          <div className="nav-dot">
            <img
              src={dot}
              alt=""
              onClick={toggleMenu}
              style={{ width: "30px", height: "30px", cursor: "pointer" }}
            />
          </div>
        </div>
      </div>

      <Hamburger
        isMenuOpen={isMenuOpen}
        closeHamburgerMenu={closeHamburgerMenu}
      />

      {isOpen && (
        <div className="dropdown-menu">
          <ul>
          <Link className="linka" to="/subscription" onClick={closeMenu}>
            <li >
               Subscription
            </li>
            </Link>
            <Link className="linka" to="/support" onClick={closeMenu}>
            <li >
             Support
            </li>
            </Link>
            <Link className="linka" to="/rate-us" onClick={closeMenu}>
            <li >
              Rate Us & Feedback
            </li>
            </Link>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
