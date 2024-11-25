import React from "react";
import "./ContactForm.css";
import TwoButton from "./TwoButton";

const ContactForm = () => {
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
        <div className="cont-reqfiled">
          <p>Required Field </p>
          <div className="cont-chkbox">
            <div className="cont-chk">
              <input type="checkbox" />
              <label>Name</label>
            </div>
            <div className="cont-chk">
              <input type="checkbox" />
              <label>Email</label>
            </div>
            <div className="cont-chk">
              <input type="checkbox" />
              <label>Number</label>
            </div>
            <div className="cont-chk">
              <input type="checkbox" />
              <label>Address</label>
            </div>
            <div className="cont-chk">
              <input type="checkbox" />
              <label>Message</label>
            </div>
          </div>
        </div>
        <hr />
        <div className="mlt-info">
          <span className="mlt-title">Responce : </span>
          <span className="mlt-desc">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </span>
        </div>
        <div className="cont-formdiv">
          <form>
            <div className="cont-forminput">
              <label>Email</label>
              <input type="text" />
            </div>
            <div className="cont-forminput">
              <label>Message</label>
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

export default ContactForm;
