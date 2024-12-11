import React, { useState } from "react";
import "../digitalcard/digitalcard.css";
import filta from "../../images/filta.png";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

function Digitalcard() {
  const [formData, setFormData] = useState({
    name: "",
    jobTitle: "",
    company: "",
    email: "",
    phoneNumber: "",
    location: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="digital-card-main">
        <div className="digital-card-form">
          <div className="digital-filta-logo">
            <div className="logo-filta">
              <img src={filta} alt="filta-logo" className="filta-logo-card" />
            </div>
            <p className="create-text">
              Let’s create your digital business card
            </p>
          </div>
          <div className="row-one">
            <div className="input-field-card">
              <div className="input-field-card">Name</div>
              <div className="input-group-card name-contact-input">
                <input
                  type="text"
                  className="input-card"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="input-field-card">
              <div className="input-field-card">Job title</div>
              <div className="input-group-card">
                <input
                  type="text"
                  className="input-card"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="row-one">
            <div className="input-field-card">
              <div className="input-field-card">Company</div>
              <div className="input-group-card">
                <input
                  type="text"
                  className="input-card"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="input-field-card">
              <div className="input-field-card">Email</div>
              <div className="input-group-card">
                <input
                  type="text"
                  className="input-card"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="row-one">
            <div className="input-field-card">
              <div className="input-field-card">Phone number</div>
              <div className="input-group-card">
                <input
                  type="text"
                  className="input-card"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="input-field-card">
              <div className="input-field-card">Location</div>
              <div className="input-group-card">
                <input
                  type="text"
                  className="input-card"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <Link to="/signup">
            <button type="submit" className="btn-card">
              Continue
            </button>
          </Link>

          <div className="already-use-filta">
            <p className="text-center">
              <span className="already-text">Already use Filta? </span>
              <Link to="/login" className="create-account-login">
                Login
              </Link>
            </p>
          </div>
        </div>
        <div className="card-preview">
          <p className="card-preview-title">Card live preview</p>
          <div className="card-for-preview">
            <p className="text-preview"> {formData.name}</p>
            <p className="text-preview"> {formData.jobTitle}</p>
            <p className="text-preview"> {formData.company}</p>
            <p className="text-preview"> {formData.email}</p>
            <p className="text-preview">{formData.phoneNumber}</p>
            <p className="text-preview"> {formData.location}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Digitalcard;
