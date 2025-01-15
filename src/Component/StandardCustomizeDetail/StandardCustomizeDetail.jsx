import React, { useContext, useEffect, useRef, useState } from "react";
import "../StandardCustomizeDetail/StandardCustomizeDetail.css";
import editPen from "../../images/pickup.svg";
import axios from "axios";
import userContext from "../../context/userDetails";

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
  const { userData, AuthorizationToken, getUserData } = useContext(userContext);
  
  const [selectedColor, setSelectedColor] = useState(userData?.nfcStandard?.card_color);

  const uri = process.env.REACT_APP_DEV_URL;

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

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${uri}/nfc-standard/add`,
        { ...formData },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: AuthorizationToken,
          },
        }
      );
    
      // console.log(response, "standardp");
      alert(`${response?.data?.message}`);
    } catch (error) {
      console.error("Error saving About Data:", error);
    }
  };
  useEffect(()=>{
    getUserData()
  },[])

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
                name="additional"
                value={formData.additional}
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
                    <input
                      type="checkbox"
                      onChange={hideEmailId}
                      defaultChecked
                    />
                    <span className="slider-hide-standard round"></span>
                  </label>
                </div>
              </span>
            </div>
            <div className="customize-detail-field">
              <p className="customize-detial-field-name">Mobile Number</p>
              <span className="toggle-flex">
                <input
                  type="text"
                  className="cutomize-field-input"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                <div className="toggle-btn-standard">
                  <label className="switch-hide-standard">
                    <input
                      type="checkbox"
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
            <p className="customize-your-title">Custom URL </p>
            <p className="url-title">URL</p>
            <input
              type="text"
              name="card_url"
              className="cutomize-field-input"
              value={formData.card_url}
              onChange={handleInputChange}
            />
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
                  name="card_color"
                  value="black"
                  className="black-color"
                  onChange={(e) => {
                    handleColorChangeLocal("black");
                    handleInputChange(e);
                  }}
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
                  name="card_color"
                  value="white"
                  onChange={(e) => {handleColorChangeLocal("white")
                    handleInputChange(e);
                  }}
                />
                <p className="check-title">White</p>
              </label>
            </div>
            <p className="title-accent">Accent Color</p>

            <div className="center-content-txt-color-std">
              <div className="center-choose-color">
                <input
                  type="text"
                  name='accent_color'
                  className="Standard-color-selector"
                  placeholder="#000000"
                  value={accentColor}
                  onChange={(e) => {setAccentColor(e.target.value)
                    handleInputChange(e);
                  }}
                />
                <input
                  className="color-hide color-box"
                  type="color"
                  name='accent_color'
                  ref={accentColorRef}
                  value={accentColor}
                  onChange={(e) => {setAccentColor(e.target.value)
                    handleInputChange(e);
                  }}
                />
              </div>
              <div
                className="edit-color"
                onClick={() => handleEditClick(accentColorRef)}
                onChange={(e) =>  handleInputChange(e)}
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
                    <input type="checkbox" name="hide_nfc" 
                    onChange={(e) => {hideNfc()
                      handleInputChange({ target: { name: "hide_nfc", value: e.target.checked } });
                    }} />
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
                    <input type="checkbox"  onChange={logoHide
                    } />
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
            <button type="button" className="save-blk-btn" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StandardCustomizeDetail;
