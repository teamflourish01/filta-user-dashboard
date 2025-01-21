import React, { useContext } from "react";
import "../Layout3/Layout3.css";
import logol1 from "../../images/flogo.png";
import nfc from "../../images/lay1nfc.svg";
import filta from "../../images/lay1filta.svg";
import scanner from "../../images/scanner.svg";
import userContext from "../../context/userDetails";

const Layout3 = ({
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
  selectedFile,
  formData,
  selectedImage,
  useBackgroundColor,
  logoUrl,
  setLogoUrl
}) => {
  const { userData } = useContext(userContext);
  const uri = process.env.REACT_APP_DEV_URL;

  return (
    <div>
      <div className="front-premium-card">
        <p className="front-side-text-lay">Front Side</p>
        <div
          className="front-side-card-design-premium"
          // style={{ backgroundColor: cardColor }}
          style={{
            background: useBackgroundColor
              ? formData.cardBackgroundColor || userData?.nfcPremium?.cardBackgroundColor
              : selectedImage
              ? `url(${selectedImage}) center / cover no-repeat`
              : formData.cardBackgroundColor || userData?.nfcPremium?.cardBackgroundColor,
          }}
        >
          {!showNfcIcon && (
            <div className="nfc-container">
              <img src={nfc} alt="" className="nfc-lay-1-icon-size" />
            </div>
          )}
          <div className="layout-1-front">
            <div className="layout-1-logo-c">
              <img
                src={selectedFile ? logoUrl : `${uri}/nfcpremium/${userData?.nfcPremium?.logo}`}
                alt=""
                className="layout-1-logo-size"
                style={{
                  width: `${logoWidth}px`,
                  height: `${logoHeight}px`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="back-premium-card">
        <p className="back-side-text-lay">Back Side</p>
        <div
          className="back-side-card-design-premium"
          // style={{ backgroundColor: cardColor }}
          style={{
            background: useBackgroundColor
              ? formData.cardBackgroundColor || userData?.nfcPremium?.cardBackgroundColor
              : selectedImage
              ? `url(${selectedImage}) center / cover no-repeat`
              : formData.cardBackgroundColor || userData?.nfcPremium?.cardBackgroundColor,
          }}
        >
          {!showFiltaLogo && (
            <div className="nfc-container">
              <img src={filta} alt="" className="nfc-lay-1-icon-size" />
            </div>
          )}
          <div className="scanner-img-lay3">
            <img src={scanner} alt="" className="scanner-lay1-size" />
          </div>
          <div className="scanner-container-premium">
            <div
              className="lay1-email-user l1-user-designation"
              style={{ color: formData.secondaryTextColor || userData?.nfcPremium?.secondaryTextColor}}
            >
              <p
                className="l1-user-name"
                style={{ color: formData.primaryTextColor || userData?.nfcPremium?.primaryTextColor}}
              >
                {formData.name || userData?.nfcPremium?.name}
              </p>
              <p
                className="l1-user-designation lay1-mobile-user"
                style={{ color: formData.secondaryTextColor || userData?.nfcPremium?.secondaryTextColor }}
              >
                {formData.additional || userData?.nfcPremium?.additional}
              </p>
              {showEmailId && <p> {formData.email || userData?.nfcPremium?.email}</p>}
              {showMobileNo && (
                <p
                  className="lay1-mobile-user l1-user-designation"
                  style={{ color: formData.secondaryTextColor || userData?.nfcPremium?.secondaryTextColor}}
                >
                  {formData.mobile || userData?.nfcPremium?.mobile}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout3;
