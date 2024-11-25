import React from "react";
import "../ChooseStandardNFC/ChooseStandardNFC.css";
import { FaIndianRupeeSign } from "react-icons/fa6";
// import { IoIosCloseCircleOutline } from "react-icons/io";
import { SlClose } from "react-icons/sl";
import standard from "../../images/standard.svg";

import { GoIssueClosed } from "react-icons/go";
import { Link } from "react-router-dom";

const ChooseStandardNFC = () => {
  return (
    <>
      <div className="choose-standard-table">
        <div className="choose-standard-table-card">
          <div className="free">
            <img src={standard} alt="" />
            <p className="c-NFC-Standard">Standard</p>
            <div className="rupees">
              <FaIndianRupeeSign />
              <p className="amount">899</p>
            </div>
          </div>
          <div className="box">
            <p className="order-summery-standard">Order Summery</p>
          </div>
          <div className="box">
            <div className="right-cross-icon-green">
              <GoIssueClosed />
            </div>
            <p className="box-text">One-time Payment</p>
          </div>
          <div className="box">
            <div className="right-cross-icon-green">
              <GoIssueClosed />
            </div>
            <p className="box-text">FREE Shipping in India</p>
          </div>
          <div className="box">
            <div className="right-cross-icon-green">
              <GoIssueClosed />
            </div>
            <p className="box-text">Fine plastic card</p>
          </div>
          <div className="box">
            <div className="right-cross-icon-green">
              <GoIssueClosed />
            </div>
            <p className="box-text">QR Code on card</p>
          </div>
          <div className="box">
            <div className="right-cross-icon-green">
              <GoIssueClosed />
            </div>
            <p className="box-text">Name and additional info on card</p>
          </div>
          <div className="box">
            <div className="right-cross-icon">
              <SlClose />
            </div>
            <p className="box-text">Hide Filta Logo</p>
          </div>
          <div className="box">
            <div className="right-cross-icon">
              <SlClose />
            </div>
            <p className="box-text">Design Verification before Shipment</p>
          </div>
          <div className="box">
            <div className="right-cross-icon">
              <SlClose />
            </div>
            <p className="box-text">Your Logo on card</p>
          </div>
          <div className="box border-bottom">
            <div className="right-cross-icon ">
              <SlClose />
            </div>
            <p className="box-text">Fully Customisable</p>
          </div>
          <div className="create-now-s-nfc">
            <Link to='/standardplan'>
            <button type="button" className="create-now-btn">
              Create Now
            </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChooseStandardNFC;
