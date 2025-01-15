import React, { useContext, useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { FiSearch } from "react-icons/fi";
import { PiArrowLineDownBold } from "react-icons/pi";
import { IoEyeOutline } from "react-icons/io5";
import "../styles/MyLeads.css";
import LeadDetails from "../Component/LeadDetails/LeadDetails";
import userContext from "../context/userDetails";
import ReactPaginate from "react-paginate";

const MyLeads = () => {
  const { userData } = useContext(userContext);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search
  const [filteredLeads, setFilteredLeads] = useState([]); // New state for filtered leads
  const [selectedLead, setSelectedLead] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todayLeadsCount, setTodayLeadsCount] = useState(0);
  const [thisMonthLeadsCount, setThisMonthLeadsCount] = useState(0);
  const [lastMonthLeadsCount, setLastMonthLeadsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); // Current page index
  const leadsPerPage = 10; // Number of records per page

  const currentDate = new Date().toLocaleDateString();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  useEffect(() => {
    const todaysLeads = userData?.myLeads?.filter((lead) => {
      const leadDate = new Date(lead?.createdAt).toLocaleDateString();
      return leadDate === currentDate;
    });
    setTodayLeadsCount(todaysLeads?.length || 0);
  }, [userData, currentDate]);

  useEffect(() => {
    const thisMonthLeads = userData?.myLeads?.filter((lead) => {
      const leadDate = new Date(lead?.createdAt);
      return (
        leadDate.getMonth() === currentMonth &&
        leadDate.getFullYear() === currentYear
      );
    });
    setThisMonthLeadsCount(thisMonthLeads?.length || 0);
  }, [userData, currentMonth, currentYear]);

  useEffect(() => {
    const lastMonthLeads = userData?.myLeads?.filter((lead) => {
      const leadDate = new Date(lead?.createdAt);
      return (
        leadDate.getMonth() === lastMonth &&
        leadDate.getFullYear() === lastMonthYear
      );
    });
    setLastMonthLeadsCount(lastMonthLeads?.length || 0);
  }, [userData, lastMonth, lastMonthYear]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredLeads(userData?.myLeads || []); // Show all leads when search query is empty
    } else {
      const matches = userData?.myLeads?.filter((lead) =>
        lead?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const nonMatches = userData?.myLeads?.filter(
        (lead) => !lead?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLeads([...matches, ...nonMatches]); // Move matches to the top
    }
  }, [searchQuery, userData]);

  const handleOpenModal = (lead) => {
    setIsModalOpen(true);
    setSelectedLead(lead)
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLead(null);
  };
  const handleExportToExcel = () => {
    // Preprocess leads to format createdAt and updatedAt
    const formattedLeads = (userData?.myLeads || []).map((lead) => {
      const formatDateTime = (dateTime) => {
        if (!dateTime) return "N/A";
        const formattedDate = new Date(dateTime).toLocaleDateString("en-GB"); 
        const formattedTime = new Date(dateTime).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false, // 24-hour format
        });
        return `${formattedDate} ${formattedTime}`; 
      };
  
      return {
        ...lead,
        createdAt: formatDateTime(lead?.createdAt), 
        updatedAt: formatDateTime(lead?.updatedAt), 
      };
    });
  
    // Create worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(formattedLeads);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");
  
    // Export as Excel file
    XLSX.writeFile(workbook, "Leads.xlsx");
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected); 
  };

  const startIndex = currentPage * leadsPerPage;
  const currentLeads = filteredLeads.slice(
    startIndex,
    startIndex + leadsPerPage
  ); // Leads for the current page

  return (
    <>
      <div className="div">
        <div className="my-lead-container">
          {/* Search Section */}
          <div className="search-section">
            <div className="search-bar">
              <span className="search-icon-lead">
                <FiSearch />
              </span>
              <input
                type="text"
                placeholder="Search with name, email, phone, etc"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
              />
            </div>
            <div className="right-export-btn-r">
              <button
                type="submit"
                className="export-button"
                onClick={handleExportToExcel}
              >
                <div className="down-arrow">
                  <PiArrowLineDownBold />
                </div>
                <div className="export-btn">Export</div>
              </button>
            </div>
          </div>
          {/* Lead Cards */}
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
          {/* Leads Table */}
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
                  {/* {filteredLeads?.map((lead, index) => { */}
                  {currentLeads?.map((lead, index) => {
                    // Format the createdAt field
                    const formattedDate = lead?.createdAt
                      ? new Date(lead.createdAt).toLocaleDateString("en-GB") // dd-mm-yyyy format
                      : "N/A";
                    const formattedTime = lead?.createdAt
                      ? new Date(lead.createdAt).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false, // Use 24-hour format
                        })
                      : "N/A";

                    return (
                      <tr className="tr-try" key={index}>
                        <td className="td-try p-40">{lead?.name}</td>
                        <td className="td-try p-top-21">{lead?.email}</td>
                        <td className="td-try p-top-21">{lead?.number}</td>
                        <td className="td-try p-top-21">
                          {formattedDate} {formattedTime}
                        </td>
                        <td className="td-try p-top-21">
                          <div
                            className="eye-bg-leads"
                            onClick={() => handleOpenModal(lead)}
                          >
                            <IoEyeOutline />
                          </div>
                        </td>
                        <td className="td-try p-top-21"></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={Math.ceil(filteredLeads.length / leadsPerPage)}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
      <LeadDetails isOpen={isModalOpen} onClose={handleCloseModal} selectedLead={selectedLead} />
    </>
  );
};

export default MyLeads;
