import React from "react";
import "../Requestfeature/requestfeature.css";
const Requestfeature = () => {
  return (
    <>
    <div className="req-outer-white-color">
      <div className="req-outer-box">
      
      <div className="req-inner-width-box">
        <h2 className="req-heading">Request a Feature</h2>
        <div className="req-bottom-border"></div>
        <div className="req-padding">
        <form className=" req-form">
          <label className="req-label">Title</label>
          <input
            type="text"
            placeholder="Title"
            className="req-input"
          />
          <label className="req-label">Select Modul</label>
          <select className="req-select">
            <option value="my-card">My Card</option>
          </select>
          <label className="req-label">Describe Your Request</label>
          <textarea
            placeholder="Describe Your Request"
            className="req-textarea"
          />
        </form>
        </div>
          <div className="req-bottom-border"></div>
          <button type="submit" className="req-button">
            Submit
          </button>
       
        </div>
    
    </div>
    </div>
    </>
  );
};

export default Requestfeature;
