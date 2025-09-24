import { useState } from "react";
import { ModalHeader } from "../base_components/ModalHeader";
import { ButtonRed } from "../base_components/ButtonRed";
import { ButtonWhite } from "../base_components/ButtonWhite";
import { InputWithLabel } from "../base_components/InputWithLabel";

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

  // const handleReset = () => {
  //   setSelectedMission("");
  //   setSelectedStatus("");
  //   onReset();
  //   handleState(false);
  // };

  return (
    <div className="modal">
      <ModalHeader header={"Filter Volunteers"} handleState={handleState} />

      <div className="inputs-in-modal">
        <InputWithLabel
          labelFor={"mission-filter"}
          label={"Work Assigned"}
          value={selectedMission}
          onChange={(e) => setSelectedMission(e.target.value)}
          listName={"mission-select"}
        >
        </InputWithLabel>
        <datalist id="mission-select">
          <option value="">All Missions</option>
          {safeMissions.map(mission => (
              <option key={mission} value={mission}>{mission}</option>
           ))}
        </datalist>

        <InputWithLabel
          label={"Status"}
          labelFor={"status-filter"}
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          listName={"status-select"}
        >
        </InputWithLabel>
        <datalist id="status-select">
          <option value="">All Status</option>
          {safeStatusOptions.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </datalist>
      </div>

      <div className="modal-btn-position">
        <ButtonRed btnText={"Apply Filter"} onClick={handleApplyFilter} />
      </div>
    </div>
  );
}