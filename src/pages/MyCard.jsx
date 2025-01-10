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
import Mobileprev from "./../Component/MyCard/mobileprev/Mobileprev";
import QrcodeGen from "../Component/MyCard/QrcodeGen";
import { useForm } from "react-hook-form";
import dummyprofile from "../images/digitalphoto.png";

const MyCard = () => {
  const { userData, AuthorizationToken, getUserData, userDetails } =
    useContext(userContext);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [profileImages, setProfileImage] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [logo, setLogo] = useState(null);
  const [activeTab, setActiveTab] = useState("Basic Details");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState();
  const [borderStyle, setBorderStyle] = useState(false);
  const [showTranslateBtn, setshowTranslateBtn] = useState(false);
   const [colors, setColors] = useState({
      flatColor: userData?.card?.design?.card_background?.flat_color,
      grdColor: userData?.card?.design?.card_background?.gradient_color1,
      grdSecColor: userData?.card?.design?.card_background?.gradient_color2,
      prmColor: userData?.card?.design?.card_color?.primary_color,
      secdClor: userData?.card?.design?.card_color?.secondary_color,
      natClor: userData?.card?.design?.card_color?.neutral_color,
      prmTxtColor: userData?.card?.design?.font_style?.primary_text_color,
      secTxtColor: userData?.card?.design?.font_style?.secondary_text_color,
      themeColor: userData?.card?.design?.theme_color,
    });

  const uri = process.env.REACT_APP_DEV_URL;
  const [formData, setFormData] = useState({
    name: "",
    jobTitle: "",
    company: "",
    location: "",
    bio: "",
  });
  const [selectedFields, setSelectedFields] = useState({});
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [qrlogo, setQrLogo] = useState(null);
  const [layout, setLayout] = useState(
    userData?.card?.design?.layout
  );

   
  //Qr code color change
  const handleColorChange = (color) => {
    setSelectedColor(color);
  };
  const handleQrLogoChange = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setQrLogo(reader.result);
    };
    reader.readAsDataURL(file);
  };
  useEffect(() => {
    // Check if UserData and UserData.qrcode.qrcolor exist
    if (userData && userData.qrcode && userData.qrcode.qrcolor) {
      setSelectedColor(userData.qrcode.qrcolor);
    }
    setBorderStyle(userData?.card?.style);
    console.log(borderStyle, "borderStyle");
  }, [userData]);

  const [checkboxStates, setCheckboxStates] = useState({
    name: true,
    email: true,
    number: true,
    message: true,
  });
  const [formDatac, setFormDatac] = useState({
    loginemail: "",
    loginmessage: "",
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

  const handleColorChangee = (e) => {
    const { name, value } = e.target;
    setColors((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  const handleSelectedFieldsChange = (fields) => {
    setSelectedFields(fields);
  };

  const handleLayoutChange = (e) => {
    setLayout(e.target.value);
  };

  const showTbtn = () => {
    setshowTranslateBtn(!showTranslateBtn);
    console.log(showTranslateBtn, "gbvdvf");
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    values: {
      name: userData?.card?.name,
      jobtitle: userData?.card?.jobtitle || "",
      company: userData?.card?.company || "",
      location: userData?.card?.location || "",
      bio: userData?.card?.bio || "",
    },
  });

  const watchedData = watch();

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
              coverPhoto={coverPhoto}
              onLogoChange={setLogo}
              logo={logo}
              borderStyle={borderStyle}
              setBorderStyle={setBorderStyle}
              profileImagePreview={profileImagePreview}
              setProfileImagePreview={setProfileImagePreview}
              profileImages={profileImages}
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
            />
          </>
        );
      case "Content":
        return (
          <>
            <ContentComponent
              onFormDataChange={handleFormDataChange}
              onSelectedFieldsChange={handleSelectedFieldsChange}
              checkboxStates={checkboxStates}
              setCheckboxStates={setCheckboxStates}
              formDatac={formDatac}
              setFormDatac={setFormDatac}
              // userDetails={userDetails}
              // setUserDetails={setUserDetails}
            />
          </>
        );
      case "Design":
        return (
          <>
            <DesignComponent
              onFormDataChange={handleFormDataChange}
              layout={layout}
              setLayout={setLayout}
              handleColorChangee={handleColorChangee}
              colors={colors}
              setColors={setColors}
              handleLayoutChange={handleLayoutChange}
              
            />
          </>
        );
      case "QR Code":
        return (
          <>
            <QrcodeComponent
              selectedColor={selectedColor}
              onColorChange={handleColorChange}
              onLogoChange={handleQrLogoChange}
            />
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
                    position: isFullScreen ? "fixed" : "fixed ",
                    borderRadius: isFullScreen && !isClosing ? "0" : "35px",
                    zIndex: isFullScreen && !isClosing ? "5" : "0",
                  }}
                >
                  {isFullScreen && !isClosing ? (
                    <div className="center-preview-in-btn">
                      <div className="e-profile">
                        {userData?.card?.profileimg ? (
                          <img
                            src={`${uri}/card/${userData?.card?.profileimg}`}
                            alt="profile-img"
                            className="img-standard-profile"
                          />
                        ) : (
                          <img
                            src={dummyprofile}
                            alt="profile-img"
                            className="img-standard-profile"
                          />
                        )}
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
                          <p className="clp">Card live preview</p>
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
          <div className="e-profile-my">
            <div className="profile-name-email-pic-m-l">
              {/* <img src={profileimg} alt="profile img" /> */}
              {userData?.card?.profileimg ? (
                <img
                  src={`${uri}/card/${userData?.card?.profileimg}`}
                  alt="profile-img"
                  className="img-standard-profile"
                />
              ) : (
                <img
                  src={dummyprofile}
                  alt="profile-img"
                  className="img-standard-profile"
                />
              )}
              <div className="e-sidediv">
                <p className="e-prfname">{userData?.card?.name}</p>
                <p className="e-prfemail">{userData?.card?.email}</p>
              </div>
            </div>
            <div className="multi-language-toggle">
              <p className="multi-lang-txt">Multiple Language</p>
              <div className="toggle-btn-m-l">
                <label className="switch-hide-m-l">
                  <input type="checkbox" onChange={showTbtn} />
                  <span className="slider-hide-m-l round"></span>
                </label>
              </div>
            </div>
          </div>
          <hr className="hrline" />

          {activeTab === "QR Code" ? (
            // <div className="qr-code-panel">
            //   <p>QR Code</p>
            //   <div className="qr-imgmain">
            //     <div className="qr-imgdiv">
            //       <img className="qrimg" src={qrcodeImg} alt="qr-code" />
            //       <img className="qrlogo" src={qrLogoImg} alt="logo-img" />
            //     </div>
            //   </div>
            // </div>
            <QrcodeGen selectedColor={selectedColor} logo={qrlogo} />
          ) : (
            <div className="my-priviewMain">
              <p className="clp">Card live preview</p>

              <Mobileprev
                selectedFields={selectedFields}
                borderStyle={borderStyle}
                checkboxStates={checkboxStates}
                setCheckboxStates={setCheckboxStates}
                formDatac={formDatac}
                setFormDatac={setFormDatac}
                // profileImagePreview={profileImagePreview}
                // setProfileImagePreview={setProfileImagePreview}
                profileImages={profileImages}
                coverPhoto={coverPhoto}
                onLogoChange={setLogo}
                logo={logo}
                watch={watchedData}
                showTbtn={showTbtn}
                showTranslateBtn={showTranslateBtn}
                layout={layout}
                setLayout={setLayout}
                handleColorChangee={handleColorChangee}
                colors={colors}
                setColors={setColors}
                handleLayoutChange={handleLayoutChange}

                // userDetails={userDetails}
                // setUserDetails={setUserDetails}
              />

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
