import React, { useState } from "react";
import axios from "axios";
import "./ViewCard.css";
import "./ViewShelterCard_OLD.css";
import { InputField } from "../base_components/InputField"; 

export function ViewShelterCard_OLD({ image, name, area, total_capacity, current_capacity, handleState, onSave })
{
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ 
      name, 
      area, 
      total_capacity,
      current_capacity
      });
    const [originalData] = useState({ name, area, total_capacity, current_capacity });

  const handleEditClick = () => {
    setIsEditing(true);
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

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/shelters/update/${shelterId}`,
        editData
      );
      onSave(editData); // update state in parent
      setIsEditing(false);
      alert("Shelter updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update shelter");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this shelter?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/shelters/delete/${shelterId}`
      );
      alert("Shelter deleted successfully");
      handleState(); // close modal
      onSave(null, "delete"); // inform parent to remove from list
    } catch (err) {
      console.error(err);
      alert("Failed to delete shelter");
    }
  };

  return (
    <div className="viewcard-body">
      <div className="modal-header">
        <h5 className="title">View Shelter</h5>
        <button
          className="x-btn"
          onClick={isEditing ? handleCancel : handleState}
        >
          <img src="/assets/icons/x_btn.svg" alt="Close" />
        </button>
      </div>

      <img className="view-img" src={image} alt={name} />

      {isEditing ? (
        <>
          <div className="edit-field edit-shelter-field">
            <label htmlFor="name">Name: </label>
            <InputField
              fieldType="text"
              fieldID="name"
              value={editData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>

          <div className="edit-field edit-shelter-field">
            <label htmlFor="area">Area: </label>
            <InputField
              fieldType="text"
              fieldID="area"
              value={editData.area}
              onChange={(e) => handleInputChange("area", e.target.value)}
            />
          </div>

          <div className="edit-field edit-shelter-field">
            <label htmlFor="total_capacity">Total Capacity: </label>
            <InputField
              fieldType="number"
              fieldID="total_capacity"
              value={editData.total_capacity}
              onChange={(e) =>
                handleInputChange("total_capacity", e.target.value)
              }
            />
          </div>

          <div className="edit-field edit-shelter-field">
            <label htmlFor="current_capacity">Current Capacity: </label>
            <InputField
              fieldType="number"
              fieldID="current_capacity"
              value={editData.current_capacity}
              onChange={(e) =>
                handleInputChange("current_capacity", e.target.value)
              }
            />
          </div>
        </>
      ) : (
        <>
          <p className="data">
            <span>Name: </span>
            {editData.name}
          </p>
          <p className="data">
            <span>Area: </span>
            {editData.area}
          </p>
          <p className="data">
            <span>Total Capacity: </span>
            {editData.total_capacity}
          </p>
          <p className="data">
            <span>Current Capacity: </span>
            {editData.current_capacity}
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
            <button className="delete-btn" onClick={handleDelete}>
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
