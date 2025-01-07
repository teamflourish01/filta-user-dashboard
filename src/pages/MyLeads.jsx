import React, { useContext, useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { PiArrowLineDownBold } from "react-icons/pi";
import { IoEyeOutline } from "react-icons/io5";
import "../styles/MyLeads.css";
import LeadDetails from "../Component/LeadDetails/LeadDetails";
import userContext from "../context/userDetails";

const MyLeads = () => {
  const { userData } = useContext(userContext);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todayLeadsCount, setTodayLeadsCount] = useState(0);
  const [thisMonthLeadsCount, setThisMonthLeadsCount] = useState(0);
  const [lastMonthLeadsCount, setLastMonthLeadsCount] = useState(0);

  const currentDate = new Date().toLocaleDateString(); // Get current date as a string
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  // Calculate last month and year
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  useEffect(() => {
    // Filter leads based on today's date
    const todaysLeads = userData?.myLeads?.filter((lead) => {
      const leadDate = new Date(lead?.createdAt).toLocaleDateString(); // Assuming createdAt is the date field in lead
      return leadDate === currentDate;
    });

    setTodayLeadsCount(todaysLeads?.length || 0); // Set the count of today's leads
  }, [userData, currentDate]);

  useEffect(() => {
    // Filter leads based on this month and year
    const thisMonthLeads = userData?.myLeads?.filter((lead) => {
      const leadDate = new Date(lead?.createdAt);
      return leadDate.getMonth() === currentMonth && leadDate.getFullYear() === currentYear;
    });

    setThisMonthLeadsCount(thisMonthLeads?.length || 0); // Set the count of this month's leads
  }, [userData, currentMonth, currentYear]);

  useEffect(() => {
    // Filter leads based on last month and year
    const lastMonthLeads = userData?.myLeads?.filter((lead) => {
      const leadDate = new Date(lead?.createdAt);
      return leadDate.getMonth() === lastMonth && leadDate.getFullYear() === lastMonthYear;
    });

    setLastMonthLeadsCount(lastMonthLeads?.length || 0); // Set the count of last month's leads
  }, [userData, lastMonth, lastMonthYear]);

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
            <div className="search-bar">
              <span className="search-icon-lead">
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
                <p className="lead-count">{userData?.myLeads?.length || 0}</p>
              </div>
            </div>
            <div className="lead-card">
              <div className="child-lead-card">
                <p className="lead-card-title">Today</p>
                <p className="lead-count">{todayLeadsCount}</p>
              </div>
            </div>
            <div className="lead-card">
              <div className="child-lead-card">
                <p className="lead-card-title">This Month</p>
                <p className="lead-count">{thisMonthLeadsCount}</p>
              </div>
            </div>
            <div className="lead-card">
              <div className="child-lead-card">
                <p className="lead-card-title">Last Month</p>
                <p className="lead-count">{lastMonthLeadsCount}</p>
              </div>
            </div>
          </div>
          <p className="leads-title">Leads</p>
          {/* ----- Leads ----- */}

          <div className="lead-table">
            <div className="bg-w-try">
              <table className="try-lead">
                <thead>
                  <tr className="tr-try">
                    <th className="try-th p-40">Name</th>
                    <th className="try-th p-top-15">Email</th>
                    <th className="try-th p-top-15">Phone Number</th>
                    <th className="try-th p-top-15">Created</th>
                    <th className="try-th p-top-15">View</th>
                    <th className="try-th">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {userData?.myLeads?.map((lead, index) => (
                    <tr className="tr-try" key={index}>
                      <td className="td-try p-40">{lead?.name}</td>
                      <td className="td-try p-top-21">{lead?.email}</td>
                      <td className="td-try p-top-21">{lead?.number}</td>
                      <td className="td-try p-top-21">{lead?.createdAt}</td>
                      <td className="td-try p-top-21">
                        <div className="eye-bg-leads" onClick={() => handleOpenModal(lead)}>
                          <IoEyeOutline />
                        </div>
                      </td>
                      <td className="td-try p-top-21"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <LeadDetails isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default MyLeads;
