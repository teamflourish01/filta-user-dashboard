import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { AiOutlineClose } from "react-icons/ai";

import "../styles/VirtualBackground.css";
import vbfiltaqr from "../images/VirtualBackgroundimage/vbfiltaqr.svg";
import indoor1 from "../images/VirtualBackgroundimage/indoor/img1.jpg";
import indoor2 from "../images/VirtualBackgroundimage/indoor/img2.jpg";
import indoor3 from "../images/VirtualBackgroundimage/indoor/img3.jpg";
import indoor4 from "../images/VirtualBackgroundimage/indoor/img4.jpg";
import indoor5 from "../images/VirtualBackgroundimage/indoor/img5.jpg";
import indoor6 from "../images/VirtualBackgroundimage/indoor/img6.jpg";
import indoor7 from "../images/VirtualBackgroundimage/indoor/img7.jpg";
import indoor8 from "../images/VirtualBackgroundimage/indoor/img8.jpg";
import indoor9 from "../images/VirtualBackgroundimage/indoor/img9.jpg";
import mountain1 from "../images/VirtualBackgroundimage/Mountain/img1.jpg";
import mountain2 from "../images/VirtualBackgroundimage/Mountain/img2.jpg";
import mountain3 from "../images/VirtualBackgroundimage/Mountain/img3.jpg";
import mountain4 from "../images/VirtualBackgroundimage/Mountain/img4.jpg";
import mountain5 from "../images/VirtualBackgroundimage/Mountain/img5.jpg";
import mountain6 from "../images/VirtualBackgroundimage/Mountain/img6.jpg";
import mountain7 from "../images/VirtualBackgroundimage/Mountain/img7.jpg";
import mountain8 from "../images/VirtualBackgroundimage/Mountain/img8.jpg";
// import mountain9 from "../images/VirtualBackgroundimage/Mountain/img9.jpg";
import abstract1 from "../images/VirtualBackgroundimage/abstract/img1.jpg";
import abstract2 from "../images/VirtualBackgroundimage/abstract/img2.jpg";
import abstract3 from "../images/VirtualBackgroundimage/abstract/img3.jpg";
import abstract4 from "../images/VirtualBackgroundimage/abstract/img4.jpg";
import abstract5 from "../images/VirtualBackgroundimage/abstract/img5.jpg";
import abstract6 from "../images/VirtualBackgroundimage/abstract/img6.jpg";
import abstract7 from "../images/VirtualBackgroundimage/abstract/img7.jpg";
import abstract8 from "../images/VirtualBackgroundimage/abstract/img8.jpg";
import abstract9 from "../images/VirtualBackgroundimage/abstract/img9.jpg";
import nature1 from "../images/VirtualBackgroundimage/Nature/img1.jpg";
import nature2 from "../images/VirtualBackgroundimage/Nature/img2.jpg";
import nature3 from "../images/VirtualBackgroundimage/Nature/img3.jpg";
import nature4 from "../images/VirtualBackgroundimage/Nature/img4.jpg";
import nature5 from "../images/VirtualBackgroundimage/Nature/img5.jpg";
import nature6 from "../images/VirtualBackgroundimage/Nature/img6.jpg";
import nature7 from "../images/VirtualBackgroundimage/Nature/img7.jpg";
import nature8 from "../images/VirtualBackgroundimage/Nature/img8.jpg";
import nature9 from "../images/VirtualBackgroundimage/Nature/img9.jpg";
import solid1 from "../images/VirtualBackgroundimage/Solid/img1.jpg";
import solid2 from "../images/VirtualBackgroundimage/Solid/img2.jpg";
import solid3 from "../images/VirtualBackgroundimage/Solid/img3.jpg";
import solid4 from "../images/VirtualBackgroundimage/Solid/img4.jpg";
import solid5 from "../images/VirtualBackgroundimage/Solid/img5.jpg";
import solid6 from "../images/VirtualBackgroundimage/Solid/img6.jpg";
import solid7 from "../images/VirtualBackgroundimage/Solid/img7.jpg";
import solid8 from "../images/VirtualBackgroundimage/Solid/img8.jpg";

import { MdOutlineCloudUpload } from "react-icons/md";
import { AiOutlineDownload } from "react-icons/ai";

