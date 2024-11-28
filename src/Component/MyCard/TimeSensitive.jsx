import React from "react";
import TwoButton from "./TwoButton";

const TimeSensitive = () => {
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
        <div
          style={{ borderTop: "1px solid #0000000D", marginTop: "100px" }}
        ></div>
        <div style={{ padding: "15px" }}>
          <TwoButton />
        </div>
      </div>
    </>
  );
};

export default TimeSensitive;
