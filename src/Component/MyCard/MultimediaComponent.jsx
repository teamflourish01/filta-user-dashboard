import React from "react";
import "./Multimedia.css";
import uploadimg from "../../images/uploadimg.png";
import deltImg from "../../images/delete.png";

const MultimediaComponent = () => {
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
        <p className="mlt-vdtitle">Upload Video</p>
        <div className="mlt-video">
          <div className="mlt-uplod">
            <input type="file" />
            <img src={uploadimg} alt="upload img" />
          </div>
          <div className="mlt-uplodvideo">
            <video src=""></video>
            <div className="mlt-deltbtn">
              <img src={deltImg} alt="delet-btn" />
            </div>
          </div>
        </div>
        <hr />
        <div className="mlt-urlform">
          <p className="mlt-urltitle">YouTube Video</p>
          <p className="mlt-url">YouTube URL</p>
          <form>
            <div className="mlt-inputbox">
              <input type="text" required />
            </div>

            <div className="mlt-btnmain">
              <div className="mlt-addmorebtn">Add More YouTube Video</div>
              <div className="mlt-twobtn">
                <button className="mlt-cancel">Cancel</button>
                <button className="mlt-save">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default MultimediaComponent;
