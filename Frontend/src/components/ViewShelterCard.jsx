import React, { useState } from "react";
import axios from "axios";

export function ViewShelterCard({
  shelterId,
  image,
  name,
  area,
  total_capacity,
  current_capacity,
  handleState,
  onSave,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name,
    area,
    total_capacity,
    current_capacity,
    image,
  });

  const handleChange = (field, value) =>
    setEditData((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    try {
      const data = new FormData();
      data.append("name", editData.name);
      data.append("area", editData.area);
      data.append("total_capacity", editData.total_capacity);
      data.append("current_capacity", editData.current_capacity);
      if (editData.image instanceof File) data.append("image", editData.image);

      await axios.put(
        "http://localhost:5000/api/shelters/update/${shelterId}",
        data
      );
      onSave(editData);
      setIsEditing(false);
      alert("Updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update shelter");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete shelter?")) return;
    try {
      await axios.delete(
        "http://localhost:5000/api/shelters/delete/${shelterId}"
      );
      onSave(null, "delete");
      handleState();
      alert("Deleted");
    } catch (err) {
      console.error(err);
      alert("Failed to delete shelter");
    }
  };

  return (
    <div className="viewcard-body">
      <h5>View Shelter</h5>
      <button onClick={() => (isEditing ? setIsEditing(false) : handleState())}>
        X
      </button>
      <img
        src={
          editData.image instanceof File
            ? URL.createObjectURL(editData.image)
            : editData.image
        }
        alt={editData.name}
      />
      {isEditing ? (
        <>
          <input
            value={editData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <input
            value={editData.area}
            onChange={(e) => handleChange("area", e.target.value)}
          />
          <input
            type="number"
            value={editData.total_capacity}
            onChange={(e) => handleChange("total_capacity", e.target.value)}
          />
          <input
            type="number"
            value={editData.current_capacity}
            onChange={(e) => handleChange("current_capacity", e.target.value)}
          />
          <input
            type="file"
            onChange={(e) => handleChange("image", e.target.files[0])}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <p>Name: {editData.name}</p>
          <p>Area: {editData.area}</p>
          <p>Total: {editData.total_capacity}</p>
          <p>Current: {editData.current_capacity}</p>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
    </div>
  );
}
