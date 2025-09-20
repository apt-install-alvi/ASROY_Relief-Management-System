// src/components/VolunteerAddPopup.jsx
import React, { useState } from "react";
import { BASE_URL, safeParseJson } from "../utils/api";

const PLACEHOLDER = "/assets/images/volunteer.jpeg";

export default function VolunteerAddPopup({ header = "Volunteer", handleState, onAdd }) {
  const [volunteerId, setVolunteerId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [status, setStatus] = useState("Active");
  const [workAssigned, setWorkAssigned] = useState("Rescue Mission");
  const [photoFile, setPhotoFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    setPhotoFile(file || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      if (volunteerId) formData.append("volunteerId", volunteerId);
      formData.append("name", name);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("status", status);
      formData.append("workAssigned", workAssigned);
      if (photoFile) formData.append("photo", photoFile);

      const res = await fetch(`${BASE_URL}/api/volunteers/add`, {
        method: "POST",
        body: formData,
      });

      const data = await safeParseJson(res);
      if (!res.ok) throw new Error((data && data.error) || "Failed to add volunteer");

      // backend returns { success: true, volunteer: {...} }
      const created = data && data.volunteer ? data.volunteer : null;

      // normalized image to full URL if backend returned a path
      if (created) {
        if (created.Volunteer_Image) {
          created.Volunteer_Image = created.Volunteer_Image.startsWith("http")
            ? created.Volunteer_Image
            : `${BASE_URL}${created.Volunteer_Image}`;
        } else {
          created.Volunteer_Image = PLACEHOLDER;
        }
        // ensure Work_Assigned present
        if (!created.Work_Assigned) created.Work_Assigned = workAssigned || "Rescue Mission";
      }

      onAdd && onAdd(created);
      handleState && handleState(false);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to add volunteer");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="popup-card" role="dialog" aria-modal="true">
      <div className="popup-header">
        <h3>{header} - Add</h3>
        <button className="close-btn" onClick={() => handleState && handleState(false)}>✕</button>
      </div>

      <form className="popup-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Volunteer ID</label>
          <input
            value={volunteerId}
            onChange={(e) => setVolunteerId(e.target.value)}
            placeholder="Optional - leave empty to auto-generate"
          />
        </div>

        <div className="form-row">
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="form-row">
          <label>Age</label>
          <input type="number" min="16" value={age} onChange={(e) => setAge(e.target.value)} required />
        </div>

        <div className="form-row">
          <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option>Male</option>
            <option>Female</option>
            <option>Better not to mention</option>
          </select>
        </div>

        <div className="form-row">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="form-row">
          <label>Work Assigned</label>
          <select value={workAssigned} onChange={(e) => setWorkAssigned(e.target.value)}>
            <option>Rescue Mission</option>
            <option>Rehabilitation mission</option>
            <option>Reconstruction Mission</option>
            <option>Management</option>
          </select>
        </div>

        <div className="form-row">
          <label>Photo</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}

        <div className="modal-actions">
          <button type="button" className="btn" onClick={() => handleState && handleState(false)}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={submitting || !name}>
            {submitting ? "Adding..." : "Add Volunteer"}
          </button>
        </div>
      </form>

      <style jsx>{`
        .popup-card {
          width: 420px;
          background: white;
          border-radius: 12px;
          padding: 18px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.35);
        }
        .popup-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; }
        .close-btn { border:none; background:transparent; font-size:18px; cursor:pointer; }
        .popup-form .form-row { margin-bottom:10px; display:flex; flex-direction:column; gap:6px; }
        .popup-form label { font-size:13px; color:#333; }
        .popup-form input, .popup-form select { padding:8px 10px; border-radius:8px; border:1px solid #ddd; }
        .modal-actions { display:flex; justify-content:flex-end; gap:8px; margin-top:12px; }
        .btn { padding:8px 12px; border-radius:8px; border:1px solid #ccc; background:#fff; cursor:pointer; }
        .btn-primary { padding:8px 12px; border-radius:8px; border:none; background:var(--red); color:#fff; cursor:pointer; }
      `}</style>
    </div>
  );
}
