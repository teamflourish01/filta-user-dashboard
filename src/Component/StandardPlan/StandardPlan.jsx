import React, { useState } from "react";
import "../StandardPlan/StandardPlan.css";
import Sprofile from "../../images/profile.svg";
import nfc from "../../images/nfc.svg";
import blackNFC from "../../images/blackNFC.svg";
import whiteFilta from "../../images/whiteFilta.svg";
import blackFilta from "../../images/blackFilta.svg";
import scanner from "../../images/scanner.svg";
import StandardCustomizeDetail from "../StandardCustomizeDetail/StandardCustomizeDetail";
import { FaIndianRupeeSign } from "react-icons/fa6";

const StandardPlan = () => {
  const [showFiltaLogo, setShowFiltaLogo] = useState(true);
  const [showNfcIcon, setShowNfcIcon] = useState(true);
  const [showMobileNo, setShowMobileNo] = useState(true);
  const [showEmailId, setEmailId] = useState(true);

  const [selectedColor, setSelectedColor] = useState("black");
  const [accentColor, setAccentColor] = useState("#fff");
  const [formData, setFormData] = useState({
    name: "",
    info: "",
    email: "",
    mobileNumber: "",
  });

  const hideBackLine = formData.email || formData.mobileNumber;

  const hideNfc = () => {
    setShowNfcIcon(!showNfcIcon);
  };

  const logoHide = () => {
    setShowFiltaLogo(!showFiltaLogo);
  };
  const hideMobileNo = () => {
    setShowMobileNo(!showMobileNo);
  };
  const hideEmailId = () => {
    setEmailId(!showEmailId);
  };
  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  return (
    <>
      <div className="bg">
        <div className="standard-plan">
          <div className="left-standard-n-f-c-card">
            <div className="standard-l-n-f-c">Standard Plan</div>
            <div className="standard-card-content">
              <StandardCustomizeDetail
                logoHide={logoHide}
                hideNfc={hideNfc}
                hideMobileNo={hideMobileNo}
                hideEmailId={hideEmailId}
                handleColorChange={handleColorChange}
                accentColor={accentColor}
                setAccentColor={setAccentColor}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
          </div>

          <div className="right-standard-n-f-c-card">
            <div className="top-profile-standard">
              <div className="profile-pic-s">
                <img src={Sprofile} alt="" className="img-standard-profile" />
              </div>
              <div className="profile-details-s">
                <p className="user-name-standard">Ajay Gadhavi</p>
                <p className="user-email-standard">ajaygadhavi045@gmail.com</p>
              </div>
            </div>
            <div className="bottom-standard-section">
              <div className="standard-nfc-card-preview-title">
                NFC card live preview
              </div>
              <div className="front-standard-card">
                <p className="front-side-text">Front Side</p>
                <div
                  className={`front-side-card-design ${
                    selectedColor === "white" ? "white-bg" : "black-bg"
                  }`}
                >
                  {showNfcIcon && (
                    <div className="nfc-icon">
                      <img
                        src={selectedColor === "white" ? blackNFC : nfc}
                        alt=""
                        className="nfc-i-s-s"
                      />
                    </div>
                  )}
                  <p
                    className={`name-card ${
                      selectedColor === "white"
                        ? "text-black "
                        : "white-name-black-card"
                    }`}
                  >
                    {formData.name}
                  </p>
                  <p className="green-name-black-card">{formData.info}</p>
                </div>
              </div>
              <div className="line-between-front-back"></div>
              <div className="back-standard-card">
                <p className="back-side-text">Back Side</p>
                <div
                  className={`back-side-card-design ${
                    selectedColor === "white" ? "white-bg" : "black-bg"
                  }`}
                >
                  {showFiltaLogo && (
                    <div className="nfc-icon">
                      <img
                        src={
                          selectedColor === "white" ? blackFilta : whiteFilta
                        }
                        alt=""
                        className="filta-b-s-s"
                      />
                    </div>
                  )}

                  <div className="scanner-container-standard">
                    <img src={scanner} alt="" className="nfc-scanner" />
                    {hideBackLine && (
                      <div
                        className={
                          selectedColor === "white"
                            ? "black-hr"
                            : " hr-standard"
                        }
                        style={{ backgroundColor: accentColor }}
                      ></div>
                    )}
                    {formData.email || formData.mobileNumber ? (
                      <div className="back-details-card">
                        {showEmailId && <p>{formData.email}</p>}
                        {showMobileNo && <p>{formData.mobileNumber}</p>}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="but-now-btn-nfc">
                <button type="button" className="btn-buy-now-nfc">
                  <div className="buy-now-flex">
                    <span>Buy Now at </span>
                    <span className="rupee-f">
                      <FaIndianRupeeSign />
                      899
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StandardPlan;
