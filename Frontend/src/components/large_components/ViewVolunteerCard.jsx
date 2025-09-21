// src/components/large_components/ViewVolunteerCard.jsx
import { useState, useEffect } from "react";
import { BASE_URL, safeParseJson } from "../../utils/api";
import { ModalHeader } from "../base_components/ModalHeader";
import { InputWithLabel } from "../base_components/InputWithLabel";
import { ButtonRed } from "../base_components/ButtonRed";
import { ButtonWhite } from "../base_components/ButtonWhite";
import "../styles/large_components/VolunteerStyles.css";

const PLACEHOLDER = "/assets/images/volunteer.jpeg";

export function ViewVolunteerCard({
  volunteerId,
  image,
  name,
  status,
  gender,
  age,
  workAssigned,
  handleState,
  onUpdate,
  onDelete,
})

{
  const [isEditing, setIsEditing] = useState(false);
  const [localName, setLocalName] = useState(name || "");
  const [localStatus, setLocalStatus] = useState(status || "Active");
  const [localGender, setLocalGender] = useState(gender || "Better not to mention");
  const [localAge, setLocalAge] = useState(age || "");
  const [localImage, setLocalImage] = useState(image || PLACEHOLDER);
  const [localWorkAssigned, setLocalWorkAssigned] = useState(workAssigned || "Rescue Mission");
  const [file, setFile] = useState(null);

  useEffect(() => {
    setLocalName(name || "");
    setLocalStatus(status || "Active");
    setLocalGender(gender || "Better not to mention");
    setLocalAge(age || "");
    setLocalImage(image || PLACEHOLDER);
    setLocalWorkAssigned(workAssigned || "Rescue Mission");
  }, [name, status, gender, age, image, workAssigned]);

  function handleFileChange(e)
  {
    const f = e.target.files?.[0];
    if (!f)
      return;
    
    setFile(f);
    const reader = new FileReader();
    reader.onload = () => setLocalImage(reader.result);
    reader.readAsDataURL(f);
    console.log("Selected file:", f);
  }

  async function handleSave()
  {
    try
    {
      const formData = new FormData();
      formData.append("name", localName);
      formData.append("age", localAge);
      formData.append("gender", localGender);
      formData.append("status", localStatus);
      formData.append("workAssigned", localWorkAssigned);
      if (file) formData.append("photo", file);

      const res = await fetch(`${BASE_URL}/api/volunteers/edit/${volunteerId}`,
      {
        method: "PUT",
        body: formData,
      });

      const data = await safeParseJson(res);
      if (!res.ok)
        throw new Error((data && data.error) || "Failed to update volunteer");

      const updated = (data && data.volunteer) || null;
      if (updated)
      {
        if (updated.Volunteer_Image)
        {
          updated.Volunteer_Image = updated.Volunteer_Image.startsWith("http")
            ? updated.Volunteer_Image
            : `${BASE_URL}${updated.Volunteer_Image}`;
        }
        else
        {
          updated.Volunteer_Image = PLACEHOLDER;
        }

        // normalize field name if backend used different column name
        if (!updated.Work_Assigned && updated.Volunteer_WorkAssigned) {
          updated.Work_Assigned = updated.Volunteer_WorkAssigned;
        }
        if (!updated.Work_Assigned) updated.Work_Assigned = localWorkAssigned || "Rescue Mission";
      }

      onUpdate && onUpdate(updated);
      setIsEditing(false);
      console.log([...formData.entries()]);

    }
    
    catch (err)
    {
      console.error(err);
    }

  }

  async function handleDelete()
  {
    if (!confirm("Delete this volunteer? This action cannot be undone."))
      return;
    
    try
    {
      const res = await fetch(`${BASE_URL}/api/volunteers/delete/${volunteerId}`, { method: "DELETE" });
      const data = await safeParseJson(res);
      if (!res.ok)
        throw new Error((data && data.error) || "Failed to delete");
      
      onDelete && onDelete(volunteerId);
    }
    
    catch (err)
    {
      console.error(err);
    }
  }

  return (
    <div className="modal">
      <ModalHeader header={"View Volunteer"} handleState={handleState}></ModalHeader>  

      {isEditing ?
        <div className="inputs-in-modal">
          <InputWithLabel
            labelFor={"name"}
            label={"Name"}
            fieldType="text"
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
          >
          </InputWithLabel>

          <InputWithLabel
            labelFor={"age"}
            label={"Age"}
            fieldType="number"
            value={localAge}
            min={16}
            onChange={(e) => setLocalAge(e.target.value)}
          ></InputWithLabel>

          <InputWithLabel
            labelFor={"gender"}
            label={"Gender"}
            listName={"gender-list"}
            placeholderTxt={"Select gender"}
            value={localGender}
            onChange={(e) => setLocalGender(e.target.value)}
          ></InputWithLabel>
          <datalist id="gender-list">
            <option key={"male"}>Male</option>
            <option key={"female"}>Female</option>
            <option key={"no-mention"}>Better not to mention</option>
          </datalist>
      
          <InputWithLabel
            labelFor={"status"}
            label={"Status"}
            listName={"status-list"}
            placeholderTxt={"Select activity status"}
            value={localStatus}
            onChange={(e) => setLocalStatus(e.target.value)}
          ></InputWithLabel>
          <datalist id="status-list">
            <option key={"active"}>Active</option>
            <option key={"inactive"}>Inactive</option>
          </datalist>

          {/* Work Assigned edit */}
          <InputWithLabel
            labelFor={"work_assigned"}
            label={"Work Assigned"}
            listName={"work-list"}
            placeholderTxt={"Select work assigned"}
            value={localWorkAssigned}
            onChange={(e) => setLocalWorkAssigned(e.target.value)}
          ></InputWithLabel>
          <datalist id="work-list">
            <option key={"rescue"}>Rescue Mission</option>
            <option key={"rehab"}>Rehabilitation mission</option>
            <option key={"recon"}>Reconstruction Mission</option>
            <option key={"mgmt"}>Management</option>
          </datalist>

          <InputWithLabel
            labelFor={"volunteer-img"}
            label={"Change photo"}
            fieldType={"file"}
            accept={"image/*"}
            onChange={(e) => handleFileChange(e)}
          ></InputWithLabel>
        </div>
        :
        <div className="volunteer-card">
          <img src={localImage} alt={localName}></img>
          <div className="inputs-in-modal">
            {/* Display-mode inputs: mark readOnly to avoid React controlled-input warning */}
            <InputWithLabel labelFor={"name"} label={"Name"} value={localName} readOnly></InputWithLabel>
            <InputWithLabel labelFor={"age"} label={"Age"} value={localAge} readOnly></InputWithLabel>
            <InputWithLabel labelFor={"gender"} label={"Gender"} value={localGender} readOnly></InputWithLabel>
            <InputWithLabel labelFor={"status"} label={"Status"} value={localStatus} readOnly></InputWithLabel>
            <InputWithLabel labelFor={"work_assigned_display"} label={"Work Assigned"} value={localWorkAssigned} readOnly></InputWithLabel>
          </div>
        </div>
      }

      <div className="modal-btn-position">
        {isEditing ?
          <ButtonRed btnText={"Save"} onClick={handleSave}></ButtonRed>
          :
          <>
            <ButtonWhite btnText={"Delete"} onClick={handleDelete}></ButtonWhite>
            <ButtonRed btnText={"Edit"} onClick={()=>setIsEditing(true)}></ButtonRed>
          </>
        }
      </div>
    </div>
  );
}
