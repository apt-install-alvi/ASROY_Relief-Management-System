// src/components/large_components/VolunteerAddModal.jsx
import { useState } from "react";
import { BASE_URL, safeParseJson } from "../../utils/api";
import { ModalHeader } from "../base_components/ModalHeader";
import { InputWithLabel } from "../base_components/InputWithLabel";
import "../styles/large_components/VolunteerStyles.css";

const PLACEHOLDER = "/assets/images/volunteer.jpeg";

export function VolunteerAddModal({ handleState, onAdd })
{
  const [volunteerId, setVolunteerId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [workAssigned, setWorkAssigned] = useState("");
  const [photoFile, setPhotoFile] = useState(null);

  const handleFileChange = (e) =>
  {
    const file = e.target.files && e.target.files[0];
    setPhotoFile(file || null);
  };

  async function handleSubmit(e)
  {
    e.preventDefault();
    try
    {
      const formData = new FormData();
      if (volunteerId) formData.append("volunteerId", volunteerId);
      formData.append("name", name);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("status", status);
      formData.append("workAssigned", workAssigned);
      if (photoFile) formData.append("photo", photoFile);

      const res = await fetch(`${BASE_URL}/api/volunteers/add`,
      {
        method: "POST",
        body: formData,
      });

      const data = await safeParseJson(res);
      if (!res.ok)
        throw new Error((data && data.error) || "Failed to add volunteer");

      // backend returns { success: true, volunteer: {...} }
      const created = data && data.volunteer ? data.volunteer : null;

      // normalized image to full URL if backend returned a path
      if (created) {
        if (created.Volunteer_Image)
        {
          created.Volunteer_Image = created.Volunteer_Image.startsWith("http")
            ? created.Volunteer_Image
            : `${BASE_URL}${created.Volunteer_Image}`;
        }
        else
        {
          created.Volunteer_Image = PLACEHOLDER;
        }

        // ensure Work_Assigned present (backend might return Work_Assigned or Volunteer_WorkAssigned)
        if (!created.Work_Assigned && created.Volunteer_WorkAssigned) {
          created.Work_Assigned = created.Volunteer_WorkAssigned;
        }
        if (!created.Work_Assigned) created.Work_Assigned = workAssigned || "Relief Distribution";
      }

      onAdd && onAdd(created);
      handleState && handleState(false);
    }

    catch (err)
    {
      console.error(err);
    }

  };

  return (
    <div className="modal">
      <ModalHeader header={"Add Volunteer"} handleState={handleState}></ModalHeader>

      <form className="inputs-in-modal" onSubmit={handleSubmit}>
        <InputWithLabel
          labelFor={"volunteer_id"}
          label={"Volunteer ID"}
          fieldType="text"
          value={volunteerId}
          onChange={(e)=>setVolunteerId(e.target.value)}
        ></InputWithLabel>

        <InputWithLabel
          labelFor={"name"}
          label={"Name"}
          fieldType="text"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        ></InputWithLabel>
        <div className="add-date-time-inputs">
          <InputWithLabel
            className={"volunteer-age-gender"}
            labelFor={"age"}
            label={"Age"}
            fieldType="number"
            value={age}
            min={16}
            onChange={(e)=>setAge(e.target.value)}
          ></InputWithLabel>

          <InputWithLabel
            className={"volunteer-age-gender"}
            labelFor={"gender"}
            label={"Gender"}
            listName={"gender-list"}
            value={gender}
            onChange={(e)=>setGender(e.target.value)}
          ></InputWithLabel>
          <datalist id="gender-list">
            <option key={"male"}>Male</option>
            <option key={"female"}>Female</option>
            <option key={"no-mention"}>Better not to mention</option>
          </datalist>
        </div>
        
        <InputWithLabel
          labelFor={"status"}
          label={"Status"}
          listName={"status-list"}
          value={status}
          onChange={(e)=>setStatus(e.target.value)}
        ></InputWithLabel>
        <datalist id="status-list">
          <option key={"active"}>Active</option>
          <option key={"inactive"}>Inactive</option>
        </datalist>

        <InputWithLabel
          labelFor={"work_assigned"}
          label={"Work Assigned"}
          listName={"work-list"}
          value={workAssigned}
          onChange={(e)=>setWorkAssigned(e.target.value)}
        ></InputWithLabel>
        <datalist id="work-list">
          <option key={"relief"}>Relief Distribution</option>
          <option key={"rescue"}>Rescue</option>
          <option key={"recon"}>Reconstruction</option>
        </datalist>

        <InputWithLabel
          labelFor={"volunteer-img"}
          label={"Photo"}
          fieldType={"file"}
          accept={"image/*"}
          onChange={handleFileChange}
        >
        </InputWithLabel>
        <div className="modal-btn-position volunteer-submit-btn"><input type="submit" value="Add" className="red-btn" /></div>
      </form>
    </div>
  );
}
