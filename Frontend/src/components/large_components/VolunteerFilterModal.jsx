import { useState } from "react";
import { ModalHeader } from "../base_components/ModalHeader";
import { InputWithLabel } from "../base_components/InputWithLabel";

export function VolunteerFilterModal({
  handleState,
  onFilter,
  volunteers = [],
  missions = [] })
{
  const [selectedMission, setSelectedMission] = useState("");

  function applyFilter()
  {
    let filtered = volunteers || [];
    if (selectedMission && selectedMission !== "")
    {
      filtered = filtered.filter((v) => v.Work_Assigned === selectedMission);
    }

    onFilter && onFilter(filtered);
    handleState && handleState(false);
  }

  return (
    <div className="modal">
      <ModalHeader header={"Filter By"} handleState={handleState}></ModalHeader>
      <InputWithLabel
        listName={"work-list"}
        labelFor={"work-assign"}
        label={"Assigned Work"}
        value={selectedMission}
        onChange={(e) => setSelectedMission(e.target.value)}>
      </InputWithLabel>
      <datalist id="work-list">
        {missions.map((m) => <option key={m} value={m}>{m}</option>)}
      </datalist>
      
      <div className="modal-btn-position">
        <input type="submit" value="Filter" className="red-btn" onClick={applyFilter} />
      </div>
    </div>
  );
}