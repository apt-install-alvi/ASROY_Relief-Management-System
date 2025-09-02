import { useState } from "react";
import { Checkbox } from "../base_components/Checkbox";
import { InputField } from "../base_components/InputField";
import "./FilterPopup.css";

export function FilterModal({ handleState })
{

  const [filters, setFilters] = useState(
    {
      type: { checked: false, value: "" }, 
      area: { checked: false, value: "" }, 
      date: { checked: false, value: "" } 
    }
  )

  function handleCheckbox(filterName, isChecked)
  {
    setFilters(prevState =>
    (
      {
      ...prevState,
      [filterName]: { ...prevState[filterName], checked: isChecked }
      }
    )
    );
  }

  function handleInputVisibility(filterName, value)
  {
    setFilters(prevState =>
    (
      {
        ...prevState,
        [filterName]: { ...prevState[filterName], value }
      }
    )
  );
}
   

  return (
    <div className="filter-modal-body">
      
      <div className="modal-header">
        <h5 className="title">Filter By</h5>
        <button className="x-btn"><img src="/assets/icons/x_btn.svg" onClick={handleState}/></button>
      </div>

      <form className="filter-body-content">
        <div>
          <Checkbox boxLabel="Type" boxCount="checkbox-type" checked={filters.type.checked} onChange={(e) => handleCheckbox("type", e.target.checked)}></Checkbox>
          
          {filters.type.checked ?
            <InputField
              fieldType="text"
              fieldID="type"
              placeholderTxt="E.g-Flood"
              value={filters.type.value} onChange={(e)=>handleInputVisibility("type", e.target.value)}></InputField>
          : null}
        </div>

        <div>
          <Checkbox boxLabel="Area" boxCount="checkbox-area" checked={filters.area.checked} onChange={(e) => handleCheckbox("area", e.target.checked)}></Checkbox>
          
          {filters.area.checked ?
            <InputField
              fieldType="text"
              fieldID="area"
              placeholderTxt="E.g-Dhaka"
              value={filters.area.value} onChange={(e)=>handleInputVisibility("area", e.target.value)}></InputField>
          : null}
        </div>

        <div>
          <Checkbox boxLabel="Date" boxCount="checkbox-date" checked={filters.date.checked} onChange={(e) => handleCheckbox("date", e.target.checked)}></Checkbox>
          
          {filters.date.checked ?
            <InputField
              fieldType="date"
              fieldID="date"
              value={filters.date.value} onChange={(e)=>handleInputVisibility("date", e.target.value)}></InputField>
          : null}
        </div>

        <div className="submit-div"><input type="submit" value="Filter"/></div>
      </form>

    </div>
  );
}