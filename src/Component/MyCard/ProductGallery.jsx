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

import React, { useContext, useState } from "react";
import uploadimg from "../../images/uploadimg.png";
import prodImg from "../../images/product_gallary.svg";
import editImg from "../../images/product_edit.svg";
import deltImg from "../../images/product_delet.svg";
import "../../Component/MyCard/Productgallary.css";
import TwoButton from "./TwoButton";
import ModalProductGallery from "../MyCard/ModalProductGallery";
import mpg from "../../images/img-modal-pg.svg";
import { useForm } from "react-hook-form";
import axios from "axios";
import userContext from "../../context/userDetails";

const ProductGallery = () => {
  const { userData, AuthorizationToken, getUserData } = useContext(userContext);
  const [isToggled, setIsToggled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPhotoName, setCurrentPhotoName] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const uri = process.env.REACT_APP_DEV_URL;

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const openModal = (item) => {
    setSelectedItem(item);

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentPhotoName("");
  };
  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreviewImage(previewURL);
      setSelectedFile(file);
    } else {
      setPreviewImage(null);
      setSelectedFile(null);
    }
  };
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(`${uri}/gallery/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: AuthorizationToken,
        },
      });
      console.log(response.data);
      alert("Image added successfully!");
      reset();
      setPreviewImage(null);
      getUserData();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const editGallery = async (galleryId, updatedData, imageFile) => {
    const formData = new FormData();
    formData.append("title", updatedData.title);
    formData.append("price", updatedData.price);
    formData.append("button_type", updatedData.button_type);
    formData.append("button_link", updatedData.button_link);
    formData.append("description", updatedData.description);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await axios.patch(
        `${uri}/gallery/edit/${galleryId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: AuthorizationToken,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating gallery:", error);
      throw error;
    }
  };
  const handleInputChange = (e, field) => {
    setSelectedItem((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };
  const handleSave = async () => {
    if (!selectedItem) {
      console.error("No selected item found.");
      return;
    }

    const updatedData = {
      title: selectedItem.title,
      price: selectedItem.price,
      button_type: selectedItem.button_type,
      button_link: selectedItem.button_link,
      description: selectedItem.description,
    };

    const imageFile = selectedFile ? selectedFile : null;

    try {
      const updatedGallery = await editGallery(
        selectedItem._id,
        updatedData,
        imageFile
      );
      alert("Gallery updated successfully!");
      closeModal();
      getUserData();
    } catch (error) {
      console.error("Failed to update gallery:", error);
    }
  };
  const deleteGalleryItem = async (galleryId) => {
    if (!galleryId) {
      console.error("Gallery ID is missing.");
      return;
    }
    try {
      console.log("Attempting to delete gallery item with ID:", galleryId);

      const response = await axios.delete(
        `${uri}/gallery/delete/${galleryId}`,
        {
          headers: {
            Authorization: AuthorizationToken,
          },
        }
      );
      console.log(response.data);
      alert(`${response.data.msg}` || "Gallery item deleted successfully!");
      getUserData();
    } catch (error) {
      console.error("Error deleting gallery item:", error);
      alert(error.response.data.message || "Failed to delete gallery item.");
    }
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="prd-padding">
            <p className="prd-vdtitle">Upload Image</p>

            <div className="prd-uplodcontainer">
              <div className="prd-uplod">
                <input
                  type="file"
                  accept="image/*"
                  {...register("gallery")}
                  onChange={onFileChange}
                />
                <img src={previewImage || uploadimg} alt="Preview" />
                {/* <img src={uploadimg} alt="upload img" /> */}
              </div>
            </div>
          </div>
          <hr />
          <div className="prd-photos-container">
            {userData?.productGallary?.map((item, index) => (
              <div className="prd-photos" key={item._id}>
                <p>Photo {index + 1}</p>
                <div className="prd-photo">
                  <div>
                    <img
                      className="prd-prodimg"
                      src={`${uri}/photogallery/${item.image}`}
                      alt={`product-${index + 1}`}
                    />
                  </div>
                  <div className="prd-editdelt-btnmain">
                    <div className="prd-edit" onClick={() => openModal(item)}>
                      <img src={editImg} alt="edit-pen" />
                    </div>
                    <div
                      className="prd-delet"
                      onClick={() => deleteGalleryItem(item._id)}
                    >
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
        </form>
      </div>

      {/* Modal Component */}
      <ModalProductGallery
        show={isModalOpen}
        onClose={closeModal}
        selectedItem={selectedItem}
      >
        <div className="inner-bg">
          <div className="prd-prodimg-modal-pg-img-div">
            <img
              src={`${uri}/photogallery/${selectedItem?.image}`}
              alt=""
              className="prd-prodimg-modal-pg"
            />
          </div>
          <div className="row-int-field-flexx">
            <div className="input-modal-f">
              <div className="flex-inp">
                <p className="inpt-title">Title</p>
                <input
                  type="text"
                  name="title"
                  required=""
                  value={selectedItem?.title || ""}
                  className="cutomize-field-input-modal-p-g"
                  onChange={(e) => handleInputChange(e, "title")}
                />
              </div>
              <div className="flex-inp">
                <p className="inpt-title">Price (Optional)</p>
                <input
                  type="text"
                  name="price"
                  required=""
                  value={selectedItem?.price || ""}
                  className="cutomize-field-input-modal-p-g"
                  onChange={(e) => handleInputChange(e, "price")}
                />
              </div>
            </div>
            <div className="input-modal-f">
              <div className="flex-inp">
                <p className="inpt-title gap-btw-10">Button Type</p>
                <select
                  name="button_type"
                  id=""
                  className=" drop-font"
                  onChange={(e) => handleInputChange(e, "button_type")}
                >
                  <option value="" className="cutomize-field-input-modal-p-g ">
                    {selectedItem?.button_type || "Choose Button Type"}
                  </option>

                  <option
                    className="cutomize-field-input-modal-p-g"
                    type="text"
                    name="button_type"
                    // name="price"
                    required=""
                    value="Buy Now"
                  >
                    Buy Now
                  </option>
                  <option
                    className="cutomize-field-input-modal-p-g"
                    // name="price"
                    name="button_type"
                    required=""
                    value="Inquiry Now"
                  >
                    Inquiry Now
                  </option>
                  <option
                    className="cutomize-field-input-modal-p-g"
                    // name="price"
                    required=""
                    name="button_type"
                    value="Get A Quote"
                  >
                    Get A Quote
                  </option>
                </select>
                {/* <input type="text" class="cutomize-field-input" /> */}
              </div>
              <div className="flex-inp">
                <p className="inpt-title gap-btw-10">Button Link</p>
                <input
                  type="text"
                  name="button_link"
                  required=""
                  value={selectedItem?.button_link || ""}
                  className="cutomize-field-input-modal-p-g"
                  onChange={(e) => handleInputChange(e, "button_link")}
                />
              </div>
            </div>
            <div className="desc-flex-p-g">
              <lable className="input-f-p-g-title gap-btw-10">
                Description
              </lable>
              <textarea
                type="text"
                name="name"
                required=""
                value={selectedItem?.description || ""}
                className="textarea-p-g"
                onChange={(e) => handleInputChange(e, "description")}
              ></textarea>
            </div>
            <div className="buttons-save-cancel-p-g">
              <button
                type="button"
                className="close-white-btn"
                onClick={closeModal}
              >
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
        {/* <div className="modal-pg-container-white">
          <div className="img-modal-pg-container">
            <img
              className="prd-prodimg-modal-pg"
              src={`${uri}/photogallery/${selectedItem?.image}`}
              alt="product-img"
            />
          </div>
          <div className="img-detail-flex-p-g">
            <div className="two-field-flex-p-g">
              <div className="two-field-p-g">
                <lable className="input-f-p-g-title">Title</lable>
                <input
                  type="text"
                  name="title"
                  required=""
                  value={selectedItem?.title || ""}
                  className="imput-p-g"
                  onChange={(e) => handleInputChange(e, "title")}
                ></input>
              </div>
              <div className="two-field-p-g">
                <lable className="input-f-p-g-title">Price (Optional)</lable>
                <input
                  type="text"
                  name="price"
                  required=""
                  value={selectedItem?.price || ""}
                  className="imput-p-g"
                  onChange={(e) => handleInputChange(e, "price")}
                ></input>
              </div>
            </div>
            <div className="two-field-flex-p-g">
              <div className="two-field-p-g gap-btw-10">
                <lable className="input-f-p-g-title gap-btw-10">
                  Button Type
                </lable>
                <input
                  type="text"
                  name="button_type"
                  required=""
                  value={selectedItem?.button_type || ""}
                  className="imput-p-g"
                  onChange={(e) => handleInputChange(e, "button_type")}
                ></input>
              </div>
              <div className="two-field-p-g gap-btw-10">
                <lable className="input-f-p-g-title ">Button Link</lable>
                <input
                  type="text"
                  name="button_link"
                  required=""
                  value={selectedItem?.button_link || ""}
                  className="imput-p-g"
                  onChange={(e) => handleInputChange(e, "button_link")}
                ></input>
              </div>
            </div>
            <div className="desc-flex-p-g">
              <lable className="input-f-p-g-title gap-btw-10">
                Description
              </lable>
              <textarea
                type="text"
                name="name"
                required=""
                value={selectedItem?.description || ""}
                className="textarea-p-g"
                onChange={(e) => handleInputChange(e, "description")}
              ></textarea>
            </div>
            <div className="buttons-save-cancel-p-g">
              <button
                type="button"
                className="close-white-btn"
                onClick={closeModal}
              >
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
        </div> */}
      </ModalProductGallery>
    </>
  );
};

export default ProductGallery;
