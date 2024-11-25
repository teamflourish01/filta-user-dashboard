import React, { useState, useEffect } from "react";
import "../cntmodal/cntmodal.css";
const Cntmodal = ({ isOpen, onClose, onsave, contact }) => {
  const [formdata, setformdata] = useState({
    name: "",
    email: " ",
    mobile: "",
    jobTitle: "",
    company: "",
  });
  useEffect(() => {
    if (contact) {
      setformdata({
        name: contact.name,
        email: contact.email || "",
        mobile: contact.mobile || "",
        jobTitle: contact.jobTitle,
        company: contact.company,
      });
    }
  }, [contact]);
  if (!isOpen) return null;

  const handlechange = (e) => {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedContact = {
      ...formdata,
      added: contact?.added || new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };
    onsave(updatedContact);
  };
  return (
    <div className="modal-overlay">
      <div className="modal">
        <form className="modal-form" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formdata.name}
            onChange={handlechange}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formdata.email}
            onChange={handlechange}
          />

          <label>Mobile Number</label>
          <input
            type="tel"
            name="mobile"
            value={formdata.mobile}
            onChange={handlechange}
          />

          <label>Job Title (Optional)</label>
          <input
            type="text"
            name="jobTitle"
            value={formdata.jobTitle}
            onChange={handlechange}
          />

          <label>Company (Optional)</label>
          <input
            type="text"
            name="company"
            value={formdata.company}
            onChange={handlechange}
          />

          <div className="modal-buttons">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cntmodal;
