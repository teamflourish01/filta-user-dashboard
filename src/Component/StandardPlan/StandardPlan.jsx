import React, { useContext, useEffect, useState } from "react";
import "../StandardPlan/StandardPlan.css";
import Sprofile from "../../images/profile.svg";
import nfc from "../../images/nfc.svg";
import blackNFC from "../../images/blackNFC.svg";
import whiteFilta from "../../images/whiteFilta.svg";
import blackFilta from "../../images/blackFilta.svg";
import scanner from "../../images/scanner.svg";
import StandardCustomizeDetail from "../StandardCustomizeDetail/StandardCustomizeDetail";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import "../../styles/Preview.css";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { handlePayment } from "../../uttils/Payment";
import userContext from "../../context/userDetails";

const StandardPlan = () => {
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { userData, AuthorizationToken, getUserData } = useContext(userContext);


  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showFiltaLogo, setShowFiltaLogo] = useState(true);
  const [showNfcIcon, setShowNfcIcon] = useState(true);
  const [showMobileNo, setShowMobileNo] = useState(true);
  const [showEmailId, setEmailId] = useState(true);

  const [selectedColor, setSelectedColor] = useState("black");
  const [accentColor, setAccentColor] = useState("#fff");
  const [formData, setFormData] = useState({
    name: "",
    additional: "",
    email: "",
    phone: "",
    card_url:"",
    card_color:"",
    accent_color:"",
    hide_nfc:""
  });
    const [mobile, setMobile] = useState("");
  

  const filterMobile = async() => {
    let arr = userData?.socialLinks?.filter((e) => e?.platform == "Call");
    setMobile(arr[0]?.url);
    return arr[0]?.url
  };



  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    getUserData()
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const hideBackLine =
    (formData.email && formData.email && showEmailId) ||
    (formData.mobileNumber && formData.mobileNumber && showMobileNo);

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
            <span className="back-to-nfc">Back to NFC Card</span>
          </button>
        </div>
        {/* Preview Button Responsive Start */}

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
                  <div className="top-profile-standard">
                    <div className="profile-pic-s">
                      <img
                        src={Sprofile}
                        alt=""
                        className="img-standard-profile"
                      />
                    </div>
                    <div className="profile-details-s">
                      <p className="user-name-standard">Ajay Gadhavi</p>
                      <p className="user-email-standard">
                        ajaygadhavi045@gmail.com
                      </p>
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
                                selectedColor === "white"
                                  ? blackFilta
                                  : whiteFilta
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
                  {/* Close Icon */}
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
        {/* Preview Button Responsive End */}
      </div>

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
            <div className="bottom-content-scroll-standard">
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
                  <button
                    type="button"
                    className="btn-buy-now-nfc"
                    onClick={() =>
                      handlePayment({
                        amount: 1399,
                        name: userData?.card?.name,
                        email: userData?.email,
                        mobile: filterMobile(),
                        userId: userData?._id,
                      })
                    }
                  >
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

export default StandardPlan;
