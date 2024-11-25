import React, { useState } from "react";
import dotsIcon from "../../images/ct_doticone.png";
import arrowIcon from "../../images/ct_downarrow.png";
import "../MyCard/Dropdown.css";

const DropdownComponent = ({ title, children }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };
  return (
    <>
      <div className="drp-main">
        <div className="drp-dotscircle">
          <img src={dotsIcon} alt="dots" className="drp-dots-icon" />
        </div>
        <div className="drp-container">
          <div className="drp-dropdownmain">
            <div className="drp-text">{title}</div>
            <img
              src={arrowIcon}
              alt="down arrow"
              className="drp-arrow-icon"
              onClick={toggleDropdown}
            />
          </div>
          {isDropdownVisible && (
            <>
              <hr />
              {children}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DropdownComponent;
