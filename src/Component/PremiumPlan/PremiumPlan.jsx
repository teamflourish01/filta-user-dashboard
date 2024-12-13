import React, { useState } from "react";
import PremiumPlanDetails from "../PremiumPlanDetails/PremiumPlanDetails";
import Sprofile from "../../images/profile.svg";
// import scanner from "../../images/scanner.svg";
import scanner from "../../images/flogo.png";
import "../PremiumPlan/PremiumPlan.css";
import { FaIndianRupeeSign } from "react-icons/fa6";
import Layout1 from "../Layout1/Layout1";
import Layout2 from "../Layout2/Layout2";
import Layout3 from "../Layout3/Layout3";
import "../../styles/Preview.css";
import { AiOutlineClose } from "react-icons/ai";



const PremiumPlan = () => {
  const [isFullScreen, setIsFullScreen] = useState(false); 
  const [isClosing, setIsClosing] = useState(false); 
  const [cardColor, setCardColor] = useState("#000000");
  const [primaryTextColor, setPrimaryTextColor] = useState("#ffffff");
  const [secondaryTextColor, setSecondaryTextColor] = useState("#ffffff");
  const [accentColorPremium, setAccentColorPremium] = useState("#ffffff");
  const [showMobileNo, setShowMobileNo] = useState(true);
  const [showEmailId, setEmailId] = useState(true);
  const [showFiltaLogo, setShowFiltaLogo] = useState(true);
  const [showNfcIcon, setShowNfcIcon] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

  const [logoWidth, setLogoWidth] = useState();
  const [logoHeight, setLogoHeight] = useState();
  const [selectedLayout, setSelectedLayout] = useState("layout1");
  const [formData, setFormData] = useState({
    name: "",
    info: "",
    email: "",
    mobileNumber: "",
  });

  const hideMobileNo = () => {
    setShowMobileNo(!showMobileNo);
  };
  const hideEmailId = () => {
    setEmailId(!showEmailId);
  };
  const hideNfc = () => {
    setShowNfcIcon(!showNfcIcon);
  };

  const logoHide = () => {
    setShowFiltaLogo(!showFiltaLogo);
  };

  //Preview button Animation Function Start
  const handleFullscreen = () => {
    if (!isFullScreen) {
      setIsFullScreen(true);
      setIsClosing(false);
    }
  };

  const handleClose = () => {
    if (isFullScreen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsFullScreen(false);
        setIsClosing(false);
      }, 1000);
    }
  };
  //Preview button Animation Function End

  return (
    <>
      <div className="bg">
        <div
          style={{ width: "100%", margin: "auto", position: "relative" }}
          className="btn-display-preview"
        >
          <div className="btn-content-preview-mobile" style={{ width: "100%" }}>
            <button
              onClick={handleFullscreen}
              className="btn-font-preview"
              style={{
                transition:
                  "width 1s ease, height 1s ease, background-color 1s ease, top 1s ease, border-radius 1s ease",
                width: isFullScreen && !isClosing ? "100%" : "117px",
                height: isFullScreen && !isClosing ? "100vh" : "34px",
                backgroundColor: isFullScreen && !isClosing ? "white" : "black",
                top: isFullScreen && !isClosing ? "0px" : "70px",
                right: isFullScreen && !isClosing ? "0" : "20px",
                position: isFullScreen ? "fixed" : "fixed",
                borderRadius: isFullScreen && !isClosing ? "0" : "35px",
                marginTop: isFullScreen && !isClosing ? "0" : "15px",
                marginBottom: isFullScreen && !isClosing ? "0" : "20px",
              }}
            >
              {isFullScreen && !isClosing ? (
                <div className="center-preview-in-btn">
                  <div className="top-profile-premium">
                    <div className="profile-pic-s">
                      <img
                        src={Sprofile}
                        alt=""
                        className="img-standard-profile"
                      />
                    </div>
                    <div className="profile-details-s">
                      <p className="user-name-premium">Ajay Gadhavi</p>
                      <p className="user-email-premium">
                        ajaygadhavi045@gmail.com
                      </p>
                    </div>
                  </div>
                  <div className="bottom-premium-section">
                    <div className="standard-nfc-card-preview-title">
                      NFC card live preview
                    </div>
                    <div className="layout-preview">
                      {selectedLayout === "layout1" && (
                        <Layout1
                          cardColor={cardColor}
                          logoWidth={logoWidth}
                          logoHeight={logoHeight}
                          primaryTextColor={primaryTextColor}
                          secondaryTextColor={secondaryTextColor}
                          accentColorPremium={accentColorPremium}
                          showEmailId={showEmailId}
                          showMobileNo={showMobileNo}
                          showNfcIcon={showNfcIcon}
                          showFiltaLogo={showFiltaLogo}
                          formData={formData}
                          selectedFile={selectedFile}
                          hideMobileNo={hideMobileNo}
                        />
                      )}
                      {selectedLayout === "layout2" && (
                        <Layout2
                          cardColor={cardColor}
                          logoWidth={logoWidth}
                          logoHeight={logoHeight}
                          primaryTextColor={primaryTextColor}
                          secondaryTextColor={secondaryTextColor}
                          accentColorPremium={accentColorPremium}
                          showEmailId={showEmailId}
                          showMobileNo={showMobileNo}
                          showNfcIcon={showNfcIcon}
                          showFiltaLogo={showFiltaLogo}
                          formData={formData}
                          selectedFile={selectedFile}
                        />
                      )}
                      {selectedLayout === "layout3" && (
                        <Layout3
                          cardColor={cardColor}
                          logoWidth={logoWidth}
                          logoHeight={logoHeight}
                          primaryTextColor={primaryTextColor}
                          secondaryTextColor={secondaryTextColor}
                          accentColorPremium={accentColorPremium}
                          showEmailId={showEmailId}
                          showMobileNo={showMobileNo}
                          showNfcIcon={showNfcIcon}
                          showFiltaLogo={showFiltaLogo}
                          formData={formData}
                          selectedFile={selectedFile}
                        />
                      )}
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
                  {/* {/ Close Icon /} */}
                  <AiOutlineClose
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClose();
                    }}
                    className="close-btn-icon-cross"
                  />
                </div>
              ) : (
                "Preview"
              )}

              {/* {/ Black overlay /} */}
              {isFullScreen && !isClosing && (
                <div className="black-overlay-btn-preview"></div>
              )}
            </button>
          </div>
        </div>

        <div className="premium-plan">
          <div className="left-premium-n-f-c-card">
            <div className="premium-l-n-f-c">Premium Plan</div>
            <PremiumPlanDetails
              cardColor={cardColor}
              setCardColor={setCardColor}
              primaryTextColor={primaryTextColor}
              setPrimaryTextColor={setPrimaryTextColor}
              secondaryTextColor={secondaryTextColor}
              setSecondaryTextColor={setSecondaryTextColor}
              accentColorPremium={accentColorPremium}
              setAccentColorPremium={setAccentColorPremium}
              logoWidth={logoWidth}
              setLogoWidth={setLogoWidth}
              logoHeight={logoHeight}
              setLogoHeight={setLogoHeight}
              selectedLayout={selectedLayout}
              setSelectedLayout={setSelectedLayout}
              logoHide={logoHide}
              hideNfc={hideNfc}
              hideEmailId={hideEmailId}
              hideMobileNo={hideMobileNo}
              formData={formData}
              setFormData={setFormData}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
            />
          </div>

          <div className="right-premium-n-f-c-card">
            <div className="top-profile-premium">
              <div className="profile-pic-s">
                <img src={Sprofile} alt="" className="img-standard-profile" />
              </div>
              <div className="profile-details-s">
                <p className="user-name-premium">Ajay Gadhavi</p>
                <p className="user-email-premium">ajaygadhavi045@gmail.com</p>
              </div>
            </div>
            <div className="bottom-premium-section">
              <div className="standard-nfc-card-preview-title">
                NFC card live preview
              </div>
              <div className="layout-preview">
                {selectedLayout === "layout1" && (
                  <Layout1
                    cardColor={cardColor}
                    logoWidth={logoWidth}
                    logoHeight={logoHeight}
                    primaryTextColor={primaryTextColor}
                    secondaryTextColor={secondaryTextColor}
                    accentColorPremium={accentColorPremium}
                    showEmailId={showEmailId}
                    showMobileNo={showMobileNo}
                    showNfcIcon={showNfcIcon}
                    showFiltaLogo={showFiltaLogo}
                    formData={formData}
                    selectedFile={selectedFile}
                    hideMobileNo={hideMobileNo}
                  />
                )}
                {selectedLayout === "layout2" && (
                  <Layout2
                    cardColor={cardColor}
                    logoWidth={logoWidth}
                    logoHeight={logoHeight}
                    primaryTextColor={primaryTextColor}
                    secondaryTextColor={secondaryTextColor}
                    accentColorPremium={accentColorPremium}
                    showEmailId={showEmailId}
                    showMobileNo={showMobileNo}
                    showNfcIcon={showNfcIcon}
                    showFiltaLogo={showFiltaLogo}
                    formData={formData}
                    selectedFile={selectedFile}
                  />
                )}
                {selectedLayout === "layout3" && (
                  <Layout3
                    cardColor={cardColor}
                    logoWidth={logoWidth}
                    logoHeight={logoHeight}
                    primaryTextColor={primaryTextColor}
                    secondaryTextColor={secondaryTextColor}
                    accentColorPremium={accentColorPremium}
                    showEmailId={showEmailId}
                    showMobileNo={showMobileNo}
                    showNfcIcon={showNfcIcon}
                    showFiltaLogo={showFiltaLogo}
                    formData={formData}
                    selectedFile={selectedFile}
                  />
                )}
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

export default PremiumPlan;
