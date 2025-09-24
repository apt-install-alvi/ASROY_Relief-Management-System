import { useState, useEffect } from "react";
import { BASE_URL, safeParseJson } from "../../utils/api";
import { ModalHeader } from "../base_components/ModalHeader";
import { InputWithLabel } from "../base_components/InputWithLabel";
import { ButtonRed } from "../base_components/ButtonRed";
import { ButtonWhite } from "../base_components/ButtonWhite";
import "../styles/large_components/VolunteerStyles.css";

const PLACEHOLDER = "/assets/images/volunteer.jpeg";
const WORK_OPTIONS = ["Relief Distribution", "Rescue", "Reconstruction"];
const STATUS_OPTIONS = ["Active", "Inactive"];

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
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const [localName, setLocalName] = useState(name || "");
  const [localStatus, setLocalStatus] = useState(status || "Active");
  const [localGender, setLocalGender] = useState(gender || "Better not to mention");
  const [localAge, setLocalAge] = useState(age || "");
  const [localImage, setLocalImage] = useState(image || PLACEHOLDER);
  const [localWorkAssigned, setLocalWorkAssigned] = useState(workAssigned || "Relief Distribution");
  const [file, setFile] = useState(null);

  useEffect(() => {
    setLocalName(name || "");
    setLocalStatus(status || "Active");
    setLocalGender(gender || "Better not to mention");
    setLocalAge(age || "");
    setLocalImage(image || PLACEHOLDER);
    setLocalWorkAssigned(workAssigned || "Relief Distribution");
  }, [name, status, gender, age, image, workAssigned]);

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    
    setFile(f);
    const reader = new FileReader();
    reader.onload = () => setLocalImage(reader.result);
    reader.readAsDataURL(f);
  };

  const validateForm = () => {
    if (!localName.trim()) {
      setError("Name is required");
      return false;
    }
    if (localAge && (localAge < 16 || localAge > 100)) {
      setError("Age must be between 16 and 100");
      return false;
    }
    setError("");
    return true;
  };

  async function handleSave() {
  if (!validateForm()) return;
  
  setIsLoading(true);
  setError("");
  setSuccessMessage("");

  try {
    const formData = new FormData();
    formData.append("name", localName.trim());
    formData.append("age", localAge);
    formData.append("gender", localGender);
    formData.append("status", localStatus);
    formData.append("workAssigned", localWorkAssigned); // This matches backend
    
    if (file) {
      formData.append("photo", file);
    }

    console.log("Saving volunteer data:", {
      name: localName,
      age: localAge,
      gender: localGender,
      status: localStatus,
      workAssigned: localWorkAssigned,
      hasFile: !!file
    });

    const res = await fetch(`${BASE_URL}/api/volunteers/edit/${volunteerId}`, {
      method: "PUT",
      body: formData, // Keep as FormData for file upload
    });

    // ... rest of your code
      const data = await safeParseJson(res);
      
      console.log("API Response:", data);
      
      if (!res.ok) {
        throw new Error((data && data.error) || `Failed to update volunteer. Status: ${res.status}`);
      }

      const updated = data?.volunteer || null;
      if (updated) {
        if (updated.Volunteer_Image) {
          updated.Volunteer_Image = updated.Volunteer_Image.startsWith("http")
            ? updated.Volunteer_Image
            : `${BASE_URL}${updated.Volunteer_Image}`;
        } else {
          updated.Volunteer_Image = PLACEHOLDER;
        }

        if (!updated.Work_Assigned) {
          updated.Work_Assigned = localWorkAssigned || "Relief Distribution";
        }
      }

      // Show success message
      setSuccessMessage("Volunteer updated successfully!");
      
      // Call the parent component's update handler
      onUpdate?.(updated);
      
      // Wait a moment to show success message before exiting edit mode
      setTimeout(() => {
        setIsEditing(false);
        setFile(null);
        setSuccessMessage("");
      }, 1500);

    } catch (err) {
      console.error("Update error:", err);
      setError(err.message || "An error occurred while updating volunteer");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this volunteer? This action cannot be undone.")) {
      return;
    }
    
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(`${BASE_URL}/api/volunteers/delete/${volunteerId}`, { 
        method: "DELETE" 
      });
      
      const data = await safeParseJson(res);
      if (!res.ok) {
        throw new Error((data && data.error) || "Failed to delete volunteer");
      }
      
      onDelete?.(volunteerId);
      handleState?.(false);
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message || "An error occurred while deleting volunteer");
    } finally {
      setIsLoading(false);
    }
  }

  const handleCancelEdit = () => {
    setLocalName(name || "");
    setLocalStatus(status || "Active");
    setLocalGender(gender || "Better not to mention");
    setLocalAge(age || "");
    setLocalImage(image || PLACEHOLDER);
    setLocalWorkAssigned(workAssigned || "Relief Distribution");
    setFile(null);
    setError("");
    setSuccessMessage("");
    setIsEditing(false);
  };

  return (
    <div className="modal">
      <ModalHeader 
        header={isEditing ? "Edit Volunteer" : "View Volunteer"} 
        handleState={handleState}
      />

      {error && (
        <div className="error-message" style={{color: 'red', margin: '1rem', textAlign: 'center'}}>
          {error}
        </div>
      )}

      {successMessage && (
        <div className="success-message" style={{color: 'green', margin: '1rem', textAlign: 'center'}}>
          {successMessage}
        </div>
      )}

      {isEditing ? (
        <div className="inputs-in-modal">
          <InputWithLabel
            labelFor="name"
            label="Name"
            fieldType="text"
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
            required
          />

          <InputWithLabel
            labelFor="age"
            label="Age"
            fieldType="number"
            value={localAge}
            min={16}
            max={100}
            onChange={(e) => setLocalAge(e.target.value)}
          />

          <InputWithLabel
            labelFor="gender"
            label="Gender"
            list="gender-list"
            value={localGender}
            onChange={(e) => setLocalGender(e.target.value)}
          />
          <datalist id="gender-list">
            <option value="Male" />
            <option value="Female" />
            <option value="Better not to mention" />
          </datalist>
      
          {/* Status Dropdown */}
          <div className="form-field">
            <label htmlFor="status">Status</label>
            <select 
              id="status"
              value={localStatus} 
              onChange={(e) => setLocalStatus(e.target.value)}
              className="form-select"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Work Assigned Dropdown */}
          <div className="form-field">
            <label htmlFor="work-assigned">Work Assigned</label>
            <select 
              id="work-assigned"
              value={localWorkAssigned} 
              onChange={(e) => setLocalWorkAssigned(e.target.value)}
              className="form-select"
            >
              <option value="Relief Distribution">Relief Distribution</option>
              <option value="Rescue">Rescue</option>
              <option value="Reconstruction">Reconstruction</option>
            </select>
          </div>

          <InputWithLabel
            labelFor="volunteer-img"
            label="Change photo"
            fieldType="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="volunteer-card">
          <img src={localImage} alt={localName} />
          <div className="inputs-in-modal">
            <InputWithLabel labelFor="name" label="Name" value={localName} readOnly />
            <InputWithLabel labelFor="age" label="Age" value={localAge} readOnly />
            <InputWithLabel labelFor="gender" label="Gender" value={localGender} readOnly />
            <InputWithLabel labelFor="status" label="Status" value={localStatus} readOnly />
            <InputWithLabel labelFor="work-assigned" label="Assigned Work" value={localWorkAssigned} readOnly />
          </div>
        </div>
      )}

      <div className="modal-btn-position">
        {isEditing ? (
          <>
            <ButtonWhite 
              btnText="Cancel" 
              onClick={handleCancelEdit}
              disabled={isLoading}
            />
            <ButtonRed 
              btnText={isLoading ? "Saving..." : "Save"} 
              onClick={handleSave}
              disabled={isLoading}
            />
          </>
        ) : (
          <>
            <ButtonWhite 
              btnText="Delete" 
              onClick={handleDelete}
              disabled={isLoading}
            />
            <ButtonRed 
              btnText="Edit" 
              onClick={() => setIsEditing(true)}
              disabled={isLoading}
            />
          </>
        )}
      </div>
    </div>
  );
}