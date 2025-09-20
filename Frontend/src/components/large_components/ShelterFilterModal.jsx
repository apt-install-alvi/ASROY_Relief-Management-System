import { useState } from "react";
import { ModalHeader } from "../base_components/ModalHeader";
import { InputWithLabel } from "../base_components/InputWithLabel";
import { AREA_NAMES} from "../../utils/constants";
import { BASE_URL } from "../../utils/api";

export function ShelterFilterModal({ handleState, onFilter })
{
  const [selectedArea, setSelectedArea] = useState("");

  function handleInputChange(value)
  {
    setSelectedArea(value);
  }

  function handleSubmit(e)
  {
    e.preventDefault();
    
    if (!selectedArea)
    {
      alert("Please select an area to filter by.");
      return;
    }
    
    fetch(`${BASE_URL}/api/shelternew/filter/area/${encodeURIComponent(selectedArea)}`)
      .then(res => {
        if (!res.ok)
        {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
         
      .then(data =>
      {
        console.log("Filtered shelters:", data);
  
        if (onFilter)
        {
          onFilter(data);
        }
        handleState();
      })
      
      .catch(err =>
      {
        console.error("Filter fetch error:", err);
        alert("Failed to fetch filtered shelters");
        if (onFilter) onFilter([]);
      });
  }

  return (
    <div className="modal">
      <ModalHeader header={"Filter By"} handleState={handleState}></ModalHeader>
      <form className="filter-by-checkbox" onSubmit={handleSubmit}>
        <InputWithLabel
          labelFor={"area"}
          label={"Area"}
          listName={"area-list"}
          value={selectedArea}
          onChange={(e) => handleInputChange(e.target.value)}>
          </InputWithLabel>
          <datalist id="area-list">
            {AREA_NAMES.map((area, idx) => (
            <option key={idx} value={area} />
            ))}
          </datalist> 
          <div className="modal-btn-position">
            <input type="submit" value="Filter" className="red-btn" />
        </div>
      </form>
    </div>
  );
}