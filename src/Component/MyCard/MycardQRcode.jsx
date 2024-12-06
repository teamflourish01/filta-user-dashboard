import React, { useRef, useState } from "react";
import clrpiker from "../../images/desigin_clrpiker.png";
import qrplus from "../../images/qr_plus.png";
const QrcodeComponent = () => {
  const [selectedColor, setSelectedColor] = useState("#000000");

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };
  const ColorRef = useRef(null);
  const handleClrEdit = (ref) => {
    if (ref.current) {
      ref.current.click();
    }
  };
  return (
    <>
      <div className="di-margin ">
        <div className="di-seconedbox rmvmargin35">
          <div className="di-sectitle">
            <p>Edit QR Code</p>
          </div>
          <hr />
          <div className="di-secinfo">
            <p>Color</p>
            <form>
              <div className="di-fltbox">
                <div class="color-picker-container">
                  <div className="di-twoinput">
                    <input
                      type="text"
                      id="color-code"
                      placeholder="#000000"
                      value={selectedColor}
                      onChange={(e) => handleColorChange(e.target.value)}
                    />

                    <input
                      type="color"
                      id="color-picker"
                      ref={ColorRef}
                      value={selectedColor}
                      onChange={(e) => handleColorChange(e.target.value)}
                    />
                  </div>

                  <div
                    id="search-button"
                    onClick={() => handleClrEdit(ColorRef)}
                  >
                    <img src={clrpiker} alt="color piker" />
                  </div>
                </div>
              </div>
              <p>Add Logo </p>
              <div className="qr-logobox">
                <div className="qr-addlogo">
                  <img src={qrplus} alt="qrplus" />
                  <p>Add Logo</p>
                </div>
              </div>
              <div className="di-buttons delpadding">
                <button className="di-cancel">Cancel</button>
                <button className="di-save">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default QrcodeComponent;
