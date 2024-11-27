import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { PiArrowLineDownBold } from "react-icons/pi";
import { IoEyeOutline } from "react-icons/io5";
import "../styles/MyLeads.css";
import LeadDetails from "../Component/LeadDetails/LeadDetails";

const MyLeads = () => {
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
              <span class="search-icon">
                <FiSearch />
              </span>
              <input
                type="text"
                placeholder="Search with name , email, phone, etc"
              />
            </div>
            <button type="submit" className="export-button">
              <div className="down-arrow">
                <PiArrowLineDownBold />
              </div>
              <div className="export-btn">Export</div>
            </button>
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

          {/* ----- Leads ----- */}
          <div className="leads">
            <p className="leads-title">Leads</p>
            <div className="scroll">
            <div className="leads-box-bg">
              <div className="leads-box-bg-white">
                <table>
                  <tr>
                    <td className="table-head-title">Name</td>
                    <td className="table-head-title">Email</td>
                    <td className="table-head-title">Phone Number</td>
                    <td className="table-head-title">Created</td>
                    <td className="table-head-title">View</td>
                    <td className="table-head-title">Status</td>
                  </tr>
                  <tr>
                    <td className="table-head-title">Ajay Gadhavi</td>
                    <td className="table-detail-info">
                      ajaygadhavi9847@gmail.com
                    </td>
                    <td className="table-detail-info">6353123096</td>
                    <td className="table-detail-info">24 Oct 2024</td>
                    <td className="table-detail-info">
                      <div className="eye-bg-leads" onClick={handleOpenModal}>
                        <IoEyeOutline />
                      </div>
                    </td>
                    <td className="table-detail-info"></td>
                  </tr>
                </table>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      <LeadDetails isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default MyLeads;
