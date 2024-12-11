import React from "react";
import "../Forgatepassword/forgpassword.css";
import farrow from "../../images/farrow.png";
import filta from "../../images/filta.png";
import { Link } from "react-router-dom";
const Forgpassword = () => {
  return (
    <div className="f-password-container">
      <div className="forgate-container">
        <div className="forgate-container-in">
          <div className="forgate-logo-arrow">
          <Link to="/login">
            <img src={farrow} alt="" srcset="" className="forgate-arrow" />
            </Link>
            <img src={filta} alt="" srcset="" className="forgate-logo" />
          </div>
          <div className="forgate-contain">
            We all forget sometimes. Submit your email and we will send you
            instructions to reset your password.
          </div>
          <div className="forgate-email">
            <div className="forgate-contain">Email</div>
            <input type="text" className="forgate-input" />
          </div>
          <button type="submit" className="btn-login">
                Submit
                </button>
        </div>
      </div>
    </div>
  );
};

export default Forgpassword;
