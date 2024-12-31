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
  const [heading, setHeading] = useState("");
  const [documents, setDocuments] = useState(userData?.documents || []);
  const [showFileInput, setShowFileInput] = useState(false);
  const [docPreview, setDocPreview] = useState(null);
  const [editingDocId, setEditingDocId] = useState(null);

  const handleFileChange = (event, docId) => {
    const file = event.target.files[0];
    setDocFiles([file]);
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setDocPreview(fileReader.result);
        if (docId) {
          setEditingDocId(docId);
          const doc = documents.find((d) => d._id === docId);
          if (doc) setHeading(doc.heading || "");
        } else {
          setDocFiles([file]);
          setHeading("");
        }
      };
      fileReader.readAsDataURL(file);
      event.target.value = null;
    }
  };
  const handleHeadingChange = (e, docId) => {
    const newHeading = e.target.value;
    setHeading(newHeading);

    const updatedDocs = documents.map((doc) =>
      doc._id === docId ? { ...doc, heading: newHeading } : doc
    );
    setDocuments(updatedDocs);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (docFiles.length === 0) {
    //   alert("Please select at least one Document file.");
    //   return;
    // }

    const formData = new FormData();
    formData.append("document", docFiles[0]);
    formData.append("heading", heading);

    try {
      if (editingDocId) {
        // Edit existing document
        const response = await axios.patch(
          `${uri}/doc/update/${editingDocId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: AuthorizationToken,
            },
          }
        );
        alert(`${response?.data?.message}`);
      } else {
        // Add new document
        const response = await axios.post(`${uri}/doc/adddoc`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: AuthorizationToken,
          },
        });
        alert(`${response?.data?.message}`);
      }

      getUserData();
      setDocFiles([]);
      setDocPreview(null);
      setEditingDocId(null);
      setShowFileInput(false);
    } catch (error) {
      console.error("Upload Error:", error.response?.data || error.message);
      alert("Failed to upload Doc files.");
    }
  };
  const handleCancel = () => {
    setDocFiles([]);
    setDocPreview(null);
    setShowFileInput(false);
    alert("Action canceled");
  };
  const handleDeleteinput = () => {
    setDocPreview(null);
    setShowFileInput(false);
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
        <form onSubmit={handleSubmit}>
          <div className="doc-padding">
            <div
              className="doc-uplod"
              onClick={() => setShowFileInput(!showFileInput)}
            >
              <input
                type="file"
                onChange={(e) => handleFileChange(e, null)}
                accept=".pdf"
              />
              <img src={uploadimg} alt="upload img" />
            </div>
          </div>

          {showFileInput && (
            <>
              <div className="doc-border">
                <div className="doc-docdiv">
                  <div
                    className="doc-docimg"
                    style={{ height: "65px", overflow: "hidden" }}
                  >
                    {docPreview ? (
                      <Document
                        file={docPreview}
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
                    ) : (
                      <img src={docImg} alt="doc-img" />
                    )}
                  </div>
                  <div className="doc-info">
                    <label>Heading</label>
                    <div className="doc-deltcenter">
                      <input
                        type="text"
                        placeholder="Catalog, Brochure"
                        value={heading}
                        onChange={(e) => setHeading(e.target.value)}
                      />
                      <div className="doc-dltbtn" onClick={handleDeleteinput}>
                        <img src={deltImg} alt="delete-btn" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="doc-border">
            {documents.length > 0 &&
              documents.map((doc) => {
                const docUrl = `${uri}/documents/${doc.document}`;
                return (
                  <div
                    key={doc._id}
                    className="doc-docdiv"
                    onClick={() => {
                      setEditingDocId(doc._id);
                      setHeading(doc.heading || "");
                    }}
                  >
                    <div
                      className="doc-docimg doc-editdiv"
                      style={{ height: "65px", overflow: "hidden" }}
                    >
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

                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, doc._id)}
                        accept=".pdf"
                        className="doc-editinput"
                      />
                    </div>
                    <div className="doc-info">
                      <label>Heading</label>
                      <div className="doc-deltcenter">
                        <input
                          type="text"
                          placeholder="Catalog, Brochure"
                          value={doc.heading}
                          onChange={(e) => handleHeadingChange(e, doc._id)}
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
          </div>

          <div className="doc-btnmargin">
            <TwoButton onCancel={handleCancel} />
          </div>
        </form>
      </div>
    </>
  );
};

export default Documents;
