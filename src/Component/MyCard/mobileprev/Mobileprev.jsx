import React, { useContext, useEffect, useRef, useState } from "react";
import "../../MyCard/mobileprev/mobileprev.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import video1 from "../../../images/video.mp4";
import videoTwo from "../../../images/video2.mp4";
import { CiPlay1 } from "react-icons/ci";
import imgofpdf from "../../../images/fcplss.svg";
import offer from "../../../images/offer.svg";
import pict from "../../../images/pict.svg";
import gallerypic from "../../../images/pgpic.svg";
import userContext from "../../../context/userDetails";
import CustomNextArrow from "./../../../ViewCard/CustomNextArrow/CustomNextArrow";
import CustomPrevArrow from "./../../../ViewCard/CustomNextArrow/CustomPrevArrow";
import VoiceMessage from "./../../../ViewCard/VoiceMessage/VoiceMessage";
import minstagram from "../../../images/minstagram.svg";
import mfacebook from "../../../images/mfacebook.svg";
import mlinkidin from "../../../images/mlinkidin.svg";
import mxtwitter from "../../../images/mxtwitter.svg";
import msnapchat from "../../../images/msnapchat.svg";
import mThreads from "../../../images/mThreads.svg";
import mpinterest from "../../../images/mpinterest.svg";
import mtelegram from "../../../images/mtelegram.svg";
import myoutube from "../../../images/myoutube.svg";
import mtext from "../../../images/mtext.svg";
import mcall from "../../../images/mcall.svg";
import memail from "../../../images/memail.svg";
import mcontact from "../../../images/mcontact.svg";
import mwhatsapp from "../../../images/mwhatsapp.svg";
import mlocation from "../../../images/mlocation.svg";
// import mgoogleplay from "../../../images/mgoogleplay.svg"
import mphonepay from "../../../images/mphonepay.svg";
import mpaytm from "../../../images/mpaytm.svg";
import mreview from "../../../images/mreview.svg";
import mgoogledrive from "../../../images/mgoogledrive.svg";
import flogo from "../../../images/filta.svg";
import { useForm } from "react-hook-form";
import axios from "axios";

