import React from "react";
import TwoButton from "./TwoButton";

const About = () => {
  return (
    <>
      <div className="vm-margin" style={{padding:0}} >
        <div className="mlt-info">
          <span className="mlt-title">Info : </span>
          <span className="mlt-desc">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </span>
        </div>
        <div className="cont-formdiv">
          <form>
            <div className="cont-forminput">
              <label>Title</label>
              <input type="text" />
            </div>
            <div className="cont-forminput">
              <label>Description</label>
              <textarea className="cont-txtarea" />
            </div>
            <div className="cont-btnmargin">
              <TwoButton />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default About;
