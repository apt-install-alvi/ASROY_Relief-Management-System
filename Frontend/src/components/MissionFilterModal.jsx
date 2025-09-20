// src/components/MissionFilterModal.jsx
import React, { useState } from "react";

/**
 * Props:
 * - handleState(closeFn)
 * - onFilter(filteredVolunteers)
 * - onReset()
 * - volunteers: array of volunteer objects (the modal will filter this list)
 * - missions: array of mission strings
 */
export function MissionFilterModal({ handleState, onFilter, onReset, volunteers = [], missions = [] }) {
  const [selectedMission, setSelectedMission] = useState("All");

  const applyFilter = () => {
    let filtered = volunteers || [];
    if (selectedMission && selectedMission !== "All") {
      filtered = filtered.filter((v) => v.Work_Assigned === selectedMission);
    }
    onFilter && onFilter(filtered);
    handleState && handleState(false);
  };

  const handleReset = () => {
    setSelectedMission("All");
    onReset && onReset();
    handleState && handleState(false);
  };

  return (
    <div className="popup-card" role="dialog" aria-modal="true" style={{ width: 420 }}>
      <div className="popup-header">
        <h3>Filter Volunteers</h3>
        <button className="close-btn" onClick={() => handleState && handleState(false)}>✕</button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontSize: 13 }}>Mission</label>
          <select value={selectedMission} onChange={(e) => setSelectedMission(e.target.value)}>
            <option value="All">All</option>
            {missions.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 8 }}>
          <button className="btn" onClick={handleReset}>Reset</button>
          <button className="btn-primary" onClick={applyFilter}>Apply</button>
        </div>
      </div>

      <style jsx>{`
        .popup-card {
          background: #fff;
          border-radius: 12px;
          padding: 18px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.35);
        }
        .popup-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; }
        .close-btn { border:none; background:transparent; font-size:18px; cursor:pointer; }
        select { padding:8px 10px; border-radius:8px; border:1px solid #ddd; }
        .btn { padding:8px 12px; border-radius:8px; border:1px solid #ccc; background:#fff; cursor:pointer; }
        .btn-primary { padding:8px 12px; border-radius:8px; border:none; background:var(--red); color:#fff; cursor:pointer; }
      `}</style>
    </div>
  );
}

export default MissionFilterModal;