import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Mobileprev = ({
  selectedFields,
  borderStyle,
  setCheckboxStates,
  checkboxStates,
  formDatac,
}) => {
  const { userData, AuthorizationToken, getUserData } = useContext(userContext);
  // const socialProof = userData.card.socialProof || [];

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

  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  // const [token, setToken] = useState(localStorage.getItem("token"));

  // const AuthorizationToken = `Bearer ${token}`;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${uri}/email/gatemailmsg`, {
          method: "GET",
          headers: {
            Authorization: AuthorizationToken,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUserDetails(data);
        console.log(data, "dataaaa");
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserDetails();
  }, []); // Empty dependency array to call useEffect only once

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
    return "two-items"; // Fallback for more than 3 items
  };

  const cta = userData?.cta;
  const handleButtonClick = () => {
    if (cta?.btn_type === "Mail") {
      window.location.href = `mailto:${cta?.mail}`;
    } else if (cta?.btn_type === "Contact") {
      window.location.href = `tel:${cta?.mobile}`;
    } else if (cta?.btn_type === "Visit") {
      window.open(cta?.url, "_blank");
    }
  };

  return (
    <>
      <div className="my-priviewcard">
        {/* Show live card preview */}
        <div className="mp-mobile-modifi">
          <div className="mp-padding-whole-10-l-a">
            {/* top profile section start */}

            <div className="top-profile-container-left-align">
              <div className="mp-top-inner-content-left-a">
                {/* <img src="" alt="" /> */}
                <img
                  src={`${uri}/card/${userData?.card?.coverimg}`}
                  alt="cover img"
                />
              </div>
              <div className="hr-btw-top-bottom-l-a"></div>
              <div className="mp-bottom-inner-content-left-a">
                <div className="mp-info-user-left-card-padding">
                  <p className="mp-user-name-left-align-card">
                    {userData?.card?.name}
                  </p>

                  <p className="mp-grey-bottom-txt">
                    {userData?.card?.jobtitle}
                  </p>
                  <p className="mp-grey-bottom-txt">
                    {userData?.card?.company}
                  </p>
                  <p className="mp-grey-bottom-txt">
                    {userData?.card?.location}
                  </p>
                </div>
              </div>
              <div className="profile-pic-container-left-align">
                {/* <div className="mp-profile-pic-c-l-a"> */}

                <div
                  className={`mp-profile-pic-c-l-a ${
                    borderStyle ? "circle" : "square"
                  }`}
                >
                  <img
                    src={`${uri}/card/${userData?.card?.profileimg}`}
                    alt="Profile-img"
                  />
                </div>
                <div className="mp-logo-profile-c-l-a">
                  <img
                    className="mp-l-size-flourish"
                    src={`${uri}/card/${userData?.card?.logoimg}`}
                    alt="logo img"
                  />
                </div>
              </div>
            </div>

            {/* second clickable link section start */}
            <div className="mp-grey-box-bg-left-align">
              <div className="mp-clickable-link-section">
                <div className="mp-sections-title">Clickable Links</div>
                <div className="mp-social-icon-c-c-l">
                  {userData?.socialLinks?.map((link) => (
                    <div className="icon-container-box" key={link._id}>
                      <div className="mp-a-tag">
                        {/* Dynamic icon rendering */}
                        <a
                          className=" mp-padding-icon-container-box"
                          href={generateHref(link.platform, link.url)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="mp-under-icon-img">
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
                          className="mp-icon-name-c-l"
                        >
                          {link.text}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* third multimedia section start */}
            {userData?.multimedia[0]?.video_file?.length > 0 &&
              userData?.multimedia[0]?.youtube_url.length > 0 && (
                <div className="mp-grey-box-bg-left-align">
                  <div className="multimedia-section">
                    <div className="mp-sections-title mp-p-10-side-l-a">
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
                      <div className="mp-video-container">
                        <Slider {...sliderSettings}>
                          {userData?.multimedia[0]?.video_file.map((video) => (
                            <div className="mp-video-slide">
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
                          <hr className="hr-line-left-align-card" />
                        </>
                      )}

                    {userData?.multimedia[0]?.youtube_url.length > 0 && (
                      <>
                        <div className="mp-youtube-video-title">
                          YouTube Video
                        </div>

                        {userData?.multimedia[0]?.youtube_url.length === 1 ? (
                          // Display single video
                          <div className="single-video">
                            <iframe
                              className="fullscreen-video v-h"
                              src={userData?.multimedia[0]?.youtube_url[0]}
                              frameBorder="0"
                            ></iframe>
                          </div>
                        ) : (
                          // Display slider for multiple videos
                          <div className="mp-video-container">
                            <Slider {...sliderSettings}>
                              {userData?.multimedia[0]?.youtube_url.map(
                                (youtubeVideos, index) => (
                                  <div
                                    key={index}
                                    className="mp-video-slide-youtube"
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
            {userDetails.data[0].loginemail && (
              <div className="mp-grey-box-bg-left-align">
                <div className="mp-contact-form-left-align">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mp-sections-title">Contact Form</div>
                    <div className="mp-input-container-c-f">
                      {checkboxStates.name && (
                        <div className="input-field-contact-form-leftalign">
                          <input
                            type="text"
                            placeholder="Name"
                            className="mp-input-field-single"
                            {...register("name")}
                          />
                        </div>
                      )}
                      {/* {selectedFields.email && ( */}

                      <div className="input-field-contact-form-leftalign">
                        <input
                          type="text"
                          placeholder="Email"
                          className="mp-input-field-single"
                          {...register("email", {
                            required: "Email is required",
                          })}
                        />
                      </div>

                      {/* // )} */}
                      {checkboxStates.number && (
                        <div className="input-field-contact-form-leftalign">
                          <input
                            type="text"
                            placeholder="Mobile Number"
                            className="mp-input-field-single"
                            {...register("number")}
                          />
                        </div>
                      )}
                      {checkboxStates.message && (
                        <div className="input-field-contact-form-leftalign">
                          <textarea
                            type="text"
                            placeholder="Message"
                            className="mp-input-field-single mp-textarea-class"
                            {...register("message")}
                          />
                        </div>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="btn-white-submit-leftalign"
                    >
                      <span className="mp-btn-text-leftalign">
                        {loading ? "Loading..." : "Submit"}
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* fifth section voice message start */}
            {userData?.voiceMessage?.length > 0 && (
              <div className="mp-grey-box-bg-left-align">
                <div className="mp-voice-msg-box-l-a">
                  <div className="mp-sections-title">Voice Message</div>
                  <div className="audio-container" onClick={togglePlayback}>
                    <VoiceMessage />
                    {/* <audio
                  controls
                  className="custom-audio"
                  controlsList="nodownload noplaybackrate"
                >
                  <source src={sound} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio> */}
                  </div>
                </div>
              </div>
            )}
            {/* sixeth section about start */}
            {userData?.about?.title && userData?.about?.description && (
              <div className="mp-grey-box-bg-left-align">
                <div className="mp-about-section">
                  <div className="mp-sections-title">About</div>
                  <div className="mp-ui-ux-text">{userData?.about?.title}</div>
                  <div className="mp-about-description">
                    {userData?.about?.description}
                  </div>
                </div>
              </div>
            )}

            {/* seventh section document start */}
            {userData?.documents.length > 0 && (
              <div className="mp-grey-box-bg-left-align">
                <div className="mp-document-section-box-l-a">
                  <div className="mp-sections-title">Document</div>
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
                      {/* <img
                      src={`${uri}/documents/${userData?.documents[0].document}`}
                      className="mp-i-d-l-a-size"
                      alt=""
                    /> */}
                    </div>
                  )}
                  <p className="mp-d-l-a-name">Flourish Profile</p>
                </div>
              </div>
            )}

            {/* eight section team member details start */}
            {userData?.teamMember?.name.length > 0 && (
              <div className="mp-grey-box-bg-left-align">
                <div className="mp-team-member-details-box-l-a">
                  <div className="mp-sections-title">Team Member Details </div>
                  {userData?.teamMember?.name?.map((teamMember, index) => (
                    <>
                      <div className="mp-details-t-m-d-l-a-grey">
                        Name :{" "}
                        <span className="details-info-n">{teamMember}</span>
                      </div>
                      <div className="mp-details-t-m-d-l-a-grey mp-p-9-d-b">
                        Designation :{" "}
                        <span className="details-info-n ">
                          {userData?.teamMember?.job_title[index]}
                        </span>
                      </div>
                      <div className="mp-details-t-m-d-l-a-grey p-15-d-b">
                        Number :{" "}
                        <span className="details-info-n">
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
              <div className="mp-grey-box-bg-left-align">
                <div className="mp-address-section-box-l-a">
                  <div className="mp-sections-title">Address</div>
                  <p className="mp-title-add">{userData?.address?.title}</p>
                  <p className="mp-address-lines-l-a">
                    {userData?.address?.address}
                  </p>
                </div>
              </div>
            )}

            {/* ten section time sensitive offer start */}
            {userData?.timeoffer[0]?.image?.length > 0 && (
              <div className="mp-grey-box-bg-left-align">
                <div className="mp-time-sensitive-offer-section-l-a">
                  <div className="mp-sections-title">Time sensitive offer</div>

                  {userData?.timeoffer[0]?.image?.length > 1 ? (
                    <Slider {...sliderSettingsDot}>
                      {userData?.timeoffer[0]?.image?.map((img, index) => (
                        <div className="img-offer-content" key={index}>
                          <img
                            src={`${uri}/timesoffer/${img}`}
                            alt=""
                            className="mp-img-r-curve-l-a"
                          />
                        </div>
                      ))}
                    </Slider>
                  ) : (
                    <div className="img-offer-content">
                      <img
                        src={`${uri}/timesoffer/${userData?.timeoffer[0]?.image[0]}`}
                        alt=""
                        className="mp-img-r-curve-l-a"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* eleven section social proof start */}

            {userData?.socialProof?.text?.length > 0 && (
              <div className="mp-grey-box-bg-left-align">
                <div className="mp-social-proof-section-l-a">
                  <div className="mp-sections-title">Social Proof</div>
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
                        <div className="mp-counts--s-l">
                          {userData.socialProof?.digit[index]}+
                        </div>
                        <div className="mp-s-l-title-name">{item}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* twelve section photos start */}
            {userData?.photos[0]?.image?.length > 0 && (
              <div className="mp-grey-box-bg-left-align">
                <div className="mp-photos-section-l-a">
                  <div className="mp-sections-title">Photos</div>

                  {userData?.photos[0]?.image?.length > 1 ? (
                    <Slider {...sliderSettingsDot}>
                      {userData?.photos[0]?.image?.map((img, index) => (
                        <div className="img-offer-content" key={index}>
                          <img
                            src={`${uri}/photo/${img}`}
                            alt=""
                            className="mp-img-r-curve-l-a"
                          />
                        </div>
                      ))}
                    </Slider>
                  ) : (
                    <div className="img-offer-content">
                      <img
                        src={`${uri}/photo/${userData?.photos[0]?.image[0]}`}
                        alt=""
                        className="mp-img-r-curve-l-a"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* thirteen section product gallery start */}
            <div className="mp-grey-box-bg-left-align">
              <div className="mp-product-gallery-box-l-a">
                <div className="mp-sections-title">Product gallery</div>
                {galleryImages?.length > 1 ? (
                  <Slider {...sliderSettings}>
                    {galleryImages?.map((img, index) => (
                      <div className="img-offer-content" key={index}>
                        <img src={img} alt="" className="mp-img-r-curve-l-a" />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className="img-offer-content">
                    <img
                      src={galleryImages[0]}
                      alt=""
                      className="mp-img-r-curve-l-a"
                    />
                  </div>
                )}
                <p className="mp-pic-title-p-g">New York</p>
                <p className="mp-pic-desc-p-g">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                </p>
                <p className="mp-price-p-g">Price : 500</p>
                <button type="submit" className="btn-white-submit-leftalign">
                  <span className="mp-btn-text-leftalign">Submit</span>
                </button>
              </div>
            </div>

            {/* fourteen section two btn add start */}

            <div className="mp-grey-box-bg-left-align">
              <div className="btn-visit-translate-flex">
                {cta?.btn_type && (
                  <button
                    className="btn-visit-translate"
                    onClick={handleButtonClick}
                  >
                    <span className="btn-visit-txt">{cta?.btn_text}</span>
                  </button>
                )}
                <button className="btn-visit-translate">
                  <span className="btn-visit-txt">Translate</span>
                </button>
              </div>
            </div>

            {/* fifteen section copiright start */}
            <div className="mp-grey-box-bg-left-align">
              <div className="mp-copy-flex">
                <p className="mp-copy-txt">
                  © 2025 ajay gadhavi. All Rights Reserved.
                </p>
                <p className="mp-created-from-txt">
                  Created From : <img src={flogo} alt="" />
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mp-grey-bottom-container">
          <div className="mp-grey-bottom-btn-container">
            <button className="mp-btn-bottom-l-a">Share Card</button>

            <button className="mp-btn-bottom-l-a">Save Contact</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mobileprev;
