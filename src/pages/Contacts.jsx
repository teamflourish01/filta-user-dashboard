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
  console.log("openmodal",openModal)
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
      setContacts([...contacts, newContact]);
    }
    closeModal();
  };
  const deleteContact = (indexToDelete) => {
    const updatedContacts = contacts.filter(
      (_, index) => index !== indexToDelete
    );
    setContacts(updatedContacts);
  };



  const handledragstart =(index)=>{
    setDraggedIndex(index);
  }


  const  handledragover =(e)=>{
    e.preventDefault();
  }


  const handledrop =(index)=>{
    if(draggedIndex===null) return;
    const updatedContacts=[...contacts]
    const [draggedItem]=updatedContacts.splice(draggedIndex,1);
    updatedContacts.splice(index,0,draggedItem);

    setContacts(updatedContacts);
    setDraggedIndex(null);
  }

  return (
    <div className="cnt-container">
      <div className="cnt-padding">
        <div className="cnt-search-flex">
          <div className="cnt-serch">
            <div className="search-flex">
              <div className="search-icon-cnt">
                {/* <CiSearch className="serach"/> */}
                <img src={search} alt="" srcset="" className="serach" />
                <input type="text" placeholder="Search" className="cnt-input" />
              </div>
            </div>
          </div>

          <button className="cnt-btn" onClick={() => openModal()}>
            Add Contact
          </button>
        </div>
      </div>
      <hr className="cnt-hr" />
      <div className="cnt-box">
        <div className="cnt-table">
          <div className="cnt-table-radius">
            <table className="custom-table">
              <thead>
                <tr className="table-header-row">
                  <th className="table-header ">Name</th>
                  <th className="table-header">Job Title</th>
                  <th className="table-header">Company</th>
                  <th className="table-header">Added</th>
                  <th className="table-header table-header-center">Action</th>
                  <th className="table-header table-header-center">Shuffle</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((row, index) => (
                  <tr key={index} className="table-row" draggable
                    onDragStart={() => handledragstart(index)}
                    onDragOver={handledragover}
                    onDrop={() => handledrop(index)}>
                    <td className="table-cell profile-cell">
                      <img src={profile} alt="" srcset="" />
                      {row.name}
                    </td>
                    <td className="table-cell">{row.jobTitle}</td>
                    <td className="table-cell">{row.company}</td>
                    <td className="table-cell">{row.added}</td>
                    <td className="table-cell action-cell">
                      <img src={ctneye} alt="" srcset="" />
                      <img
                        src={ctnpen}
                        alt=""
                        srcset=""
                        onClick={() => openModal(row)}
                      />
                      <img
                        src={actionbtn3}
                        alt=""
                        srcset=""
                        onClick={() => deleteContact(index)}
                      />
                    </td>
                    <td className="table-cell shuffle-cell">
                      {/* Replace with appropriate icon if needed */}
                      <img src={suffle} alt="" srcset="" />
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
  );
};

export default Contacts;
