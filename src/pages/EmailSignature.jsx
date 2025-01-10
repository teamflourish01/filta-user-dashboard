import React, { useContext, useEffect, useRef, useState } from "react";
import "../styles/EmailSignature.css";
import profileimg from "../images/profileimg.png";
import logoimg from "../images/filta.png";
import qrcode from "../images/qrcode.png";
import html2canvas from "html2canvas";
import { AiOutlineClose } from "react-icons/ai";
import userContext from "../context/userDetails";
import dummyprofile from "../images/digitalphoto.png";

const EmailSignature = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const [Photo, setPhoto] = useState(true);
  const [qrimg, setQrimg] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    jobtitle: "",
    company: "",
    phoneNumber: "",
    location: "",
    disclaimer: ""
  });
  console.log(formData, "formdata");
  const [message, setMessage] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const signatureRef = useRef(null);
  const { userData } = useContext(userContext);
  const uri = process.env.REACT_APP_DEV_URL;

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePhotoCheckbox = () => {
    setPhoto(!Photo);
  };
  const handleQRCheckbox = () => {
    setQrimg(!qrimg);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleCopyToClipboard = () => {
    html2canvas(signatureRef.current).then((canvas) => {
      // Convert the canvas to PNG Blob
      canvas.toBlob((blob) => {
        const item = new ClipboardItem({
          "image/png": blob, // Copy the image as PNG
        });

        // Write the clipboard item to the clipboard
        navigator.clipboard
          .write([item])
          .then(() => {
            setMessage("Signature copied as to clipboard!");
          })
          .catch(() => {
            setMessage("Failed to copy signature.");
          });
      });
    });
  };

  const handleDownloadSignature = () => {
    html2canvas(signatureRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "email-signature.png";
      link.click();
    });
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
  return (
    <>
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
                  : "20px",
              position: isFullScreen ? "fixed" : "fixed ",
              borderRadius: isFullScreen && !isClosing ? "0" : "35px",
              zIndex: isFullScreen && !isClosing ? "5" : "0",
              marginBottom: isFullScreen && !isClosing ? "0" : "20px",
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
                <div className="e-rightmain">
                  <div className="email-preview">
                    <h3 className="e-cardheding">Email Signature Preview</h3>
                    <div className="signature-card" ref={signatureRef}>
                      <div className="signature-info">
                        {Photo && (
                          <img
                            src={`${uri}/card/${userData?.card?.profileimg}`}
                            alt="profile-img"
                            className="signature-image"
                          />
                        )}
                        <p className="e-cardname">
                          {formData.name || userData?.card?.name}
                        </p>
                        <p className="e-cardtitle">
                          {formData.jobtitle || userData?.card?.jobtitle}
                        </p>
                        <p className="e-cardcmpny">
                          {formData.company || userData?.card?.company}
                        </p>
                        <p className="e-cardno">
                          {formData.phonenumber || "6353123096"}
                        </p>
                        <p className="e-cardlocation">
                          {formData.location || userData?.card?.location}
                        </p>
                      </div>
                      <div className={`e-cardright ${qrimg ? "img" : ""}`}>
                        <img
                          src={logoimg}
                          alt="Profile"
                          className={`e-filtalogo ${
                            qrimg ? "qrimg-active" : ""
                          }`}
                        />
                        {qrimg && (
                          <>
                            <div className="qr-code">
                              <img src={qrcode} alt="qrcode" />
                            </div>
                            <p>Connect with me</p>
                          </>
                        )}
                      </div>
                    </div>
                    <button
                      className="add-to-email"
                      onClick={handleCopyToClipboard}
                    >
                      + Add to your email
                    </button>
                    {message && (
                      <p style={{ color: "green", margin: "0" }}>{message}</p>
                    )}
                    <p className="e-or">OR</p>
                    <a
                      href="#"
                      className="e-download"
                      onClick={handleDownloadSignature}
                    >
                      Download
                    </a>
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
      <div className="e-container">
        <div className="e-leftpanel">
          <div className="e-checkboxcontiner">
            <label>
              <input
                type="checkbox"
                id="left-checkbox"
                checked={qrimg}
                onChange={handleQRCheckbox}
              />
              Include QR Code
            </label>

            <label>
              <input
                type="checkbox"
                id="left-checkbox"
                checked={Photo}
                onChange={handlePhotoCheckbox}
              />
              Photo
            </label>
          </div>
          <hr className="hrline" />
          <div className="e-form">
            <form>
              <div className="e-allfiled">
                <div className="e-flexfiled">
                  <div className="e-filedgrup">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder= {userData?.card?.name}
                      value={formData.name || userData?.card?.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="e-filedgrup">
                    <label>Jobtitle</label>
                    <input
                      type="text"
                      name="jobtitle"
                      placeholder={userData?.card?.jobtitle}
                      value={formData.jobtitle || userData?.card?.jobtitle}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="e-flexfiled">
                  <div className="e-filedgrup">
                    <label>Company</label>
                    <input
                      type="text"
                      name="company"
                      placeholder={userData?.card?.company}
                      value={formData.company || userData?.card?.company}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="e-filedgrup">
                    <label>Phone number</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      placeholder={userData?.card?.phoneNumber}
                      value={formData.phoneNumber || userData?.card?.phoneNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="e-fullwidth">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    placeholder={userData?.card?.location}
                    value={formData.location || userData?.card?.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="e-fullwidth">
                  <label>Disclaimer</label>
                  <textarea className="e-txtarea" name="disclaimer" onChange={handleInputChange}/>
                </div>
              </div>
              <div className="e-buttons">
                <button className="e-cancel">Cancel</button>
                <button className="e-save">Save</button>
              </div>
            </form>
          </div>
        </div>
        <div className="e-rightpanel">
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
          <div className="e-rightmain">
            <div className="email-preview">
              <h3 className="e-cardheding">Email Signature Preview</h3>
              <div className="e-sig-card">
              <div className="signature-card" ref={signatureRef}>
                <div className="signature-info">
                
                  { Photo && userData?.card?.profileimg && (
                    <img
                      src={`${uri}/card/${userData?.card?.profileimg}`}
                      alt="profile-img"
                      className="img-standard-profile"
                    />
                  )} {Photo && !userData?.card?.profileimg && (
                    <img
                      src={dummyprofile}
                      alt="profile-img"
                      className="img-standard-profile"
                    />
                  )}
                  <p className="e-cardname">
                    {formData.name || userData?.card?.name}
                  </p>
                  <p className="e-cardtitle">
                    {formData.jobtitle || userData?.card?.jobtitle}
                  </p>
                  <p className="e-cardcmpny">
                    {formData.company || userData?.card?.company}
                  </p>
                  <p className="e-cardno">
                    {formData.phoneNumber || userData?.card?.phoneNumber}
                  </p>
                  <p className="e-cardlocation">
                    {formData.location || userData?.card?.location}
                  </p>
                </div>
                <div className={`e-cardright ${qrimg ? "img" : ""}`}>
                  <img
                    src={logoimg}
                    alt="Profile"
                    className={`e-filtalogo ${qrimg ? "qrimg-active" : ""}`}
                  />
                  {qrimg && (
                    <>
                      <div className="qr-code">
                        <img src={qrcode} alt="qrcode" />
                      </div>
                      <p>Connect with me</p>
                    </>
                  )}
                </div>
                </div>
                <p className="disclaimer-txt">{formData.disclaimer}</p>

              </div>
              <button className="add-to-email" onClick={handleCopyToClipboard}>
                + Add to your email
              </button>
              {message && (
                <p style={{ color: "green", margin: "0" }}>{message}</p>
              )}
              <p className="e-or">OR</p>
              <a
                href="#"
                className="e-download"
                onClick={handleDownloadSignature}
              >
                Download
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailSignature;
