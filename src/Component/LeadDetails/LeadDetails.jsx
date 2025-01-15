import React, { useContext, useEffect, useRef } from "react";
import "../LeadDetails/LeadDetails.css";
import userContext from "../../context/userDetails";

const LeadDetails = ({ isOpen, onClose, selectedLead }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay-lead")) {
      onClose();
    }
  };

  if (!isOpen || !selectedLead) return null;

  return (
    <>
      <div className="modal-overlay-lead" onClick={handleOverlayClick}></div>
      <div className="modal-lead" ref={modalRef}>
        <div className="btn-close-model-ld">
          <button className="close-button-lead" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-content-lead">
          <p className="lead-detail-title">Lead Details</p>
          <div className="lead-details-container">
            <div className="input-field">
              <div className="field-name-lead-detail">ID :</div>
              <div className="field-lead-details-data">{selectedLead?.userId}</div>
            </div>
            <div className="input-field">
              <div className="field-name-lead-detail">Name :</div>
              <div className="field-lead-details-data">{selectedLead?.name}</div>
            </div>
            <div className="input-field">
              <div className="field-name-lead-detail">Email :</div>
              <div className="field-lead-details-data">{selectedLead?.email}</div>
            </div>
            <div className="input-field">
              <div className="field-name-lead-detail">Phone :</div>
              <div className="field-lead-details-data">{selectedLead?.number}</div>
            </div>
            <div className="input-field">
              <div className="field-name-lead-detail p-10">
                Message :
                <span className="field-lead-details-data message">
                  {selectedLead?.message}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// export default LeadDetails;


export default LeadDetails;
