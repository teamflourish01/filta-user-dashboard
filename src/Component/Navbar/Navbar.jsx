import React, { useState } from "react";
import "../Navbar/Navbar.css";
import filta from "../../images/filta.png";
import dot from "../../images/dot.svg";
import { Link } from "react-router-dom";
import { IoReorderThreeOutline } from "react-icons/io5";
import Hamburger from "../Hamburger/Hamburger";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <>
      {isOpen && <div className="overlay" onClick={closeMenu}></div>}
      {/* {isMenuOpen && <div className="overlay-ham" onClick={closeHamburgerMenu}></div>} */}


      <div className="nav-width-100">
        <div className="flex-logo-hambergur">
          <div className="hamburger-menu-icon" onClick={toggleHamburgerMenu}>
            <IoReorderThreeOutline />
          </div>
          <div>
          <img src={filta} alt="" style={{ width: "74px", height: "32px" }} />
        </div>
        
        </div>
        <div className="filta-logo-web">
          <img src={filta} alt="" style={{ width: "74px", height: "32px" }} />
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

      {/* {isMenuOpen &&  */}
      <Hamburger isMenuOpen={isMenuOpen} closeHamburgerMenu={closeHamburgerMenu}/>
      {/* } */}

      {isOpen && (
        <div className="dropdown-menu">
          <ul>
            <li onClick={closeMenu}>
              <Link to="/subscription">Subscription</Link>
            </li>
            <li onClick={closeMenu}>
              <Link to="/support">Support</Link>
            </li>
            <li onClick={closeMenu}>
              <Link to="/rate-us">Rate Us & Feedback</Link>
            </li>
            
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
