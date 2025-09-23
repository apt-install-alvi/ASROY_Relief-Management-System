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


export function VolunteerPage()
{
  const [activeVolunteers, setActiveVolunteers] = useState([]);
  const [pastVolunteers, setPastVolunteers] = useState([]);
  const [allActiveVolunteers, setAllActiveVolunteers] = useState([]);
  const [allPastVolunteers, setAllPastVolunteers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const allVolunteersCombined = [...allActiveVolunteers, ...allPastVolunteers];
  
  useEffect(() => {
    async function fetchVolunteers() {
      try {
        const response = await fetch(`${BASE_URL}/api/volunteers/all`);
        const data = await safeParseJson(response);
        if (!response.ok) {
          throw new Error((data && data.error) || `HTTP error! status: ${response.status}`);
        }

        const normalize = (v) => ({
          ...v,
          Volunteer_Image: v.Volunteer_Image ? (v.Volunteer_Image.startsWith("http") ? v.Volunteer_Image : `${BASE_URL}${v.Volunteer_Image}`) : null,

          Work_Assigned: v.Work_Assigned || v.Volunteer_WorkAssigned || "Relief Distribution"
        });

        const active = (data || []).filter((v) => v.Status === "Active").map(normalize);
        const inactive = (data || []).filter((v) => v.Status !== "Active").map(normalize);
        setActiveVolunteers(active);
        setPastVolunteers(inactive);
        setAllActiveVolunteers(active);
        setAllPastVolunteers(inactive);

        
      }
      
      catch (err) {
        console.error("Fetch error:", err);
        setActiveVolunteers([]);
        setPastVolunteers([]);
        setAllActiveVolunteers([]);
        setAllPastVolunteers([]);
      };
    }
    
  fetchVolunteers();
  }, []);

  function handleAddVolunteer(newVolunteer)
  {
    if (!newVolunteer) return;

    // normalize fields returned by backend
    if (newVolunteer.Volunteer_Image && newVolunteer.Volunteer_Image.startsWith("/"))
    {
      newVolunteer.Volunteer_Image = `${BASE_URL}${newVolunteer.Volunteer_Image}`;
    }

    if (!newVolunteer.Work_Assigned && newVolunteer.Volunteer_WorkAssigned)
    {
      newVolunteer.Work_Assigned = newVolunteer.Volunteer_WorkAssigned;
    }

    if (!newVolunteer.Work_Assigned) newVolunteer.Work_Assigned = "Relief Distribution";

    if (newVolunteer.Status === "Active")
    {
      setActiveVolunteers((prev) => [newVolunteer, ...prev]);
      setAllActiveVolunteers((prev) => [newVolunteer, ...prev]);
    }

    else
    {
      setPastVolunteers((prev) => [newVolunteer, ...prev]);
      setAllPastVolunteers((prev) => [newVolunteer, ...prev]);
    }
  }

  function handleSave(updatedVolunteer)
  {
    if (!updatedVolunteer) return;

    // normalize image path if backend returned "/uploads/..."
    if (updatedVolunteer.Volunteer_Image && updatedVolunteer.Volunteer_Image.startsWith("/")) {
      updatedVolunteer.Volunteer_Image = `${BASE_URL}${updatedVolunteer.Volunteer_Image}`;
    }

    if (!updatedVolunteer.Work_Assigned && updatedVolunteer.Volunteer_WorkAssigned)
    {
      updatedVolunteer.Work_Assigned = updatedVolunteer.Volunteer_WorkAssigned;
    }

    if (!updatedVolunteer.Work_Assigned)
      updatedVolunteer.Work_Assigned = "Relief Distribution Team";

    const isNowActive = updatedVolunteer.Status === "Active";

    if (isNowActive)
    {
      setActiveVolunteers((prev) =>
      [
        ...prev.filter((v) => v.Volunteer_id !== updatedVolunteer.Volunteer_id),
        updatedVolunteer,
      ]);
      
      setPastVolunteers((prev) => prev.filter((v) => v.Volunteer_id !== updatedVolunteer.Volunteer_id));
      
      setAllActiveVolunteers((prev) =>
      [
        ...prev.filter((v) => v.Volunteer_id !== updatedVolunteer.Volunteer_id),
        updatedVolunteer,
      ]);
      
      setAllPastVolunteers((prev) => prev.filter((v) => v.Volunteer_id !== updatedVolunteer.Volunteer_id));
    }
    
    else
    {
      setPastVolunteers((prev) =>
      [
        ...prev.filter((v) => v.Volunteer_id !== updatedVolunteer.Volunteer_id),
        updatedVolunteer,
      ]);
      
      setActiveVolunteers((prev) => prev.filter((v) => v.Volunteer_id !== updatedVolunteer.Volunteer_id));
      
      setAllPastVolunteers((prev) =>
      [
        ...prev.filter((v) => v.Volunteer_id !== updatedVolunteer.Volunteer_id),
        updatedVolunteer,
      ]);
      
      setAllActiveVolunteers((prev) => prev.filter((v) => v.Volunteer_id !== updatedVolunteer.Volunteer_id));
    }

    setShowViewModal(false);
  }

  function handleDelete(id)
  {
    setActiveVolunteers((prev) => prev.filter((v) => v.Volunteer_id !== id));
    setPastVolunteers((prev) => prev.filter((v) => v.Volunteer_id !== id));
    setAllActiveVolunteers((prev) => prev.filter((v) => v.Volunteer_id !== id));
    setAllPastVolunteers((prev) => prev.filter((v) => v.Volunteer_id !== id));
    setShowViewModal(false);
  }

  function handleFilterResults(filteredVolunteers)
  {
    const active = filteredVolunteers.filter((v) => v.Status === "Active");
    const inactive = filteredVolunteers.filter((v) => v.Status !== "Active");

    setActiveVolunteers(active);
    setPastVolunteers(inactive);
    setIsFiltered(true);
  }

  function resetFilters()
  {
    setActiveVolunteers(allActiveVolunteers);
    setPastVolunteers(allPastVolunteers);
    setIsFiltered(false);
  }

  const closeAddModal = () => setShowAddModal(false);
  const closeFilterModal = () => setShowFilterModal(false);
  const closeViewModal = () => setShowViewModal(false);

  const displayedCombined = [...activeVolunteers, ...pastVolunteers];
  const missionGroups = MISSIONS.map((mission) => {
    const list = displayedCombined.filter((v) => v.Work_Assigned === mission);
    return { mission, volunteers: list, count: list.length };
  });

  

  return (
    <>
      <Sidebar></Sidebar>
      <Header title={"Volunteers"}></Header>
      <main>
        <section className="active-events">
          <div className="events-subheader">
            <SubHeader title={"Active Volunteers"}></SubHeader>

            <div className="add-filter-div" style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <ButtonRed btnText={"Add Volunteer"} onClick={() => setShowAddModal(true)}></ButtonRed>
              <ButtonRed btnText={"Filter"} onClick={() => setShowFilterModal(true)}></ButtonRed>
              {isFiltered ? <ButtonWhite btnText={"Reset Filters"} onClick={resetFilters}></ButtonWhite> : null}
            </div>  
          </div>
          

          <div className="card-grid">
          {activeVolunteers.map((v, idx) => (
            <Card
              key={v.Volunteer_id || `${v.Volunteer_name}-${idx}`}
              ckey={v.Volunteer_id}
              img={v.Volunteer_Image && v.Volunteer_Image.trim()!== "" ? v.Volunteer_Image : PLACEHOLDER}
              title={v.Volunteer_name}
              field1={`Gender: ${v.Gender}`}
              field2={`Age: ${v.Volunteer_age}`} 
              field3={`Status: ${v.Status}`}
              field4={`Work: ${v.Work_Assigned}`}
              onClick={() => {
                setSelectedVolunteer(v);
                setShowViewModal(true);
              }}>
            </Card>
          ))}
          </div>
        </section>

        <section className="past-events" style={{ marginTop: 28 }}>
          <SubHeader title={"Inactive Volunteers"}></SubHeader>
          <div className="card-grid" style={{ marginTop: 12 }}>
            {pastVolunteers.map((v, idx) => (
            <Card
              key={v.Volunteer_id || `${v.Volunteer_name}-${idx}`}
              ckey={v.Volunteer_id}
              img={v.Volunteer_Image ? v.Volunteer_Image : PLACEHOLDER}
              title={v.Volunteer_name}
              field1={`Gender: ${v.Gender}`}
              field2={`Age: ${v.Volunteer_age}`} 
              field3={`Status: ${v.Status}`}
              field4={`Work: ${v.Work_Assigned}`}                
              onClick={() => {
                setSelectedVolunteer(v);
                setShowViewModal(true);
              }}>
            </Card>
            ))}
          </div>
        </section>
          
        {missionGroups.map((grp) =>
          <section key={grp.mission} className="past-events">
            <SubHeader title={`${grp.mission} (${grp.count})`}></SubHeader>
            <div className="card-grid">
              {grp.volunteers.length === 0 ?
                <p className="no-volunteer">No volunteers assigned</p>
                : 
                grp.volunteers.map((v) => (
                  <Card
                    ckey={v.Volunteer_id}
                    img={v.Volunteer_Image ? v.Volunteer_Image : PLACEHOLDER}
                    title={v.Volunteer_name}
                    field1={`Gender: ${v.Gender}`}
                    field2={`Age: ${v.Volunteer_age}`} 
                    field3={`Status: ${v.Status}`}
                    onClick={() => {
                      setSelectedVolunteer(v);
                      setShowViewModal(true);
                    }}>
                  </Card>
                )
              )}
            </div>
          </section>          
      
          )
        }


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
                volunteers={allVolunteersCombined}
                missions={MISSIONS}/>
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
