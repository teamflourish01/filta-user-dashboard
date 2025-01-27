import React, { useContext, useEffect, useRef, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { HiOutlineArrowLeft } from "react-icons/hi";
import theme1 from "../../images/NFC-Theme/theme1.svg";
import theme2 from "../../images/NFC-Theme/theme2.svg";
import theme3 from "../../images/NFC-Theme/theme3.svg";
import theme4 from "../../images/NFC-Theme/theme4.svg";
import theme5 from "../../images/NFC-Theme/theme5.svg";
import userContext from "../../context/userDetails";

const PremiumPlan = () => {
  const navigate = useNavigate();
  const uri = process.env.REACT_APP_DEV_URL;

  const { userData, AuthorizationToken, getUserData } = useContext(userContext);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [cardColor, setCardColor] = useState(
    userData?.nfcPremium?.cardBackgroundColor
  );
  const [primaryTextColor, setPrimaryTextColor] = useState(
    userData?.nfcPremium?.primaryTextColor
  );
  const [secondaryTextColor, setSecondaryTextColor] = useState(
    userData?.nfcPremium?.secondaryTextColor
  );
  const [qrCodeColor, setQrCodeColor] = useState("");
  const [accentColorPremium, setAccentColorPremium] = useState(
    userData?.nfcPremium?.accentColor
  );
  const [showMobileNo, setShowMobileNo] = useState(false);
  const [showEmailId, setEmailId] = useState(false);
  const [showNfcIcon, setShowNfcIcon] = useState(false);
  const [showFiltaLogo, setShowFiltaLogo] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [useBackgroundColor, setUseBackgroundColor] = useState(false);
  const [logoWidth, setLogoWidth] = useState(
    +userData?.nfcPremium?.logoMaxWidth || 20
  );
  const [logoHeight, setLogoHeight] = useState(
    +userData?.nfcPremium?.logoMaxHeight || 20
  );
  const [selectedLayout, setSelectedLayout] = useState("layout1");
  const [logoUrl, setLogoUrl] = useState("");

  const [formData, setFormData] = useState({
    cardLayout: "layout1",
    logo: "",
    logoMaxWidth: 20,
    logoMaxHeight: 20,
    name: "",
    additional: "",
    email: "",
    mobile: "",
    card_url: "",
    cardBackgroundColor: "",
    accentColor: "",
    cardTheme: "",
    primaryTextColor: "",
    secondaryTextColor: "",
    qrCodeColor: "",
    hideNfc: false,
    hideFilta: false,
    hideEmail:false,
    hideNumber:false,
  });
  const initialized = useRef(false);
  useEffect(() => {
    if (!initialized.current && userData?.nfcPremium) {
      setFormData({
        cardLayout: userData?.nfcPremium?.cardLayout || "layout1",
        logo: userData?.nfcPremium?.logo || "",
        logoMaxWidth: userData?.nfcPremium?.logoMaxWidth || 20,
        logoMaxHeight: userData?.nfcPremium?.logoMaxHeight || 20,
        name: userData?.nfcPremium?.name || "",
        additional: userData?.nfcPremium?.additional || "",
        email: userData?.nfcPremium?.email || "",
        mobile: userData?.nfcPremium?.mobile || "",
        card_url: userData?.nfcPremium?.card_url || "",
        cardBackgroundColor: userData?.nfcPremium?.cardBackgroundColor || "",
        accentColor: userData?.nfcPremium?.accentColor || "",
        cardTheme: userData?.nfcPremium?.cardTheme || "",
        primaryTextColor: userData?.nfcPremium?.primaryTextColor || "",
        secondaryTextColor: userData?.nfcPremium?.secondaryTextColor || "",
        qrCodeColor: userData?.nfcPremium?.qrCodeColor,
        hideNfc: userData?.nfcPremium?.hideNfc || false,
        hideFilta: userData?.nfcPremium?.hideFilta || false,
        hideEmail: userData?.nfcPremium?.hideEmail || false,
        hideNumber: userData?.nfcPremium?.hideNumber || false,
      });
      initialized.current = true;
      setShowNfcIcon(userData?.nfcPremium?.hideNfc || false);
      setShowFiltaLogo(userData?.nfcPremium?.hideFilta || false);
      setEmailId(userData?.nfcPremium?.hideEmail || false)
      setShowMobileNo(userData?.nfcPremium?.hideNumber || false)
    }
    if(userData?.nfcPremium?.qrCodeColor){
      setQrCodeColor(userData.nfcPremium.qrCodeColor)
    }
    if (userData?.nfcPremium?.cardTheme) {
      setSelectedCard(userData?.nfcPremium?.cardTheme);
    }
    if (userData?.nfcPremium) {
      setLogoWidth(+userData?.nfcPremium?.logoMaxWidth || 20);
      setLogoHeight(+userData?.nfcPremium?.logoMaxHeight || 20);
    }

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [userData]);

  const imageUrls = [theme1, theme2, theme3, theme4, theme5];

  const hideMobileNo = () => {
    setFormData((prev) => ({ ...prev, hideNumber: !prev.hideNumber }));
    setShowMobileNo((prev) => !prev);
  };
  const hideEmailId = () => {
    setFormData((prev) => ({ ...prev, hideEmail: !prev.hideEmail }));
    setEmailId((prev) => !prev);
  };

  const hideNfc = () => {
    setFormData((prev) => ({ ...prev, hideNfc: !prev.hideNfc }));
    setShowNfcIcon((prev) => !prev);
  };

  const logoHide = () => {
    setFormData((prev) => ({ ...prev, hideFilta: !prev.hideFilta }));
    setShowFiltaLogo((prev) => !prev);
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
      <div className="my-back-btnflex-nfc">
        <div className="btn-nfc-blc">
          <button
            className="my-back-btn-nfc"
            onClick={() => navigate("/nfc-card")}
          >
            <HiOutlineArrowLeft style={{ fontSize: "22px" }} />
            <span className="premium-white-s">Back to NFC Card</span>
          </button>
        </div>
        <div
          style={{ width: "100%", margin: "auto", position: "" }}
          className="btn-display-preview"
        >
          <div className="btn-content-preview-mobile">
            <button
              onClick={handleFullscreen}
              className="btn-font-preview"
              style={{
                transition:
                  "width 1s ease,right 1s ease, height 1s ease,position 1s ease-out, z-index 2s ease-out, background-color 1s ease, top 1s ease, border-radius 1s ease",
                width: isFullScreen && !isClosing ? "100%" : "117px",
                height: isFullScreen && !isClosing ? "100vh" : "34px",
                backgroundColor: isFullScreen && !isClosing ? "white" : "black",
                top: isFullScreen && !isClosing ? "0" : "90px",
                right:
                  isFullScreen && !isClosing
                    ? "0"
                    : screenWidth <= 768
                    ? "10px"
                    : "28px",
                position: isFullScreen ? "fixed" : "fixed ",
                borderRadius: isFullScreen && !isClosing ? "0" : "35px",
                zIndex: isFullScreen && !isClosing ? "5" : "0",
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
                      {formData.cardLayout === "layout1" && (
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
                          selectedCard={selectedCard}
                          useBackgroundColor={useBackgroundColor}
                          logoUrl={logoUrl}
                          setLogoUrl={setLogoUrl}
                          selectedImage={
                            selectedCard !== null
                              ? imageUrls[selectedCard]
                              : null
                          }
                        />
                      )}
                      {formData.cardLayout === "layout2" && (
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
                          selectedCard={selectedCard}
                          useBackgroundColor={useBackgroundColor}
                          logoUrl={logoUrl}
                          setLogoUrl={setLogoUrl}
                          selectedImage={
                            selectedCard !== null
                              ? imageUrls[selectedCard]
                              : null
                          }
                        />
                      )}
                      {formData.cardLayout === "layout3" && (
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
                          selectedCard={selectedCard}
                          useBackgroundColor={useBackgroundColor}
                          logoUrl={logoUrl}
                          setLogoUrl={setLogoUrl}
                          selectedImage={
                            selectedCard !== null
                              ? imageUrls[selectedCard]
                              : null
                          }
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

              {/* Black overlay */}
              {isFullScreen && !isClosing && (
                <div className="black-overlay-btn-preview"></div>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="bg">
        <div className="premium-plan">
          <div className="left-premium-n-f-c-card">
            <div className="premium-l-n-f-c">Premium Plan</div>
            <div className="premium-card-content">
              <PremiumPlanDetails
                cardColor={cardColor}
                setCardColor={setCardColor}
                primaryTextColor={primaryTextColor}
                setPrimaryTextColor={setPrimaryTextColor}
                secondaryTextColor={secondaryTextColor}
                setSecondaryTextColor={setSecondaryTextColor}
                qrCodeColor={qrCodeColor}
                setQrCodeColor={setQrCodeColor}
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
                selectedCard={selectedCard}
                setSelectedCard={setSelectedCard}
                imageUrls={imageUrls}
                useBackgroundColor={useBackgroundColor}
                setUseBackgroundColor={setUseBackgroundColor}
                logoUrl={logoUrl}
                setLogoUrl={setLogoUrl}
                showNfcIcon={showNfcIcon}
              />
            </div>
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
            <div className="bottom-content-scroll-standard">
              <div className="bottom-premium-section">
                <div className="standard-nfc-card-preview-title">
                  NFC card live preview
                </div>
                <div className="layout-preview">
                  {formData.cardLayout === "layout1" && (
                    <Layout1
                      cardColor={cardColor}
                      logoWidth={logoWidth}
                      logoHeight={logoHeight}
                      primaryTextColor={primaryTextColor}
                      secondaryTextColor={secondaryTextColor}
                      qrCodeColor={qrCodeColor}
                      setQrCodeColor={setQrCodeColor}
                      accentColorPremium={accentColorPremium}
                      showEmailId={showEmailId}
                      showMobileNo={showMobileNo}
                      showNfcIcon={showNfcIcon}
                      showFiltaLogo={showFiltaLogo}
                      formData={formData}
                      selectedFile={selectedFile}
                      hideMobileNo={hideMobileNo}
                      logoUrl={logoUrl}
                      setLogoUrl={setLogoUrl}
                      selectedImage={
                        selectedCard !== null ? imageUrls[selectedCard] : null
                      }
                    />
                  )}
                  {formData.cardLayout === "layout2" && (
                    <Layout2
                      cardColor={cardColor}
                      logoWidth={logoWidth}
                      logoHeight={logoHeight}
                      primaryTextColor={primaryTextColor}
                      secondaryTextColor={secondaryTextColor}
                      qrCodeColor={qrCodeColor}
                      accentColorPremium={accentColorPremium}
                      showEmailId={showEmailId}
                      showMobileNo={showMobileNo}
                      showNfcIcon={showNfcIcon}
                      showFiltaLogo={showFiltaLogo}
                      formData={formData}
                      selectedFile={selectedFile}
                      logoUrl={logoUrl}
                      setLogoUrl={setLogoUrl}
                      selectedImage={
                        selectedCard !== null ? imageUrls[selectedCard] : null
                      }
                    />
                  )}
                  {formData.cardLayout === "layout3" && (
                    <Layout3
                      cardColor={cardColor}
                      logoWidth={logoWidth}
                      logoHeight={logoHeight}
                      primaryTextColor={primaryTextColor}
                      secondaryTextColor={secondaryTextColor}
                      qrCodeColor={qrCodeColor}
                      accentColorPremium={accentColorPremium}
                      showEmailId={showEmailId}
                      showMobileNo={showMobileNo}
                      showNfcIcon={showNfcIcon}
                      showFiltaLogo={showFiltaLogo}
                      formData={formData}
                      selectedFile={selectedFile}
                      logoUrl={logoUrl}
                      setLogoUrl={setLogoUrl}
                      selectedImage={
                        selectedCard !== null ? imageUrls[selectedCard] : null
                      }
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
      </div>
    </>
  );
};

export default PremiumPlan;
