import { useState } from "react";
import { ModalHeader } from "../base_components/ModalHeader";
import { ButtonRed } from "../base_components/ButtonRed";
import { ButtonWhite } from "../base_components/ButtonWhite";

export function VolunteerFilterModal({ 
  handleState, 
  onFilter, 
  onReset, 
  volunteers, 
  missions, 
  statusOptions 
}) {
  const [selectedMission, setSelectedMission] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // Safe defaults
  const safeVolunteers = volunteers || [];
  const safeMissions = missions || [];
  const safeStatusOptions = statusOptions || ["Active", "Inactive"]; // Default fallback

  const handleApplyFilter = () => {
    let filtered = safeVolunteers;

    if (selectedMission) {
      filtered = filtered.filter(v => v.Work_Assigned === selectedMission);
    }

    if (selectedStatus) {
      filtered = filtered.filter(v => v.Status === selectedStatus);
    }

    onFilter(filtered, { mission: selectedMission, status: selectedStatus });
    handleState(false);
  };

  const handleReset = () => {
    setSelectedMission("");
    setSelectedStatus("");
    onReset();
    handleState(false);
  };

  return (
    <div className="modal">
      <ModalHeader header={"Filter Volunteers"} handleState={handleState} />

      <div className="inputs-in-modal">
        <div className="filter-field">
          <label htmlFor="mission-filter">Mission/Work Assigned</label>
          <select 
            id="mission-filter"
            value={selectedMission} 
            onChange={(e) => setSelectedMission(e.target.value)}
          >
            <option value="">All Missions</option>
            {safeMissions.map(mission => (
              <option key={mission} value={mission}>{mission}</option>
            ))}
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="status-filter">Status</label>
          <select 
            id="status-filter"
            value={selectedStatus} 
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">All Status</option>
            {safeStatusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="modal-btn-position">
        <ButtonWhite btnText={"Reset"} onClick={handleReset} />
        <ButtonRed btnText={"Apply Filter"} onClick={handleApplyFilter} />
      </div>
    </div>
  );
}