import React from "react";
import "../Layout2/Layout2.css";
import logol1 from "../../images/flogo.png";
import nfc from "../../images/lay1nfc.svg";
import filta from "../../images/lay1filta.svg";
import scanner from "../../images/scanner.svg";

const Layout2 = ({
  cardColor,
  primaryTextColor,
  logoHeight,
  logoWidth,
  secondaryTextColor,
  accentColorPremium,
  showEmailId,
  showMobileNo,
  showFiltaLogo,
  showNfcIcon,
  formData,
  selectedFile,
  selectedImage,
  useBackgroundColor
}) => {
  return (
    <div>
      <div className="front-premium-card">
        <p className="front-side-text-lay">Front Side</p>
        <div
          className="front-side-card-design-premium-lay2"
          // style={{ backgroundColor: cardColor }}
          style={{
            background: useBackgroundColor
              ? cardColor 
              : selectedImage
              ? `url(${selectedImage}) center / cover no-repeat` 
              : cardColor,
          }}
        >
          <div className="layout-2-logo-flex">
            <div className="layout-1-logo-c">
              <img
                src={selectedFile}
                alt=""
                className="layout-2-logo-size"
                style={{
                  width: `${logoWidth}px`,
                  height: `${logoHeight}px`,
                }}
              />
            </div>
            {showNfcIcon && (
              <div className="nfc-container">
                <img src={nfc} alt="" className="nfc-lay-1-icon-size" />
              </div>
            )}
          </div>
          <div className="lay-2-user-detail m-135">
            <p className="l2-user-name" style={{ color: primaryTextColor }}>
              {formData.name}
            </p>
            <p
              className="l2-user-designation lay1-mobile-user"
              style={{ color: secondaryTextColor }}
            >
              {formData.info }
            </p>
          </div>
        </div>
      </div>
      <div className="back-premium-card">
        <p className="back-side-text-lay">Back Side</p>
        <div
          className="back-side-card-design-premium-lay2"
          // style={{ backgroundColor: cardColor }}
          style={{
            background: useBackgroundColor
              ? cardColor 
              : selectedImage
              ? `url(${selectedImage}) center / cover no-repeat` 
              : cardColor,
          }}
        >
          <div className="layout-2-logo-flex">
            {showFiltaLogo && (
              <div className="nfc-container">
                <img src={filta} alt="" className="nfc-lay-1-icon-size" />
              </div>
            )}
            <div className="scanner-img-lay1">
              <img src={scanner} alt="" className="scanner-lay1-size-l2" />
            </div>
          </div>

          <div className="padding-100-l2">
            <div
              className="lay1-email-user l2-user-designation"
              style={{ color: secondaryTextColor }}
            >
              {showEmailId && <p> {formData.email}</p>}
              {showMobileNo && (
                <p
                  className="lay1-mobile-user l2-user-designation"
                  style={{ color: secondaryTextColor }}
                >
                  {formData.mobileNumber}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Layout2;
