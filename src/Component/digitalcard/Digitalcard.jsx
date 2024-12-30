import React, { useState } from "react";
import "../digitalcard/digitalcard.css";
import filta from "../../images/filta.png";
import { Link } from "react-router-dom";
import emailicon from "../../images/email.svg";
import digitalphoto from "../../images/digitalphoto.png";
import digitalphone from "../../images/phonecolor.svg";
import { FaArrowLeft } from "react-icons/fa6";

function Digitalcard({ onContinue }) {
  const [formData, setFormData] = useState({
    name: "",
    jobtitle: "",
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

  const handleSubmit = () => {
    onContinue(formData);
  };

  return (
    <div className="digital-card-main">
      <div className="digital-card-form">
        <div className="digital-filta-logo">
          <div className="logo-filta">
            <img src={filta} alt="filta-logo" className="filta-logo-card" />
          </div>
          <p className="create-text">Let’s create your digital business card</p>
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
                name="jobtitle"
                value={formData.jobtitle}
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

        <button type="button" onClick={handleSubmit} className="btn-card">
          Continue
        </button>

        <div className="already-use-filta">
          <p className="text-center">
            <span className="already-text">Already use Filta? </span>
            <Link to="/login" className="create-account-login">
              Login
            </Link>
          </p>
        </div>
      </div>
      <div className="card-preview-flex">
      <div className="card-for-preview">
      <div className="card-digital-prev-flex">
            <div className="card-prev-digital"> </div>
            <div className="digitalcard-profile">
              <img src={digitalphoto} alt="" className="digital-card-photo" />
            </div>
            <div className="card-inner-preview-digital">
              <div className="digital-card-text-preview">
                <p className="text-preview-name">{formData.name.toUpperCase()}</p>
                <p className="text-preview-field">{formData.jobtitle}</p>
                <p className="text-preview-field">{formData.company}</p>
                <p className="text-preview-field text-preview-last-padding">
                  {formData.location}
                </p>
              </div>
            </div>
          </div>
          {(formData.email || formData.phoneNumber) && (
  <div className="digital-card-link">
    <div className="digital-card-clickable">Clickable Links</div>
    <div className="digital-email-icon-flex">
      {formData.email && (
        <div className="digital-email-icon">
          <img
            src={emailicon}
            alt="email icon"
            className="digital-email-image"
          />
          <p className="digital-email-p">Email</p>
        </div>
      )}

      {formData.phoneNumber && (
        <div className="digital-email-icon">
          <img
            src={digitalphone}
            alt="phone icon"
            className="digital-email-image"
          />
          <p className="digital-email-p">Phone</p>
        </div>
      )}
    </div>
  </div>
)}


          <div className="digital-last-button">
            <div className="digital-buttons">
              <button>Share Card</button>
              <button>Contact Me</button>
            </div>
          </div>
        
        </div>
      </div>
    </div>
  );
}

export default Digitalcard;
