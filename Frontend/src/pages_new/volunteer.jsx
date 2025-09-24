import React, { useState, useEffect } from "react";
import { VolunteerAddModal } from "../components/large_components/VolunteerAddModal";
import { ViewVolunteerCard } from "../components/large_components/ViewVolunteerCard";
import { BASE_URL, safeParseJson } from "../utils/api";
import { Sidebar } from "../components/large_components/Sidebar";
import { Header } from "../components/base_components/Header";
import { ButtonRed } from "../components/base_components/ButtonRed";
import { ButtonWhite } from "../components/base_components/ButtonWhite";
import { Card } from "../components/base_components/Card";
import { SubHeader } from "../components/base_components/SubHeader";
import { VolunteerFilterModal } from "../components/large_components/VolunteerFilterModal";

const PLACEHOLDER = "/assets/images/volunteer_default.jpg";
const MISSIONS = [
  "Relief Distribution",
  "Rescue",
  "Reconstruction",
];
const STATUS_OPTIONS = ["Active", "Inactive"];
const DEFAULT_WORK_ASSIGNED = "Relief Distribution";

export function VolunteerPage() {
  const [volunteers, setVolunteers] = useState([]);
  const [filteredVolunteers, setFilteredVolunteers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentFilter, setCurrentFilter] = useState({ mission: "", status: "" });
  

  // Normalize volunteer data
  const normalizeVolunteer = (v) => ({
    ...v,
    Volunteer_Image: v.Volunteer_Image 
      ? (v.Volunteer_Image.startsWith("http") 
          ? v.Volunteer_Image 
          : `${BASE_URL}${v.Volunteer_Image}`)
      : PLACEHOLDER,
    Work_Assigned: v.Work_Assigned || v.Volunteer_WorkAssigned || DEFAULT_WORK_ASSIGNED,
    Volunteer_name: v.Volunteer_name || "Unnamed Volunteer",
    Volunteer_age: v.Volunteer_age || "N/A",
    Gender: v.Gender || "Not specified",
    Status: v.Status || "Active"
  });
useEffect(() => {
  // Emit volunteer counts whenever volunteers change
  const total = volunteers.length;
  const activeCount = volunteers.filter(v => v.Status === "Active").length;
  const inactiveCount = volunteers.filter(v => v.Status !== "Active").length;

  // Store in localStorage
  localStorage.setItem("volunteerCounts", JSON.stringify({
    total,
    activeCount,
    inactiveCount
  }));

  // Emit custom event
  window.dispatchEvent(new CustomEvent("volunteerCountsUpdated", {
    detail: { total, activeCount, inactiveCount }
  }));
}, [volunteers]); // This will run whenever volunteers array changes
  useEffect(() => {
    async function fetchVolunteers() {
      try {
        setIsLoading(true);
        setError("");
        const response = await fetch(`${BASE_URL}/api/volunteers/all`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await safeParseJson(response);
        const normalizedVolunteers = (data || []).map(normalizeVolunteer);
        
        setVolunteers(normalizedVolunteers);
        setFilteredVolunteers(normalizedVolunteers);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load volunteers. Please try again later.");
        setVolunteers([]);
        setFilteredVolunteers([]);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchVolunteers();
  }, []);

  function handleAddVolunteer(newVolunteer) {
    if (!newVolunteer) return;

    const normalized = normalizeVolunteer(newVolunteer);
    setVolunteers(prev => [normalized, ...prev]);
    
    if (!isFiltered) {
      setFilteredVolunteers(prev => [normalized, ...prev]);
    }
  }

  function handleSave(updatedVolunteer) {
    if (!updatedVolunteer) return;

    const normalized = normalizeVolunteer(updatedVolunteer);
    
    setVolunteers(prev => 
      prev.map(v => v.Volunteer_id === normalized.Volunteer_id ? normalized : v)
    );
    
    setFilteredVolunteers(prev => 
      prev.map(v => v.Volunteer_id === normalized.Volunteer_id ? normalized : v)
    );

    setShowViewModal(false);
  }

  function handleDelete(id) {
    setVolunteers(prev => prev.filter(v => v.Volunteer_id !== id));
    setFilteredVolunteers(prev => prev.filter(v => v.Volunteer_id !== id));
    setShowViewModal(false);
  }

  function handleFilterResults(filteredVolunteers, filterCriteria) {
    setFilteredVolunteers(filteredVolunteers);
    setIsFiltered(true);
    setCurrentFilter(filterCriteria);
  }

  function resetFilters() {
    setFilteredVolunteers(volunteers);
    setIsFiltered(false);
    setCurrentFilter({ mission: "", status: "" });
  }

  const closeAddModal = () => setShowAddModal(false);
  const closeFilterModal = () => setShowFilterModal(false);
  const closeViewModal = () => {
    setShowViewModal(false);
    setSelectedVolunteer(null);
  };

  const VolunteerCard = ({ volunteer, index }) => (
    <Card
      key={volunteer.Volunteer_id || `volunteer-${index}`}
      ckey={volunteer.Volunteer_id}
      img={volunteer.Volunteer_Image}
      title={volunteer.Volunteer_name}
      field1={`Gender: ${volunteer.Gender}`}
      field2={`Age: ${volunteer.Volunteer_age}`}
      field3={`Status: ${volunteer.Status}`}
      field4={`Work: ${volunteer.Work_Assigned}`}
      onClick={() => {
        setSelectedVolunteer(volunteer);
        setShowViewModal(true);
      }}
    />
  );

  // Determine what to display based on current filter
  const getDisplaySections = () => {
    if (!isFiltered) {
      // Show all sections when not filtered
      const activeVolunteers = filteredVolunteers.filter(v => v.Status === "Active");
      const pastVolunteers = filteredVolunteers.filter(v => v.Status !== "Active");
      
      const missionGroups = MISSIONS.map(mission => {
        const activeVolunteersInMission = activeVolunteers.filter(v => v.Work_Assigned === mission);
        return {
          mission,
          volunteers: activeVolunteersInMission,
          count: activeVolunteersInMission.length
        };
      });

      return (
        <>
          <section className="active-volunteers">
            <SubHeader title={`Active Volunteers (${activeVolunteers.length})`} />
            <div className="card-grid">
              {activeVolunteers.length === 0 ? (
                <p className="no-volunteer">No active volunteers found</p>
              ) : (
                activeVolunteers.map((v, idx) => (
                  <VolunteerCard key={v.Volunteer_id} volunteer={v} index={idx} />
                ))
              )}
            </div>
          </section>

          <section className="inactive-volunteers" style={{ marginTop: '2rem' }}>
            <SubHeader title={`Inactive Volunteers (${pastVolunteers.length})`} />
            <div className="card-grid">
              {pastVolunteers.length === 0 ? (
                <p className="no-volunteer">No inactive volunteers found</p>
              ) : (
                pastVolunteers.map((v, idx) => (
                  <VolunteerCard key={v.Volunteer_id} volunteer={v} index={idx} />
                ))
              )}
            </div>
          </section>

          <section className="mission-groups" style={{ marginTop: '2rem' }}>
            {missionGroups.map((grp) => (
              <section key={grp.mission} className="mission-group" style={{ marginBottom: '2rem' }}>
                <SubHeader title={`${grp.mission} (${grp.count} Active Volunteers)`} />
                <div className="card-grid">
                  {grp.volunteers.length === 0 ? (
                    <p className="no-volunteer">No active volunteers assigned to {grp.mission}</p>
                  ) : (
                    grp.volunteers.map((v, idx) => (
                      <VolunteerCard key={v.Volunteer_id} volunteer={v} index={idx} />
                    ))
                  )}
                </div>
              </section>
            ))}
          </section>
        </>
      );
    } else {
      // When filtered, show only the filtered results with appropriate title
      let title = "Filtered Volunteers";
      
      if (currentFilter.mission && currentFilter.status) {
        title = `${currentFilter.mission} - ${currentFilter.status} Volunteers`;
      } else if (currentFilter.mission) {
        title = `${currentFilter.mission} Volunteers`;
      } else if (currentFilter.status) {
        title = `${currentFilter.status} Volunteers`;
      }

      return (
        <section className="filtered-volunteers">
          <SubHeader title={`${title} (${filteredVolunteers.length})`} />
          <div className="card-grid">
            {filteredVolunteers.length === 0 ? (
              <p className="no-volunteer">No volunteers match the current filters</p>
            ) : (
              filteredVolunteers.map((v, idx) => (
                <VolunteerCard key={v.Volunteer_id} volunteer={v} index={idx} />
              ))
            )}
          </div>
        </section>
      );
    }
  };

  if (isLoading) {
    return (
      <>
        <Sidebar />
        <Header title={"Volunteers"} />
        <main style={{ padding: '2rem', textAlign: 'center' }}>
          <div>Loading volunteers...</div>
        </main>
      </>
    );
  }

  return (
    <>
      <Sidebar />
      <Header title={"Volunteers"} />
      <main>
        {error && (
          <div style={{ 
            color: 'red', 
            textAlign: 'center', 
            padding: '1rem',
            margin: '1rem',
            border: '1px solid red',
            borderRadius: '4px'
          }}>
            {error}
          </div>
        )}

        {/* Controls Section */}
        <section className="volunteer-controls">
          <div className="events-subheader">
            <SubHeader title={"Volunteer Management"} />
            <div className="add-filter-div">
              <ButtonRed 
                btnText={"Add Volunteer"} 
                onClick={() => setShowAddModal(true)} 
              />
              <ButtonRed 
                btnText={"Filter"} 
                onClick={() => setShowFilterModal(true)} 
              />
              {isFiltered && (
                <ButtonWhite 
                  btnText={"Reset Filters"} 
                  onClick={resetFilters} 
                />
              )}
            </div>  
          </div>
        </section>

        {/* Dynamic Sections based on filter state */}
        {getDisplaySections()}

        {/* Modals */}
        {showAddModal && (
          <div className="modal-backdrop">
            <VolunteerAddModal
              handleState={closeAddModal}
              onAdd={handleAddVolunteer}
            />
          </div>
        )}

        {showFilterModal && (
          <div className="modal-backdrop">
            <VolunteerFilterModal
              handleState={closeFilterModal}
              onFilter={handleFilterResults}
              onReset={resetFilters}
              volunteers={volunteers}
              missions={MISSIONS}
              statusOptions={STATUS_OPTIONS}
            />
          </div>
        )}

        {showViewModal && selectedVolunteer && (
          <div className="modal-backdrop">
            <ViewVolunteerCard
              volunteerId={selectedVolunteer.Volunteer_id}
              image={selectedVolunteer.Volunteer_Image}
              name={selectedVolunteer.Volunteer_name}
              gender={selectedVolunteer.Gender}
              age={selectedVolunteer.Volunteer_age}
              status={selectedVolunteer.Status}
              workAssigned={selectedVolunteer.Work_Assigned}
              handleState={closeViewModal}
              onUpdate={handleSave}
              onDelete={handleDelete}
            />
          </div>
        )}
      </main>
    </>
  );
}