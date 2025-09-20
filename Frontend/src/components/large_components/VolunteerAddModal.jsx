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
          placeholderTxt={"Optional, leave empty to auto-generate an ID"}
          onChange={(e)=>setVolunteerId(e.target.value)}
        ></InputWithLabel>

        <InputWithLabel
          labelFor={"name"}
          label={"Name"}
          fieldType="text"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        ></InputWithLabel>
 
        <InputWithLabel
          labelFor={"age"}
          label={"Age"}
          fieldType="number"
          value={age}
          min={16}
          onChange={(e)=>setAge(e.target.value)}
        ></InputWithLabel>

        <InputWithLabel
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
          labelFor={"volunteer-img"}
          label={"Photo"}
          fieldType={"file"}
          accept={"image/*"}
          onChange={handleFileChange}
        >
        </InputWithLabel>
        <div className="modal-btn-position volunteer-submit-btn"><input type="submit" value="Add" className="red-btn" /></div>
        
        {/* <div className="form-row">
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="form-row">
          <label>Age</label>
          <input type="number" min="16" value={age} onChange={(e) => setAge(e.target.value)} required />
        </div>

        <div className="form-row">
          <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option>Male</option>
            <option>Female</option>
            <option>Better not to mention</option>
          </select>
        </div>

        <div className="form-row">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="form-row">
          <label>Photo</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}

        <div className="modal-actions">
          <button type="button" className="btn" onClick={() => handleState && handleState(false)}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={submitting || !name}>
            {submitting ? "Adding..." : "Add Volunteer"}
          </button> 
        </div> */}
      </form>
    </div>
  );
}
