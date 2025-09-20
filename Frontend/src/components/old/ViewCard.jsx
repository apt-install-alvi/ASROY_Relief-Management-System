import React, { useState } from "react";
import "./ViewCard.css";
import { InputField } from "../components/InputField";
import { formatTimeForDisplay } from "../utils/formatTimeDisplay";
import { formatDateForDisplay } from "../utils/formatDateDisplay";
import { formatTimeForInput } from "../utils/formatTimeInput";
import { formatDateForInput } from "../utils/formatDateInput";
import { AREA_NAMES, EVENT_TYPES } from "../utils/constants";

export function ViewCard({
  eventId,
  image,
  type,
  area,
  date,
  time,
  status,
  handleState,
  onUpdate,
  onDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const initialEditData = {
    type: type || "",
    area: area || "",
    date: date ? formatDateForInput(date) : "",
    time: time ? formatTimeForInput(time) : "",
    isInactive: status === "Not Active",
  };

  const [editData, setEditData] = useState(initialEditData);
  const [originalData] = useState(initialEditData);

  const handleEditClick = () => setIsEditing(true);
  const handleInputChange = (field, value) =>
    setEditData((prev) => ({ ...prev, [field]: value }));

  const handleCancel = () => {
    if (JSON.stringify(editData) !== JSON.stringify(originalData)) {
      if (!window.confirm("Cancel editing? Changes will be lost.")) return;
    }
    setEditData(originalData);
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/events/edit/${eventId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventName: editData.type,
            areaName: editData.area,
            date: editData.date,
            Event_Image: image,
            time:
              editData.time.length === 5
                ? editData.time + ":00"
                : editData.time,
            status: editData.isInactive ? "Not Active" : "Active",
          }),
        }
      );

      const data = await response.json();
      if (!data.success) throw new Error(data.error || "Update failed");

      onUpdate({
        Event_id: eventId,
        Event_name: editData.type,
        area: editData.area,
        Date_of_occurrence: editData.date,
        Time_of_occurrence: editData.time,
        status: editData.isInactive ? "Not Active" : "Active",
      });

      setIsEditing(false);
    } catch (err) {
      alert(err.message);
      console.error(err);
    }
  };

  const handleDeleteClick = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const response = await fetch(
        `http://localhost:5000/api/events/delete/${eventId}`,
        { method: "DELETE" }
      );
      const data = await response.json();
      if (!data.success) throw new Error(data.error || "Delete failed");

      if (onDelete) onDelete(eventId);
    } catch (err) {
      alert(err.message);
      console.error(err);
    }
  };

  return (
    <div className="viewcard-body">
      <div className="modal-header">
        <h5 className="title">View Event</h5>
        <button
          className="x-btn"
          onClick={isEditing ? handleCancel : handleState}
        >
          <img src="/assets/icons/x_btn.svg" alt="close" />
        </button>
      </div>

      <img className="view-img" src={image} alt="Event" />

      {isEditing ? (
        <>
          <div className="edit-field">
            <label htmlFor="type">Type: </label>
            <select
              className="input-field"
              id="type"
              value={editData.type}
              onChange={(e) => handleInputChange("type", e.target.value)}
            >
              <option value="">-- Select Type --</option>
              {EVENT_TYPES.map((ev, idx) => (
                <option key={idx} value={ev}>
                  {ev}
                </option>
              ))}
            </select>
          </div>

          <div className="edit-field">
            <label htmlFor="area">Area: </label>
            <select
              className="input-field"
              id="area"
              value={editData.area}
              onChange={(e) => handleInputChange("area", e.target.value)}
            >
              <option value="">-- Select Area --</option>
              {AREA_NAMES.map((areaName, idx) => (
                <option key={idx} value={areaName}>
                  {areaName}
                </option>
              ))}
            </select>
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

          <div className="edit-field">
            <label htmlFor="status">Mark as Inactive: </label>
            <input
              type="checkbox"
              id="status"
              checked={editData.isInactive}
              onChange={(e) =>
                handleInputChange("isInactive", e.target.checked)
              }
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
            {formatDateForDisplay(editData.date)}
          </p>
          <p className="data">
            <span>Time: </span>
            {formatTimeForDisplay(editData.time)}
          </p>
          <p className="data">
            <span>Status: </span>
            {editData.isInactive ? "Not Active" : "Active"}
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
