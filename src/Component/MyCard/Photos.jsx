import React, { useState } from "react";
import "../../Component/MyCard/Photos.css";
import uploadimg from "../../images/uploadimg.png";
import deltImg from "../../images/delete.png";
import sampleImg from "../../images/photos-uplodimg.png";
import TwoButton from "./TwoButton";
import { SlArrowDown } from "react-icons/sl";

const Photos = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFont, setSelectedFont] = useState("Full Width");

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className="mlt-margin">
        <div className="mlt-info">
          <span className="mlt-title">Info : </span>
          <span className="mlt-desc">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </span>
        </div>
        
      
        <p className="ph-vdtitle">Upload Photos</p>
        <div className="ph-imagesUpload">
          <div className="ph-uplod">
            <input type="file" />
            <img src={uploadimg} alt="upload img" />
          </div>
          <div className="ph-uplodimg">
            <img src={sampleImg} alt="sam-img" />
            <div className="ph-deltbtn">
              <img src={deltImg} alt="delet-btn" />
            </div>
          </div>
        </div>
        <div className="ph-btnpadding">
          <TwoButton />
        </div>
      </div>
    </>
  );
};

export default Photos;
