// import { useState } from "react";
import { ModalHeader } from "../base_components/ModalHeader";
import { InputField } from "../base_components/InputField";
import { InputWithLabel } from "../base_components/InputWithLabel";
import { Checkbox } from "../base_components/Checkbox";
import { AREA_NAMES, EVENT_TYPES } from "../../utils/constants";

// export function EventFilterModal({ handleState, onFilter })
export function ShelterFilterModal({ handleState})
{
  // const [selectedFilter, setSelectedFilter] = useState(null);
  // const [filterValues, setFilterValues] = useState({
  //   type: "",
  //   area: "",
  //   date: { from: "", to: "" }
  // });

  // function handleCheckbox(filterName, isChecked)
  // {
  //   if (isChecked) {
  //     setSelectedFilter(filterName);
  //   } else {
  //     setSelectedFilter(null);
  //   }
  // }

  // function handleInputChange(filterName, field, value)
  // {
  //   if (filterName === 'date')
  //   {
  //     setFilterValues(prev => ({
  //       ...prev,
  //       date: { ...prev.date, [field]: value }
  //     }));
  //   }
  //   else
  //   {
  //     setFilterValues(prev => ({
  //       ...prev,
  //       [filterName]: value
  //     }));
  //   }
  // }

  // function handleSubmit(e)
  // {
  //   e.preventDefault();
  //   if (!selectedFilter) return alert("Please select at least one filter.");

  //   let url = "";
  //   switch (selectedFilter)
  //   {
  //     case "type":
  //       if (!filterValues.type) return alert("Select a type.");
  //       url = `http://localhost:5000/api/events/filter/type/${encodeURIComponent(filterValues.type)}`;
  //       break;
  //     case "area":
  //       if (!filterValues.area) return alert("Select an area.");
  //       url = `http://localhost:5000/api/events/filter/area/${encodeURIComponent(filterValues.area)}`;
  //       break;
  //     case "date":
  //       if (!filterValues.date.from || !filterValues.date.to) return alert("Select both dates.");
  //       url = `http://localhost:5000/api/events/filter/date?fromDate=${filterValues.date.from}&toDate=${filterValues.date.to}`;
  //       break;
  //     default:
  //       return;
  //   }

  //   fetch(url)
  //   .then(res => res.json())
  //   .then(data => {
  //     const events = (data.events || []).map(ev => ({
  //       Event_id:
  //         ev.Event_id ?? 
  //         ev.id ??
  //         ev.event_id,
  //       Event_name:
  //         ev.Event_name ??
  //         ev.name ?? "",
  //       area:
  //         ev.area ??
  //         ev.Area ??
  //         ev.Area_name ?? "",
  //       Status:
  //         ev.Status ??
  //         ev.status ?? "Inactive",
  //       Date_of_occurrence:
  //         ev.Date_of_occurrence ??
  //         ev.date ?? "",
  //       Time_of_occurrence:
  //         ev.Time_of_occurrence ??
  //         ev.time ?? "",
  //       Event_Image:
  //         ev.Event_Image ??
  //         ev.image ?? ""
  //     }));

  //     if (onFilter) onFilter(events);
  //     handleState();
  //   })
  //   .catch(err => {
  //     console.error("Filter fetch error:", err);
  //     alert("Failed to fetch filtered events");
  //     if (onFilter) onFilter([]); // fallback
  //   });
  // }


  // const isFilterSelected = (filterName) => {
  //   return selectedFilter === filterName;
  // };

  return (
    <div className="modal">
      <ModalHeader header={"Filter By"} handleState={handleState}></ModalHeader>
      {/* <form className="filter-by-checkbox" onSubmit={handleSubmit}> */}
      <form className="filter-by-checkbox">
        <InputWithLabel
          labelFor={"area"}
          label={"Area"}
          listName={"area-list"}
          // value={filterValues.area}
          // onChange={(e) => handleInputChange("area", "value", e.target.value)}>
          >
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