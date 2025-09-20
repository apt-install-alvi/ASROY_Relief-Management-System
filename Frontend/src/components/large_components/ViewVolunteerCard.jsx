import React, { useState, useEffect } from "react";
import { BASE_URL, safeParseJson } from "../../utils/api";
import { ModalHeader } from "../base_components/ModalHeader";
import { InputWithLabel } from "../base_components/InputWithLabel";
import { ButtonRed } from "../base_components/ButtonRed";
import { ButtonWhite } from "../base_components/ButtonWhite";

const PLACEHOLDER = "/assets/images/volunteer.jpeg";

export function ViewVolunteerCard({
  volunteerId,
  image,
  name,
  status,
  gender,
  age,
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
  const [file, setFile] = useState(null);

  useEffect(() => {
    setLocalName(name || "");
    setLocalStatus(status || "Active");
    setLocalGender(gender || "Better not to mention");
    setLocalAge(age || "");
    setLocalImage(image || PLACEHOLDER);
  }, [name, status, gender, age, image]);

  function handleFileChange(e)
  {
    const f = e.target.files && e.target.files[0];
    if (!f)
      return;
    
    setFile(f);
    const reader = new FileReader();
    reader.onload = () => setLocalImage(reader.result);
    reader.readAsDataURL(f);
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
      }

      onUpdate && onUpdate(updated);
      setIsEditing(false);
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

          <InputWithLabel
            labelFor={"volunteer-img"}
            label={"Change photo"}
            fieldType={"file"}
            accept={"image/*"}
            onChange={handleFileChange}
          ></InputWithLabel>
        </div>
        :
        <div className="inputs-in-modal">
          <img src={localImage} alt={localName}></img>
          <InputWithLabel labelFor={"name"} label={"Name"} value={localName}></InputWithLabel>
          <InputWithLabel labelFor={"age"} label={"Age"} value={localAge}></InputWithLabel>
          <InputWithLabel labelFor={"gender"} label={"Gender"} value={localGender}></InputWithLabel>
          <InputWithLabel labelFor={"status"} label={"Status"} value={localStatus}></InputWithLabel>
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
             {/* <div className="form-row">
               <label>Change Photo</label>
               <input type="file" accept="image/*" onChange={handleFileChange} />
            </div> */}
       

        {/* <div className="right">
          {!isEditing ? (
            <>
              <div className="view-row"><strong>Name: </strong> {localName}</div>
              <div className="view-row"><strong>Gender: </strong> {localGender}</div>
              <div className="view-row"><strong>Age: </strong> {localAge}</div>
              <div className="view-row"><strong>Status: </strong> {localStatus}</div>


              <div className="actions">
                <button className="btn" onClick={() => setIsEditing(true)}>Edit</button>
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


              <div className="actions">
                <button className="btn" onClick={() => setIsEditing(false)}>Cancel</button>
                <button className="btn-primary" onClick={handleSave} disabled={submitting}>
                  {submitting ? "Saving..." : "Save"}
                </button>
              </div>
            </>
          )}
        </div> */}
      
    </div>
  );
}
