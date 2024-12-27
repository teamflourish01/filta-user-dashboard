import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import dotsIcon from "../../images/ct_doticone.png";
import arrowIcon from "../../images/ct_downarrow.png";
import "../MyCard/Dropdown.css";

const DropdownComponent = ({ title, children, isActive, toggleActive }) => {
  // const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const toggleDropdown = () => {
    toggleActive();
  };

   const handleOnDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;

    // You can modify the order of items here based on the source and destination index
    // For example, pass a function to your parent component to update the state
    // that holds the children data, if needed
    if (destination.index !== source.index) {
      console.log(`Item moved from ${source.index} to ${destination.index}`);
    }
  };

  return (
    <>
      <div className="drp-main">
        <div className="drp-container">
          <div className="drp-dropdownmain " >
            <div className="drp-dotscircle">
              <img src={dotsIcon} alt="dots" className="drp-dots-icon" />
            </div>
            <div className="drp-text">{title}</div>
            <img
              src={arrowIcon}
              alt="down arrow"
              className="drp-arrow-icon"
              onClick={toggleDropdown}
            />
          </div>
          <div className={`drp-dropdown-content ${isActive ? "active" : ""}`}>
          {isActive && (
            <>
              <hr />
              {children}
            </>
          )}
        </div>
        </div>
      </div>
    </>
  );
};

export default DropdownComponent;