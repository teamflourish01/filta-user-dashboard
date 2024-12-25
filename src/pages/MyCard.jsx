import React, { useContext, useEffect, useState } from "react";
import "../styles/myCard.css";
import "../Component/MyCard/Design.css";
import profileimg from "../images/profileimg.png";
import basicimg from "../images/White_basicDetails.svg";
import contentimg from "../images/White_Round.svg";
import designimg from "../images/Black_pen.svg";
import qrcodeimg from "../images/Black_qrcode.svg";
import sharebtn from "../images/mycardshare.png";
import blackBasiicone from "../images/Black_basicDetails.svg";
import blackContent from "../images/Black_Round.svg";
import whiteQr from "../images/White_QRcode.svg";
import whitepen from "../images/White-pen.svg";
import qrcodeImg from "../images/qrImg.png";
import qrLogoImg from "../images/qrlogoImg.png";
import BasicDetails from "../Component/MyCard/MycardBasicDetails";
import ContentComponent from "../Component/MyCard/MycardContent";
import DesignComponent from "../Component/MyCard/MycardDesign";
import QrcodeComponent from "../Component/MyCard/MycardQRcode";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import userContext from "../context/userDetails";
import { useNavigate } from "react-router-dom";

const MyCard = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [profileImages, setProfileImage] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [logo, setLogo] = useState(null);
  const [activeTab, setActiveTab] = useState("Basic Details");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [borderStyle, setBorderStyle] = useState("circle");
  const { userData } = useContext(userContext);
  const uri = process.env.REACT_APP_DEV_URL;
  const [formData, setFormData] = useState({
    name: "",
    jobTitle: "",
    company: "",
    location: "",
    bio: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //Preview button Animation Function Start
  const handleFullscreen = () => {
    if (!isFullScreen) {
      setIsFullScreen(true);
      setIsClosing(false);
    }
  };

  const handleFormDataChange = (updatedData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...updatedData,
    }));
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
  // Tab content components
  const renderTabContent = () => {
    switch (activeTab) {
      case "Basic Details":
        return (
          <>
            <BasicDetails
              onFormDataChange={handleFormDataChange}
              onProfileImageChange={setProfileImage}
              onCoverPhotoChange={setCoverPhoto}
              onLogoChange={setLogo}
            />
          </>
        );
      case "Content":
        return (
          <>
            <ContentComponent onFormDataChange={handleFormDataChange} />
          </>
        );
      case "Design":
        return (
          <>
            <DesignComponent onFormDataChange={handleFormDataChange} />
          </>
        );
      case "QR Code":
        return (
          <>
            <QrcodeComponent />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="my-container">
        {/* Left Side */}
        <div className="my-prvw-container">
          <div className="my-back-btnflex">
            <button
              className="my-back-btn"
              onClick={() => navigate("/my-card")}
            >
              <AiOutlineArrowLeft style={{ width: "16px", height: "14px" }} />
              <span>Back to My Card</span>
            </button>
          </div>
          <div className="my-prvwbtn">
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
                    backgroundColor:
                      isFullScreen && !isClosing ? "white" : "black",
                    top: isFullScreen && !isClosing ? "0" : "90px",
                    right:
                      isFullScreen && !isClosing
                        ? "0"
                        : screenWidth <= 768
                        ? "10px"
                        : "28px",
                    position: isFullScreen ? "fixed" : "absolute ",
                    borderRadius: isFullScreen && !isClosing ? "0" : "35px",
                    zIndex: isFullScreen && !isClosing ? "5" : "0",
                  }}
                >
                  {isFullScreen && !isClosing ? (
                    <div className="center-preview-in-btn">
                      <div className="e-profile">
                        <img src={profileimg} alt="profile img" />
                        <div className="e-sidediv">
                          <p className="e-prfname">Ajay Gadhavi</p>
                          <p className="e-prfemail">ajaygadhvi045@gmail.com</p>
                        </div>
                      </div>
                      <hr className="hrline" />

                      {activeTab === "QR Code" ? (
                        <div className="qr-code-panel">
                          <p>QR Code</p>
                          <div className="qr-imgmain">
                            <div className="qr-imgdiv">
                              <img
                                className="qrimg"
                                src={qrcodeImg}
                                alt="qr-code"
                              />
                              <img
                                className="qrlogo"
                                src={qrLogoImg}
                                alt="logo-img"
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="my-priviewMain">
                          <p>Card live preview</p>
                          <div className="my-priviewcard"></div>
                          <div className="my-prwbtn">
                            <span>Share your card</span>
                            <img src={sharebtn} alt="sharebtn" />
                          </div>
                        </div>
                      )}
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
        </div>
        <div className="my-leftside">
          <div className="my-menu">
            {["Basic Details", "Content", "Design", "QR Code"].map((tab) => (
              <div
                key={tab}
                className={`my-menuitem ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                <img
                  src={
                    activeTab === tab
                      ? tab === "Basic Details"
                        ? basicimg
                        : tab === "Content"
                        ? blackContent
                        : tab === "Design"
                        ? whitepen
                        : whiteQr
                      : tab === "Basic Details"
                      ? blackBasiicone
                      : tab === "Content"
                      ? contentimg
                      : tab === "Design"
                      ? designimg
                      : qrcodeimg
                  }
                  alt={`${tab} icon`}
                />
                <span>{tab}</span>
              </div>
            ))}
          </div>
          <hr />
          {renderTabContent()}
        </div>

        {/* Right Side */}
        <div className="my-rightside">
          <div className="e-profile">
            {/* <img src={profileimg} alt="profile img" /> */}
            <img
              src={`${uri}/card/${userData?.card?.profileimg}`}
              alt="profile-img"
            />
            <div className="e-sidediv">
              <p className="e-prfname">{userData?.card?.name}</p>
              <p className="e-prfemail">{userData?.card?.email}</p>
            </div>
          </div>
          <hr className="hrline" />

          {activeTab === "QR Code" ? (
            <div className="qr-code-panel">
              <p>QR Code</p>
              <div className="qr-imgmain">
                <div className="qr-imgdiv">
                  <img className="qrimg" src={qrcodeImg} alt="qr-code" />
                  <img className="qrlogo" src={qrLogoImg} alt="logo-img" />
                </div>
              </div>
            </div>
          ) : (
            <div className="my-priviewMain">
              <p>Card live preview</p>
              <div className="my-priviewcard">
                {/* Show live card preview */}

                <div className="cardshow-text">
                  {/* <div>
                    {profileImages && (
                      <img
                        src={profileImages}
                        alt="Profile Preview"
                        className={`profile-photo ${borderStyle}`}
                      />
                    )}

                    {coverPhoto && (
                      <img
                        src={coverPhoto}
                        alt="Cover Phot Preview"
                        className="cover-photo"
                      />
                    )}

                    {logo && (
                      <img src={logo} alt="Logo Preview" className="logo-img" />
                    )}
                  </div> */}
                  <div>
                    <img className="co-img" width={"200px"} src={`${uri}/card/${userData?.card?.coverimg}`} alt="cover-img" />
                    <img className="pro-img" width={"100px"}  src={`${uri}/card/${userData?.card?.profileimg}`} alt="profile-img" />
                    <img className="logo-img" width={"50px"} src={`${uri}/card/${userData?.card?.logoimg}`} alt="logo-img" />
                    <img src="" alt="" />
                  </div>
                  <p>{userData?.card?.name}</p>
                  <p>{userData?.card?.jobtitle}</p>
                  <p>{userData?.card?.company}</p>
                  <p>{userData?.card?.location}</p>
                  <p>{userData?.card?.bio}</p>
                </div>
              </div>
              <div className="my-prwbtn">
                <span>Share your card</span>
                <img src={sharebtn} alt="sharebtn" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyCard;
