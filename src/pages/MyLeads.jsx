import React, { useContext, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { PiArrowLineDownBold } from "react-icons/pi";
import { IoEyeOutline } from "react-icons/io5";
import "../styles/MyLeads.css";
import LeadDetails from "../Component/LeadDetails/LeadDetails";
import userContext from "../context/userDetails";

const MyLeads = () => {
  const { userData, getUserData } = useContext(userContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="div">
        <div className="my-lead-container">
          {/* -----Search-Section----- */}
          <div className="search-section">
            <div class="search-bar">
              <span class="search-icon-lead">
                <FiSearch />
              </span>
              <input
                type="text"
                placeholder="Search with name , email, phone, etc"
              />
            </div>
            <div className="right-export-btn-r">
              <button type="submit" className="export-button">
                <div className="down-arrow">
                  <PiArrowLineDownBold />
                </div>
                <div className="export-btn">Export</div>
              </button>
            </div>
          </div>
          {/* ----- Lead Card ----- */}
          <div className="lead-card-section">
            <div className="lead-card">
              <div className="child-lead-card">
                <p className="lead-card-title">Total Leads</p>
                <p className="lead-count">1</p>
              </div>
            </div>
            <div className="lead-card">
              <div className="child-lead-card">
                <p className="lead-card-title">Today</p>
                <p className="lead-count">0</p>
              </div>
            </div>
            <div className="lead-card">
              <div className="child-lead-card">
                <p className="lead-card-title">This Month</p>
                <p className="lead-count">1</p>
              </div>
            </div>
            <div className="lead-card">
              <div className="child-lead-card">
                <p className="lead-card-title">Last Month</p>
                <p className="lead-count">0</p>
              </div>
            </div>
          </div>
          <p className="leads-title">Leads</p>
          {/* ----- Leads ----- */}

          <div className="lead-table">
            <div className="bg-w-try">
              <table className="try-lead">
                <tr className="tr-try">
                  <th className="try-th p-40">Name</th>
                  <th className="try-th p-top-15">Email</th>
                  <th className="try-th p-top-15">Phone Number</th>
                  <th className="try-th p-top-15">Created</th>
                  <th className="try-th p-top-15">View</th>
                  <th className="try-th">Status</th>
                </tr>
                <tr className="tr-try">
                  <td className="td-try   p-40">Ajay Gadhavi</td>
                  <td className="td-try p-top-21">ajaygadhavi9847@gmail.com</td>
                  <td className="td-try p-top-21">6353123096</td>
                  <td className="td-try p-top-21">24 Oct 2024</td>
                  <td className="td-try p-top-21">
                    {" "}
                    <div className="eye-bg-leads" onClick={handleOpenModal}>
                      <IoEyeOutline />
                    </div>
                  </td>
                  <td className="td-try p-top-21"></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
      <LeadDetails isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default MyLeads;
