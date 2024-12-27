import React, { useContext, useState } from "react";
import TwoButton from "./TwoButton";

const Address = () => {
  return (
    <>
      <div className="vm-margin" style={{ padding: 0 }}>
        <div className="mlt-info">
          <span className="mlt-title">Info : </span>
          <span className="mlt-desc">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </span>
        </div>
        <div className="cont-formdiv">
          {/* <form onSubmit={handleSave}> */}
            <div className="cont-forminput">
              <label>Title</label>
              <input
                type="text"
                name="title"
                // value={formData.title}
                // onChange={handleInputChange}
              />
            </div>
            <div className="cont-forminput">
              <label>Description</label>
              <textarea
                className="cont-txtarea"
                name="description"
                // value={formData.description}
                // onChange={handleInputChange}
              />
            </div>
            <div className="cont-btnmargin">
              <TwoButton />
            </div>
          {/* </form> */}
        </div>
      </div>
    </>
  );
}

export default Address;
