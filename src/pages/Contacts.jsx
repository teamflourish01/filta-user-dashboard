import React, { useState } from "react";
import "../styles/contacts.css";
import { CiSearch } from "react-icons/ci";
import { FaEye, FaPen, FaTrashAlt } from "react-icons/fa";
import actionbtn3 from "../images/ctndelet.svg";
import ctneye from "../images/ctneye.svg";
import suffle from "../images/shuffle.svg";
import ctnpen from "../images/ctnpen.svg";
import profile from "../images/profile.svg";
import search from "../images/cntsearch.svg";
import Cntmodal from "../Component/cntmodal/Cntmodal";

// const data = [
//     {
//       name: 'Ajay Gadhavi',
//       jobTitle: 'UI/UX Designer',
//       company: 'Flourish Creations PVT. LTD',
//       added: '24 Oct 2024',
//     },
//     {
//       name: 'Ajay Gadhavi',
//       jobTitle: 'UI/UX Designer',
//       company: 'Flourish Creations PVT. LTD',
//       added: '24 Oct 2024',
//     },
//   ];
const Contacts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [contacts, setContacts] = useState([
    {
      name: "ajay gadhavi",
      jobTitle: "ui/ux Designer",
      company: "Flourish Creations PVT. LTD",
      added: "24 Oct 2024",
    },
  ]);
  const [contactToEdit, setContactToEdit] = useState(null);

  const openModal = (contacts = null) => {
    setContactToEdit(contacts);
    setIsModalOpen(true);
  };
  console.log("openmodal", openModal);
  const closeModal = () => {
    setIsModalOpen(false);
    setContactToEdit(null);
  };
  const saveContact = (newContact) => {
    if (contactToEdit) {
      // Update existing contact
      setContacts(
        contacts.map((contact) =>
          contact === contactToEdit ? newContact : contact
        )
      );
    } else {
      // Add new contact
      setContacts((prevContacts) => [...prevContacts, newContact]);
    }
    closeModal();
  };
  const deleteContact = (indexToDelete) => {
    const updatedContacts = contacts.filter(
      (_, index) => index !== indexToDelete
    );
    setContacts(updatedContacts);
  };

  const handledragstart = (index) => {
    setDraggedIndex(index);
  };

  const handledragover = (e) => {
    e.preventDefault();
  };

  const handledrop = (index) => {
    if (draggedIndex === null) return;
    const updatedContacts = [...contacts];
    const [draggedItem] = updatedContacts.splice(draggedIndex, 1);
    updatedContacts.splice(index, 0, draggedItem);

    setContacts(updatedContacts);
    setDraggedIndex(null);
  };

  return (
    <div className="cnts-padding">
      <div className="cnt-container">
        <div className="cnt-padding">
          <div className="cnt-search-flex">
            <div className="cnt-serch">
              <div className="search-flex">
                <div className="search-icon-cnt">
                  {/* <CiSearch className="serach"/> */}
                  <img src={search} alt="" srcset="" className="serach" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="cnt-input"
                  />
                </div>
              </div>
            </div>
            <div className="cnt-button">
              <button className="cnt-btn" onClick={() => openModal()}>
                Add Contact
              </button>
            </div>
          </div>
        </div>
        <hr className="cnt-hr" />
        <div className="cnt-box">
          <div className="cnt-table">
            <div className="cnt-table-radius">
              <table className="try-contact-tbl">
                <thead>
                  <tr className="contacttable-row">
                    <th className="try-c-tbl-th">Name</th>
                    <th className="try-c-tbl-th">Job Title</th>
                    <th className="try-c-tbl-th">Comapny</th>
                    <th className="try-c-tbl-th">Added</th>
                    <th className="try-c-tbl-th">Action</th>
                    <th className="try-c-tbl-th">Shuffle</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((row, index) => (
                    <tr
                      key={index}
                      className="table-header-row"
                      draggable
                      onDragStart={() => handledragstart(index)}
                      onDragOver={handledragover}
                      onDrop={() => handledrop(index)}
                    >
                      <td>
                        <div className="img-profile-cell">
                          <img src={profile} alt="" />
                          {row.name}
                        </div>
                      </td>
                      <td className="try-c-tbl-td">{row.jobTitle}</td>
                      <td className="try-c-tbl-td">{row.company}</td>
                      <td className="try-c-tbl-td">{row.added}</td>
                      <td>
                        <div className="table-action-flex">
                          <img src={ctneye} alt="" />
                          <img
                            src={ctnpen}
                            alt=""
                            onClick={() => openModal(row)}
                          />
                          <img
                            src={actionbtn3}
                            alt=""
                            onClick={() => deleteContact(index)}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="table-cell-title">
                          <img src={suffle} alt="" className="shuffle-drag" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Cntmodal
          isOpen={isModalOpen}
          onClose={closeModal}
          onsave={saveContact}
          contact={contactToEdit}
        />
      </div>
    </div>
  );
};

export default Contacts;
