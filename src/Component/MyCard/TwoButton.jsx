import React from "react";
import "./TwoButton.css";

const TwoButton = ({ onSave, onCancel }) => {
  return (
    <>
      <div className="btn-twobtn">
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-save" onClick={onSave}>
          Save
        </button>
      </div>
    </>
  );
};
export default TwoButton;
