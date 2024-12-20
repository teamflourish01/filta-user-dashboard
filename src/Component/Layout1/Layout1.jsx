import React from "react";
import "./Layout1.css";
import logol1 from "../../images/flogo.png";
import nfc from "../../images/lay1nfc.svg";
import filta from "../../images/lay1filta.svg";
import scanner from "../../images/scanner.svg";

const Layout1 = ({
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
  hideMobileNo,
}) => {
  const hasLogoOrUserDetails = selectedFile && (formData.name || formData.info);
  const hideBackLine =
    (formData.email && formData.email && showEmailId) ||
    (formData.mobileNumber && formData.mobileNumber && showMobileNo);

  return (
    <div>
      <div className="front-premium-card">
        <p className="front-side-text-lay">Front Side</p>
        <div
          className="front-side-card-design-premium"
          style={{ backgroundColor: cardColor }}
        >
          {showNfcIcon && (
            <div className="nfc-container">
              <img src={nfc} alt="" className="nfc-lay-1-icon-size" />
            </div>
          )}
          <div className="layout-1-logo-c">
            <img
              src={selectedFile}
              alt=""
              className="layout-1-logo-size"
              style={{
                width: `${logoWidth - 20}px`,
                height: `${logoHeight - 20}px`,
              }}
            />
          </div>
          {hasLogoOrUserDetails && (
            <div
              className="hr-line-l1"
              style={{ background: accentColorPremium }}
            ></div>
          )}

          {/* <div className="layout1-user-n-d">
            <p className="l1-user-name" style={{ color: primaryTextColor }}>
              {formData.name}
            </p>
            <p
              className="l1-user-designation lay1-mobile-user"
              style={{ color: secondaryTextColor }}
            >
              {formData.info}
            </p>
          </div> */}
          {formData.name || formData.info ? (
            <div className="layout1-user-n-d">
              {formData.name && (
                <p className="l1-user-name" style={{ color: primaryTextColor }}>
                  {formData?.name}
                </p>
              )}
              {formData.info && (
                <p
                  className="l1-user-designation lay1-mobile-user"
                  style={{ color: secondaryTextColor }}
                >
                  {formData.info || "information"}
                </p>
              )}
            </div>
          ) : null}

          <div className="layout-1-front"></div>
        </div>
      </div>
      <div className="back-premium-card">
        <p className="back-side-text-lay">Back Side</p>
        <div
          className="back-side-card-design-premium"
          style={{ backgroundColor: cardColor }}
        >
          {showFiltaLogo && (
            <div className="nfc-container">
              <img src={filta} alt="" className="nfc-lay-1-icon-size" />
            </div>
          )}
          <div className="scanner-container-premium">
            <div className="scanner-img-lay1">
              <img src={scanner} alt="" className="scanner-lay1-size" />
            </div>
            {hideBackLine && (
              <div
                className="hr-line-l1-horizontal"
                style={{ background: accentColorPremium }}
              ></div>
            )}

            <div
              className="lay1-email-user l1-user-designation"
              style={{ color: secondaryTextColor }}
            >
              {showEmailId && <p> {formData.email}</p>}
              {showMobileNo && (
                <p
                  className="lay1-mobile-user l1-user-designation"
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
  );
};

export default Layout1;
