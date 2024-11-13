import React, { useState } from 'react';
import "../Navbar/Navbar.css";
import filta from "../../images/filta.png";
import dot from "../../images/dot.svg"
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <>
            {isOpen && <div className="overlay" onClick={closeMenu}></div>}

            <div className="nav-width-100">
                <div>
                    <img src={filta} alt="" style={{ width: "74px", height: "32px" }} />
                </div>
                <div>
                    
                    <img src={dot} alt=""  onClick={toggleMenu}
                        style={{ width: "30px", height: "30px", cursor: "pointer" }}/>
                </div>
            </div>

            {isOpen && (
                <div className="dropdown-menu">
                    <ul>
                        <li onClick={closeMenu}><Link to="/subscription">Subscription</Link></li>
                        <li onClick={closeMenu}><Link to="/support">Support</Link></li>
                        <li onClick={closeMenu}><Link to="/rate-us">Rate Us</Link></li>
                        <li onClick={closeMenu}><Link to="/feedback">Feedback</Link></li>
                    </ul>
                </div>
            )}
        </>
    );
};

export default Navbar;
