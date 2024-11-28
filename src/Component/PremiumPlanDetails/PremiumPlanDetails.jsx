import React, { useRef, useState } from "react";
import "../PremiumPlanDetails/PremiumPlanDetails.css";
import editPen from "../../images/pickup.svg";
import { SlArrowDown } from "react-icons/sl";
import { FaPlus } from "react-icons/fa6";
import "../StandardCustomizeDetail/StandardCustomizeDetail.css";
import { MdOutlineDeleteForever } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

const PremiumPlanDetails = ({
  cardColor,
  setCardColor,
  primaryTextColor,
  setPrimaryTextColor,
  secondaryTextColor,
  setSecondaryTextColor,
  accentColorPremium,
  setAccentColorPremium,
  logoWidth,
  logoHeight,
  setLogoHeight,
  setLogoWidth,
  selectedLayout,
  setSelectedLayout,
  hideEmailId,
  hideMobileNo,
  hideNfc,
  logoHide,
  formData,
  setFormData,
  selectedFile,
  setSelectedFile,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFont, setSelectedFont] = useState("Default");
  const [themeColor, setThemeColor] = useState("#000000");
  const [qrCodeColor, setQrCodeColor] = useState("#000000");
  const [selectedCard, setSelectedCard] = useState(0);

  const cardColorRef = useRef(null);
  const primaryTextColorRef = useRef(null);
  const secondaryTextColorRef = useRef(null);
  const themeColorRef = useRef(null);
  const qrCodeColorRef = useRef(null);
  const accentColorPremiumRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    } else {
      console.error("fileInputRef is null");
    }
  };

  const handleClearLogo = () => {
    setSelectedFile(null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file);

      event.target.value = null;
    }
  };

  const handleEditClick = (ref) => {
    if (ref.current) {
      ref.current.click();
    }
  };

  const font = [
    "poppins",
    "poppins",
    "poppins",
    "poppins",
    "poppins",
    "poppins",
  ];
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleFontSelect = (font) => {
    setSelectedFont(font);
    setIsOpen(false);
  };

  const handleSliderChange = (e, setter) => {
    const value = e.target.value;
    const max = e.target.max;
    const percentage = (value / max) * 100;
    e.target.style.background = `linear-gradient(to right, #5aba47 ${
      percentage - 10
    }%, #e0e0e0 ${percentage - 4}%)`;
    setter(value);
  };

  const handleLayoutChange = (e) => {
    setSelectedLayout(e.target.value);
  };

  const handleWidthChange = (e) => {
    setLogoWidth(e.target.value);
  };

  const handleHeightChange = (e) => {
    setLogoHeight(e.target.value);
  };
  const handleCardClick = (index) => {
    setSelectedCard(index);
  };

  return (
    <>
      <>
        <div className="Premium-Customize-Details-bg-white">
          <div className="Premium-Customize-Details-bg-grey">
            <div className="p-c-d-inner-bg">
              <p className="Premium-customize-your-title">Choose Card Layout</p>
              <div className="align-flex">
                <label className="radio-container-premium">
                  <p className="align-txt">Layout 1</p>
                  <input
                    type="radio"
                    name="card-layout"
                    value="layout1"
                    checked={selectedLayout === "layout1"} // Default checked
                    onChange={handleLayoutChange}
                  />
                </label>
                <label className="radio-container-premium">
                  <p className="align-txt">Layout 2</p>
                  <input
                    type="radio"
                    name="card-layout"
                    value="layout2"
                    checked={selectedLayout === "layout2"}
                    onChange={handleLayoutChange}
                  />
                </label>
                <label className="radio-container-premium">
                  <p className="align-txt">Layout 3 </p>
                  <input
                    type="radio"
                    name="card-layout"
                    value="layout3"
                    checked={selectedLayout === "layout3"}
                    onChange={handleLayoutChange}
                  />
                </label>
              </div>
            </div>
            <div className="p-c-d-inner-bg p-20">
              <div className="top-premium-container">
                <div className="logo-select-content">
                  <p className="Premium-customize-your-title">Add Logo</p>
                  <div className="add-logo-c">
                    {/* Display selected file preview if available */}
                    {selectedFile ? (
                      <>
                        <div onClick={handleLogoClick}>
                          <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                            accept="image/*" // Limit file types to images
                          />
                          <img
                            src={selectedFile}
                            alt="Selected logo"
                            className="selected-logo-preview"
                          />
                        </div>
                        <span className="delete-logo" onClick={handleClearLogo}>
                          <AiOutlineClose />
                        </span>
                      </>
                    ) : (
                      <>
                        <div onClick={handleLogoClick} className="c-l">
                          {/* Hidden file input */}
                          <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                            accept="image/*" // Limit file types to images
                          />
                          <p className="plus-icon">
                            <FaPlus />
                          </p>
                          <div className="add-logo-txt">Add Logo</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="choose-card-layout-container">
                  <p className="Premium-customize-your-title">Logo Size</p>
                  <div>
                    <label>
                      <p className="maximum-txt">
                        Maximum logo width (in Pixel):
                      </p>
                      <div className="bg-grey-range">
                        <input
                          type="range"
                          min="20"
                          max="200"
                          value={logoWidth || 20}
                          onChange={(e) => handleSliderChange(e, setLogoWidth)}
                          style={{ width: "100%" }}
                          className="custom-slider"
                          disabled={!selectedFile} // Disable if no logo is selected
                        />
                      </div>
                    </label>
                  </div>
                  <div>
                    <label>
                      <p className="maximum-txt p-10">
                        Maximum logo height (in Pixel):
                      </p>
                      <div className="bg-grey-range">
                        <input
                          type="range"
                          min="20"
                          max="200"
                          value={logoHeight || 20} // Ensure value starts at min
                          onChange={(e) => handleSliderChange(e, setLogoHeight)}
                          style={{ width: "100%" }}
                          className="custom-slider"
                          disabled={!selectedFile} // Disable if no logo is selected
                        />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* ----- CUrtomize Card Detail ----- */}
            <div className="p-c-d-inner-bg p-20">
              <p className="Premium-customize-your-title">
                Customise your card's details
              </p>
              <div className="Premium-customize-detail-field">
                <p className="Premium-customize-detial-field-name">Name</p>
                <input
                  type="text"
                  className="Premium-cutomize-field-input"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="Premium-customize-detail-field">
                <p className="Premium-customize-detial-field-name">
                  Additional Information
                </p>
                <input
                  type="text"
                  className="Premium-cutomize-field-input"
                  name="info"
                  value={formData.info}
                  onChange={handleInputChange}
                />
              </div>
              <div className="Premium-customize-detail-field">
                <p className="Premium-customize-detial-field-name">Email</p>
                <span className="toggle-flex">
                  <input
                    type="text"
                    className="cutomize-field-input"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <div className="toggle-btn-standard">
                    <label className="switch-hide-standard">
                      <input
                        type="checkbox"
                        className="Premium-cutomize-field-input"
                        onChange={hideEmailId}
                        defaultChecked
                      />
                      <span className="slider-hide-standard round"></span>
                    </label>
                  </div>
                </span>
              </div>
              <div className="Premium-customize-detail-field">
                <p className="Premium-customize-detial-field-name">
                  Mobile Number
                </p>
                <span className="toggle-flex">
                  <input
                    type="text"
                    className="cutomize-field-input"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                  />
                  <div className="toggle-btn-standard">
                    <label className="switch-hide-standard">
                      <input
                        type="checkbox"
                        className="Premium-cutomize-field-input"
                        onChange={hideMobileNo}
                        defaultChecked
                      />
                      <span className="slider-hide-standard round"></span>
                    </label>
                  </div>
                </span>
              </div>
            </div>
            <div className="s-c-d-inner-bg p-20 p-15-i">
              <p className="Premium-customize-your-title">Custom URL </p>
              <p className="url-title">URL</p>
              <input type="text" className="cutomize-field-input" />
            </div>
            {/* ----- Choose Card Color ----- */}
            <div className="p-c-d-inner-bg p-20">
              <p className="Premium-customize-your-title">Choose Card Color</p>
              <div className="Premium-Customize-Details-bg-grey">
                <div className="flex-color-cotent">
                  <div className="text-secondary">
                    <p className="Premium-customize-your-title-p-5">
                      Background Color
                    </p>

                    <div className="center-content-txt-color">
                      <div className="center-choose-color">
                        <input
                          type="text"
                          className="Premium-color-selector"
                          placeholder="#000000"
                          value={cardColor}
                          onChange={(e) => setCardColor(e.target.value)}
                        />
                        <input
                          className="color-hide color-box"
                          type="color"
                          ref={cardColorRef}
                          value={cardColor}
                          onChange={(e) => setCardColor(e.target.value)}
                        />
                      </div>
                      <div
                        className="edit-color"
                        onClick={() => handleEditClick(cardColorRef)}
                      >
                        <img src={editPen} alt="Edit" />
                      </div>
                    </div>
                  </div>
                  <div className="text-secondary">
                    <p className="Premium-customize-your-title-p-5">
                      Accent Color
                    </p>

                    <div className="center-content-txt-color">
                      <div className="center-choose-color">
                        <input
                          type="text"
                          className="Premium-color-selector"
                          placeholder="#000000"
                          value={accentColorPremium}
                          onChange={(e) =>
                            setAccentColorPremium(e.target.value)
                          }
                        />
                        <input
                          className="color-hide color-box"
                          type="color"
                          ref={accentColorPremiumRef}
                          value={accentColorPremium}
                          onChange={(e) =>
                            setAccentColorPremium(e.target.value)
                          }
                        />
                      </div>
                      <div
                        className="edit-color"
                        onClick={() => handleEditClick(accentColorPremiumRef)}
                      >
                        <img src={editPen} alt="Edit" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ----- Choose Font style & Color ----- */}
            <div className="p-c-d-inner-bg p-20">
              <p className="Premium-customize-your-title">Choose Font Style</p>
              <div className="font-dropdown-container">
                <div className="Premium-customize-dropdown">
                  <input
                    className="Premium-cutomize-field-input h-42"
                    readOnly
                    value={selectedFont}
                    onClick={toggleDropdown}
                  />
                  <span
                    className={`dropdown-arrow ${isOpen ? "rotate" : ""}`}
                    onClick={toggleDropdown}
                  >
                    <SlArrowDown />
                  </span>
                </div>

                <div className={`time-dropdown ${isOpen ? "open" : "closed"}`}>
                  {font.map((font) => (
                    <div
                      key={font}
                      className="time-option"
                      onClick={() => handleFontSelect(font)}
                    >
                      {font}
                    </div>
                  ))}
                </div>
              </div>
              <div className="hr-line-grey"></div>
              <p className="Premium-customize-your-title">Choose Text Color</p>

              <div className="Premium-Customize-Details-bg-grey ">
                <div className="flex-color-cotent">
                  <div className="text-secondary">
                    <p className="Premium-customize-your-title-p-5">
                      Primary Text Color
                    </p>

                    <div className="center-content-txt-color">
                      <div className="center-choose-color">
                        <input
                          type="text"
                          className="Premium-color-selector"
                          placeholder="#000000"
                          value={primaryTextColor}
                          onChange={(e) => setPrimaryTextColor(e.target.value)}
                        />
                        <input
                          className="color-hide color-box"
                          type="color"
                          ref={primaryTextColorRef}
                          value={primaryTextColor}
                          onChange={(e) => setPrimaryTextColor(e.target.value)}
                        />
                      </div>
                      <div
                        className="edit-color"
                        onClick={() => handleEditClick(primaryTextColorRef)}
                      >
                        <img src={editPen} alt="Edit" />
                      </div>
                    </div>
                  </div>
                  <div className="text-secondary">
                    <p className="Premium-customize-your-title-p-5">
                      Secondary Text Color
                    </p>

                    <div className="center-content-txt-color">
                      <div className="center-choose-color">
                        <input
                          type="text"
                          className="Premium-color-selector"
                          placeholder="#000000"
                          value={secondaryTextColor}
                          onChange={(e) =>
                            setSecondaryTextColor(e.target.value)
                          }
                        />
                        <input
                          className="color-hide color-box"
                          type="color"
                          ref={secondaryTextColorRef}
                          value={secondaryTextColor}
                          onChange={(e) =>
                            setSecondaryTextColor(e.target.value)
                          }
                        />
                      </div>
                      <div
                        className="edit-color"
                        onClick={() => handleEditClick(secondaryTextColorRef)}
                      >
                        <img src={editPen} alt="Edit" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ----- Choose Card Theme ----- */}
            <div className="p-c-d-inner-bg p-20">
              <p className="Premium-customize-your-title">Choose Card Theme</p>
              <div className="cards-of-choose-card-theme">
                {/* <div className="grey-cards-premium-theme"></div>
                <div className="grey-cards-premium-theme"></div>
                <div className="grey-cards-premium-theme"></div>
                <div className="grey-cards-premium-theme"></div>
                <div className="grey-cards-premium-theme"></div> */}
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className={`grey-cards-premium-theme ${
                      selectedCard === index ? "selected-card" : ""
                    }`}
                    onClick={() => handleCardClick(index)}
                  ></div>
                ))}
              </div>
            </div>
            {/* ----- QR Code Color ----- */}
            <div className="p-c-d-inner-bg p-20">
              <p className="Premium-customize-your-title">QR Code Color</p>
              <div className="Premium-Customize-Details-bg-grey center-content">
                <div className="center-choose-color">
                  <input
                    type="text"
                    className="Premium-color-selector"
                    placeholder="#000000"
                    value={qrCodeColor}
                    onChange={(e) => setQrCodeColor(e.target.value)}
                  />
                  <input
                    className="color-hide color-box"
                    type="color"
                    ref={qrCodeColorRef}
                    value={qrCodeColor}
                    onChange={(e) => setQrCodeColor(e.target.value)}
                  />
                </div>
                <div
                  className="edit-color"
                  onClick={() => handleEditClick(qrCodeColorRef)}
                >
                  <img src={editPen} alt="Edit" />
                </div>
              </div>
            </div>
            {/* ----- Hideee ----- */}
            <div className="p-c-d-inner-bg p-20">
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
                  <div className="hide-title">Filta Logo</div>
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
    </>
  );
};

export default PremiumPlanDetails;