const images = [
  { id: 1, src: indoor1, category: "Indoor" },
  { id: 2, src: indoor2, category: "Indoor" },
  { id: 3, src: indoor3, category: "Indoor" },
  { id: 4, src: indoor4, category: "Indoor" },
  { id: 5, src: indoor5, category: "Indoor" },
  { id: 6, src: indoor6, category: "Indoor" },
  { id: 7, src: indoor7, category: "Indoor" },
  { id: 8, src: indoor8, category: "Indoor" },
  { id: 9, src: indoor9, category: "Indoor" },
  { id: 10, src: mountain1, category: "Mountain" },
  { id: 11, src: mountain2, category: "Mountain" },
  { id: 12, src: mountain3, category: "Mountain" },
  { id: 13, src: mountain4, category: "Mountain" },
  { id: 14, src: mountain5, category: "Mountain" },
  { id: 15, src: mountain6, category: "Mountain" },
  { id: 16, src: mountain7, category: "Mountain" },
  { id: 17, src: mountain8, category: "Mountain" },
  // { id: 18, src: mountain9, category: "Mountain" },
  { id: 19, src: abstract1, category: "Abstract" },
  { id: 20, src: abstract2, category: "Abstract" },
  { id: 21, src: abstract3, category: "Abstract" },
  { id: 22, src: abstract4, category: "Abstract" },
  { id: 23, src: abstract5, category: "Abstract" },
  { id: 24, src: abstract6, category: "Abstract" },
  { id: 25, src: abstract7, category: "Abstract" },
  { id: 26, src: abstract8, category: "Abstract" },
  { id: 27, src: abstract9, category: "Abstract" },
  { id: 28, src: nature1, category: "Nature" },
  { id: 29, src: nature2, category: "Nature" },
  { id: 30, src: nature3, category: "Nature" },
  { id: 31, src: nature4, category: "Nature" },
  { id: 32, src: nature5, category: "Nature" },
  { id: 33, src: nature6, category: "Nature" },
  { id: 34, src: nature7, category: "Nature" },
  { id: 35, src: nature8, category: "Nature" },
  { id: 36, src: nature9, category: "Nature" },
  { id: 37, src: solid1, category: "Solid" },
  { id: 38, src: solid2, category: "Solid" },
  { id: 39, src: solid3, category: "Solid" },
  { id: 40, src: solid4, category: "Solid" },
  { id: 41, src: solid5, category: "Solid" },
  { id: 42, src: solid6, category: "Solid" },
  { id: 43, src: solid7, category: "Solid" },
  { id: 44, src: solid8, category: "Solid" },

  // { id: 10, src: 'path/to/image10.jpg', category: 'Solid' },
];

