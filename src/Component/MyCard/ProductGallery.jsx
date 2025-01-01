// import React, { useState } from "react";
// import uploadimg from "../../images/uploadimg.png";
// import prodImg from "../../images/product_gallary.svg";
// import editImg from "../../images/product_edit.svg";
// import deltImg from "../../images/product_delet.svg";
// import "../../Component/MyCard/Productgallary.css";
// import TwoButton from "./TwoButton";
// const ProductGallery = () => {
//   const [isToggled, setIsToggled] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentPhotoName, setCurrentPhotoName] = useState("");

//   const handleToggle = () => {
//     setIsToggled(!isToggled);
//   };

//   const openModal = (photoName) => {
//     setCurrentPhotoName(photoName);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setCurrentPhotoName("");
//   };
//   return (
//     <>
//       <div className="mlt-margin">
//         <div className="mlt-info">
//           <span className="mlt-title">Info : </span>
//           <span className="mlt-desc">
//             It is a long established fact that a reader will be distracted by
//             the readable content of a page when looking at its layout.
//           </span>
//         </div>
//         <div className="prd-padding">
//           <p className="prd-vdtitle">Upload Image</p>
//           <div className="prd-uplodcontainer">
//             <div className="prd-uplod">
//               <input type="file" />
//               <img src={uploadimg} alt="upload img" />
//             </div>
//             {/* <div className="prd-info">
//               <div className="prd-view">
//                 <p>Photo View</p>
//                 <div className="prd-tapbtnmain">
//                   <div className="prd-tap">
//                     <label>
//                       On Tap
//                       <input type="radio" />
//                     </label>
//                   </div>
//                   <div className="prd-card">
//                     <label>
//                       On Card
//                       <input type="radio" />
//                     </label>
//                   </div>
//                 </div>
//               </div>
//               <div className="prd-slider-margin">
//                 <p className="prd-p">Slider</p>
//                 <div className="prd-sliderbox">
//                   <div className="prd-slider-p">
//                     <p>Wants to your images in slider ?</p>
//                   </div>
//                   <div className="prd-checkbox-container">
//                     <label className="prd-toggle-switch">
//                       <input
//                         type="checkbox"
//                         checked={isToggled}
//                         onChange={handleToggle}
//                       />
//                       <span className="prd-slider"></span>
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             </div> */}
//           </div>
//         </div>
//         <hr />
//         <div className="prd-photos-container">
//           <div className="prd-photos">
//             <p>Photo Name</p>
//             <div className="prd-photo">
//               <div>
//                 <img className="prd-prodimg" src={prodImg} alt="product-img" />
//               </div>
//               <div className="prd-editdelt-btnmain">
//                 <div className="prd-edit">
//                   <img src={editImg} alt="edit-pen" />
//                 </div>
//                 <div className="prd-delet">
//                   <img src={deltImg} alt="delt-img" />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="prd-photos">
//             <p>Photo Name</p>
//             <div className="prd-photo">
//               <div>
//                 <img className="prd-prodimg" src={prodImg} alt="product-img" />
//               </div>
//               <div className="prd-editdelt-btnmain">
//                 <div className="prd-edit">
//                   <img src={editImg} alt="edit-pen" />
//                 </div>
//                 <div className="prd-delet">
//                   <img src={deltImg} alt="delt-img" />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="prd-photos">
//             <p>Photo Name</p>
//             <div className="prd-photo">
//               <div>
//                 <img className="prd-prodimg" src={prodImg} alt="product-img" />
//               </div>
//               <div className="prd-editdelt-btnmain">
//                 <div className="prd-edit" onClick={() => openModal(photoName)}>
//                   <img src={editImg} alt="edit-pen" />
//                 </div>
//                 <div className="prd-delet">
//                   <img src={deltImg} alt="delt-img" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="prd-btnmargin">
//           <TwoButton />
//         </div>
//       </div>
//       <Modal show={isModalOpen} onClose={closeModal}>
//         <h2>Edit {currentPhotoName}</h2>
//         <p>You can edit details for {currentPhotoName} here.</p>
//         {/* Add your edit form or inputs here */}
//       </Modal>
//     </>
//   );
// };

// export default ProductGallery;

import React, { useState } from "react";
import uploadimg from "../../images/uploadimg.png";
import prodImg from "../../images/product_gallary.svg";
import editImg from "../../images/product_edit.svg";
import deltImg from "../../images/product_delet.svg";
import "../../Component/MyCard/Productgallary.css";
import TwoButton from "./TwoButton";
import ModalProductGallery from "../MyCard/ModalProductGallery";
import mpg from "../../images/img-modal-pg.svg";

const ProductGallery = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPhotoName, setCurrentPhotoName] = useState("");

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const openModal = (photoName) => {
    setCurrentPhotoName(photoName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentPhotoName("");
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
          </div>
        </div>
        <hr />
        <div className="prd-photos-container">
          {["Photo 1", "Photo 2", "Photo 3"].map((photoName, index) => (
            <div className="prd-photos" key={index}>
              <p>{photoName}</p>
              <div className="prd-photo">
                <div>
                  <img
                    className="prd-prodimg"
                    src={prodImg}
                    alt="product-img"
                  />
                </div>
                <div className="prd-editdelt-btnmain">
                  <div
                    className="prd-edit"
                    onClick={() => openModal(photoName)} // Pass photoName to openModal
                  >
                    <img src={editImg} alt="edit-pen" />
                  </div>
                  <div className="prd-delet">
                    <img src={deltImg} alt="delt-img" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="prd-btnmargin">
          <TwoButton />
        </div>
      </div>

      {/* Modal Component */}
      <ModalProductGallery show={isModalOpen} onClose={closeModal}>
        <div className="modal-pg-container-white">
          <div className="img-modal-pg-container">
            <img className="prd-prodimg-modal-pg" src={mpg} alt="product-img" />
          </div>
          <div className="img-detail-flex-p-g">
            <div className="two-field-flex-p-g">
            <div className="two-field-p-g">
              <lable className="input-f-p-g-title">Title</lable>
              <input
                type="text"
                name="name"
                required=""
                value=""
                className="imput-p-g"
              ></input>
            </div>
            <div className="two-field-p-g">
              <lable className="input-f-p-g-title">Price (Optional)</lable>
              <input
                type="text"
                name="name"
                required=""
                value=""
                className="imput-p-g"
              ></input>
            </div>
            </div>
            <div className="two-field-flex-p-g">
            <div className="two-field-p-g gap-btw-10">
              <lable className="input-f-p-g-title gap-btw-10">Button Type</lable>
              <input
                type="text"
                name="name"
                required=""
                value=""
                className="imput-p-g"
              ></input>
            </div>
            <div className="two-field-p-g gap-btw-10">
              <lable className="input-f-p-g-title ">Button Link</lable>
              <input
                type="text"
                name="name"
                required=""
                value=""
                className="imput-p-g"
              ></input>
            </div>
           
            </div>
            <div className="desc-flex-p-g">
            <lable className="input-f-p-g-title gap-btw-10">Description</lable>
              <textarea
                type="text"
                name="name"
                required=""
                value=""
                className="textarea-p-g"
              ></textarea>
              </div>
              <div className="buttons-save-cancel-p-g">
            <button type="button" className="close-white-btn">
              Cancel
            </button>
            <button type="button" className="save-blk-btn">
              Save
            </button>
          </div>
          </div>
        </div>
      </ModalProductGallery>
    </>
  );
};

export default ProductGallery;
