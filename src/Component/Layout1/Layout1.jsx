import React from "react";
import "./Layout1.css";
import logol1 from "../../images/flogo.png";
import nfc from "../../images/lay1nfc.svg";
import filta from "../../images/lay1filta.svg";
import scanner from "../../images/scanner.svg";
import theme1 from "../../images/NFC-Theme/theme1.svg";
import theme2 from "../../images/NFC-Theme/theme2.svg";
import theme3 from "../../images/NFC-Theme/theme3.svg";
import theme4 from "../../images/NFC-Theme/theme4.svg";
import theme5 from "../../images/NFC-Theme/theme5.svg";

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
  selectedCard,
  selectedImage,
  useBackgroundColor,
}) => {
  const hasLogoOrUserDetails =
    selectedFile && (formData.name || formData.additional);
  const hideBackLine =
    (formData.email && formData.email && showEmailId) ||
    (formData.mobile && formData.mobile && showMobileNo);

  return (
    <div>
      <div className="front-premium-card">
        <p className="front-side-text-lay">Front Side</p>
        <div
          className="front-side-card-design-premium"
          style={{
            background: useBackgroundColor
              ? formData.cardBackgroundColor
              : selectedImage
              ? `url(${selectedImage}) center / cover no-repeat`
              : formData.cardBackgroundColor,
          }}
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
              style={{ background: formData.accentColor }}
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
          {formData.name || formData.additional ? (
            <div className="layout1-user-n-d">
              {formData.name && (
                <p
                  className="l1-user-name"
                  style={{ color: formData.primaryTextColor }}
                >
                  {formData?.name}
                </p>
              )}
              {formData.additional && (
                <p
                  className="l1-user-designation lay1-mobile-user"
                  style={{ color: formData.secondaryTextColor }}
                >
                  {formData.additional || "information"}
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
          style={{
            background: useBackgroundColor
              ? formData.cardBackgroundColor
              : selectedImage
              ? `url(${selectedImage}) center / cover no-repeat`
              : formData.cardBackgroundColor,
          }}
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
                style={{ background: formData.accentColor }}
              ></div>
            )}

            <div
              className="lay1-email-user l1-user-designation"
              style={{ color: formData.secondaryTextColor }}
            >
              {showEmailId && <p> {formData.email}</p>}
              {showMobileNo && (
                <p
                  className="lay1-mobile-user l1-user-designation"
                  style={{ color: formData.secondaryTextColor }}
                >
                  {formData.mobile}
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
