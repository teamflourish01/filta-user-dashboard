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

const PremiumPlan = () => {
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


  
  return (
    <>
      <div className="bg">
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
