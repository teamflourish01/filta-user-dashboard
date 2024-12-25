import React, { useState } from "react";
import "../LeftAlign/LeftAlign.css";
import pla from "../../images/pla.svg";
import flourish from "../../images/flourishblack.svg";
import instaicon from "../../images/instaicon.svg";
import fbicon from "../../images/fbicon.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import video1 from "../../images/video.mp4";
import video2 from "../../images/video2.mp4";
import { CiPlay1 } from "react-icons/ci";
import sound from "../../images/sound.mp3";
import imgofpdf from "../../images/fcplss.svg";
import offer from "../../images/offer.svg";
import pict from "../../images/pict.svg";
import gallerypic from "../../images/pgpic.svg";
import "../CenterAlign/CenterAlign.css";

const CenterAlign = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const sliderSettingsDot = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const videos = [video1, video2];

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
      <div className="main-left-container">
        <div className="left-align-main-div">
          <div className="padding-whole-10-l-a">
            {/* top profile section start */}
            <div className="top-profile-container-left-align">
              <div className="top-inner-content-left-a"></div>
              <div className="hr-btw-top-bottom-l-a"></div>
              <div className="bottom-inner-content-left-a-center">
                <div className="info-user-left-card-padding-center">
                  <div className="user-name-left-align-card">Ajay Gadhavi</div>
                  <div className="grey-bottom-txt">UI/Ux Designer</div>
                  <div className="grey-bottom-txt">
                    Flourish Creations Privat Limited
                  </div>
                  <div className="grey-bottom-txt">Ahmedabad</div>
                </div>
              </div>
              <div className="profile-pic-container-left-align">
                <div className="profile-pic-c-l-a-center">
                  <img src={pla} alt="" />
                </div>
                <div className="logo-profile-c-l-a-center">
                  <img src={flourish} alt="" className="l-size-flourish" />
                </div>
              </div>
            </div>

            {/* second clickable link section start */}
            <div className="grey-box-bg-left-align">
              <div className="clickable-link-section">
                <div className="sections-title-center">Clickable Links</div>
                <div className="social-icon-c-c-l">
                  <div className="icon-container-box">
                    <div className="padding-icon-container-box">
                      <img src={instaicon} alt="" />
                      <p className="icon-name-c-l">Instagram</p>
                    </div>
                  </div>
                  <div className="icon-container-box">
                    <div className="padding-icon-container-box">
                      <img src={fbicon} alt="" />
                      <p className="icon-name-c-l">Facebook</p>
                    </div>
                  </div>
                  <div className="icon-container-box">
                    <div className="padding-icon-container-box">
                      <img src={instaicon} alt="" />
                      <p className="icon-name-c-l">Instagram</p>
                    </div>
                  </div>
                  <div className="icon-container-box">
                    <div className="padding-icon-container-box">
                      <img src={fbicon} alt="" />
                      <p className="icon-name-c-l">Facebook</p>
                    </div>
                  </div>
                  <div className="icon-container-box">
                    <div className="padding-icon-container-box">
                      <img src={instaicon} alt="" />
                      <p className="icon-name-c-l">Instagram</p>
                    </div>
                  </div>
                  <div className="icon-container-box">
                    <div className="padding-icon-container-box">
                      <img src={fbicon} alt="" />
                      <p className="icon-name-c-l">Facebook</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* third multimedia section start */}
            <div className="grey-box-bg-left-align">
              <div className="multimedia-section">
                <div className="sections-title-center p-10-side-l-a">
                  Multimedia
                </div>
                {videos.length === 1 ? (
                  // Display single video
                  <div className="single-video">
                    <video controls className="fullscreen-video">
                      <source src={videos[0]} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : (
                  // Display slider for multiple videos
                  <div className="video-container">
                    <Slider {...sliderSettings}>
                      {videos.map((video, index) => (
                        <div key={index} className="video-slide">
                          <video
                            src={video}
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
                <div className="youtube-video-title-center">YouTube Video</div>

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
                  <div className="video-container">
                    <Slider {...sliderSettings}>
                      {youtubeVideos.map((youtubeVideos, index) => (
                        <div key={index} className="video-slide-youtube">
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
            <div className="grey-box-bg-left-align">
              <div className="contact-form-left-align">
                <div className="sections-title-center">Contact Form</div>
                <div className="input-container-c-f">
                  <div className="input-field-contact-form-leftalign">
                    <input
                      type="text"
                      placeholder="Name"
                      className="input-field-single"
                    />
                  </div>
                  <div className="input-field-contact-form-leftalign">
                    <input
                      type="text"
                      placeholder="Email"
                      className="input-field-single"
                    />
                  </div>
                  <div className="input-field-contact-form-leftalign">
                    <input
                      type="text"
                      placeholder="Mobile Number"
                      className="input-field-single"
                    />
                  </div>
                  <div className="input-field-contact-form-leftalign">
                    <textarea
                      type="text"
                      placeholder="Message"
                      className="input-field-single textarea-class"
                    />
                  </div>
                </div>
                <button type="submit" className="btn-white-submit-leftalign">
                  <span className="btn-text-leftalign">Submit</span>
                </button>
              </div>
            </div>

            {/* fifth section voice message start */}
            <div className="grey-box-bg-left-align">
              <div className="voice-msg-box-l-a">
                <div className="sections-title-center">Voice Message</div>
                <audio controls className="custom-audio">
                  <source src={sound} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>

            {/* sixeth section about start */}
            <div className="grey-box-bg-left-align">
              <div className="about-section">
                <div className="sections-title-center">About</div>
                <div className="ui-ux-text">Ui / Ux Designer</div>
                <div className="about-description">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here,
                </div>
              </div>
            </div>

            {/* seventh section document start */}
            <div className="grey-box-bg-left-align">
              <div className="document-section-box-l-a">
                <div className="sections-title-center">Document</div>
                {pdf.length > 1 ? (
                  <Slider {...sliderSettings}>
                    {pdf.map((pdf, index) => (
                      <div className="img-container-document-l-a">
                        <img src={pdf} className="i-d-l-a-size" alt="" />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className="img-container-document-l-a">
                    <img src={pdf} className="i-d-l-a-size" alt="" />
                  </div>
                )}
                <p className="d-l-a-name">Flourish Profile</p>
              </div>
            </div>

            {/* eight section team member details start */}
            <div className="grey-box-bg-left-align">
              <div className="team-member-details-box-l-a">
                <div className="sections-title-center">
                  Team Member Details{" "}
                </div>
                <div className="details-t-m-d-l-a-grey">
                  Name : <span className="details-info-n">Pratik Chandera</span>
                </div>
                <div className="details-t-m-d-l-a-grey p-9-d-b">
                  Designation : <span className="details-info-n ">HR</span>
                </div>
                <div className="details-t-m-d-l-a-grey p-15-d-b">
                  Number :{" "}
                  <span className="details-info-n">+91 81540 34968</span>
                </div>
              </div>
            </div>

            {/* nine section address start */}
            <div className="grey-box-bg-left-align">
              <div className="address-section-box-l-a">
                <div className="sections-title-center">Address</div>
                <p className="address-lines-l-a">
                  A-206, PNTC, Times of India Press Road, Vejalpur, Ahmedabad -
                  380015
                </p>
              </div>
            </div>

            {/* ten section time sensitive offer start */}
            <div className="grey-box-bg-left-align">
              <div className="time-sensitive-offer-section-l-a">
                <div className="sections-title-center">
                  Time sensitive offer
                </div>

                {offerImages.length > 1 ? (
                  <Slider {...sliderSettingsDot}>
                    {offerImages.map((img, index) => (
                      <div className="img-offer-content" key={index}>
                        <img src={img} alt="" className="img-r-curve-l-a" />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className="img-offer-content">
                    <img
                      src={offerImages[0]}
                      alt=""
                      className="img-r-curve-l-a"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* eleven section social proof start */}
            <div className="grey-box-bg-left-align">
              <div className="social-proof-section-l-a">
                <div className="sections-title-center">Social Proof</div>
                <div className="w-card-s-p-l-a">
                  <div className="white-clr-cards-l-a">
                    <div className="counts--s-l">150+</div>
                    <div className="s-l-title-name">Projects Done</div>
                  </div>
                  <div className="white-clr-cards-l-a">
                    <div className="counts--s-l">3+</div>
                    <div className="s-l-title-name">Years Experience</div>
                  </div>
                  <div className="white-clr-cards-l-a">
                    <div className="counts--s-l">15+</div>
                    <div className="s-l-title-name">Industries</div>
                  </div>
                  <div className="white-clr-cards-l-a">
                    <div className="counts--s-l">125+</div>
                    <div className="s-l-title-name">Clients</div>
                  </div>
                </div>
              </div>
            </div>

            {/* twelve section photos start */}
            <div className="grey-box-bg-left-align">
              <div className="photos-section-l-a">
                <div className="sections-title-center">Photos</div>

                {photosImages.length > 1 ? (
                  <Slider {...sliderSettingsDot}>
                    {photosImages.map((img, index) => (
                      <div className="img-offer-content" key={index}>
                        <img src={img} alt="" className="img-r-curve-l-a" />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className="img-offer-content">
                    <img
                      src={photosImages[0]}
                      alt=""
                      className="img-r-curve-l-a"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* thirteen section product gallery start */}
            <div className="grey-box-bg-left-align">
              <div className="product-gallery-box-l-a">
                <div className="sections-title-center">Product gallery</div>
                {galleryImages.length > 1 ? (
                  <Slider {...sliderSettings}>
                    {galleryImages.map((img, index) => (
                      <div className="img-offer-content" key={index}>
                        <img src={img} alt="" className="img-r-curve-l-a" />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className="img-offer-content">
                    <img
                      src={galleryImages[0]}
                      alt=""
                      className="img-r-curve-l-a"
                    />
                  </div>
                )}
                <p className="pic-title-p-g">New York</p>
                <p className="pic-desc-p-g">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                </p>
                <p className="price-p-g">Price : 500</p>
                <button type="submit" className="btn-white-submit-leftalign">
                  <span className="btn-text-leftalign">Submit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="grey-bottom-container">
          <div className="grey-bottom-btn-container">
            <div>
              <button className="btn-bottom-l-a">Share Card</button>
            </div>
            <div>
              <button className="btn-bottom-l-a">Contact Me</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CenterAlign;
