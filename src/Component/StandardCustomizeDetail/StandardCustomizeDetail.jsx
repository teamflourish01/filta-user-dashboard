import React, { useRef, useState } from "react";
import "../StandardCustomizeDetail/StandardCustomizeDetail.css";
import editPen from "../../images/pickup.svg";

const StandardCustomizeDetail = ({
  logoHide,
  hideNfc,
  hideMobileNo,
  hideEmailId,
  handleColorChange,
  accentColor,
  setAccentColor,
  formData,
  setFormData,
}) => {
  const [selectedColor, setSelectedColor] = useState("black");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const accentColorRef = useRef(null);
  const handleEditClick = (ref) => {
    if (ref.current) {
      ref.current.click();
    }
  };

  const handleColorChangeLocal = (color) => {
    setSelectedColor(color);
    handleColorChange(color);
  };

  return (
    <>
      <div className="Standard-Customize-Details-bg-white">
        <div className="Standard-Customize-Details-bg-grey">
          <div className="s-c-d-inner-bg">
            <p className="customize-your-title">
              Customise your card's details
            </p>
            <div className="customize-detail-field">
              <p className="customize-detial-field-name">Name</p>
              <input
                type="text"
                className="cutomize-field-input"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="customize-detail-field">
              <p className="customize-detial-field-name">
                Additional Information
              </p>
              <input
                type="text"
                className="cutomize-field-input"
                name="info"
                value={formData.info}
                onChange={handleInputChange}
              />
            </div>
            <div className="customize-detail-field">
              <p className="customize-detial-field-name">Email</p>
              <span className="toggle-flex">
                <input
                  type="email"
                  className="cutomize-field-input"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <div className="toggle-btn-standard">
                  <label className="switch-hide-standard">
                    <input type="checkbox" onChange={hideEmailId}  defaultChecked/>
                    <span className="slider-hide-standard round"></span>
                  </label>
                </div>
              </span>
            </div>
            <div className="customize-detail-field">
              <p className="customize-detial-field-name">Mobile Number</p>
              <span className="toggle-flex">
                <input
                  type="number"
                  className="cutomize-field-input"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                />
                <div className="toggle-btn-standard">
                  <label className="switch-hide-standard">
                    <input type="checkbox" onChange={hideMobileNo} defaultChecked />
                    <span className="slider-hide-standard round"></span>
                  </label>
                </div>
              </span>
            </div>
          </div>
          <div className="s-c-d-inner-bg p-20 p-15-i">
            <p className="customize-your-title">Custom URL </p>
            <p className="url-title">URL</p>
            <input type="text" className="cutomize-field-input" />
          </div>
          <div className="s-c-d-inner-bg p-20 p-15-i">
            <p className="customize-your-title">Choose Card Color</p>
            <div className="choose-color-options">
              <label
                className={`radio-container black ${
                  selectedColor === "black" ? "black-selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="color"
                  value="black"
                  className="black-color"
                  onChange={() => handleColorChangeLocal("black")}
                />
                <p className="check-title">Black</p>
              </label>
              <label
                className={`radio-container ${
                  selectedColor === "white" ? "white-selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="color"
                  value="white"
                  onChange={() => handleColorChangeLocal("white")}
                />
                <p className="check-title">White</p>
              </label>
            </div>
            <p className="title-accent">Accent Color</p>

            <div className="center-content-txt-color-std">
              <div className="center-choose-color">
                <input
                  type="text"
                  className="Standard-color-selector"
                  placeholder="#000000"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                />
                <input
                  className="color-hide color-box"
                  type="color"
                  ref={accentColorRef}
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                />
              </div>
              <div
                className="edit-color"
                onClick={() => handleEditClick(accentColorRef)}
              >
                <img src={editPen} alt="Edit" />
              </div>
            </div>
          </div>
          <div className="s-c-d-inner-bg p-20 p-15-i">
            <p className="customize-your-title">NFC Icon</p>
            <div className="customize-detail-field-hide">
              <div className="hide-customize-detail">
                <div className="hide-title">Hide NFC Icon</div>
                <div className="toggle-btn">
                  <label className="switch-hide">
                    <input type="checkbox" onChange={hideNfc} />
                    <span className="slider-hide round"></span>
                  </label>
                </div>
              </div>
            </div>
            <p className="customize-your-title p-15">Hide Filta Logo</p>
            <div className="customize-detail-field-hide">
              <div className="hide-customize-detail">
                <div className="hide-title">Hide Filta Logo</div>
                <div className="toggle-btn">
                  <label className="switch-hide">
                    <input type="checkbox" onChange={logoHide} />
                    <span className="slider-hide round"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="buttons-save-cancel">
            <button type="button" className="close-white-btn">
              Cancel
            </button>
            <button type="button" className="save-blk-btn">
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StandardCustomizeDetail;
