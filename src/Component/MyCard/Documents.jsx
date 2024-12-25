import React, { useContext, useEffect, useState } from "react";
import uploadimg from "../../images/uploadimg.png";
import docImg from "../../images/doc-img.svg";
import "../../Component/MyCard/Documents.css";
import deltImg from "../../images/delete.png";
import TwoButton from "./TwoButton";
import axios from "axios";
import userContext from "../../context/userDetails";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Documents = () => {
  const { userData, AuthorizationToken, getUserData } = useContext(userContext);
  const uri = process.env.REACT_APP_DEV_URL;
  const [docFiles, setDocFiles] = useState([]);
  const [heading, setHeading] = useState(
    userData?.documents?.[0]?.heading || "Catalog, Brochure"
  );
  const [documents, setDocuments] = useState(userData?.documents || []);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setDocFiles([file]);
  };

  const handleSubmit = async () => {
    if (docFiles.length === 0) {
      alert("Please select at least one Document file.");
      return;
    }

    const formData = new FormData();
    formData.append("document", docFiles[0]);
    formData.append("heading", heading);

    try {
      const response = await axios.post(`${uri}/doc/adddoc`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: AuthorizationToken,
        },
      });
      alert(`${response?.data?.message}`);
      getUserData();
      setDocFiles([]);
    } catch (error) {
      console.error("Upload Error:", error.response?.data || error.message);
      alert("Failed to upload Doc files.");
    }
  };
  const handleCancel = () => {
    setDocFiles([]);
    alert("Action canceled");
  };
  const handleDeleteLink = async (linkId) => {
    console.log("platfrom id", linkId);

    try {
      const response = await fetch(`${uri}/doc/deletedoc/${linkId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthorizationToken,
        },
      });

      const data = await response.json();
      if (response.ok) {
        // Remove the deleted link from the state

        alert(`${data?.message}`);
        getUserData();
      } else {
        alert(data.message || "Failed to delete Doc.");
      }
    } catch (error) {
      console.error("Error deleting doc:", error);
    }
  };

  useEffect(() => {
    // Optionally, fetch user data here if not already available
    setDocuments(userData?.documents || []);
  }, [userData]);

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
        <div className="doc-padding">
          <div className="doc-uplod">
            <input type="file" onChange={handleFileChange} />
            <img src={uploadimg} alt="upload img" />
          </div>
        </div>
        <div className="doc-docdiv">
          <div className="doc-docimg">
            <img src={docImg} alt="doc-img" />
          </div>
          <div className="doc-info">
            <label>Heading</label>
            <div className="doc-deltcenter">
              <input
                type="text"
                placeholder="Catalog, Brochure"
                onChange={(e) => setHeading(e.target.value)}
              />
              <div className="doc-dltbtn">
                <img src={deltImg} alt="delete-btn" />
              </div>
            </div>
          </div>
        </div>
        {documents.length > 0 &&
          documents.map((doc) => {
            const docUrl = `${uri}/documents/${doc.document}`;
            return (
              <div key={doc._id} className="doc-docdiv">
                <div className="doc-docimg">
                  <Document
                    file={docUrl}
                    onLoadError={(error) =>
                      console.error("PDF Load Error:", error)
                    }
                  >
                    <Page
                      pageNumber={1}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      width={80}
                      height={65}
                    />
                  </Document>
                </div>
                <div className="doc-info">
                  <label>Heading</label>
                  <div className="doc-deltcenter">
                    <input
                      type="text"
                      placeholder="Catalog, Brochure"
                      value={doc.heading}
                      onChange={(e) => {
                        const updatedDocs = documents.map((d) =>
                          d._id === doc._id
                            ? { ...d, heading: e.target.value }
                            : d
                        );
                        setDocuments(updatedDocs);
                      }}
                    />
                    <div
                      className="doc-dltbtn"
                      onClick={() => handleDeleteLink(doc._id)}
                    >
                      <img src={deltImg} alt="delete-btn" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        <div className="doc-btnmargin">
          <TwoButton onSave={handleSubmit} onCancel={handleCancel} />
        </div>
      </div>
    </>
  );
};

export default Documents;
