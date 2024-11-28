import React, { useState } from "react";
import uploadimg from "../../images/uploadimg.png";
import prodImg from "../../images/product_gallary.svg";
import editImg from "../../images/product_edit.svg";
import deltImg from "../../images/product_delet.svg";
import "../../Component/MyCard/Productgallary.css";
import TwoButton from "./TwoButton";
const ProductGallery = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };
  return (
    <>
      <div className="mlt-margin">
        <div className="mlt-info">
          <span className="mlt-title">Info : </span>
          <span className="mlt-desc">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </span>
        </div>
        <div className="prd-padding">
          <p className="prd-vdtitle">Upload Image</p>
          <div className="prd-uplodcontainer">
            <div className="prd-uplod">
              <input type="file" />
              <img src={uploadimg} alt="upload img" />
            </div>
            <div className="prd-info">
              <div className="prd-view">
                <p>Photo View</p>
                <div className="prd-tapbtnmain">
                  <div className="prd-tap">
                    <label>
                      On Tap
                      <input type="radio" />
                    </label>
                  </div>
                  <div className="prd-card">
                    <label>
                      On Card
                      <input type="radio" />
                    </label>
                  </div>
                </div>
              </div>
              <div className="prd-slider-margin">
                <p className="prd-p">Slider</p>
                <div className="prd-sliderbox">
                  <div className="prd-slider-p">
                    <p>Wants to your images in slider ?</p>
                  </div>
                  <div className="prd-checkbox-container">
                    <label className="prd-toggle-switch">
                      <input
                        type="checkbox"
                        checked={isToggled}
                        onChange={handleToggle}
                      />
                      <span className="prd-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="prd-photos-container">
          <div className="prd-photos">
            <p>Photo Name</p>
            <div className="prd-photo">
              <div>
                <img className="prd-prodimg" src={prodImg} alt="product-img" />
              </div>
              <div className="prd-editdelt-btnmain">
                <div className="prd-edit">
                  <img src={editImg} alt="edit-pen" />
                </div>
                <div className="prd-delet">
                  <img src={deltImg} alt="delt-img" />
                </div>
              </div>
            </div>
          </div>
          <div className="prd-photos">
            <p>Photo Name</p>
            <div className="prd-photo">
              <div>
                <img className="prd-prodimg" src={prodImg} alt="product-img" />
              </div>
              <div className="prd-editdelt-btnmain">
                <div className="prd-edit">
                  <img src={editImg} alt="edit-pen" />
                </div>
                <div className="prd-delet">
                  <img src={deltImg} alt="delt-img" />
                </div>
              </div>
            </div>
          </div>
          <div className="prd-photos">
            <p>Photo Name</p>
            <div className="prd-photo">
              <div>
                <img className="prd-prodimg" src={prodImg} alt="product-img" />
              </div>
              <div className="prd-editdelt-btnmain">
                <div className="prd-edit">
                  <img src={editImg} alt="edit-pen" />
                </div>
                <div className="prd-delet">
                  <img src={deltImg} alt="delt-img" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="prd-btnmargin">
          <TwoButton />
        </div>
      </div>
    </>
  );
};

export default ProductGallery;