const categories = ["All", "Indoor", "Mountain", "Abstract", "Nature", "Solid"];
const VirtualBackground = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter images based on selected category
  const filteredImages =
    selectedCategory === "All"
      ? images
      : images.filter((image) => image.category === selectedCategory);

  const [fields, setFields] = useState({
    name: true,
    jobTitle: true,
    company: true,
    location: true,
    qrCode: true,
    userPhoto: true,
  });

  const handleCheckboxChange = (field) => {
    setFields((prevFields) => ({
      ...prevFields,
      [field]: !prevFields[field],
    }));
  };
  // const ImageSelectorPreview = ({ filteredImages, fields }) => {
  // State to store the selected image
  const [selectedImage, setSelectedImage] = useState(true);
  // Set the first image as the default selected image
  // useEffect(() => {
  //   if (filteredImages.length > 0) {
  //     setSelectedImage(filteredImages[0]);
  //   }
  // }, [filteredImages]);

  // Function to handle image selection
  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage({ src: reader.result, id: file.name });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDownload = async () => {
    const element = document.querySelector(".vb-preview-card"); // Select the preview card
    if (element) {
      try {
        const canvas = await html2canvas(element, { useCORS: true, scale: 4 }); // Capture the element
        const dataURL = canvas.toDataURL("image/png"); // Convert canvas to image
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "virtual_background.png";
        link.click();
      } catch (error) {
        console.error("Error generating the image:", error);
      }
    }
  };
  //Preview button Animation Function Start
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
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
      <div className="VirtualBackground-container">
        {/* Preview Button Responsive Start */}
        <div
          style={{ width: "100%", margin: "auto", position: "relative" }}
          className="btn-display-preview"
        >
          <div className="btn-content-preview-mobile" style={{ width: "100%" }}>
            <button
              onClick={handleFullscreen}
              className="btn-font-preview"
              style={{
                transition:
                  "width 1s ease, height 1s ease, background-color 1s ease, top 1s ease, border-radius 1s ease",
                width: isFullScreen && !isClosing ? "100%" : "117px",
                height: isFullScreen && !isClosing ? "100vh" : "34px",
                backgroundColor: isFullScreen && !isClosing ? "white" : "black",
                top: isFullScreen && !isClosing ? "0px" : "70px",
                right: isFullScreen && !isClosing ? "0" : "20px",
                position: isFullScreen ? "fixed" : "fixed",
                borderRadius: isFullScreen && !isClosing ? "0" : "35px",
                marginTop: isFullScreen && !isClosing ? "0" : "15px",
                marginBottom: isFullScreen && !isClosing ? "0" : "20px",
              }}
            >
              {isFullScreen && !isClosing ? (
                <div className="center-preview-in-btn">
                <hr className="vr-hr" />
                
                  <div className="vb-user-name">
                    <img
                      src="https://via.placeholder.com/50"
                      alt="Profile"
                      className="vb-profile-img "
                    />
                    
                    <div className="vb-user-n-m">
                    
                      <p className="vb-name">Ajay Gadhavi</p>
                      <p className="vb-gamil">ajaygadhavi045@gmail.com</p>
                    </div>
                  </div>
                  <hr className="vr-hr" />

                  <div className="vb-preview">
                    <p className="vb-heading-prev">
                      Virtual Background Preview
                    </p>

                    <div className="vb-preview-card">
                      {selectedImage && (
                        <div style={{ position: "relative" }}>
                          {/* Display selected image */}
                          <img
                            src={selectedImage.src}
                            alt={`Selected Imag ${selectedImage.id}`}
                            className="vb-preview-card-img"
                            style={{ position: "absolute", objectFit: "cover" ,left:"0%",  borderRadius: "5px"}}
                          />
                          <div className="vb-flex-padding">
                          <div className="vb-preview-card-child">

                            <div className="vb-flex-preview-child">
                              {fields.userPhoto && (
                                <img
                                  src="https://via.placeholder.com/50"
                                  alt="Profile"
                                  className="vb-profile-img vb-profile-photo"
                                />
                              )}
                              {fields.name && (
                                <p className="vb-n-500">Ajay Gadhavi</p>
                              )}
                              {fields.jobTitle && (
                                <p className="vb-n-400">UI / UX Designer</p>
                              )}
                              {fields.company && (
                                <p className="vb-n-400">
                                  Flourish Creation PVT.LTD.
                                </p>
                              )}
                              {fields.location && (
                                <p className="vb-n-400">
                                  Ahmedabad, Gujarat, India
                                </p>
                              )}
                            </div>
                            {fields.qrCode && (
                              <div>
                                <img src={vbfiltaqr} alt="QR Code" />
                              </div>
                            )}
                          </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="vb-background-button">
                      <button
                        className="vb-download-button"
                        onClick={handleDownload}
                      >
                        <AiOutlineDownload
                          style={{ width: "24px", height: "24px" }}
                        />
                        Download background
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

        {/* left pannel */}
        <div className="vb-leftpannel">
          <div className="vb-leftpanel-margin">
            <div className="vb-checkbox-container">
              <div className="vb-checkbox-name">
                <input
                  type="checkbox"
                  checked={fields.name}
                  onChange={() => handleCheckboxChange("name")}
                />
                <span>Name</span>
              </div>
              <div className="vb-checkbox-name">
                <input
                  type="checkbox"
                  checked={fields.jobTitle}
                  onChange={() => handleCheckboxChange("jobTitle")}
                />
                <span>Job Title</span>
              </div>
              <div className="vb-checkbox-name">
                <input
                  type="checkbox"
                  checked={fields.company}
                  onChange={() => handleCheckboxChange("company")}
                />
                <span>Company</span>
              </div>
              <div className="vb-checkbox-name">
                <input
                  type="checkbox"
                  checked={fields.location}
                  onChange={() => handleCheckboxChange("location")}
                />
                <span>Location</span>
              </div>
              <div className="vb-checkbox-name">
                <input
                  type="checkbox"
                  checked={fields.qrCode}
                  onChange={() => handleCheckboxChange("qrCode")}
                />
                <span>QR Code</span>
              </div>
              <div className="vb-checkbox-name">
                <input
                  type="checkbox"
                  checked={fields.userPhoto}
                  onChange={() => handleCheckboxChange("userPhoto")}
                />
                <span>User Photo</span>
              </div>
            </div>
            <hr className="vr-hr" />
            {/* Upload Image Section */}
            <div className="vb-height-overflow">
              <div className="vb-upload-section">
                <p className="vb-uploadtext">Upload Image</p>
                <div className="vb-upload-box">
                  <label
                    htmlFor="vb-upload-input"
                    style={{ cursor: "pointer", textAlign: "center" }}
                  >
                    <MdOutlineCloudUpload className="vb-upload-icon" />
                    <p>
                      <span className="vb-select">Select</span> image to upload{" "}
                      <br />
                      <span className="vb-drag">or drag and drop it here</span>
                    </p>
                  </label>
                  <input
                    id="vb-upload-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                </div>
              </div>

              <hr className="vr-hr" />

              <div className="vb-choose-library">
                <p>Choose from library</p>
                <div className="vb-tab">
                  {categories.map((category) => (
                    <div
                      style={{
                        border:
                          selectedCategory === category
                            ? "1px solid #EFF1F3"
                            : "",
                        padding: "3px",
                        borderRadius: "10px",
                      }}
                    >
                      <button
                        className="vb-tab-buttton"
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        style={{ backgroundColor: "#EFF1F3" }}
                      >
                        {category}
                      </button>
                    </div>
                  ))}
                </div>
                {/* <div className="vb-img-display-grid">
              <div className="bv-img-select">
                {filteredImages.map((image) => (
                  <div
                    key={image.id}
                    style={{ borderRadius: "10px", overflow: "hidden" }}
                  >
                    <img
                      src={image.src}
                      alt={`Imag ${image.id}`}
                      className="vb-all-img"
                    />
                  </div>
                ))}
              </div>
            </div> */}
                <div className="vb-width">
                  <div className="vb-img-display-grid">
                    <div className="bv-img-select">
                      {filteredImages.map((image) => (
                        <img
                          key={image.id}
                          onClick={() => handleImageSelect(image)}
                          style={{
                            border:
                              selectedImage && selectedImage.id === image.id
                                ? "3px solid #000"
                                : "none",
                            cursor: "pointer",
                          }}
                          src={image.src}
                          alt={`Imag ${image.id}`}
                          className="vb-all-img"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* right pannel */}
        <div className="vb-rightpannel">
          <div className="vb-user-name">
            <img
              src="https://via.placeholder.com/50"
              alt="Profile"
              className="vb-profile-img"
            />
            <div className="vb-user-n-m">
              <p className="vb-name">Ajay Gadhavi</p>
              <p className="vb-gamil">ajaygadhavi045@gmail.com</p>
            </div>
          </div>
          <hr className="vr-hr" />

          <div className="vb-preview">
            <p className="vb-heading-prev">Virtual Background Preview</p>

            <div className="vb-preview-card">
              {selectedImage && (
                <div style={{ position: "relative" }}>
                  {/* Display selected image */}
                  <img
                    src={selectedImage.src}
                    alt={`Selected Imag ${selectedImage.id}`}
                    className="vb-preview-card"
                    style={{ position: "absolute", objectFit: "cover" }}
                  />
                  <div className="vb-preview-card-child">
                    <div className="vb-flex-preview-child">
                      {fields.userPhoto && (
                        <img
                          src="https://via.placeholder.com/50"
                          alt="Profile"
                          className="vb-profile-img"
                        />
                      )}
                      {fields.name && <p className="vb-n-500">Ajay Gadhavi</p>}
                      {fields.jobTitle && (
                        <p className="vb-n-400">UI / UX Designer</p>
                      )}
                      {fields.company && (
                        <p className="vb-n-400">Flourish Creation PVT.LTD.</p>
                      )}
                      {fields.location && (
                        <p className="vb-n-400">Ahmedabad, Gujarat, India</p>
                      )}
                    </div>
                    {fields.qrCode && (
                      <div>
                        <img src={vbfiltaqr} alt="QR Code" />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="vb-background-button">
              <button className="vb-download-button" onClick={handleDownload}>
                <AiOutlineDownload style={{ width: "24px", height: "24px" }} />
                Download background
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VirtualBackground;
