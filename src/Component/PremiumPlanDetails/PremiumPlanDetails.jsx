import React, { useContext, useEffect, useRef, useState } from "react";
import "../PremiumPlanDetails/PremiumPlanDetails.css";
import editPen from "../../images/pickup.svg";
import { SlArrowDown } from "react-icons/sl";
import { FaPlus } from "react-icons/fa6";
import "../StandardCustomizeDetail/StandardCustomizeDetail.css";
import { MdOutlineDeleteForever } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import theme1 from "../../images/NFC-Theme/theme1.svg";
import theme2 from "../../images/NFC-Theme/theme2.svg";
import theme3 from "../../images/NFC-Theme/theme3.svg";
import theme4 from "../../images/NFC-Theme/theme4.svg";
import theme5 from "../../images/NFC-Theme/theme5.svg";
import axios from "axios";
import userContext from "../../context/userDetails";

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
  selectedCard,
  setSelectedCard,
  imageUrls,
  useBackgroundColor,
  setUseBackgroundColor,
}) => {
  const uri = process.env.REACT_APP_DEV_URL;
  const { userData, AuthorizationToken, getUserData } = useContext(userContext);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedFont, setSelectedFont] = useState("Default (Poppins)");
  const [themeColor, setThemeColor] = useState("#000000");
  const [qrCodeColor, setQrCodeColor] = useState("#000000");
  const [logoUrl,setLogoUrl]=useState(`${uri}/nfcpremium/${formData?.logo}`)
  // const [selectedCard, setSelectedCard] = useState(0);

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
  const handleFileChange = (e,setter,setterUrl) => {

    const file = e.target.files[0];
    if (file) {
      setter(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        
        setterUrl(reader.result)
      
        // setFormData((prevFormData) => ({
        //   ...prevFormData,
        //   logo: reader.result, // Save the file URL as logo
        // }));
        
      }
      // e.target.value = null;
      reader.readAsDataURL(file);
    }
    e.target.value=null
  };

  const handleEditClick = (ref) => {
    if (ref.current) {
      ref.current.click();
    }
  };

  const font = [
    "Default (Poppins)",
    "Raleway",
    "Lato",
    "Montserrat",
    "Jost",
    "Playfair",
    "Josefin Sans",
    "PT Sarif",
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
    console.log(useBackgroundColor, "nn");
  };

  const handleSave = async (e) => {
    e.preventDefault();

    
    let newData = new FormData();
    Object.keys(formData).forEach((key) => {
      newData.append(key, formData[key]);
    });
    newData.append("logo",selectedFile)
    try {
      const response = await axios.post(
        `${uri}/nfcpremium/add`,
        newData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: AuthorizationToken,
          },
        }
      );

      console.log(response, "standardp");
      alert(`${response?.data?.msg}`);
    } catch (error) {
      console.error("Error saving About Data:", error);
    }
  };
  useEffect(()=>{
    getUserData()
  },[])

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
                    name="cardLayout"
                    value="layout1"
                    checked={formData.cardLayout === "layout1"} // Default checked
                    // onChange={handleLayoutChange}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                  />
                </label>
                <label className="radio-container-premium">
                  <p className="align-txt">Layout 2</p>
                  <input
                    type="radio"
                    name="cardLayout"
                    value="layout2"
                    checked={formData.cardLayout === "layout2"}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                  />
                </label>
                <label className="radio-container-premium">
                  <p className="align-txt">Layout 3 </p>
                  <input
                    type="radio"
                    name="cardLayout"
                    value="layout3"
                    checked={formData.cardLayout === "layout3"}
                    // onChange={handleLayoutChange}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
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
                    {selectedFile || userData?.nfcPremium?.logo ? (
                      <>
                        <div onClick={handleLogoClick}>
                          <input
                            type="file"
                            ref={fileInputRef}
                            name="logo"
                            style={{ display: "none" }}
                            onChange={(e) => {
                              handleFileChange(e,setSelectedFile,setLogoUrl)
                              handleInputChange(e);
                            }}
                            accept="image/*" // Limit file types to images
                          />
                          <img
                            src={`${uri}/nfcpremium/${userData?.nfcPremium?.logo}`}
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
                            
                            name="logo"
                            style={{ display: "none" }}
                            // onChange={handleFileChange}
                            onChange={(e) => {
                              handleFileChange(e,setSelectedFile,setLogoUrl)
                              handleInputChange(e);
                            }}
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
                  <p className="Premium-customize-your-title logo-mob-p-8-p">
                    Logo Size
                  </p>
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
                  value={formData.name || userData?.nfcPremium?.name}
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
                  name="additional"
                  value={formData.additional}
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
                    name="mobile"
                    value={formData.mobile}
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
              <input
                type="text"
                name="card_url"
                value={formData.card_url}
                className="cutomize-field-input"
                onChange={handleInputChange}
              />
            </div>
            {/* ----- Choose Card Color ----- */}
            <div className="p-c-d-inner-bg p-20">
              <p className="Premium-customize-your-title">Choose Card Color</p>
              <div className="Premium-Customize-Details-bg-grey-inner">
                <div className="flex-color-cotent">
                  <div className="text-secondary">
                    <p className="Premium-customize-your-title-p-5">
                      Background Color
                    </p>

                    <div className="center-content-txt-color">
                      <div className="center-choose-color">
                        <input
                          type="text"
                          name="cardBackgroundColor"
                          className="Premium-color-selector"
                          placeholder="#000000"
                          value={formData.cardBackgroundColor}
                          // onChange={(e) => setCardColor(e.target.value)}
                          onChange={(e) => {
                            setSelectedCard(null);
                            setCardColor(e.target.value);
                            setUseBackgroundColor(false); // Switch to color mode
                            handleInputChange(e);
                          }}
                        />
                        <input
                          className="color-hide color-box"
                          type="color"
                          name="cardBackgroundColor"
                          ref={cardColorRef}
                          // value={cardColor}
                          value={formData.cardBackgroundColor}
                          // onChange={(e) => setCardColor(e.target.value)}
                          onChange={(e) => {
                            setSelectedCard(null);
                            setCardColor(e.target.value);
                            setUseBackgroundColor(true); // Switch to color mode
                            handleInputChange(e);
                          }}
                        />
                      </div>
                      <div
                        className="edit-color"
                        onClick={() => handleEditClick(cardColorRef)}
                        onChange={(e) => handleInputChange(e)}
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
                          name="accentColor"
                          className="Premium-color-selector"
                          placeholder="#000000"
                          // value={accentColorPremium}
                          value={formData.accentColor}
                          onChange={(e) => {
                            setAccentColorPremium(e.target.value);
                            handleInputChange(e);
                          }}
                        />
                        <input
                          className="color-hide color-box"
                          name="accentColor"
                          type="color"
                          ref={accentColorPremiumRef}
                          // value={accentColorPremium}
                          value={formData.accentColor}
                          onChange={(e) => {
                            setAccentColorPremium(e.target.value);
                            handleInputChange(e);
                          }}
                        />
                      </div>
                      <div
                        className="edit-color"
                        onClick={() => handleEditClick(accentColorPremiumRef)}
                        onChange={(e) => handleInputChange(e)}
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
                {imageUrls.map((url, index) => (
                  <div
                    key={index}
                    className={`grey-cards-premium-theme ${
                      selectedCard === index ? "selected-card" : ""
                    }`}
                    // onClick={() => handleCardClick(index)}
                    onClick={() => {
                      handleCardClick(index);
                      setUseBackgroundColor(false); // Switch to image mode
                    }}
                    style={{
                      backgroundImage: `url(${url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                ))}
              </div>
            </div>
            {/* ----- Choose Font style & Color ----- */}
            <div className="p-c-d-inner-bg p-20">
              <p className="Premium-customize-your-title">Choose Font Style</p>
              <div className="font-dropdown-container">
                <div className="Premium-customize-dropdown">
                  <input
                    className="Premium-cutomize-field-input-dropdown h-42"
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
                      // className="time-option"
                      className={`time-option ${
                        font === selectedFont ? "selected-font" : ""
                      }`}
                      onClick={() => handleFontSelect(font)}
                    >
                      {font}
                    </div>
                  ))}
                </div>
              </div>
              <div className="hr-line-grey"></div>
              <p className="Premium-customize-your-title logo-mob-p-8-p p-c-t-c-t">
                Choose Text Color
              </p>

              <div className="Premium-Customize-Details-bg-grey-inner ">
                <div className="flex-color-cotent">
                  <div className="text-secondary">
                    <p className="Premium-customize-your-title-p-5 ">
                      Primary Text Color
                    </p>

                    <div className="center-content-txt-color p-b-5-25">
                      <div className="center-choose-color">
                        <input
                          type="text"
                          name="primaryTextColor"
                          className="Premium-color-selector"
                          placeholder="#000000"
                          // value={primaryTextColor}
                          value={formData.primaryTextColor}
                          onChange={(e) => {
                            setPrimaryTextColor(e.target.value);
                            handleInputChange(e);
                          }}
                        />
                        <input
                          className="color-hide color-box"
                          type="color"
                          name="primaryTextColor"
                          ref={primaryTextColorRef}
                          // value={primaryTextColor}
                          value={formData.primaryTextColor}
                          onChange={(e) => {
                            setPrimaryTextColor(e.target.value);
                            handleInputChange(e);
                          }}
                        />
                      </div>
                      <div
                        className="edit-color"
                        onClick={() => handleEditClick(primaryTextColorRef)}
                        onChange={(e) => handleInputChange(e)}
                      >
                        <img src={editPen} alt="Edit" />
                      </div>
                    </div>
                  </div>
                  <div className="text-secondary">
                    <p className="Premium-customize-your-title-p-5">
                      Secondary Text Color
                    </p>

                    <div className="center-content-txt-color p-b-5-25">
                      <div className="center-choose-color">
                        <input
                          type="text"
                          name="secondaryTextColor"
                          className="Premium-color-selector"
                          placeholder="#000000"
                          // value={secondaryTextColor}
                          value={formData.secondaryTextColor}
                          onChange={(e) => {
                            setSecondaryTextColor(e.target.value);
                            handleInputChange(e);
                          }}
                        />
                        <input
                          className="color-hide color-box"
                          type="color"
                          name="secondaryTextColor"
                          ref={secondaryTextColorRef}
                          // value={secondaryTextColor}
                          value={formData.secondaryTextColor}
                          onChange={(e) => {
                            setSecondaryTextColor(e.target.value);
                            handleInputChange(e);
                          }}
                        />
                      </div>
                      <div
                        className="edit-color"
                        onClick={() => handleEditClick(secondaryTextColorRef)}
                        onChange={(e) => handleInputChange(e)}
                      >
                        <img src={editPen} alt="Edit" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ----- QR Code Color ----- */}
            <div className="p-c-d-inner-bg p-20">
              <p className="Premium-customize-your-title">QR Code Color</p>
              <div className="Premium-Customize-Details-bg-grey-inner center-content">
                <div className="center-choose-color">
                  <input
                    type="text"
                    name="qrCodeColor"
                    className="Premium-color-selector"
                    placeholder="#000000"
                    // value={qrCodeColor}
                    value={formData.qrCodeColor}
                    onChange={(e) => {
                      setQrCodeColor(e.target.value);
                      handleInputChange(e);
                    }}
                  />
                  <input
                    className="color-hide color-box"
                    type="color"
                    name="qrCodeColor"
                    ref={qrCodeColorRef}
                    // value={qrCodeColor}
                    value={formData.qrCodeColor}
                    onChange={(e) => {
                      setQrCodeColor(e.target.value);
                      handleInputChange(e);
                    }}
                  />
                </div>
                <div
                  className="edit-color"
                  onClick={() => handleEditClick(qrCodeColorRef)}
                  onChange={(e) => handleInputChange(e)}
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
                      <input
                        type="checkbox"
                        name="hideNfc"
                        onChange={(e) => {
                          hideNfc();
                          handleInputChange(!e.target.checked);
                        }}
                      />
                      <span className="slider-hide round"></span>
                    </label>
                  </div>
                </div>
              </div>
              <p className="customize-your-title p-15">Filta Logo</p>
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
              <button
                type="button"
                className="save-blk-btn"
                onClick={handleSave}
              >
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
