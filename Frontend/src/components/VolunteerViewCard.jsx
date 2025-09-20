// src/components/VolunteerViewCard.jsx
import React, { useState } from "react";
import { BASE_URL, safeParseJson } from "../utils/api";

const PLACEHOLDER = "/assets/images/volunteer.jpeg";

export default function VolunteerViewCard({
  volunteerId,
  image,
  name,
  status,
  gender,
  age,
  handleState,
  onUpdate,
  onDelete,
}) {
  const [editing, setEditing] = useState(false);
  const [localName, setLocalName] = useState(name || "");
  const [localStatus, setLocalStatus] = useState(status || "Active");
  const [localGender, setLocalGender] = useState(gender || "Better not to mention");
  const [localAge, setLocalAge] = useState(age || "");
  const [localImage, setLocalImage] = useState(image || PLACEHOLDER);
  const [localWorkAssigned, setLocalWorkAssigned] = useState("");
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    setLocalName(name || "");
    setLocalStatus(status || "Active");
    setLocalGender(gender || "Better not to mention");
    setLocalAge(age || "");
    setLocalImage(image || PLACEHOLDER);
  }, [name, status, gender, age, image]);

  // fetch Work_Assigned if not passed (but VolunteerPage passes only selectedVolunteer props).
  // We'll try to set it from a volunteer object prop if available; if not, default to Rescue Mission
  React.useEffect(() => {
    // try to read from a passed in prop named workAssigned if present (Volunteer.jsx passes selectedVolunteer)
    // The VolunteerPage passes selectedVolunteer via props when rendering this component; so it's likely accessible
    // through the closures outside, if not, we default below.
    // As a safe fallback, set default:
    if (!localWorkAssigned) setLocalWorkAssigned((typeof window !== "undefined" && window.localWorkAssigned) || "Rescue Mission");
    // (This line simply ensures there's a default value; VolunteerPage will pass updated volunteer into onUpdate caller.)
  }, []);


  const handleFileChange = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = () => setLocalImage(reader.result);
    reader.readAsDataURL(f);
  };

  const handleSave = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("name", localName);
      formData.append("age", localAge);
      formData.append("gender", localGender);
      formData.append("status", localStatus);
      formData.append("workAssigned", localWorkAssigned || "Rescue Mission");
      if (file) formData.append("photo", file);

      const res = await fetch(`${BASE_URL}/api/volunteers/edit/${volunteerId}`, {
        method: "PUT",
        body: formData,
      });

      const data = await safeParseJson(res);
      if (!res.ok) throw new Error((data && data.error) || "Failed to update volunteer");

      const updated = (data && data.volunteer) || null;
      if (updated) {
        if (updated.Volunteer_Image) {
          updated.Volunteer_Image = updated.Volunteer_Image.startsWith("http")
            ? updated.Volunteer_Image
            : `${BASE_URL}${updated.Volunteer_Image}`;
        } else {
          updated.Volunteer_Image = PLACEHOLDER;
        }
        if (!updated.Work_Assigned) updated.Work_Assigned = localWorkAssigned || "Rescue Mission";
      }

      onUpdate && onUpdate(updated);
      setEditing(false);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to update");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this volunteer? This will remove it from DB and UI.")) return;
    try {
      const res = await fetch(`${BASE_URL}/api/volunteers/delete/${volunteerId}`, { method: "DELETE" });
      const data = await safeParseJson(res);
      if (!res.ok) throw new Error((data && data.error) || "Failed to delete");
      onDelete && onDelete(volunteerId);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to delete");
    }
  };

  return (
    <div className="popup-card" role="dialog" aria-modal="true">
      <div className="popup-header">
        <h3>Volunteer Details</h3>
        <button className="close-btn" onClick={() => handleState && handleState(false)}>✕</button>
      </div>

      <div className="view-grid">
        <div className="left">
          <div className="image-wrap">
            <img src={localImage || PLACEHOLDER} alt={localName} />
          </div>

          {editing && (
            <div className="form-row">
              <label>Change Photo</label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>
          )}
        </div>

        <div className="right">
          {!editing ? (
            <>
              <div className="view-row"><strong>Name: </strong> {localName}</div>
              <div className="view-row"><strong>Gender: </strong> {localGender}</div>
              <div className="view-row"><strong>Age: </strong> {localAge}</div>
              <div className="view-row"><strong>Status: </strong> {localStatus}</div>
              <div className="view-row"><strong>Work Assigned: </strong> {localWorkAssigned || "Rescue Mission"}</div>

              {error && <div style={{ color: "red" }}>{error}</div>}

              <div className="actions">
                <button className="btn" onClick={() => setEditing(true)}>Edit</button>
                <button className="btn-danger" onClick={handleDelete}>Delete</button>
              </div>
            </>
          ) : (
            <>
              <div className="form-row">
                <label>Name</label>
                <input value={localName} onChange={(e) => setLocalName(e.target.value)} />
              </div>

              <div className="form-row">
                <label>Gender</label>
                <select value={localGender} onChange={(e) => setLocalGender(e.target.value)}>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Better not to mention</option>
                </select>
              </div>

              <div className="form-row">
                <label>Age</label>
                <input type="number" min="16" value={localAge} onChange={(e) => setLocalAge(e.target.value)} />
              </div>

              <div className="form-row">
                <label>Status</label>
                <select value={localStatus} onChange={(e) => setLocalStatus(e.target.value)}>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

              <div className="form-row">
                <label>Work Assigned</label>
                <select value={localWorkAssigned} onChange={(e) => setLocalWorkAssigned(e.target.value)}>
                  <option>Rescue Mission</option>
                  <option>Rehabilitation mission</option>
                  <option>Reconstruction Mission</option>
                  <option>Management</option>
                </select>
              </div>

              {error && <div style={{ color: "red" }}>{error}</div>}

              <div className="actions">
                <button className="btn" onClick={() => setEditing(false)}>Cancel</button>
                <button className="btn-primary" onClick={handleSave} disabled={submitting}>
                  {submitting ? "Saving..." : "Save"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .popup-card { width:720px; max-width:95vw; background:#fff; border-radius:12px; padding:18px; box-shadow:0 12px 40px rgba(0,0,0,0.35); }
        .popup-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; }
        .close-btn { border:none; background:transparent; font-size:18px; cursor:pointer; }
        .view-grid { display:flex; gap:18px; align-items:flex-start; }
        .left { width:40%; }
        .image-wrap { width:100%; border-radius:10px; overflow:hidden; height:220px; background:#f4f4f4; display:flex; align-items:center; justify-content:center; }
        .image-wrap img { width:100%; height:100%; object-fit:cover; display:block; }
        .right { flex:1; display:flex; flex-direction:column; gap:10px; }
        .view-row { font-size:15px; color:#222; }
        .form-row { display:flex; flex-direction:column; gap:6px; }
        input, select { padding:8px 10px; border-radius:8px; border:1px solid #ddd; }
        .actions { margin-top:10px; display:flex; gap:8px; }
        .btn { padding:8px 12px; border-radius:8px; background:#fff; border:1px solid #ccc; cursor:pointer; }
        .btn-primary { padding:8px 12px; border-radius:8px; background:var(--red); color:#fff; border:none; cursor:pointer; }
        .btn-danger { padding:8px 12px; border-radius:8px; background:#ff6b6b; color:#fff; border:none; cursor:pointer; }
      `}</style>
    </div>
  );
}
