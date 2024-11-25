import React from "react";
import clrpiker from "../../images/desigin_clrpiker.png";
import uparrow from "../../images/design_uparrow.png";
import arrowIcon from "../../images/ct_downarrow.png";
const DesignComponent = () => {
  return (
    <>
      <div className="di-margin">
        {/* first Box */}
        <div className="di-maindiv">
          <div className="di-title">
            <p>Card Layout</p>
          </div>
          <hr />
          <div className="di-info">
            <p>Choose Card Layout</p>
            <div className="di-threebtn">
              <div className="di-lftbtn">
                <label>
                  Left Align
                  <input type="radio" />
                </label>
              </div>
              <div className="di-ctrtbtn">
                <label>
                  Center Align
                  <input type="radio" />
                </label>
              </div>
              <div className="di-rgtbtn">
                <label>
                  Portrait
                  <input type="radio" />
                </label>
              </div>
            </div>
            <div className="di-buttons">
              <button className="di-cancel">Cancel</button>
              <button className="di-save">Save</button>
            </div>
          </div>
        </div>
        {/* Seconed Box */}
        <div className="di-seconedbox">
          <div className="di-sectitle">
            <p>Card Background Color</p>
          </div>
          <hr />
          <div className="di-secinfo">
            <p>Flat Color</p>
            <div className="di-fltbox">
              <div class="color-picker-container">
                <div className="di-twoinput">
                  <input type="text" id="color-code" placeholder="#000000" />

                  <input type="color" id="color-picker" />
                </div>

                <button id="search-button">
                  <img src={clrpiker} alt="color piker" />
                </button>
              </div>
            </div>
            <p>Gradient Color </p>
            <div className="di-grdbox">
              <div class="color-picker-container">
                <div className="di-twoinput">
                  <input type="text" id="color-code" placeholder="#000000" />

                  <input type="color" id="color-picker" />
                </div>

                <button id="search-button">
                  <img src={clrpiker} alt="color piker" />
                </button>
              </div>
              <img src={uparrow} alt="up_Arrow" />
              <div class="color-picker-container">
                <div className="di-twoinput">
                  <input type="text" id="color-code" placeholder="#000000" />

                  <input type="color" id="color-picker" />
                </div>

                <button id="search-button">
                  <img src={clrpiker} alt="color piker" />
                </button>
              </div>
            </div>
            <div className="di-buttons delpadding">
              <button className="di-cancel">Cancel</button>
              <button className="di-save">Save</button>
            </div>
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
                          placeholder="#000000"
                        />

                        <input type="color" id="thr-color-picker" />
                      </div>
                      <button id="search-button">
                        <img src={clrpiker} alt="color piker" />
                      </button>
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
                        />

                        <input type="color" id="thr-color-picker" />
                      </div>
                      <button id="search-button">
                        <img src={clrpiker} alt="color piker" />
                      </button>
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
                        />

                        <input type="color" id="thr-color-picker" />
                      </div>
                      <button id="search-button">
                        <img src={clrpiker} alt="color piker" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="di-buttons delpadding">
              <button className="di-cancel">Cancel</button>
              <button className="di-save">Save</button>
            </div>
          </div>
        </div>
        {/* Font Style & Font Color Box */}
        <div className="di-thrdbox">
          <div className="di-thrdtitle">
            <p>Font Style & Font Color</p>
          </div>
          <hr />
          <div className="di-thrdinfo delpadding">
            <div className="di-forbox">
              <p>Choose Font Style</p>
              <div className="di-dropdown">
                <div className="di-custom-select">
                  <select id="ct-select" className="di-select" defaultValue="">
                    <option value="" disabled>
                      Default
                    </option>
                    <option value="option1">Poppins</option>
                    <option value="option2">Poppins</option>
                    <option value="option3">Poppins</option>
                    <option value="option4">Poppins</option>
                  </select>
                  <img
                    src={arrowIcon}
                    alt="down arrow"
                    className="di-arrow-icon"
                  />
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
                      <label htmlFor="thr-color-code">Primary Text Color</label>
                      <div className="thr-inputandbtn">
                        <div className="trd-twoinput">
                          <input
                            type="text"
                            id="thr-color-code"
                            placeholder="#000000"
                          />

                          <input type="color" id="thr-color-picker" />
                        </div>
                        <button id="search-button">
                          <img src={clrpiker} alt="color piker" />
                        </button>
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
                          />

                          <input type="color" id="thr-color-picker" />
                        </div>
                        <button id="search-button">
                          <img src={clrpiker} alt="color piker" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="di-buttons delpadding">
                <button className="di-cancel">Cancel</button>
                <button className="di-save">Save</button>
              </div>
            </div>
          </div>
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
            <div className="di-secinfo delmargin">
              <p>Choose Theme Color</p>
              <div className="di-fltbox">
                <div class="color-picker-container">
                  <div className="di-twoinput">
                    <input type="text" id="color-code" placeholder="#000000" />

                    <input type="color" id="color-picker" />
                  </div>

                  <button id="search-button">
                    <img src={clrpiker} alt="color piker" />
                  </button>
                </div>
              </div>
              <div className="di-buttons delpadding">
                <button className="di-cancel">Cancel</button>
                <button className="di-save">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesignComponent;
