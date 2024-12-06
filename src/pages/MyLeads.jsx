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

          {/* ----- Leads ----- */}
          <div className="leads">
            <p className="leads-title">Leads</p>
            <div className="scroll">
            <div className="leads-box-bg">
              <div className="leads-box-bg-white">
                <table className="table-lead">
                  <tr>
                    <td className="table-head-title n-t-w-l">Name</td>
                    <td className="table-head-title e-t-w-l">Email</td>
                    <td className="table-head-title p-t-w-l">Phone Number</td>
                    <td className="table-head-title c-t-w-l">Created</td>
                    <td className="table-head-title v-t-w-l">View</td>
                    <td className="table-head-title s-t-w-l">Status</td>
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
