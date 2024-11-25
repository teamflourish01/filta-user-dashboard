import React from "react";
import clrpiker from "../../images/desigin_clrpiker.png";
import qrplus from "../../images/qr_plus.png";
const QrcodeComponent=()=>{
    return(<>
        <div className="di-margin ">
              <div className="di-seconedbox">
                <div className="di-sectitle">
                  <p>Edit QR Code</p>
                </div>
                <hr />
                <div className="di-secinfo">
                  <p>Color</p>
                  <div className="di-fltbox">
                    <div class="color-picker-container">
                      <div className="di-twoinput">
                        <input
                          type="text"
                          id="color-code"
                          placeholder="#000000"
                        />

                        <input type="color" id="color-picker" />
                      </div>

                      <button id="search-button">
                        <img src={clrpiker} alt="color piker" />
                      </button>
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
                </div>
              </div>
            </div>
    </>)
}

export default QrcodeComponent