import React from "react";
import TwoButton from "./TwoButton";

const TeamMember = () => {
  return (
    <div className="vm-margin" style={{ padding: 0 }}>
      <div className="mlt-info">
        <span className="mlt-title">Info : </span>
        <span className="mlt-desc">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </span>
      </div>
      <div className="cont-formdiv">
        <form>
          <div className="cont-forminput">
            <label>Name</label>
            <input type="text" />
          </div>
          <div className="cont-forminput">
            <label>Job Title</label>
            <input type="text" />
          </div>
          <div className="cont-forminput">
            <label>Number</label>
            <input type="text" />
          </div>
          <div className="mlt-btnmain">
            <div className="mlt-addmorebtn">Add More</div>
            <div className="cont-btnmargin" style={{ paddingTop: 0 }}>
              <TwoButton />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamMember;
