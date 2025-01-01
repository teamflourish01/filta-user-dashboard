import React from 'react';
import '../MyCard/ModalProductGallery.css';

const ModalProductGallery = ({ show, onClose, children }) => {
    if (!show) return null;
    const handleOverlayClick = (event) => {
      // Close the modal only if the click is on the overlay (not the modal content)
      if (event.target.classList.contains("modal-overlay-p-g")) {
        onClose();
      }
    };
    return (
      <div className="modal-overlay-p-g" onClick={handleOverlayClick}>
        <div className="modal-content-p-g">
          {/* <button className="modal-closep-g" onClick={onClose}>
            &times;
          </button> */}
          {children}
        </div>
      </div>
    );
  };

export default ModalProductGallery;
