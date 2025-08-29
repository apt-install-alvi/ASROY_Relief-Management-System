import React, { useState } from "react";
import "./ViewCard.css";
import { InputField } from "../components/InputField"; 
import { formatTimeForInput } from "../utils/formatTimeInput";
import { formatDateForInput } from "../utils/formatDateInput";
import { formatTimeForDisplay } from "../utils/formatTimeDisplay";
import { formatDateForDisplay } from "../utils/formatDateDisplay";

export function ViewCard({ image, type, area, date, time, handleState, onSave, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  // Convert to input-friendly format for editing
  const initialEditData = {
    type: type || "",
    area: area || "",
    date: date ? formatDateForInput(date) : "", // YYYY-MM-DD for <input type="date">
    time: time ? formatTimeForInput(time) : "", // HH:MM for <input type="time">
  };

  const [editData, setEditData] = useState(initialEditData);
  const [originalData] = useState(initialEditData);

  const handleEditClick = () => setIsEditing(true);

  const handleSave = () => {
    // Convert input date/time back to display format
    const formattedDate = editData.date ? formatDateForDisplay(editData.date) : "";
    const formattedTime = editData.time ? formatTimeForDisplay(editData.time) : "";

    const updatedData = {
      title: editData.type,
      area: editData.area,
      date: formattedDate,
      time: formattedTime,
    };

    onSave(updatedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (JSON.stringify(editData) !== JSON.stringify(originalData)) {
      const confirmCancel = window.confirm(
        "Are you sure you want to cancel editing? Any changes you made will not be saved."
      );
      if (!confirmCancel) return;
    }
    setEditData(originalData);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) =>
    setEditData((prev) => ({ ...prev, [field]: value }));

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;
    onDelete && onDelete();
  };

  return (
    <div className="viewcard-body">
      <div className="modal-header">
        <h5 className="title">View Event</h5>
        <button className="x-btn" onClick={isEditing ? handleCancel : handleState}>
          <img src="/assets/icons/x_btn.svg" alt="close" />
        </button>
      </div>

      <img className="view-img" src={image} alt="Event" />

      {isEditing ? (
        <>
          <div className="edit-field">
            <label htmlFor="type">Type: </label>
            <InputField
              fieldType="text"
              fieldID="type"
              value={editData.type}
              onChange={(e) => handleInputChange("type", e.target.value)}
            />
          </div>

          <div className="edit-field">
            <label htmlFor="area">Area: </label>
            <InputField
              fieldType="text"
              fieldID="area"
              value={editData.area}
              onChange={(e) => handleInputChange("area", e.target.value)}
            />
          </div>

          <div className="edit-field">
            <label htmlFor="date">Date: </label>
            <InputField
              fieldType="date"
              fieldID="date"
              value={editData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
            />
          </div>

          <div className="edit-field">
            <label htmlFor="time">Time: </label>
            <InputField
              fieldType="time"
              fieldID="time"
              value={editData.time}
              onChange={(e) => handleInputChange("time", e.target.value)}
            />
          </div>
        </>
      ) : (
        <>
          <p className="data">
            <span>Type: </span>
            {editData.type}
          </p>
          <p className="data">
            <span>Area: </span>
            {editData.area}
          </p>
          <p className="data">
            <span>Date: </span>
            {editData.date ? formatDateForDisplay(editData.date) : ""}
          </p>
          <p className="data">
            <span>Time: </span>
            {editData.time ? formatTimeForDisplay(editData.time) : ""}
          </p>
        </>
      )}

      <div className="edit-delete-btn-container">
        {isEditing ? (
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
        ) : (
          <>
            <button className="delete-btn" onClick={handleDeleteClick}>
              Delete
            </button>
            <button className="edit-btn" onClick={handleEditClick}>
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
}
