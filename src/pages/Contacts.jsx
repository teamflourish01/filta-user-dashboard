import React, { useContext, useState } from "react";
import "../styles/contacts.css";
import search from "../images/cntsearch.svg";
import actionbtn3 from "../images/ctndelet.svg";
import ctneye from "../images/ctneye.svg";
import suffle from "../images/shuffle.svg";
import ctnpen from "../images/ctnpen.svg";
import profile from "../images/profile.svg";
import Cntmodal from "../Component/cntmodal/Cntmodal";
import userContext from "../context/userDetails";

const Contacts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const { userData } = useContext(userContext);
  const uri = process.env.REACT_APP_DEV_URL;
  const [contacts, setContacts] = useState([
    {
      name: "Ajay Gadhavi",
      jobTitle: "UI/UX Designer",
      company: "Flourish Creations PVT. LTD",
      added: "24 Oct 2024",
    },
   
    
  ]);
  const [contactToEdit, setContactToEdit] = useState(null);

  const openModal = (contact = null) => {
    setContactToEdit(contact);
    setIsModalOpen(true);
  };

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
    setContacts(contacts.filter((_, index) => index !== indexToDelete));
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === index) return;

    const reorderedContacts = [...contacts];
    const [movedContact] = reorderedContacts.splice(draggedIndex, 1);
    reorderedContacts.splice(index, 0, movedContact);

    setContacts(reorderedContacts);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
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
                  <img src={search} alt="Search" className="serach" />
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
                    <th className="try-c-tbl-th">Company</th>
                    <th className="try-c-tbl-th">Added</th>
                    <th className="try-c-tbl-th">Action</th>
                    <th className="try-c-tbl-th">Shuffle</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact, index) => (
                    <tr
                      key={index}
                      className="table-header-row"
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragEnd={handleDragEnd}
                      style={{
                        cursor: "pointer",
                        opacity: draggedIndex === index ? 0.5 : 1,
                        transition: "opacity 0.3s ease",
                      }}
                    >
                      <td>
                        <div className="img-profile-cell">
                          <img src={`${uri}/card/${userData?.card?.profileimg}`}
              alt="profile-img" className="contact-profile-img" />
                          {userData?.card?.name}
                        </div>
                      </td>
                      <td className="try-c-tbl-td">{userData?.card?.jobtitle}</td>
                      <td className="try-c-tbl-td">{userData?.card?.company}</td>
                      <td className="try-c-tbl-td">{contact.added}</td>
                      <td>
                        <div className="table-action-flex">
                          <img src={ctneye} alt="View" />
                          <img
                            src={ctnpen}
                            alt="Edit"
                            onClick={() => openModal(contact)}
                          />
                          <img
                            src={actionbtn3}
                            alt="Delete"
                            onClick={() => deleteContact(index)}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="table-cell-title">
                          <img src={suffle} alt="Shuffle" className="shuffle-drag" />
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
