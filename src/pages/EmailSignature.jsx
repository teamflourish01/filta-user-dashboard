import React, { useRef, useState } from "react";

import "../styles/EmailSignature.css";
import profileimg from "../images/profileimg.png";
import logoimg from "../images/filta.png";
import qrcode from "../images/qrcode.png";
import html2canvas from "html2canvas";

const EmailSignature = () => {
  const [Photo, setPhoto] = useState(true);
  const [qrimg, setQrimg] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    jobtitle: "",
    company: "",
    phonenumber: "",
    location: "",
  });
  const [message, setMessage] = useState("");
  const signatureRef = useRef(null);

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
  return (
    <>
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
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="e-filedgrup">
                    <label>Jobtitle</label>
                    <input
                      type="text"
                      name="jobtitle"
                      value={formData.jobtitle}
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
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="e-filedgrup"> 
                    <label>Phone number</label>
                    <input
                      type="text"
                      name="phonenumber"
                      value={formData.phonenumber}
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
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="e-fullwidth">
                  <label>Disclaimer</label>
                  <textarea className="e-txtarea" />
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
            <img src={profileimg} alt="profile img" />

            <div className="e-sidediv">
              <p className="e-prfname">Ajay Gadhavi</p>
              <p className="e-prfemail">ajaygadhvi045@gmail.com</p>
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
                      src={profileimg}
                      alt="Profile"
                      className="signature-image"
                    />
                  )}
                  <p className="e-cardname">
                    {formData.name || "Ajay Gadhavi"}
                  </p>
                  <p className="e-cardtitle">
                    {formData.jobtitle || "Ui / Ux Designer"}
                  </p>
                  <p className="e-cardcmpny">
                    {formData.company || "Flourish Creation PVT.LTD."}
                  </p>
                  <p className="e-cardno">
                    {formData.phonenumber || "6353123096"}
                  </p>
                  <p className="e-cardlocation">
                    {formData.location || "Ahmedabad, Gujarat, India"}
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
