import React from "react";
import "../support/support.css";
import threads from "../../images/threads.svg";
import contact from "../../images/conphone.svg";
import emailicon from "../../images/emailicon.svg";
import location from "../../images/locationicon.svg";
import instagram from "../../images/instablack.svg";
import instagramcolor from "../../images/instagram.svg"
import twitter from "../../images/twitter.svg";
import facebook from "../../images/facebook.svg"
import linkdin from "../../images/linkdin.svg";
import thread from "../../images/threads.svg"

const Support = () => {
  return (
    <>
      <div className="support-overflow">
      <div className="support-outer-box">
        <div className="support-align">
          <div className="contact-container">
            <div className="support-inner-width">
              <h2 className="contact-title">Contact Information</h2>
              <div className="contact-details">
                <div className="contact-item">
                <div className="support-contact"></div>
                 
                  <span>+91 12345 67890</span>
                </div>
                <div className="contact-item support-mail-p">
                <div className="support-mail"></div>
                  {/* <img src={emailicon}></img> */}
                  <span>filta123@gmail.com</span>
                </div>
                <div className="contact-item">
                <div className="support-location"></div>
                  {/* <img src={location}></img> */}
                  <span>Gujarat, India</span>
                </div>
              </div>
              <hr className="dividersupport" />
              <h3 className="follow-title">Follow Us</h3>
          <div className="social-icons">
          <div className="icon instagram-icon"></div>
          <div className=" icon facebook-icon"></div>
            <div className="icon linkdin-icon"></div>
            
            <img src={thread} alt="" />
            <img src={twitter}></img>
        
            <i className="fas fa-times"></i>
          </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Support;
