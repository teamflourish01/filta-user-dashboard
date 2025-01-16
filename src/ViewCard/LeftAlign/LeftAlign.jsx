import React, { useContext, useEffect, useRef, useState } from "react";
// import "../../MyCard/mobileprev/mobileprev.css";
import "./../../../src/Component/MyCard/mobileprev/mobileprev.css"
import "../LeftAlign/LeftAlign.css";
import Slider from "react-slick";
import "../CenterAlign/CenterAlign.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CiPlay1 } from "react-icons/ci";
import gallerypic from "./../../images/pgpic.svg"
import userContext from "../../context/userDetails";
import CustomNextArrow from "../CustomNextArrow/CustomNextArrow";
import CustomPrevArrow from "../CustomNextArrow/CustomPrevArrow";
import VoiceMessage from "../VoiceMessage/VoiceMessage";
import minstagram from "./../../images/minstagram.svg";
import mfacebook from "./../../images/mfacebook.svg";
import mlinkidin from "./../../images/mlinkidin.svg";
import mxtwitter from "./../../images/mxtwitter.svg";
import msnapchat from "./../../images/msnapchat.svg";
import mThreads from "./../../images/mThreads.svg";
import mpinterest from "./../../images/mpinterest.svg";
import mtelegram from "./../../images/mtelegram.svg";
import myoutube from "./../../images/myoutube.svg";
import mtext from "./../../images/mtext.svg";
import mcall from "./../../images/mcall.svg";
import memail from "./../../images/memail.svg";
import mcontact from "./../../images/mcontact.svg";
import mwhatsapp from "./../../images/mwhatsapp.svg";
import mlocation from "./../../images/mlocation.svg";
// import mgoogleplay from "../../../images/mgoogleplay.svg"
import mphonepay from "./../../images/mphonepay.svg";
import mpaytm from "./../../images/mpaytm.svg";
import mreview from "./../../images/mreview.svg";
import mgoogledrive from "./../../images/mgoogledrive.svg";
import flogo from "./../../images/filta.svg";
import { useForm } from "react-hook-form";
import axios from "axios";
import dummyprofile from "./../../images/digitalphoto.png";
import { Document, Page, pdfjs } from "react-pdf";
import defaultlogo from "./../../images/filta.png";
import ShareCardModal from "../../Component/ShareCardModal/ShareCardModal";





pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Mobileprev = ({
  selectedFields,
  borderStyle,
  setCheckboxStates,
  checkboxStates,
  profileImages,
  coverPhoto,
  logo,
  watch,
  showTbtn,
  formDatac,
  showTranslateBtn,
  colors,
  // setLayout,
  setColors,
  handleColorChangee,
  handleLayoutChange,
  // layout,
  // userDetails,
  // setUserDetails
}) => {
  const {
    userData,
    AuthorizationToken,
    getUserData,
    userDetails,
    getLoginEmail,
  } = useContext(userContext);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [layout, setLayout] = useState(null);


  // const [fontFmly, setFontfmly] = useState(
  //     userData?.card?.design?.font_style?.font_family
  //   );
  // Extract bold font from fontFamily array
  const fontFamily = userData?.card?.design?.font_style?.font_family;
  // Find the bold font in the font family array
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

  // console.log(mediumFont);

  const uri = process.env.REACT_APP_DEV_URL;
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);

  // const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   console.log(showTbtn, "showtbtn");
  //   setLayout(userData?.card?.design?.layout);
  // }, [userDetails]);
  useEffect(() => {
    if (userData?.card?.design?.layout) {
      setLayout(userData.card.design.layout);
    }
  }, [userData]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (audio) {
      if (audio.paused) {
        audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    }
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  const sliderSettingsDot = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  const galleryImages = [gallerypic, gallerypic];
  const handlePlay = (videoElement) => {
    videoElement.play();
    setIsPlaying(true);
  };

  // Map platform names to local icon paths
  const iconMap = {
    Email: memail,
    Call: mcall,
    Instagram: minstagram,
    Facebook: mfacebook,
    LinkedIn: mlinkidin,
    "X (Twitter)": mxtwitter,
    Snapchat: msnapchat,
    Threads: mThreads,
    Pinterest: mpinterest,
    Telegram: mtelegram,
    Youtube: myoutube,
    Text: mtext,
    Contact: mcontact,
    WhatsApp: mwhatsapp,
    Address: mlocation,
    // "Google Pay": mgooglepay,
    "Phone Pay": mphonepay,
    Paytm: mpaytm,
    Review: mreview,
    "Google Drive": mgoogledrive,
  };
  // Function to generate dynamic href links for various platforms
  const generateHref = (platform, url) => {
    switch (platform) {
      case "Email":
        return `mailto:${url}`;
      case "Call":
        return `tel:${url}`;
      case "WhatsApp":
        return `https://wa.me/${url}`; // WhatsApp phone link
      case "Telegram":
        return `https://t.me/${url}`; // Telegram username
      case "Address":
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          url
        )}`; // Google Maps for addresses
      // case "Google Pay":
      //   return `https://pay.google.com/gp/w/u/0/home/activity?p=${encodeURIComponent(url)}`;
      // // Google Pay URL link
      case "Phone Pay":
        return `https://www.phonepe.com/${url}`; // Assuming PhonePe has URL handling
      case "Paytm":
        return `https://paytm.com/${url}`; // Assuming Paytm has URL handling
      case "Review":
        return `https://www.google.com/search?q=${encodeURIComponent(
          url
        )}+reviews`; // Google Search for reviews
      case "Google Drive":
        return `https://drive.google.com/drive/u/0/folders/${url}`; // Google Drive folder link
      case "Instagram":
      case "Facebook":
      case "LinkedIn":
      case "X (Twitter)":
      case "Snapchat":
      case "Threads":
      case "Pinterest":
      case "Youtube":
        return url; // Direct URLs for standard platforms
      default:
        return url; // Fallback for unknown platforms
    }
  };

  //Contact-Form EmailApi

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${uri}/email/send-email`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthorizationToken,
        },
      });
      alert(`${response?.data?.message}`);
      getUserData();
      reset();
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getGridClass = (count) => {
    if (count === 1) return "one-item";
    if (count === 2) return "two-items";
    if (count === 3) return "three-items";
    return "two-items";
  };

  const cta = userData?.cta;
  // Function to handle the button click
  const handleButtonClick = () => {
    const cta = userData?.cta;

    // Handle based on btn_type
    if (cta?.btn_type === "Mail") {
      // Redirect to mail
      if (cta?.mail) {
        window.location.href = `mailto:${cta?.mail}`;
      } else {
        console.error("No email provided for Mail button type.");
      }
    } else if (cta?.btn_type === "Contact") {
      // Redirect to contact (mobile)
      if (cta?.mobile) {
        window.location.href = `tel:${cta?.mobile}`;
      } else {
        console.error("No mobile number provided for Contact button type.");
      }
    } else if (cta?.btn_type === "Visit") {
      // Open website URL
      if (cta?.url) {
        window.open(cta?.url, "_blank");
      } else {
        console.error("No URL provided for Visit button type.");
      }
    } else {
      console.error("Unknown button type.");
    }
  };

  const renderDivBasedOnData = () => {
    if (layout === "left") {
      // Render the left-aligned layout
      return (
        <div className="top-profile-container-left-align">
          <div
            className="top-inner-content-left-a"
            style={{
              background:
                // colors.prmColor ||
                userData?.card?.design?.card_color?.primary_color,
              border: `0.48px solid ${
                // colors.natClor ||
                userData?.card?.design?.card_color?.neutral_color
              }`,
            }}
          >
            {coverPhoto && (
              <img
                src={
                  coverPhoto
                    ? coverPhoto
                    : `${uri}/card/${userData?.card?.coverimg}`
                }
                alt="cover img"
              />
            )}
            {userData?.card?.coverimg && (
              <img
                src={`${uri}/card/${userData?.card?.coverimg}`}
                alt="cover img"
              />
            )}
          </div>
          <div
            className="hr-btw-top-bottom-l-a"
            style={{
              border: `0.48px solid ${
                // colors.natClor ||
                userData?.card?.design?.card_color?.neutral_color
              }`,
            }}
          ></div>
          <div
            className="bottom-inner-content-left-a"
            style={{
              background:
                // colors.prmColor ||
                userData?.card?.design?.card_color?.primary_color,
              border: `0.48px solid ${
                // colors.natClor ||
                userData?.card?.design?.card_color?.neutral_color
              }`,
            }}
          >
            <div className="info-user-left-card-padding">
              <p
                className="user-name-left-align-card"
                style={{
                  color:
                    // colors.prmTxtColor ||
                    userData?.card?.design?.font_style?.primary_text_color,
                  fontFamily: boldFont,
                }}
              >
                {/* {watch?.name || "Name"} */}
                {userData?.card?.name}
              </p>

              <p
                className="grey-bottom-txt"
                style={{
                  color:
                    // colors.secTxtColor ||
                    userData?.card?.design?.font_style?.secondary_text_color,
                  fontFamily: regularFont,
                }}
              >
                {/* {watch?.jobtitle || "Job Title"} */}
                {userData?.card?.jobtitle}
              </p>
              <p
                className="grey-bottom-txt"
                style={{
                  color:
                    // colors.secTxtColor ||
                    userData?.card?.design?.font_style?.secondary_text_color,
                  fontFamily: regularFont,
                }}
              >
                {/* {watch?.company || "Company"} */}
                {userData?.card?.company}
                
              </p>
              <p
                className="grey-bottom-txt"
                style={{
                  color:
                    // colors.secTxtColor ||
                    userData?.card?.design?.font_style?.secondary_text_color,
                  fontFamily: regularFont,
                }}
              >
                {/* {watch?.location || "Location"} */}
                {userData?.card?.location}
              </p>
            </div>
          </div>
          <div className="profile-pic-container-left-align">
            <div
              // className={`profile-pic-c-l-a ${
              //   borderStyle ? "square" : "circle"
              // }`}
              className={`profile-pic-c-l-a ${
                borderStyle ? "square" : "circle"
              }`}
            >
              {userData?.card?.profileimg ? (
                <img
                  style={{
                    border: `0.48px solid ${
                      // colors.natClor ||
                      userData?.card?.design?.card_color?.neutral_color
                    }`,
                  }}
                  src={
                    profileImages
                      ? profileImages
                      : `${uri}/card/${userData?.card?.profileimg}`
                  }
                  alt="Profile-img"
                />
              ) : (
                <img
                  style={{
                    border: `0.48px solid ${
                      // colors.natClor ||
                      userData?.card?.design?.card_color?.neutral_color
                    }`,
                  }}
                  src={profileImages ? profileImages : dummyprofile}
                  alt="Profile-img"
                />
              )}
            </div>
            <div className="logo-profile-c-l-a">
              {userData?.card?.logoimg ? (
                <img
                  className="mp-l-size-flourish"
                  src={logo ? logo : `${uri}/card/${userData?.card?.logoimg}`}
                  alt="logo img"
                />
              ) : (
                <img
                  className="mp-l-size-flourish"
                  src={logo ? logo : defaultlogo}
                  alt="logo img"
                />
              )}
            </div>
          </div>
        </div>
      );
    } else if (layout === "center") {
      // Render the center-aligned layout
      return (
        <div className="top-profile-container-left-align">
          <div
            className="top-inner-content-left-a"
            style={{
              background:
                // colors.prmColor ||
                userData?.card?.design?.card_color?.primary_color,
              border: `0.48px solid ${
                // colors.natClor ||
                userData?.card?.design?.card_color?.neutral_color
              }`,
            }}
          >
            {coverPhoto && (
              <img
                src={
                  coverPhoto
                    ? coverPhoto
                    : `${uri}/card/${userData?.card?.coverimg}`
                }
                alt="cover img"
              />
            )}
            {userData?.card?.coverimg && (
              <img
                src={`${uri}/card/${userData?.card?.coverimg}`}
                alt="cover img"
              />
            )}
          </div>
          <div
            className="hr-btw-top-bottom-l-a"
            style={{
              border: `0.48px solid ${
                // colors.natClor ||
                userData?.card?.design?.card_color?.neutral_color
              }`,
            }}
          ></div>
          <div
            className="bottom-inner-content-left-a-center"
            style={{
              background:
                // colors.prmColor ||
                userData?.card?.design?.card_color?.primary_color,
              border: `0.48px solid ${
                // colors.natClor ||
                userData?.card?.design?.card_color?.neutral_color
              }`,
            }}
          >
            <div className="info-user-left-card-padding-center">
              <div
                className="user-name-left-align-card"
                style={{
                  color:
                    // colors.prmTxtColor ||
                    userData?.card?.design?.font_style?.primary_text_color,
                  fontFamily: boldFont,
                }}
              >
                {/* {watch?.name || "Name"} */}
                {userData?.card?.name}
              </div>
              <div
                className="grey-bottom-txt"
                style={{
                  color:
                    // colors.secTxtColor ||
                    userData?.card?.design?.font_style?.secondary_text_color,
                  fontFamily: regularFont,
                }}
              >
                {/* {watch?.jobtitle || "Job Title"} */}
                {userData?.card?.jobtitle}
              </div>
              <div
                className="grey-bottom-txt "
                style={{
                  color:
                    // colors.secTxtColor ||
                    userData?.card?.design?.font_style?.secondary_text_color,

                  textAlign: "center",
                  fontFamily: regularFont,
                }}
              >
                {/* {watch?.company || "Company"} */}
                {userData?.card?.company}
              </div>
              <div
                className="grey-bottom-txt"
                style={{
                  color:
                    // colors.secTxtColor ||
                    userData?.card?.design?.font_style?.secondary_text_color,
                  fontFamily: regularFont,
                }}
              >
                {/* {watch?.location || "Location"} */}
                {userData?.card?.location}
              </div>
            </div>
          </div>
          <div className="profile-pic-container-left-align">
            <div
              className={`profile-pic-c-l-a-center ${
                borderStyle ? "square" : "circle"
              }`}
            >
              {userData?.card?.profileimg ? (
                <img
                  style={{
                    border: `0.48px solid ${userData?.card?.design?.card_color?.neutral_color}`,
                  }}
                  src={
                    profileImages
                      ? profileImages
                      : `${uri}/card/${userData?.card?.profileimg}`
                  }
                  alt="Profile-img"
                />
              ) : (
                <img
                  style={{
                    border: `0.48px solid ${userData?.card?.design?.card_color?.neutral_color}`,
                  }}
                  src={profileImages ? profileImages : dummyprofile}
                  alt="Profile-img"
                />
              )}
            </div>
            <div className="logo-profile-c-l-a-center">
              {userData?.card?.logoimg ? (
                <img
                  className="l-size-flourish"
                  src={logo ? logo : `${uri}/card/${userData?.card?.logoimg}`}
                  alt="logo img"
                />
              ) : (
                <img
                  className="l-size-flourish"
                  src={logo ? logo : defaultlogo}
                  alt="logo img"
                />
              )}
            </div>
          </div>
        </div>
      );
    } else if (layout === "portrait") {
      // Render the portrait layout
      return (
        <div className="top-profile-container-left-align">
          <div className="portrait-profile-pic-box">
            <img
              src={
                profileImages
                  ? profileImages
                  : `${uri}/card/${userData?.card?.profileimg}`
              }
              alt=""
              className="portrait-pp"
            />
          </div>
          <div className="profile-pic-container-left-align">
            <div className="logo-profile-c-l-a-portrait">
              <img
                src={logo ? logo : defaultlogo}
                alt="logo img"
                className="l-size-flourish"
              />
            </div>
          </div>
          <div
            className="info-user-left-card-padding-portrait"
            style={
              {
                // background: userData?.card?.design?.card_color?.primary_color,
                // border: `0.48px solid ${colors.natClor || userData?.card?.design?.card_color?.neutral_color}`,
              }
            }
          >
            <div
              className="user-name-left-align-card"
              style={{
                color:
                  // colors.prmTxtColor ||
                  userData?.card?.design?.font_style?.primary_text_color,
                fontFamily: boldFont,
              }}
            >
              {/* {watch?.name || "Name"} */}
              {userData?.card?.name}
            </div>
            <div
              className="grey-bottom-txt"
              style={{
                color:
                  // colors.secTxtColor ||
                  userData?.card?.design?.font_style?.secondary_text_color,
                fontFamily: regularFont,
              }}
            >
              {/* {watch?.jobtitle || "Job Title"} */}
              {userData?.card?.jobtitle}
            </div>
            <div
              className="grey-bottom-txt"
              style={{
                color:
                  // colors.secTxtColor ||
                  userData?.card?.design?.font_style?.secondary_text_color,
                fontFamily: regularFont,
              }}
            >
              {/* {watch?.company || "Company"} */}
              {userData?.card?.company}
            </div>
            <div
              className="grey-bottom-txt"
              style={{
                color:
                  // colors.secTxtColor ||
                  userData?.card?.design?.font_style?.secondary_text_color,
                fontFamily: regularFont,
              }}
            >
              {/* {watch?.location || "Location"} */}
              {userData?.card?.location}
            </div>
          </div>
        </div>
      );
    } else {
      // Default layout or fallback
      return (
        <div className="top-profile-container-default">
          <p>No layout data available.</p>
        </div>
      );
    }
  };
  
  const handleShareButtonClick = () => {
    setIsShareModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsShareModalOpen(false);
  };
  return (
    <>
      <div className="left-align-main-div">
        {/* Show live card preview */}
        {/* <div className="mobile-modifi"> */}
          <div
            className="padding-whole-10-l-a"
            style={{
              background:
                // colors.flatColor ||
                userData?.card?.design?.card_background?.flat_color,
              backgroundImage: `linear-gradient(${
                // colors.grdColor ||
                userData?.card?.design?.card_background?.gradient_color1
              }, ${
                // colors.grdSecColor ||
                userData?.card?.design?.card_background?.gradient_color2
              })`,
            }}
          >
            {/* top profile section start */}

            <div className="profile-container">{renderDivBasedOnData()}</div>

            {/* second clickable link section start */}
            {userData?.socialLinks.length > 0 && (
              <div
                className="grey-box-bg-left-align"
                style={{
                  background:
                    // colors.prmColor ||
                    userData?.card?.design?.card_color?.primary_color,
                  border: `0.48px solid ${
                    // colors.natClor ||
                    userData?.card?.design?.card_color?.neutral_color
                  }`,
                }}
              >
                <div className="clickable-link-section">
                  <div
                    className="sections-title"
                    style={{
                      color:
                        // colors.prmTxtColor ||
                        userData?.card?.design?.font_style?.primary_text_color,

                      textAlign:
                        userData?.card?.design?.layout === "center"
                          ? "center"
                          : "left", // Dynamically set text alignment
                      fontFamily: boldFont,
                    }}
                  >
                    Clickable Links
                  </div>
                  <div className="social-icon-c-c-l">
                    {userData?.socialLinks?.map((link) => (
                      <div className="icon-container-box" key={link._id}>
                        <div className="a-tag">
                          {/* Dynamic icon rendering */}
                          <a
                            className=" padding-icon-container-box"
                            href={generateHref(link.platform, link.url)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <div
                              className="under-icon-img"
                              style={{
                                background:
                                  // colors.secdClor ||
                                  userData?.card?.design?.card_color
                                    ?.secondary_color,
                              }}
                            >
                              <img
                                src={
                                  iconMap[link.platform] ||
                                  "https://via.placeholder.com/50"
                                } // Placeholder for unknown platforms
                                alt={link.platform}
                              />
                            </div>
                          </a>
                          {/* Clickable platform name */}
                          <a
                            href={generateHref(link.platform, link.url)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="icon-name-c-l"
                            style={{
                              color:
                                // colors.secTxtColor ||
                                userData?.card?.design?.font_style
                                  ?.secondary_text_color,
                              fontFamily: regularFont,
                            }}
                          >
                            {link.text}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* third multimedia section start */}
            {userData?.multimedia[0]?.video_file?.length > 0 &&
              userData?.multimedia[0]?.youtube_url.length > 0 && (
                <div
                  className="grey-box-bg-left-align"
                  style={{
                    background:
                      // colors.prmColor ||
                      userData?.card?.design?.card_color?.primary_color,
                    border: `0.48px solid ${
                      // colors.natClor ||
                      userData?.card?.design?.card_color?.neutral_color
                    }`,
                  }}
                >
                  <div className="multimedia-section">
                    <div
                      className="sections-title p-10-side-l-a"
                      style={{
                        color:
                          // colors.prmTxtColor ||
                          userData?.card?.design?.font_style
                            ?.primary_text_color,

                        textAlign:
                          userData?.card?.design?.layout === "center"
                            ? "center"
                            : "left", // Dynamically set text alignment
                        fontFamily: boldFont,
                      }}
                    >
                      Multimedia
                    </div>
                    {userData?.multimedia[0]?.video_file?.length === 1 ? (
                      // Display single video
                      <div className="single-video">
                        <video controls className="fullscreen-video">
                          <source
                            src={`${uri}/multimedia/${userData?.multimedia[0]?.video_file[0]}`}
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    ) : (
                      // Display slider for multiple videos
                      <div className="video-container">
                        <Slider {...sliderSettings}>
                          {userData?.multimedia[0]?.video_file.map((video) => (
                            <div className="video-slide">
                              <video
                                src={`${uri}/multimedia/${video}`}
                                controls={isPlaying}
                                onClick={(e) => handlePlay(e.target)}
                              ></video>

                              {!isPlaying && (
                                <div
                                  className="play-button-overlay"
                                  onClick={(e) =>
                                    handlePlay(e.target.previousSibling)
                                  }
                                >
                                  <CiPlay1 />
                                </div>
                              )}
                            </div>
                          ))}
                        </Slider>
                      </div>
                    )}

                    {userData?.multimedia[0]?.youtube_url.length > 0 &&
                      userData?.multimedia[0]?.video_file.length > 0 && (
                        <>
                          <hr
                            className="hr-line-left-align-card"
                            style={{
                              border: `0.48px solid ${
                                // colors.natClor ||
                                userData?.card?.design?.card_color
                                  ?.neutral_color
                              }`,
                            }}
                          />
                        </>
                      )}

                    {userData?.multimedia[0]?.youtube_url.length > 0 && (
                      <>
                        <div
                          className="youtube-video-title"
                          style={{
                            color:
                              // colors.prmTxtColor ||
                              userData?.card?.design?.font_style
                                ?.primary_text_color,
                            textAlign: layout === "center" ? "center" : "left", // Dynamically set text alignment
                            fontFamily: mediumFont,
                          }}
                        >
                          YouTube Video
                        </div>

                        {userData?.multimedia[0]?.youtube_url.length === 1 ? (
                          // Display single video
                          <div className="single-video">
                            
                            <iframe
                              className="fullscreen-video v-h"
                              src={userData?.multimedia[0]?.youtube_url[0]}
                              // src="https://www.youtube.com/watch?v=fWCxWHsczWg"
                              frameBorder="0"
                            ></iframe>
                          </div>
                        ) : (
                          // Display slider for multiple videos
                          <div className="video-container">
                            <Slider {...sliderSettings}>
                              {userData?.multimedia[0]?.youtube_url.map(
                                (youtubeVideos, index) => (
                                  <div
                                    key={index}
                                    className="video-slide-youtube"
                                  >
                                    <iframe
                                      src={youtubeVideos}
                                      frameBorder="0"
                                      className="v-h"
                                    ></iframe>
                                  </div>
                                )
                              )}
                            </Slider>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}

            {/* fourth section contact form start */}
            {(userDetails?.data[0]?.loginemail || formDatac?.loginemail) && (
              <div
                className="grey-box-bg-left-align"
                style={{
                  background:
                    // colors.prmColor ||
                    userData?.card?.design?.card_color?.primary_color,
                  border: `0.48px solid ${
                    // colors.natClor ||
                    userData?.card?.design?.card_color?.neutral_color
                  }`,
                }}
              >
                <div className="contact-form-left-align">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div
                      className="sections-title"
                      style={{
                        color:
                          // colors.prmTxtColor ||
                          userData?.card?.design?.font_style
                            ?.primary_text_color,
                        textAlign: layout === "center" ? "center" : "left", // Dynamically set text alignment
                        fontFamily: boldFont,
                      }}
                    >
                      Contact Form
                    </div>
                    <div className="input-container-c-f">
                      {checkboxStates?.name && (
                        <div className="input-field-contact-form-leftalign">
                          <input
                            type="text"
                            placeholder="Name"
                            className="input-field-single"
                            {...register("name")}
                            style={{
                              color:
                                // colors.secTxtColor ||
                                userData?.card?.design?.font_style
                                  ?.secondary_text_color,
                              "--placeholder-color":
                                // colors.secTxtColor ||
                                userData?.card?.design?.font_style
                                  ?.secondary_text_color,
                              border: `0.48px solid ${
                                // colors.natClor ||
                                userData?.card?.design?.card_color
                                  ?.neutral_color
                              }`,
                            }}
                          />
                        </div>
                      )}

                      <div className="input-field-contact-form-leftalign">
                        <input
                          type="text"
                          placeholder="Email"
                          className="input-field-single"
                          {...register("email", {
                            required: "Email is required",
                          })}
                          style={{
                            color:
                              // colors.secTxtColor ||
                              userData?.card?.design?.font_style
                                ?.secondary_text_color,
                            "--placeholder-color":
                              // colors.secTxtColor ||
                              userData?.card?.design?.font_style
                                ?.secondary_text_color,
                            border: `0.48px solid ${
                              // colors.natClor ||
                              userData?.card?.design?.card_color?.neutral_color
                            }`,
                          }}
                        />
                      </div>

                      {checkboxStates?.number && (
                        <div className="input-field-contact-form-leftalign">
                          <input
                            type="text"
                            placeholder="Mobile Number"
                            className="input-field-single"
                            {...register("number")}
                            style={{
                              color:
                                colors.secTxtColor ||
                                userData?.card?.design?.font_style
                                  ?.secondary_text_color,
                              "--placeholder-color":
                                // colors.secTxtColor ||
                                userData?.card?.design?.font_style
                                  ?.secondary_text_color,
                              border: `0.48px solid ${
                                // colors.natClor ||
                                userData?.card?.design?.card_color
                                  ?.neutral_color
                              }`,
                            }}
                          />
                        </div>
                      )}
                      {checkboxStates?.message && (
                        <div className="input-field-contact-form-leftalign">
                          <textarea
                            type="text"
                            placeholder="Message"
                            className="input-field-single textarea-class"
                            {...register("message")}
                            style={{
                              color:
                                // colors.secTxtColor ||
                                userData?.card?.design?.font_style
                                  ?.secondary_text_color,
                              "--placeholder-color":
                                // colors.secTxtColor ||
                                userData?.card?.design?.font_style
                                  ?.secondary_text_color,
                              border: `0.48px solid ${
                                // colors.natClor ||
                                userData?.card?.design?.card_color
                                  ?.neutral_color
                              }`,
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="btn-white-submit-leftalign"
                      style={{
                        background:
                          // colors.secdClor ||
                          userData?.card?.design?.card_color?.secondary_color,

                        color:
                          // colors.prmTxtColor ||
                          userData?.card?.design?.font_style
                            ?.primary_text_color,
                        fontFamily: semiboldFont,
                      }}
                    >
                      <span
                        className="btn-text-leftalign"
                        style={{ fontFamily: semiboldFont }}
                      >
                        {loading ? "Loading..." : "Submit"}
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            )}
            

            {/* fifth section voice message start */}
            {userData?.voiceMessage?.length > 0 && (
              <div
                className="grey-box-bg-left-align"
                style={{
                  background:
                    // colors.prmColor ||
                    userData?.card?.design?.card_color?.primary_color,
                  border: `0.48px solid ${
                    // colors.natClor ||
                    userData?.card?.design?.card_color?.neutral_color
                  }`,
                }}
              >
                <div className="voice-msg-box-l-a">
                  <div
                    className="sections-title"
                    style={{
                      color:
                        // colors.prmTxtColor ||
                        userData?.card?.design?.font_style?.primary_text_color,
                      textAlign: layout === "center" ? "center" : "left", // Dynamically set text alignment
                      fontFamily: boldFont,
                    }}
                  >
                    Voice Message
                  </div>
                  <div className="audio-container" onClick={togglePlayback}>
                    <VoiceMessage />
                  </div>
                </div>
              </div>
            )}

            {/* sixeth section about start */}
            {userData?.about?.title && userData?.about?.description && (
              <div
                className="grey-box-bg-left-align"
                style={{
                  background:
                    // colors.prmColor ||
                    userData?.card?.design?.card_color?.primary_color,
                  border: `0.48px solid ${
                    // colors.natClor ||
                    userData?.card?.design?.card_color?.neutral_color
                  }`,
                }}
              >
                <div className="about-section">
                  <div
                    className="sections-title"
                    style={{
                      color:
                        // colors.prmTxtColor ||
                        userData?.card?.design?.font_style?.primary_text_color,
                      textAlign: layout === "center" ? "center" : "left", // Dynamically set text alignment
                      fontFamily: boldFont,
                    }}
                  >
                    About
                  </div>
                  <div
                    className="ui-ux-text"
                    style={{
                      color:
                        // colors.prmTxtColor ||
                        userData?.card?.design?.font_style?.primary_text_color,
                      fontFamily: mediumFont,
                    }}
                  >
                    {userData?.about?.title}
                  </div>
                  <div
                    className="about-description"
                    style={{
                      color:
                        // colors.secTxtColor ||
                        userData?.card?.design?.font_style
                          ?.secondary_text_color,
                      fontFamily: regularFont,
                    }}
                  >
                    {userData?.about?.description}
                  </div>
                </div>
              </div>
            )}

            {/* seventh section document start */}
            {userData?.documents.length > 0 && (
              <div
                className="grey-box-bg-left-align"
                style={{
                  background:
                    // colors.prmColor ||
                    userData?.card?.design?.card_color?.primary_color,
                  border: `0.48px solid ${
                    // colors.natClor ||
                    userData?.card?.design?.card_color?.neutral_color
                  }`,
                }}
              >
                <div className="document-section-box-l-a">
                  <div
                    className="sections-title"
                    style={{
                      color:
                        // colors.prmTxtColor ||
                        userData?.card?.design?.font_style?.primary_text_color,
                      textAlign: layout === "center" ? "center" : "left", // Dynamically set text alignment
                      fontFamily: boldFont,
                    }}
                  >
                    Document
                  </div>
                  {userData?.documents?.length > 1 ? (
                    <Slider {...sliderSettings}>
                      {userData?.documents?.map((pdf) => (
                        <Document
                          file={`${uri}/documents/${pdf.document}`}
                          onLoadError={(error) =>
                            console.error("PDF Load Error:", error)
                          }
                          width={248}
                          // height={238.53}
                        >
                          <a
                            href={`${uri}/documents/${pdf.document}`}
                            target="_blank"
                          >
                            <Page
                              pageNumber={1}
                              renderTextLayer={false}
                              renderAnnotationLayer={false}
                              width={248}
                              // height={238.53}
                            />
                          </a>
                        </Document>
                      ))}
                    </Slider>
                  ) : (
                    <div className="img-container-document-l-a ">
                      <Document
                        file={`${uri}/documents/${userData?.documents[0]?.document}`}
                        onLoadError={(error) =>
                          console.error("PDF Load Error:", error)
                        }
                        width={248}
                        // height={238.53}
                      >
                        <a
                          href={`${uri}/documents/${userData?.documents[0]?.document}`}
                          target="_blank"
                        >
                          <Page
                            pageNumber={1}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            width={248}
                            // height={238.53}
                          />
                        </a>
                      </Document>
                    </div>
                  )}
                  <p
                    className="d-l-a-name"
                    style={{
                      color:
                        // colors.secTxtColor ||
                        userData?.card?.design?.font_style
                          ?.secondary_text_color,
                      fontFamily: regularFont,
                    }}
                  >
                    Flourish Profile
                  </p>
                </div>
              </div>
            )}

            {/* eight section team member details start */}
            {/* {userData?.teamMember?.name.length > 0 && ( */}
            {userData?.teamMember?.name?.filter(
              (item) => item.trim().length > 0
            ).length > 0 && (
              <div
                className="grey-box-bg-left-align"
                style={{
                  background:
                    // colors.prmColor ||
                    userData?.card?.design?.card_color?.primary_color,
                  border: `0.48px solid ${
                    // colors.natClor ||
                    userData?.card?.design?.card_color?.neutral_color
                  }`,
                }}
              >
                <div className="team-member-details-box-l-a">
                  <div
                    className="sections-title"
                    style={{
                      color:
                        // colors.prmTxtColor ||
                        userData?.card?.design?.font_style?.primary_text_color,
                      textAlign: layout === "center" ? "center" : "left", // Dynamically set text alignment
                      fontFamily: boldFont,
                    }}
                  >
                    Team Member Details{" "}
                  </div>
                  {userData?.teamMember?.name?.map((teamMember, index) => (
                    <>
                      <div
                        className="details-t-m-d-l-a-grey"
                        style={{
                          color:
                            // colors.secTxtColor ||
                            userData?.card?.design?.font_style
                              ?.secondary_text_color,
                          fontFamily: regularFont,
                        }}
                      >
                        Name :{" "}
                        <span
                          className="details-info-n"
                          style={{
                            color:
                              // colors.secTxtColor ||
                              userData?.card?.design?.font_style
                                ?.secondary_text_color,
                          }}
                        >
                          {teamMember}
                        </span>
                      </div>
                      <div
                        className="details-t-m-d-l-a-grey p-9-d-b"
                        style={{
                          color:
                            // colors.secTxtColor ||
                            userData?.card?.design?.font_style
                              ?.secondary_text_color,
                          fontFamily: regularFont,
                        }}
                      >
                        Designation :{" "}
                        <span
                          className="details-info-n "
                          style={{
                            color:
                              // colors.secTxtColor ||
                              userData?.card?.design?.font_style
                                ?.secondary_text_color,
                          }}
                        >
                          {userData?.teamMember?.job_title[index]}
                        </span>
                      </div>
                      <div
                        className="details-t-m-d-l-a-grey p-15-d-b"
                        style={{
                          color:
                            // colors.secTxtColor ||
                            userData?.card?.design?.font_style
                              ?.secondary_text_color,
                          fontFamily: regularFont,
                        }}
                      >
                        Number :{" "}
                        <span
                          className="details-info-n"
                          style={{
                            color:
                              // colors.secTxtColor ||
                              userData?.card?.design?.font_style
                                ?.secondary_text_color,
                          }}
                        >
                          {userData?.teamMember?.number[index]}
                        </span>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            )}

            {/* nine section address start */}
            {userData?.address?.title && userData?.address?.address && (
              <div
                className="grey-box-bg-left-align"
                style={{
                  background:
                    // colors.prmColor ||
                    userData?.card?.design?.card_color?.primary_color,
                  border: `0.48px solid ${
                    // colors.natClor ||
                    userData?.card?.design?.card_color?.neutral_color
                  }`,
                }}
              >
                <div className="address-section-box-l-a">
                  <div
                    className="sections-title"
                    style={{
                      color:
                        // colors.prmTxtColor ||
                        userData?.card?.design?.font_style?.primary_text_color,
                      textAlign: layout === "center" ? "center" : "left", // Dynamically set text alignment
                      fontFamily: boldFont,
                    }}
                  >
                    Address
                  </div>
                  <p
                    className="title-add"
                    style={{
                      color:
                        // colors.prmTxtColor ||
                        userData?.card?.design?.font_style?.primary_text_color,
                      fontFamily: mediumFont,
                    }}
                  >
                    {userData?.address?.title}
                  </p>
                  <p
                    className="address-lines-l-a"
                    style={{
                      color:
                        // colors.secTxtColor ||
                        userData?.card?.design?.font_style
                          ?.secondary_text_color,
                      fontFamily: regularFont,
                    }}
                  >
                    {userData?.address?.address}
                  </p>
                </div>
              </div>
            )}

            {/* ten section time sensitive offer start */}
            {userData?.timeoffer[0]?.image?.length > 0 && (
              <div
                className="grey-box-bg-left-align"
                style={{
                  background:
                    // colors.prmColor ||
                    userData?.card?.design?.card_color?.primary_color,
                  border: `0.48px solid ${
                    // colors.natClor ||
                    userData?.card?.design?.card_color?.neutral_color
                  }`,
                }}
              >
                <div className="time-sensitive-offer-section-l-a">
                  <div
                    className="sections-title"
                    style={{
                      color:
                        // colors.prmTxtColor ||
                        userData?.card?.design?.font_style?.primary_text_color,
                      textAlign: layout === "center" ? "center" : "left", // Dynamically set text alignment
                      fontFamily: boldFont,
                    }}
                  >
                    Time sensitive offer
                  </div>

                  {userData?.timeoffer[0]?.image?.length > 1 ? (
                    <Slider {...sliderSettingsDot}>
                      {userData?.timeoffer[0]?.image?.map((img, index) => (
                        <div className="img-offer-content" key={index}>
                          <img
                            src={`${uri}/timesoffer/${img}`}
                            alt=""
                            className="img-r-curve-l-a"
                          />
                        </div>
                      ))}
                    </Slider>
                  ) : (
                    <div className="img-offer-content">
                      <img
                        src={`${uri}/timesoffer/${userData?.timeoffer[0]?.image[0]}`}
                        alt=""
                        className="img-r-curve-l-a"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* eleven section social proof start */}
            {/* {userData?.socialProof?.text?.length > 0 && ( */}
            {userData?.socialProof?.text?.filter(
              (item) => item.trim().length > 0
            ).length > 0 && (
              <div
                className="grey-box-bg-left-align"
                style={{
                  background:
                    // colors.prmColor ||
                    userData?.card?.design?.card_color?.primary_color,
                  border: `0.48px solid ${
                    // colors.natClor ||
                    userData?.card?.design?.card_color?.neutral_color
                  }`,
                }}
              >
                <div className="social-proof-section-l-a">
                  <div
                    className="sections-title"
                    style={{
                      color:
                        // colors.prmTxtColor ||
                        userData?.card?.design?.font_style?.primary_text_color,
                      textAlign: layout === "center" ? "center" : "left", // Dynamically set text alignment
                      fontFamily: boldFont,
                    }}
                  >
                    Social Proof
                  </div>
                  <div
                    className={`w-card-s-p-l-a ${getGridClass(
                      userData?.socialProof?.text?.length
                    )}`}
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        userData?.socialProof?.text?.length === 1
                          ? "1fr"
                          : "1fr 1fr",
                      gap: "16px",
                    }}
                  >
                    {userData?.socialProof?.text?.map((item, index) => (
                      <div
                        key={index}
                        className="white-clr-cards-l-a"
                        style={{
                          gridColumn:
                            userData?.socialProof?.text?.length % 2 !== 0 &&
                            index === userData?.socialProof?.text?.length - 1
                              ? "span 2"
                              : "auto",
                        }}
                      >
                        <div
                          className="counts--s-l"
                          style={{
                            color:
                              // colors.prmTxtColor ||
                              userData?.card?.design?.font_style
                                ?.primary_text_color,
                            fontFamily: semiboldFont,
                          }}
                        >
                          {userData.socialProof?.digit[index]}+
                        </div>
                        <div
                          className="s-l-title-name"
                          style={{
                            color:
                              // colors.secTxtColor ||
                              userData?.card?.design?.font_style
                                ?.secondary_text_color,
                            fontFamily: regularFont,
                          }}
                        >
                          {item}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* twelve section photos start */}
            {userData?.photos[0]?.image?.length > 0 && (
              <div
                className="grey-box-bg-left-align"
                style={{
                  background:
                    // colors.prmColor ||
                    userData?.card?.design?.card_color?.primary_color,
                  border: `0.48px solid ${
                    // colors.natClor ||
                    userData?.card?.design?.card_color?.neutral_color
                  }`,
                }}
              >
                <div className="photos-section-l-a">
                  <div
                    className="sections-title"
                    style={{
                      color:
                        // colors.prmTxtColor ||
                        userData?.card?.design?.font_style?.primary_text_color,
                      textAlign: layout === "center" ? "center" : "left", // Dynamically set text alignment
                      fontFamily: boldFont,
                    }}
                  >
                    Photos
                  </div>

                  {userData?.photos[0]?.image?.length > 1 ? (
                    <Slider {...sliderSettingsDot}>
                      {userData?.photos[0]?.image?.map((img, index) => (
                        <div className="img-offer-content" key={index}>
                          <img
                            src={`${uri}/photo/${img}`}
                            alt=""
                            className="img-r-curve-l-a"
                          />
                        </div>
                      ))}
                    </Slider>
                  ) : (
                    <div className="img-offer-content">
                      <img
                        src={`${uri}/photo/${userData?.photos[0]?.image[0]}`}
                        alt=""
                        className="img-r-curve-l-a"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* thirteen section product gallery start */}
            {userData?.productGallary?.length > 0 && (
              <div
                className="grey-box-bg-left-align"
                style={{
                  background:
                    // colors.prmColor ||
                    userData?.card?.design?.card_color?.primary_color,
                  border: `0.48px solid ${
                    // colors.natClor ||
                    userData?.card?.design?.card_color?.neutral_color
                  }`,
                }}
              >
                <div className="product-gallery-box-l-a">
                  <div
                    className="sections-title"
                    style={{
                      color:
                        // colors.prmTxtColor ||
                        userData?.card?.design?.font_style?.primary_text_color,
                      textAlign: layout === "center" ? "center" : "left", // Dynamically set text alignment
                      fontFamily: boldFont,
                    }}
                  >
                    Product gallery
                  </div>
                  {/* {galleryImages?.length > 1 ? ( */}
                  {userData?.productGallary?.length > 1 ? (
                    <Slider {...sliderSettings}>
                      {userData?.productGallary?.map((pdetail, index) => (
                        <>
                          <div className="img-offer-content" key={index}>
                            <img
                              src={`${uri}/photogallery/${pdetail?.image}`}
                              alt=""
                              className="img-r-curve-l-a"
                            />
                          </div>
                          <p
                            className="pic-title-p-g"
                            style={{ fontFamily: mediumFont }}
                          >
                            {pdetail.title}
                          </p>
                          <p
                            className="pic-desc-p-g"
                            style={{ fontFamily: regularFont }}
                          >
                            {pdetail.description}
                          </p>

                          <p className="price-p-g" style={{fontFamily:mediumFont}}>

                            Price : {pdetail.price}
                          </p>
                          <button
                            type="submit"
                            className="btn-white-submit-leftalign"
                            style={{
                              background:
                                // colors.secdClor ||
                                userData?.card?.design?.card_color
                                  ?.secondary_color,
                            }}
                          >
                            <span
                              className="btn-text-leftalign"
                              style={{ fontFamily: semiboldFont }}
                            >
                              Submit
                            </span>
                          </button>
                        </>
                      ))}
                    </Slider>
                  ) : (
                    <>
                      <div className="img-offer-content">
                        <img
                          src={`${uri}/photogallery/${userData?.productGallary[0]?.image}`}
                          alt=""
                          className="img-r-curve-l-a"
                        />
                      </div>
                      <p
                        className="pic-title-p-g"
                        style={{
                          color:
                            // colors.prmTxtColor ||
                            userData?.card?.design?.font_style
                              ?.primary_text_color,
                              fontFamily:mediumFont
                              
                        }}
                      >
                        {userData?.productGallary[0]?.title}
                      </p>
                      <p
                        className="pic-desc-p-g"
                        style={{
                          color:
                            // colors.secTxtColor ||
                            userData?.card?.design?.font_style
                              ?.secondary_text_color,
                              fontFamily:regularFont
                        }}
                      >
                        {userData?.productGallary[0]?.description}
                      </p>
                      <p
                        className="price-p-g"
                        style={{
                          color:
                            // colors.prmTxtColor ||
                            userData?.card?.design?.font_style
                              ?.primary_text_color,
                              fontFamily:mediumFont
                        }}
                      >
                        Price : {userData?.productGallary[0]?.price}
                      </p>
                      <a
                        href={userData?.productGallary[0]?.button_link || "#"} // Dynamically set href, fallback to '#' if no link
                        target="_blank" // Optional: Opens link in a new tab
                        rel="noopener noreferrer"
                      >
                        <button
                          type="submit"
                          className="btn-white-submit-leftalign"
                          style={{
                            background:
                              // colors.secdClor ||
                              userData?.card?.design?.card_color
                                ?.secondary_color,
                            cursor: "pointer",
                          }}
                        >
                          <span
                            className="btn-text-leftalign"
                            style={{
                              color:
                                // colors.prmTxtColor ||
                                userData?.card?.design?.font_style
                                  ?.primary_text_color,
                                  fontFamily:semiboldFont
                            }}
                          >
                            {" "}
                            {userData?.productGallary[0]?.button_type}
                          </span>
                        </button>
                      </a>
                    </>
                  )}

                  {/* <p className="pic-title-p-g">New York</p>
                <p className="pic-desc-p-g">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                </p>
                <p className="price-p-g">Price : 500</p>
                <button
                  type="submit"
                  className="btn-white-submit-leftalign"
                  style={{
                    background:
                      userData?.card?.design?.card_color?.secondary_color,
                    color:
                      colors.prmTxtColor || userData?.card?.design?.font_style?.primary_text_color,
                  }}
                >
                  <span className="btn-text-leftalign">Submit</span>
                </button> */}
                </div>
              </div>
            )}

            {/* fourteen section two btn add start */}
            {(cta?.btn_text || showTranslateBtn) && (
              <div
                className="grey-box-bg-left-align"
                style={{
                  background:
                    // colors.prmColor ||
                    userData?.card?.design?.card_color?.primary_color,
                  border: `0.48px solid ${
                    // colors.natClor ||
                    userData?.card?.design?.card_color?.neutral_color
                  }`,
                }}
              >
                <div className="btn-visit-translate-flex">
                  {cta?.btn_type && cta?.btn_text != "" && (
                    <button
                      className="btn-visit-translate"
                      style={{
                        background:
                          // colors.secdClor ||
                          userData?.card?.design?.card_color?.secondary_color,

                        color:
                          // colors.prmTxtColor ||
                          userData?.card?.design?.font_style
                            ?.primary_text_color,
                        cursor: "pointer",
                      }}
                      onClick={handleButtonClick}
                    >
                      <span
                        className="btn-visit-txt"
                        style={{ fontFamily: semiboldFont }}
                      >
                        {cta?.btn_text}
                      </span>
                    </button>
                  )}

                  {showTranslateBtn && (
                    <button
                      className="btn-visit-translate"
                      style={{
                        background:
                          // colors.secdClor ||
                          userData?.card?.design?.card_color?.secondary_color,

                        color:
                          // colors.prmTxtColor ||
                          userData?.card?.design?.font_style
                            ?.primary_text_color,
                        cursor: "pointer",
                      }}
                    >
                      <span
                        className="btn-visit-txt"
                        style={{ fontFamily: semiboldFont }}
                      >
                        Translate
                      </span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* fifteen section copiright start */}
            <div
              className="grey-box-bg-left-align"
              style={{
                background:
                  // colors.prmColor ||
                  userData?.card?.design?.card_color?.primary_color,
                border: `0.48px solid ${
                  // colors.natClor ||
                  userData?.card?.design?.card_color?.neutral_color
                }`,
              }}
            >
              <div className="copy-flex">
                <p
                  className="copy-txt"
                  style={{
                    color:
                      // colors.secTxtColor ||
                      userData?.card?.design?.font_style?.secondary_text_color,
                    fontFamily: regularFont,
                  }}
                >
                  © 2025 ajay gadhavi. All Rights Reserved.
                </p>
                <p
                  className="created-from-txt"
                  style={{
                    color:
                      // colors.prmTxtColor ||
                      userData?.card?.design?.font_style?.primary_text_color,
                    fontFamily: mediumFont,
                  }}
                >
                  Created From : <img src={flogo} alt="" />
                </p>
              </div>
            </div>

          </div>
        {/* </div> */}

        <div
          className="grey-bottom-container"
          style={{
            background:
              // colors.prmColor ||
              userData?.card?.design?.card_color?.primary_color,
            borderTop: `0.48px solid ${
              // colors.natClor ||
              userData?.card?.design?.card_color?.neutral_color
            }`,
          }}
        >
          <div className="grey-bottom-btn-container">
            <button
              className="btn-bottom-l-a"
              style={{
                background:
                  // colors.secdClor ||
                  userData?.card?.design?.card_color?.secondary_color,

                color:
                  // colors.prmTxtColor ||
                  userData?.card?.design?.font_style?.primary_text_color,
                fontFamily: semiboldFont,
              }}
              onClick={handleShareButtonClick}
            >
              Share Card
            </button>

            <button
              className="btn-bottom-l-a"
              style={{
                background:
                  // colors.secdClor ||
                  userData?.card?.design?.card_color?.secondary_color,

                color:
                  // colors.prmTxtColor ||
                  userData?.card?.design?.font_style?.primary_text_color,
                fontFamily: semiboldFont,
              }}
            >
              Save Contact
            </button>
          </div>
        </div>
      </div>
      {isShareModalOpen && <ShareCardModal onClose={handleCloseModal} />}
    </>
  );
};

export default Mobileprev;
