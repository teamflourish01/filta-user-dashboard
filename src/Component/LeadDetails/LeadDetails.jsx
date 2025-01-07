import React, { useContext, useEffect, useRef } from "react";
import "../LeadDetails/LeadDetails.css";
import userContext from "../../context/userDetails";

const LeadDetails = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const { userData } = useContext(userContext);


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

  if (!isOpen) return null;

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
          {userData?.myLeads?.map((lead, index) => (
          <div className="lead-details-container">
            <div className="input-field">
              <div className="field-name-lead-detail">ID :</div>
              <div className="field-lead-details-data">{lead?.userId}</div>
            </div>
            <div className="input-field">
              <div className="field-name-lead-detail">Name :</div>
              <div className="field-lead-details-data">{lead?.name}</div>
            </div>
            <div className="input-field">
              <div className="field-name-lead-detail">Email :</div>
              <div className="field-lead-details-data">
               {lead?.email}
              </div>
            </div>
            <div className="input-field">
              <div className="field-name-lead-detail">Phone :</div>
              <div className="field-lead-details-data">{lead?.number}</div>
            </div>
            <div className="input-field ">
              <div className="field-name-lead-detail p-10">
                Message :
                <span className="field-lead-details-data message">
                  {lead?.message}
                </span>
              </div>
            </div>
          </div>
        ))}
          {/* <p className="lead-management">Lead Management</p>
          <div className="notes-desc">
            <p className="notes">Notes</p>
            <textarea className="grey-textarea"></textarea>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default LeadDetails;
