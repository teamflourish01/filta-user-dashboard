import React, { useState } from "react";
import uploadimg from "../../images/uploadimg.png";
import TwoButton from "./TwoButton";

const BasicDetails = () => {
  const [borderStyle, setBorderStyle] = useState("circle");
  return (
    <>
      {/* Upload section */}
      <div className="upload-section-container">
        <div className="upload-box">
          <p className="my-topheading">Profile Picture</p>
          <div className={`upload-area ${borderStyle}`}>
            <input type="file" id="profile-upload" />
            <label htmlFor="profile-upload">
              <img className="upload-icon" src={uploadimg} alt="upload img" />
            </label>
          </div>
          <p className="my-small">(Use: 450x450 pixel)</p>
          <div className="style-options">
            <label>
              Circle
              <input
                type="radio"
                name="borderStyle"
                value="circle"
                checked={borderStyle === "circle"}
                onChange={() => setBorderStyle("circle")}
              />
            </label>
            <label>
              Square
              <input
                type="radio"
                name="borderStyle"
                value="square"
                checked={borderStyle === "square"}
                onChange={() => setBorderStyle("square")}
              />
            </label>
          </div>
        </div>
        <div className="upload-box">
          <p className="my-topheading">Cover Photo</p>
          <div className="upload-area rectangle">
            <input type="file" id="cover-upload" />
            <label htmlFor="cover-upload">
              <img className="upload-icon" src={uploadimg} alt="upload img" />
            </label>
          </div>

          <p className="my-small">(Use: 780x300 pixel)</p>
        </div>
        <div className="upload-box">
          <p className="my-topheading">Company Logo</p>
          <div className="upload-area">
            <input type="file" id="logo-upload" />
            <label htmlFor="logo-upload">
              <img className="upload-icon" src={uploadimg} alt="upload img" />
            </label>
          </div>

          <p className="my-small">(Use: 440x440 pixel)</p>
        </div>{" "}
      </div>
      <hr />
      <div className="my-allfiled">
        <form>
          <div className="my-fullwidth">
            <label>Name</label>
            <input type="text" placeholder="Enter your name" required />
          </div>
          <div className="my-fullwidth">
            <label>Job Title</label>
            <input type="text" placeholder="Enter your job title" required />
          </div>
          <div className="my-fullwidth">
            <label>Company</label>
            <input type="text" placeholder="Enter your company" required />
          </div>
          <div className="my-fullwidth">
            <label>Location</label>
            <input type="text" placeholder="Enter your location" required />
          </div>
          <div className="my-fullwidth">
            <label>Bio</label>
            <textarea className="my-txtarea" placeholder="Enter your Bio" />
          </div>
          <div className="btnmargin-20">
            <TwoButton />
          </div>
        </form>
      </div>
    </>
  );
};

export default BasicDetails;
