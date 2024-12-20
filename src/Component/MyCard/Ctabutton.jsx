import React, { useState } from "react";
import "./ctabutton.css";
import TwoButton from "./TwoButton";

const Ctabutton = () => {
  const [selectedOption, setSelectedOption] = useState("Contact");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <div className="cta-container">
        <div className="cta-info">
          <span>Info :</span> It is a long-established fact that a reader will
          be distracted by the readable content of a page when looking at its
          layout.
        </div>
        <div className="cta-option">
          <label htmlFor="cta-select" className="cta-button-label">
            Button Type
          </label>
          <select
            name="Choose Button"
            id="cta-select"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="Contact">Contact Me</option>
            <option value="Mail">Mail Me</option>
            <option value="Visit">Visit My Website</option>
          </select>
        </div>
        <div className="cta-url">
          <label htmlFor="cta-button-text" className="cta-button-label">
            Button Text
          </label>
          <input
            type="text"
            id="cta-button-text"
            className="cta-mobileno"
            placeholder={
              selectedOption === "Mail"
                ? "Mail Me"
                : selectedOption === "Visit"
                ? "Visit My Website"
                : "Contact Me"
            }
          />
        </div>
        <div className="cta-url">
          <label htmlFor="cta-field" className="cta-button-label">
            {selectedOption === "Mail"
              ? "Email"
              : selectedOption === "Visit"
              ? "URL"
              : "Mobile Number"}
          </label>
          <input type="text" id="cta-field" className="cta-mobileno" />
        </div>
        <TwoButton />
      </div>
    </>
  );
};

export default Ctabutton;
