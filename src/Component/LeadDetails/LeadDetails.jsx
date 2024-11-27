import React from "react";
import "../LeadDetails/LeadDetails.css";

const LeadDetails = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };
  return (
    <>
      <div className="modal-overlay-lead" onClick={handleOverlayClick}></div>
      <div className="modal-lead">
        <button className="close-button-lead" onClick={onClose}>
          &times;
        </button>
        <div className="modal-content-lead">
          <p className="lead-detail-title">Lead Details</p>
          <div className="lead-details-container">
            <div className="input-field">
              <div className="field-name-lead-detail">ID :</div>
              <div className="field-lead-details-data">4545</div>
            </div>
            <div className="input-field">
              <div className="field-name-lead-detail">Name :</div>
              <div className="field-lead-details-data">Ajay Gadhavi</div>
            </div>
            <div className="input-field">
              <div className="field-name-lead-detail">Email :</div>
              <div className="field-lead-details-data">
                ajaygadhavi9847@gmail.com
              </div>
            </div>
            <div className="input-field">
              <div className="field-name-lead-detail">Phone :</div>
              <div className="field-lead-details-data">6353123096</div>
            </div>
            <div className="input-field ">
              <div className="field-name-lead-detail p-10">
                Message :
                <span className="field-lead-details-data message">
                  Hi i am ajay gadhavi i am ui ux designer at flourish creations
                  PVT. LTD
                </span>
              </div>
            </div>
          </div>
          <p className="lead-management">Lead Management</p>
          <div className="notes-desc">
            <p className="notes">Notes</p>
            <textarea className="grey-textarea"></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadDetails;
