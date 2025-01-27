import React, { useContext, useEffect, useState } from "react";
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
import userContext from "../../context/userDetails";
import { QRCodeCanvas } from "qrcode.react";
const Layout1 = ({
  cardColor,
  primaryTextColor,
  logoHeight,
  logoWidth,
  secondaryTextColor,
  accentColorPremium,
  qrCodeColor,
  showEmailId,
  showMobileNo,
  showFiltaLogo,
  showNfcIcon,
  formData,
  selectedFile,
  hideMobileNo,
  selectedCard,
  setSelectedCard,
  selectedImage,
  useBackgroundColor,
  logoUrl,
  setLogoUrl,
}) => {
  const { userData } = useContext(userContext);
  const furi = process.env.REACT_APP_FRNT_URL;
  const uri = process.env.REACT_APP_DEV_URL;
  const [qrData, setQrData] = useState(
    `${furi}/${userData?.username}`
  );

  const hasLogoOrUserDetails =
    selectedFile ||
    (userData?.nfcPremium?.logo &&
      (formData.name ||
        userData?.nfcPremium?.name ||
        formData.additional ||
        userData?.nfcPremium?.additional));
  const hideBackLine =
    ((formData.email || userData?.nfcPremium?.email) &&
      (formData.email || userData?.nfcPremium?.email) &&
      showEmailId) ||
    ((formData.mobile || userData?.nfcPremium?.mobile) &&
      (formData.mobile || userData?.nfcPremium?.mobile) &&
      showMobileNo);
  const fontFamily = userData?.nfcPremium?.font;
  const boldFont = fontFamily
    ? fontFamily.find((font) => font.includes("Bold"))
    : null;
  const mediumFont = fontFamily
    ? fontFamily.find((font) => font.includes("Medium"))
    : null;
  const regularFont = fontFamily
    ? fontFamily.find((font) => font.includes("Regular"))
    : null;
  const semiboldFont = fontFamily
    ? fontFamily.find((font) => font.includes("SemiBold"))
    : null;
  useEffect(() => {
    console.log(+logoWidth, "logoWidth layout 1");
    console.log(+logoHeight, "logoHeight layout 1");
  }, []);
  return (
    <div>
      <div className="front-premium-card">
        <p className="front-side-text-lay">Front Side</p>
        <div
          className="front-side-card-design-premium"
          style={{
            background: useBackgroundColor
              ? formData.cardBackgroundColor ||
                userData?.nfcPremium?.cardBackgroundColor
              : selectedImage
              ? `url(${selectedImage}) center / cover no-repeat`
              : formData.cardBackgroundColor ||
                userData?.nfcPremium?.cardBackgroundColor,
          }}
        >
          {!showNfcIcon && (
            <div className="nfc-container">
              <img src={nfc} alt="" className="nfc-lay-1-icon-size" />
            </div>
          )}
          <div className="layout-1-logo-c">
            {(userData?.nfcPremium?.logo || logoUrl) && (
              <img
                src={
                  selectedFile
                    ? logoUrl
                    : `${uri}/nfcpremium/${userData?.nfcPremium?.logo}`
                }
                alt=""
                className="layout-1-logo-size"
                style={{
                  width:
                    `${logoWidth}px` ||
                    `${+userData?.nfcPremium?.logoMaxWidth}`,
                  height:
                    `${logoHeight}px` ||
                    `${+userData?.nfcPremium?.logoMaxHeight}`,
                }}
              />
            )}
          </div>
          {hasLogoOrUserDetails && (
            <div
              className="hr-line-l1"
              style={{
                background:
                  formData.accentColor || userData?.nfcPremium?.accentColor,
              }}
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
          {formData.name ||
          userData?.nfcPremium?.name ||
          formData.additional ||
          userData?.nfcPremium?.additional ? (
            <div className="layout1-user-n-d">
              {(formData.name || userData?.nfcPremium?.name) && (
                <p
                  className="l1-user-name"
                  style={{
                    color:
                      formData.primaryTextColor ||
                      userData?.nfcPremium?.primaryTextColor,
                    fontFamily: boldFont,
                  }}
                >
                  {formData?.name || userData?.nfcPremium?.name}
                </p>
              )}
              {(formData.additional || userData?.nfcPremium?.additional) && (
                <p
                  className="l1-user-designation lay1-mobile-user"
                  style={{
                    color:
                      formData.secondaryTextColor ||
                      userData?.nfcPremium?.secondaryTextColor,
                    fontFamily: semiboldFont,
                  }}
                >
                  {formData.additional || userData?.nfcPremium?.additional}
                </p>
              )}
            </div>
          ) : null}

          <div className="layout-1-front"></div>
        </div>
        {/* </div> */}
      </div>
      <div className="back-premium-card">
        <p className="back-side-text-lay">Back Side</p>
        <div
          className="back-side-card-design-premium"
          style={{
            background: useBackgroundColor
              ? formData.cardBackgroundColor ||
                userData?.nfcPremium?.cardBackgroundColor
              : selectedImage
              ? `url(${selectedImage}) center / cover no-repeat`
              : formData.cardBackgroundColor ||
                userData?.nfcPremium?.cardBackgroundColor,
          }}
        >
          {!showFiltaLogo && (
            <div className="nfc-container">
              <img src={filta} alt="" className="nfc-lay-1-icon-size" />
            </div>
          )}
          <div className="scanner-container-premium">
            <div className="scanner-img-lay1">
              <QRCodeCanvas
                className="scanner-lay1-size"
                value={qrData}
                bgColor="#ffffff"
                fgColor={qrCodeColor||"#000000"}
                level="H"
              />
              {/* <img src={scanner} alt="" className="scanner-lay1-size" /> */}
            </div>
            {hideBackLine && (
              <div
                className="hr-line-l1-horizontal"
                style={{
                  background:
                    formData.accentColor || userData?.nfcPremium?.accentColor,
                }}
              ></div>
            )}

            <div
              className="lay1-email-user l1-user-designation"
              style={{
                color:
                  formData.secondaryTextColor ||
                  userData?.nfcPremium?.secondaryTextColor,
                fontFamily: semiboldFont,
              }}
            >
              {showEmailId && (
                <p> {formData.email || userData?.nfcPremium?.email}</p>
              )}
              {showMobileNo && (
                <p
                  className="lay1-mobile-user l1-user-designation"
                  style={{
                    color:
                      formData.secondaryTextColor ||
                      userData?.nfcPremium?.secondaryTextColor,
                    fontFamily: semiboldFont,
                  }}
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

export default Layout1;
