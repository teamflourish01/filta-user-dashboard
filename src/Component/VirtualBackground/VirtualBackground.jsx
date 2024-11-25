import React, { useEffect, useState } from "react";
import "../VirtualBackground/VirtualBackground.css";
import vbfiltaqr from "../VirtualBackground/VirtualBackgroundimage/vbfiltaqr.svg";
import indoor1 from "../VirtualBackground/VirtualBackgroundimage/indoor/img1.jpg";
import indoor2 from "../VirtualBackground/VirtualBackgroundimage/indoor/img2.jpg";
import indoor3 from "../VirtualBackground/VirtualBackgroundimage/indoor/img3.jpg";
import indoor4 from "../VirtualBackground/VirtualBackgroundimage/indoor/img4.jpg";
import indoor5 from "../VirtualBackground/VirtualBackgroundimage/indoor/img5.jpg";
import indoor6 from "../VirtualBackground/VirtualBackgroundimage/indoor/img6.jpg";
import indoor7 from "../VirtualBackground/VirtualBackgroundimage/indoor/img7.jpg";
import indoor8 from "../VirtualBackground/VirtualBackgroundimage/indoor/img8.jpg";
import indoor9 from "../VirtualBackground/VirtualBackgroundimage/indoor/img9.jpg";
import mountain1 from "../VirtualBackground/VirtualBackgroundimage/Mountain/img1.jpg";
import mountain2 from "../VirtualBackground/VirtualBackgroundimage/Mountain/img2.jpg";
import mountain3 from "../VirtualBackground/VirtualBackgroundimage/Mountain/img3.jpg";
import mountain4 from "../VirtualBackground/VirtualBackgroundimage/Mountain/img4.jpg";
import mountain5 from "../VirtualBackground/VirtualBackgroundimage/Mountain/img5.jpg";
import mountain6 from "../VirtualBackground/VirtualBackgroundimage/Mountain/img6.jpg";
import mountain7 from "../VirtualBackground/VirtualBackgroundimage/Mountain/img7.jpg";
import mountain8 from "../VirtualBackground/VirtualBackgroundimage/Mountain/img8.jpg";
import mountain9 from "../VirtualBackground/VirtualBackgroundimage/Mountain/img9.jpg";
import abstract1 from "../VirtualBackground/VirtualBackgroundimage/abstract/img1.jpg";
import abstract2 from "../VirtualBackground/VirtualBackgroundimage/abstract/img2.jpg";
import abstract3 from "../VirtualBackground/VirtualBackgroundimage/abstract/img3.jpg";
import abstract4 from "../VirtualBackground/VirtualBackgroundimage/abstract/img4.jpg";
import abstract5 from "../VirtualBackground/VirtualBackgroundimage/abstract/img5.jpg";
import abstract6 from "../VirtualBackground/VirtualBackgroundimage/abstract/img6.jpg";
import abstract7 from "../VirtualBackground/VirtualBackgroundimage/abstract/img7.jpg";
import abstract8 from "../VirtualBackground/VirtualBackgroundimage/abstract/img8.jpg";
import abstract9 from "../VirtualBackground/VirtualBackgroundimage/abstract/img9.jpg";
import nature1 from "../VirtualBackground/VirtualBackgroundimage/Nature/img1.jpg";
import nature2 from "../VirtualBackground/VirtualBackgroundimage/Nature/img2.jpg";
import nature3 from "../VirtualBackground/VirtualBackgroundimage/Nature/img3.jpg";
import nature4 from "../VirtualBackground/VirtualBackgroundimage/Nature/img4.jpg";
import nature5 from "../VirtualBackground/VirtualBackgroundimage/Nature/img5.jpg";
import nature6 from "../VirtualBackground/VirtualBackgroundimage/Nature/img6.jpg";
import nature7 from "../VirtualBackground/VirtualBackgroundimage/Nature/img7.jpg";
import nature8 from "../VirtualBackground/VirtualBackgroundimage/Nature/img8.jpg";
import nature9 from "../VirtualBackground/VirtualBackgroundimage/Nature/img9.jpg";
import solid1 from "../VirtualBackground/VirtualBackgroundimage/Solid/img1.jpg";
import solid2 from "../VirtualBackground/VirtualBackgroundimage/Solid/img2.jpg";
import solid3 from "../VirtualBackground/VirtualBackgroundimage/Solid/img3.jpg";
import solid4 from "../VirtualBackground/VirtualBackgroundimage/Solid/img4.jpg";
import solid5 from "../VirtualBackground/VirtualBackgroundimage/Solid/img5.jpg";
import solid6 from "../VirtualBackground/VirtualBackgroundimage/Solid/img6.jpg";
import solid7 from "../VirtualBackground/VirtualBackgroundimage/Solid/img7.jpg";
import solid8 from "../VirtualBackground/VirtualBackgroundimage/Solid/img8.jpg";

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
  { id: 18, src: mountain9, category: "Mountain" },
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
  return (
    <>
      <div className="VirtualBackground-container">
        <div className="vb-leftpannel">
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
          <hr />
          {/* Upload Image Section */}
          <div className="vb-upload-section">
        <p className="vb-uploadtext">Upload Image</p>
        <div className="vb-upload-box">
          <label htmlFor="vb-upload-input" style={{ cursor: "pointer",textAlign:"center" }}>
            <MdOutlineCloudUpload className="vb-upload-icon" />
            <p>
              <span className="vb-select">Select</span> image to upload <br />
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
          <hr />

          <div className="vb-choose-library">
            <p>Choose from library</p>
            <div className="vb-tab">
              {categories.map((category) => (
                <button
                  className="vb-tab-buttton"
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    backgroundColor:
                      selectedCategory === category ? "#ddd" : "#f5f5f5",
                  }}
                >
                  {category}
                </button>
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
            <div className="vb-img-display-grid">
              <div className="bv-img-select">
                {filteredImages.map((image) => (
                  <div
                    key={image.id}
                    style={{
                      borderRadius: "10px",
                      overflow: "hidden",
                      cursor: "pointer",
                      border: selectedImage && selectedImage.id === image.id ? '3px solid #007bff' : 'none',
                    }}

                    onClick={() => handleImageSelect(image)} // Select the image on click
                  >
                    <img
                      src={image.src}
                      alt={`Imag ${image.id}`}
                      className="vb-all-img"
                    />
                  </div>
                ))}
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
          <hr />

          <div className="vb-preview">
            <p className="vb-heading-prev">Virtual Background Preview</p>

            <div className="vb-preview-card">
              {selectedImage && (
                <div className="" style={{position:"relative"}}>
                  {/* Display selected image */}
                  <img
                    src={selectedImage.src}
                    alt={`Selected Imag ${selectedImage.id}`}
                    className="vb-preview-card"
                    style={{position:"absolute", objectFit:"cover"}}
                    
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
                      {fields.jobTitle && <p className="vb-n-400">UI / UX Designer</p>}
                      {fields.company && <p className="vb-n-400">Flourish Creation PVT.LTD.</p>}
                      {fields.location && <p className="vb-n-400">Ahmedabad, Gujarat, India</p>}
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
              <button className="vb-download-button">
                {" "}
                <AiOutlineDownload
                  style={{ width: "24px", height: "24px" }}
                />{" "}
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
