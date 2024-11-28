import React from "react";
import "../../Component/MyCard/Automated.css";
import TwoButton from "./TwoButton";

const Automated = () => {
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
        <div className="auto-suggst-container">
          <p>Suggested</p>
          <div className="auto-divBoxies">
            <div className="auto-box1"></div>
            <div className="auto-box2"></div>
            <div className="auto-box3"></div>
            <div className="auto-box4"></div>
          </div>
        </div>
        <hr />
        <form>
          <div className="auto-customize padding">
            <label>Customize</label>
            <textarea className="auto-txtarea" />
          </div>
          <div className="auto-btnpadding">
            <TwoButton />
          </div>
        </form>
      </div>
    </>
  );
};

export default Automated;
