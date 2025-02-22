import React, { useContext, useEffect, useRef, useState } from "react";
import clrpiker from "../../images/desigin_clrpiker.png";
import uparrow from "../../images/design_uparrow.png";
import { SlArrowDown } from "react-icons/sl";
import { FaLock } from "react-icons/fa";
import TwoButton from "./TwoButton";
import userContext from "../../context/userDetails";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const DesignComponent = ({
  layout,
  setLayout,
  colors,
  setColors,
  handleColorChangee,
  handleLayoutChange,
}) => {
  const { userData, AuthorizationToken, getUserData } = useContext(userContext);
  const uri = process.env.REACT_APP_DEV_URL;
  // const [colors, setColors] = useState({
  //   flatColor: userData?.card?.design?.card_background?.flat_color,
  //   grdColor: userData?.card?.design?.card_background?.gradient_color1,
  //   grdSecColor: userData?.card?.design?.card_background?.gradient_color2,
  //   prmColor: userData?.card?.design?.card_color?.primary_color,
  //   secdClor: userData?.card?.design?.card_color?.secondary_color,
  //   natClor: userData?.card?.design?.card_color?.neutral_color,
  //   prmTxtColor: userData?.card?.design?.font_style?.primary_text_color,
  //   secTxtColor: userData?.card?.design?.font_style?.secondary_text_color,
  //   themeColor: userData?.card?.design?.theme_color,
  // });
  const refs = {
    flatColor: useRef(null),
    grdColor: useRef(null),
    grdSecColor: useRef(null),
    prmColor: useRef(null),
    secdClor: useRef(null),
    natClor: useRef(null),
    prmTxtColor: useRef(null),
    secTxtColor: useRef(null),
    themeColor: useRef(null),
  };
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFont, setSelectedFont] = useState("Poppins");
  const [fonts, setFonts] = useState([]);
  const [selectedFontStyles, setSelectedFontStyles] = useState([]);
  const [fontFmly, setFontfmly] = useState(
    userData?.card?.design?.font_style?.font_family
  );
  const navigate = useNavigate();

  const handleColorEdit = (name) => {
    if (refs[name]?.current) {
      refs[name].current.click();
    }
  };
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const handleFontSelect = (selectedFontFamily) => {
    if (!userData.premium) {
      alert("Please purchase the premium plan!");
      navigate("/subscription");
      return;
    }
    setSelectedFont(selectedFontFamily);
    const selectedFontStyles = fonts
      .filter((font) => font.family === selectedFontFamily)
      .map((font) => font.name);

    setSelectedFontStyles(selectedFontStyles);
    setIsOpen(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!userData.premium) {
      alert("Please purchase the premium plan!");
      // navigate("/subscription");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("design.card_background.flat_color", colors.flatColor);
      formData.append(
        "design.card_background.gradient_color1",
        colors.grdColor
      );
      formData.append(
        "design.card_background.gradient_color2",
        colors.grdSecColor
      );
      formData.append("design.card_color.primary_color", colors.prmColor);
      formData.append("design.card_color.secondary_color", colors.secdClor);
      formData.append("design.card_color.neutral_color", colors.natClor);

      formData.append(
        "design.font_style.primary_text_color",
        colors.prmTxtColor
      );
      formData.append(
        "design.font_style.secondary_text_color",
        colors.secTxtColor
      );
      formData.append("design.theme_color", colors.themeColor);
      // Append the layout data to the form
      formData.append("design.layout", layout);
      selectedFontStyles.forEach((font) => {
        formData.append("design.font_style.font_family", font);
      });
      const response = await axios.patch(`${uri}/card/editcard`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: AuthorizationToken,
        },
      });
      alert(response.data.msg || "Data updated successfully!");
      getUserData();
    } catch (error) {
      console.error("Error updating data:", error);
      alert(error.response?.data?.error || "Failed to update data");
    }
  };
  useEffect(() => {
    const fetchFonts = async () => {
      const response = await fetch(`${uri}/font/getall`);
      const data = await response.json();
      setFonts(data);
    };
    fetchFonts();
  }, []);
  const uniqueFontFamilies = [...new Set(fonts.map((font) => font.family))];

  console.log("fontFmly style", fontFmly);

  useEffect(() => {
    setLayout(userData?.card?.design?.layout);
    setColors({
      flatColor: userData?.card?.design?.card_background?.flat_color,
      grdColor: userData?.card?.design?.card_background?.gradient_color1,
      grdSecColor: userData?.card?.design?.card_background?.gradient_color2,
      prmColor: userData?.card?.design?.card_color?.primary_color,
      secdClor: userData?.card?.design?.card_color?.secondary_color,
      natClor: userData?.card?.design?.card_color?.neutral_color,
      prmTxtColor: userData?.card?.design?.font_style?.primary_text_color,
      secTxtColor: userData?.card?.design?.font_style?.secondary_text_color,
      themeColor: userData?.card?.design?.theme_color,
    });
  }, []);

  return (
    <>
      <div className="di-margin">
        {/* first Box */}

        <div className="di-maindiv">
          <div className="di-title">
            <p>Card Layout</p>
          </div>
          <hr />
          <form onSubmit={onSubmit}>
            <div className="di-info">
              <p>Choose Card Layout</p>
              <div className="di-threebtn">
                <div className="di-lftbtn">
                  <label>
                    Left Align
                    <input
                      type="radio"
                      value="left"
                      checked={layout === "left"}
                      onChange={handleLayoutChange}
                    />
                  </label>
                </div>
                <div className="di-ctrtbtn">
                  <label>
                    Center Align
                    <input
                      type="radio"
                      value="center"
                      checked={layout === "center"}
                      onChange={handleLayoutChange}
                    />
                  </label>
                </div>
                <div className="di-rgtbtn">
                  <label>
                    Portrait
                    <input
                      type="radio"
                      value="portrait"
                      checked={layout === "portrait"}
                      onChange={handleLayoutChange}
                    />
                  </label>
                </div>
              </div>
              <div className="di-buttons">
                {/* Pass the layout to TwoButton */}
                <TwoButton layout={layout} />
              </div>
            </div>
          </form>
        </div>
        {/* Seconed Box */}
        <div className="di-seconedbox">
          <div className="di-sectitle">
            <p>Card Background Color</p>
          </div>
          <hr />
          <div className="di-secinfo">
            <p>Flat Color</p>
            <form onSubmit={onSubmit}>
              <div className="di-fltbox">
                <div class="color-picker-container">
                  <div className="di-twoinput">
                    <input
                      type="text"
                      id="color-code"
                      name="flatColor"
                      placeholder="#000000"
                      value={
                        colors.flatColor ||
                        userData?.card?.design?.card_background?.flat_color
                      }
                      onChange={handleColorChangee}
                    />

                    <input
                      type="color"
                      id="color-picker"
                      name="flatColor"
                      ref={refs.flatColor}
                      value={
                        colors.flatColor
                        // userData?.card?.design?.card_background?.flat_color
                      }
                      onChange={handleColorChangee}
                    />
                  </div>

                  <div
                    id="search-button"
                    onClick={() => handleColorEdit("flatColor")}
                  >
                    <img src={clrpiker} alt="color piker" />
                  </div>
                </div>
              </div>
              <p>Gradient Color </p>
              <div className="di-grdbox">
                <div class="color-picker-container">
                  <div className="di-twoinput">
                    <input
                      type="text"
                      id="color-code"
                      name="grdColor"
                      placeholder="#000000"
                      value={colors.grdColor}
                      onChange={handleColorChangee}
                    />
                    <input
                      type="color"
                      id="color-picker"
                      name="grdColor"
                      ref={refs.grdColor}
                      value={colors.grdColor}
                      onChange={handleColorChangee}
                    />
                  </div>

                  <div id="search-button">
                    <img
                      src={clrpiker}
                      alt="color piker"
                      onClick={() => handleColorEdit("grdColor")}
                    />
                  </div>
                </div>
                <div className="di-arrowimg">
                  <img src={uparrow} alt="up_Arrow" />
                </div>

                <div class="color-picker-container">
                  <div className="di-twoinput">
                    <input
                      type="text"
                      id="color-code"
                      name="grdSecColor"
                      placeholder="#000000"
                      value={colors.grdSecColor}
                      onChange={handleColorChangee}
                    />

                    <input
                      type="color"
                      id="color-picker"
                      name="grdSecColor"
                      ref={refs.grdSecColor}
                      value={colors.grdSecColor}
                      onChange={handleColorChangee}
                    />
                  </div>

                  <div
                    id="search-button"
                    onClick={() => handleColorEdit("grdSecColor")}
                  >
                    <img src={clrpiker} alt="color piker" />
                  </div>
                </div>
              </div>
              <div className="di-buttons delpadding">
                {/* <button className="di-cancel">Cancel</button>
                <button className="di-save">Save</button> */}
                <TwoButton />
              </div>
            </form>
          </div>
        </div>
        {/* Third Box */}
        <div className="di-thrdbox">
          <div className="di-thrdtitle">
            <p>Card Color</p>
          </div>
          <hr />
          <div className="di-thrdinfo">
            <p>Choose Color</p>
            <form onSubmit={onSubmit}>
              <div className="di-choosebox">
                <div className="thr-padding">
                  {/* Primary color */}
                  <div class="trd-color-container margin-botm">
                    <div className="trd-twoinput-container">
                      <label htmlFor="thr-color-code">Primary Color</label>
                      <div className="thr-inputandbtn">
                        <div className="trd-twoinput">
                          <input
                            type="text"
                            id="thr-color-code"
                            name="prmColor"
                            placeholder="#000000"
                            value={colors.prmColor}
                            onChange={handleColorChangee}
                          />

                          <input
                            type="color"
                            id="thr-color-picker"
                            name="prmColor"
                            value={colors.prmColor}
                            ref={refs.prmColor}
                            onChange={handleColorChangee}
                          />
                        </div>
                        <div
                          id="search-button"
                          onClick={() => handleColorEdit("prmColor")}
                        >
                          <img src={clrpiker} alt="color piker" />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Secondary Color */}
                  <div class="trd-color-container margin-botm">
                    <div className="trd-twoinput-container">
                      <label htmlFor="thr-color-code">Secondary Color</label>
                      <div className="thr-inputandbtn">
                        <div className="trd-twoinput">
                          <input
                            type="text"
                            id="thr-color-code"
                            placeholder="#000000"
                            name="secdClor"
                            value={colors.secdClor}
                            onChange={handleColorChangee}
                          />

                          <input
                            type="color"
                            id="thr-color-picker"
                            name="secdClor"
                            value={colors.secdClor}
                            ref={refs.secdClor}
                            onChange={handleColorChangee}
                          />
                        </div>
                        <div
                          id="search-button"
                          onClick={() => handleColorEdit("secdClor")}
                        >
                          <img src={clrpiker} alt="color piker" />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Neutral Color */}
                  <div class="trd-color-container ">
                    <div className="trd-twoinput-container">
                      <label htmlFor="thr-color-code">Neutral Color</label>
                      <div className="thr-inputandbtn">
                        <div className="trd-twoinput">
                          <input
                            type="text"
                            id="thr-color-code"
                            placeholder="#000000"
                            name="natClor"
                            value={colors.natClor}
                            onChange={handleColorChangee}
                          />

                          <input
                            type="color"
                            id="thr-color-picker"
                            name="natClor"
                            value={colors.natClor}
                            ref={refs.natClor}
                            onChange={handleColorChangee}
                          />
                        </div>
                        <div
                          id="search-button"
                          onClick={() => handleColorEdit("natClor")}
                        >
                          <img src={clrpiker} alt="color piker" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="di-buttons delpadding">
                {/* <button className="di-cancel">Cancel</button>
              <button className="di-save">Save</button> */}
                <TwoButton />
              </div>
            </form>
          </div>
        </div>
        {/* Font Style & Font Color Box */}
        <div className="di-thrdbox">
          <div className="di-thrdtitle">
            <p>Font Style & Font Color</p>
          </div>
          <hr />
          <form onSubmit={onSubmit}>
            <div className="di-thrdinfo delpadding">
              <div className="drp-dropdown">
                <p>Choose Font Style</p>
                <div className="drp-dropdown-main">
                  <div className="drp-dropdownbox">
                    <input
                      className="Premium-cutomize-field-input h-42"
                      readOnly
                      value={selectedFont}
                      onClick={toggleDropdown}
                    />
                    <span
                      className={`drp-dropdown-arrow ${isOpen ? "rotate" : ""}`}
                      onClick={toggleDropdown}
                    >
                      <SlArrowDown />
                    </span>
                  </div>

                  <div
                    className={`drp-optionbox ${isOpen ? "open" : "closed"}`}
                  >
                    {uniqueFontFamilies.map((font) => (
                      <div
                        key={font}
                        className="drp-option drp-lock"
                        onClick={() => handleFontSelect(font)}
                      >
                        <span>{font}</span>
                        {!userData.premium && <FaLock />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <hr />
              <div className="di-txtclrbox">
                <p>Choose Text Color</p>
                <div className="di-choosebox">
                  <div className="thr-padding">
                    <div class="trd-color-container margin-botm">
                      <div className="trd-twoinput-container">
                        <label htmlFor="thr-color-code">
                          Primary Text Color
                        </label>
                        <div className="thr-inputandbtn">
                          <div className="trd-twoinput">
                            <input
                              type="text"
                              id="thr-color-code"
                              placeholder="#000000"
                              name="prmTxtColor"
                              value={colors.prmTxtColor}
                              onChange={handleColorChangee}
                            />

                            <input
                              type="color"
                              id="thr-color-picker"
                              name="prmTxtColor"
                              value={colors.prmTxtColor}
                              ref={refs.prmTxtColor}
                              onChange={handleColorChangee}
                            />
                          </div>
                          <div
                            id="search-button"
                            onClick={() => handleColorEdit("prmTxtColor")}
                          >
                            <img src={clrpiker} alt="color piker" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="trd-color-container margin-botm">
                      <div className="trd-twoinput-container">
                        <label htmlFor="thr-color-code">
                          Secondary Text Color
                        </label>
                        <div className="thr-inputandbtn">
                          <div className="trd-twoinput">
                            <input
                              type="text"
                              id="thr-color-code"
                              placeholder="#000000"
                              name="secTxtColor"
                              value={colors.secTxtColor}
                              onChange={handleColorChangee}
                            />

                            <input
                              type="color"
                              id="thr-color-picker"
                              name="secTxtColor"
                              value={colors.secTxtColor}
                              ref={refs.secTxtColor}
                              onChange={handleColorChangee}
                            />
                          </div>
                          <div
                            id="search-button"
                            onClick={() => handleColorEdit("secTxtColor")}
                          >
                            <img src={clrpiker} alt="color piker" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="di-buttons delpadding">
                  {/* <button className="di-cancel">Cancel</button>
                  <button className="di-save">Save</button> */}
                  <TwoButton />
                </div>
              </div>
            </div>
          </form>
        </div>
        {/* Themes Box */}
        <div className="di-thrdbox">
          <div className="di-thrdtitle">
            <p>Themes</p>
          </div>
          <hr />
          <div className="di-thrdinfo delpadding">
            <div className="di-forbox">
              <p>Choose Theme</p>
              <div className="thm-theme">
                <div className="thm-layout"></div>
                <div className="thm-layout"></div>
                <div className="thm-layout"></div>
                <div className="thm-layout"></div>
                <div className="thm-layout"></div>
                <div className="thm-layout"></div>
                <div className="thm-layout"></div>
              </div>
            </div>
            <hr />
            <div className="di-secinfo delmargin delpadd">
              <form onSubmit={onSubmit}>
                <p>Choose Theme Color</p>
                <div className="di-fltbox">
                  <div class="color-picker-container">
                    <div className="di-twoinput">
                      <input
                        type="text"
                        id="color-code"
                        placeholder="#000000"
                        name="themeColor"
                        value={colors.themeColor}
                        onChange={handleColorChangee}
                      />

                      <input
                        type="color"
                        id="color-picker"
                        name="themeColor"
                        value={colors.themeColor}
                        ref={refs.themeColor}
                        onChange={handleColorChangee}
                      />
                    </div>

                    <div
                      id="search-button"
                      onClick={() => handleColorEdit("themeColor")}
                    >
                      <img src={clrpiker} alt="color piker" />
                    </div>
                  </div>
                </div>
                <div className="btnmargin-10">
                  <TwoButton />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesignComponent;
