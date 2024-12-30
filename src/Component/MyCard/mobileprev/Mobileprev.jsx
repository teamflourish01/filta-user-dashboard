import React, { useContext, useRef, useState } from "react";
// import "../../src/ViewCard/LeftAlign/LeftAlign.css";
import "../../MyCard/mobileprev/mobileprev.css";
// import pla from "../../../images/pla.svg";
// import flourish from "../../../images/flourishblack.svg";
import instaicon from "../../../images/instaicon.svg";
import fbicon from "../../../images/fbicon.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import video1 from "../../../images/video.mp4";
import videoTwo from "../../../images/video2.mp4";
import { CiPlay1 } from "react-icons/ci";
// import sound from "../../../images/sound.mp3";
import imgofpdf from "../../../images/fcplss.svg";
import offer from "../../../images/offer.svg";
import pict from "../../../images/pict.svg";
import gallerypic from "../../../images/pgpic.svg";
import userContext from "../../../context/userDetails";
// import { useNavigate } from "react-router-dom";
import CustomNextArrow from "./../../../ViewCard/CustomNextArrow/CustomNextArrow";
import CustomPrevArrow from "./../../../ViewCard/CustomNextArrow/CustomPrevArrow";
import VoiceMessage from "./../../../ViewCard/VoiceMessage/VoiceMessage";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Mobileprev = () => {
  const { userData } = useContext(userContext);
  const uri = process.env.REACT_APP_DEV_URL;

  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);

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

  const videos = [video1, videoTwo];

  const youtubeVideos = [
    "https://www.youtube.com/embed/tgbNymZ7vqY",
    "https://www.youtube.com/embed/Pst9FCWkKTQ?si=qfH4bxmvs0ryLW4Y",
  ];

  const offerImages = [offer, offer, offer];
  const photosImages = [pict, pict];
  const galleryImages = [gallerypic, gallerypic];
  const pdf = [imgofpdf, imgofpdf];
  const handlePlay = (videoElement) => {
    videoElement.play();
    setIsPlaying(true);
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
                <div className="mp-profile-pic-c-l-a">
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
                  <div className="icon-container-box">
                    <div className="mp-padding-icon-container-box">
                      <img src={instaicon} alt="" />
                      <p className="mp-icon-name-c-l">Instagram</p>
                    </div>
                  </div>
                  <div className="icon-container-box">
                    <div className="mp-padding-icon-container-box">
                      <img src={fbicon} alt="" />
                      <p className="mp-icon-name-c-l">Facebook</p>
                    </div>
                  </div>
                  <div className="icon-container-box">
                    <div className="mp-padding-icon-container-box">
                      <img src={instaicon} alt="" />
                      <p className="mp-icon-name-c-l">Instagram</p>
                    </div>
                  </div>
                  <div className="icon-container-box">
                    <div className="mp-padding-icon-container-box">
                      <img src={fbicon} alt="" />
                      <p className="mp-icon-name-c-l">Facebook</p>
                    </div>
                  </div>
                  <div className="icon-container-box">
                    <div className="mp-padding-icon-container-box">
                      <img src={instaicon} alt="" />
                      <p className="mp-icon-name-c-l">Instagram</p>
                    </div>
                  </div>
                  <div className="icon-container-box">
                    <div className="mp-padding-icon-container-box">
                      <img src={fbicon} alt="" />
                      <p className="mp-icon-name-c-l">Facebook</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* third multimedia section start */}
            <div className="mp-grey-box-bg-left-align">
              <div className="multimedia-section">
                <div className="mp-sections-title mp-p-10-side-l-a">
                  Multimedia
                </div>
                {userData?.multimedia.length === 1 ? (
                  // Display single video
                  <div className="single-video">
                    <video controls className="fullscreen-video">
                      <source
                        src={`${uri}/multimedia/${userData?.multimedia[0]?.video_file}`}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : (
                  // Display slider for multiple videos
                  <div className="mp-video-container">
                    <Slider {...sliderSettings}>
                      {userData?.multimedia?.map((video) => (
                        <div className="mp-video-slide">
                          <video
                            src={`${uri}/multimedia/${video.video_file}`}
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

                <hr className="hr-line-left-align-card" />
                <div className="mp-youtube-video-title">YouTube Video</div>

                {youtubeVideos.length === 1 ? (
                  // Display single video
                  <div className="single-video">
                    <iframe
                      className="fullscreen-video v-h"
                      src={youtubeVideos[0]}
                      frameBorder="0"
                    ></iframe>
                  </div>
                ) : (
                  // Display slider for multiple videos
                  <div className="mp-video-container">
                    <Slider {...sliderSettings}>
                      {youtubeVideos.map((youtubeVideos, index) => (
                        <div key={index} className="mp-video-slide-youtube">
                          <iframe
                            src={youtubeVideos}
                            frameBorder="0"
                            className="v-h"
                          ></iframe>
                        </div>
                      ))}
                    </Slider>
                  </div>
                )}
              </div>
            </div>

            {/* fourth section contact form start */}
            <div className="mp-grey-box-bg-left-align">
              <div className="mp-contact-form-left-align">
                <div className="mp-sections-title">Contact Form</div>
                <div className="mp-input-container-c-f">
                  <div className="input-field-contact-form-leftalign">
                    <input
                      type="text"
                      placeholder="Name"
                      className="mp-input-field-single"
                    />
                  </div>
                  <div className="input-field-contact-form-leftalign">
                    <input
                      type="text"
                      placeholder="Email"
                      className="mp-input-field-single"
                    />
                  </div>
                  <div className="input-field-contact-form-leftalign">
                    <input
                      type="text"
                      placeholder="Mobile Number"
                      className="mp-input-field-single"
                    />
                  </div>
                  <div className="input-field-contact-form-leftalign">
                    <textarea
                      type="text"
                      placeholder="Message"
                      className="mp-input-field-single mp-textarea-class"
                    />
                  </div>
                </div>
                <button type="submit" className="btn-white-submit-leftalign">
                  <span className="mp-btn-text-leftalign">Submit</span>
                </button>
              </div>
            </div>

            {/* fifth section voice message start */}
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

            {/* sixeth section about start */}
            <div className="mp-grey-box-bg-left-align">
              <div className="mp-about-section">
                <div className="mp-sections-title">About</div>
                <div className="mp-ui-ux-text">{userData?.about?.title}</div>
                <div className="mp-about-description">
                  {userData?.about?.description}
                </div>
              </div>
            </div>

            {/* seventh section document start */}
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
                        height={238.53}
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
                            height={238.53}
                          />
                        </a>
                      </Document>
                    ))}
                  </Slider>
                ) : (
                  <div className="img-container-document-l-a ">
                    <Document
                      file={`${uri}/documents/${userData?.documents[0].document}`}
                      onLoadError={(error) =>
                        console.error("PDF Load Error:", error)
                      }
                      width={248}
                      height={238.53}
                    >
                      <a
                        href={`${uri}/documents/${userData?.documents[0].document}`}
                        target="_blank"
                      >
                        <Page
                          pageNumber={1}
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                          width={248}
                          height={238.53}
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

            {/* eight section team member details start */}
            <div className="mp-grey-box-bg-left-align">
              <div className="mp-team-member-details-box-l-a">
                <div className="mp-sections-title">Team Member Details </div>
                <div className="mp-details-t-m-d-l-a-grey">
                  Name : <span className="details-info-n">Pratik Chandera</span>
                </div>
                <div className="mp-details-t-m-d-l-a-grey mp-p-9-d-b">
                  Designation : <span className="details-info-n ">HR</span>
                </div>
                <div className="mp-details-t-m-d-l-a-grey p-15-d-b">
                  Number :{" "}
                  <span className="details-info-n">+91 81540 34968</span>
                </div>
              </div>
            </div>

            {/* nine section address start */}
            <div className="mp-grey-box-bg-left-align">
              <div className="mp-address-section-box-l-a">
                <div className="mp-sections-title">Address</div>
                <p className="mp-address-lines-l-a">
                  A-206, PNTC, Times of India Press Road, Vejalpur, Ahmedabad -
                  380015
                </p>
              </div>
            </div>

            {/* ten section time sensitive offer start */}
            <div className="mp-grey-box-bg-left-align">
              <div className="mp-time-sensitive-offer-section-l-a">
                <div className="mp-sections-title">Time sensitive offer</div>

                {offerImages.length > 1 ? (
                  <Slider {...sliderSettingsDot}>
                    {offerImages.map((img, index) => (
                      <div className="img-offer-content" key={index}>
                        <img src={img} alt="" className="mp-img-r-curve-l-a" />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className="img-offer-content">
                    <img
                      src={offerImages[0]}
                      alt=""
                      className="mp-img-r-curve-l-a"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* eleven section social proof start */}
            <div className="mp-grey-box-bg-left-align">
              <div className="mp-social-proof-section-l-a">
                <div className="mp-sections-title">Social Proof</div>
                <div className="w-card-s-p-l-a">
                  <div className="white-clr-cards-l-a">
                    <div className="mp-counts--s-l">150+</div>
                    <div className="mp-s-l-title-name">Projects Done</div>
                  </div>
                  <div className="white-clr-cards-l-a">
                    <div className="mp-counts--s-l">3+</div>
                    <div className="mp-s-l-title-name">Years Experience</div>
                  </div>
                  <div className="white-clr-cards-l-a">
                    <div className="mp-counts--s-l">15+</div>
                    <div className="mp-s-l-title-name">Industries</div>
                  </div>
                  <div className="white-clr-cards-l-a">
                    <div className="mp-counts--s-l">125+</div>
                    <div className="mp-s-l-title-name">Clients</div>
                  </div>
                </div>
              </div>
            </div>

            {/* twelve section photos start */}
            <div className="mp-grey-box-bg-left-align">
              <div className="mp-photos-section-l-a">
                <div className="mp-sections-title">Photos</div>

                {photosImages.length > 1 ? (
                  <Slider {...sliderSettingsDot}>
                    {photosImages.map((img, index) => (
                      <div className="img-offer-content" key={index}>
                        <img src={img} alt="" className="mp-img-r-curve-l-a" />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className="img-offer-content">
                    <img
                      src={photosImages[0]}
                      alt=""
                      className="mp-img-r-curve-l-a"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* thirteen section product gallery start */}
            <div className="mp-grey-box-bg-left-align">
              <div className="mp-product-gallery-box-l-a">
                <div className="mp-sections-title">Product gallery</div>
                {galleryImages.length > 1 ? (
                  <Slider {...sliderSettings}>
                    {galleryImages.map((img, index) => (
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
          </div>
        </div>

        <div className="mp-grey-bottom-container">
          <div className="mp-grey-bottom-btn-container">
            <button className="mp-btn-bottom-l-a">Share Card</button>

            <button className="mp-btn-bottom-l-a">Contact Me</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mobileprev;
