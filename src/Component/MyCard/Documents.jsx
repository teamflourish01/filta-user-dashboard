import React from "react";
import uploadimg from "../../images/uploadimg.png";
import docImg from "../../images/doc-img.svg";
import "../../Component/MyCard/Documents.css";
import deltImg from "../../images/delete.png";
import TwoButton from "./TwoButton";

const Documents = () => {
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
        <div className="doc-padding">
          <div className="doc-uplod">
            <input type="file" />
            <img src={uploadimg} alt="upload img" />
          </div>
        </div>
        <div className="doc-docdiv">
          <div className="doc-docimg">
            <img src={docImg} alt="doc-img" />
          </div>

          <div className="doc-info">
            <label>Heading</label>
            <div className="doc-deltcenter">
              <input type="text" placeholder="Catalog, Brochure" />
              <div className="doc-dltbtn">
                <img src={deltImg} alt="delete-btn" />
              </div>
            </div>
          </div>
        </div>
        <div className="doc-btnmargin">
          <TwoButton />
        </div>
      </div>
    </>
  );
};

export default Documents;
