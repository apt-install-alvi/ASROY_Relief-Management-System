import React, { useState, useEffect } from "react";
import { VolunteerAddModal } from "../components/large_components/VolunteerAddModal";
import { ViewVolunteerCard } from "../components/large_components/ViewVolunteerCard";
// use the new mission filter modal
import MissionFilterModal from "../components/MissionFilterModal";
import { BASE_URL, safeParseJson } from "../utils/api";
import { Sidebar } from "../components/large_components/Sidebar";
import { Header } from "../components/base_components/Header";
import { ButtonRed } from "../components/base_components/ButtonRed";
import { ButtonWhite } from "../components/base_components/ButtonWhite";
import { Card } from "../components/base_components/Card";
import { SubHeader } from "../components/base_components/SubHeader";

const PLACEHOLDER = "/assets/images/volunteer_default.jpg";

const MISSIONS = [
  "Rescue Mission",
  "Rehabilitation mission",
  "Reconstruction Mission",
  "Management",
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // combined source-of-truth for filter modal
  const allVolunteersCombined = [...allActiveVolunteers, ...allPastVolunteers];

  useEffect(() => {
    async function fetchVolunteers()
    {
      try
      {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/volunteers/all`);
        const data = await safeParseJson(response);
        if (!response.ok)
        {
          throw new Error((data && data.error) || `HTTP error! status: ${response.status}`);
        }

        const normalize = (v) => ({
          ...v,
          Volunteer_Image: v.Volunteer_Image
            ? (v.Volunteer_Image.startsWith("http") ? v.Volunteer_Image : `${BASE_URL}${v.Volunteer_Image}`)
            : null,
          // normalize mission field name and provide default
          Work_Assigned: v.Work_Assigned || v.Volunteer_WorkAssigned || "Rescue Mission",
        });

        const active = (data || []).filter((v) => v.Status === "Active").map(normalize);
        const inactive = (data || []).filter((v) => v.Status !== "Active").map(normalize);
        setActiveVolunteers(active);
        setPastVolunteers(inactive);
        setAllActiveVolunteers(active);
        setAllPastVolunteers(inactive);
        setError(null);
      }
      
      catch (err)
      {
        console.error("Fetch error:", err);
        setActiveVolunteers([]);
        setPastVolunteers([]);
        setAllActiveVolunteers([]);
        setAllPastVolunteers([]);
        setError(err.message || "Failed to load volunteers");
      } finally {
        setLoading(false);
      }      
    };

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
    if (!newVolunteer.Work_Assigned && newVolunteer.Volunteer_WorkAssigned) {
      newVolunteer.Work_Assigned = newVolunteer.Volunteer_WorkAssigned;
    }
    if (!newVolunteer.Work_Assigned) newVolunteer.Work_Assigned = "Rescue Mission";

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

    if (!updatedVolunteer.Work_Assigned && updatedVolunteer.Volunteer_WorkAssigned) {
      updatedVolunteer.Work_Assigned = updatedVolunteer.Volunteer_WorkAssigned;
    }
    if (!updatedVolunteer.Work_Assigned) updatedVolunteer.Work_Assigned = "Rescue Mission";

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

  // compute mission groups from currently displayed volunteers
  const displayedCombined = [...activeVolunteers, ...pastVolunteers];
  const missionGroups = MISSIONS.map((mission) => {
    const list = displayedCombined.filter((v) => v.Work_Assigned === mission);
    return { mission, volunteers: list, count: list.length };
  });

  const activeCount = activeVolunteers.length;
  const inactiveCount = pastVolunteers.length;

  return (
    <>
      <Sidebar></Sidebar>
      <Header title={"Volunteers"}></Header>
      <main>
        <section className="active-events">
          <div className="events-subheader" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <SubHeader title={"Active Volunteers"}></SubHeader>
              {/* counts in header corner */}
              <div style={{ color: "#6b6b6b", fontSize: 14 }}>
                <div>Active: <strong>{activeCount}</strong></div>
                <div>Inactive: <strong>{inactiveCount}</strong></div>
              </div>
            </div>

            <div className="add-filter-div" style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <ButtonRed btnText={"Add Volunteer"} onClick={() => setShowAddModal(true)}></ButtonRed>
              <ButtonRed btnText={"Filter"} onClick={() => setShowFilterModal(true)}></ButtonRed>
              {isFiltered ? <ButtonWhite btnText={"Reset Filters"} onClick={resetFilters}></ButtonWhite> : null}
            </div>
          </div>
          
          {loading && <div style={{ padding: 16 }}>Loading volunteers...</div>}
          {error && <div style={{ padding: 16, color: "red" }}>Error: {error}</div>}

          <div className="card-grid" style={{ marginTop: 12 }}>
          {activeVolunteers.map((v, idx) => (
            <Card
              key={v.Volunteer_id || `${v.Volunteer_name}-${idx}`}
              ckey={v.Volunteer_id}
              img={v.Volunteer_Image && v.Volunteer_Image.trim()!== "" ? v.Volunteer_Image : PLACEHOLDER}
              title={v.Volunteer_name}
              field1={`Gender: ${v.Gender}`}
              field2={`Age: ${v.Volunteer_age}`} 
              field3={`Status: ${v.Status}`}
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
              onClick={() => {
                setSelectedVolunteer(v);
                setShowViewModal(true);
              }}>
            </Card>
            ))}
          </div>
        </section>

        {/* Mission blocks */}
        {missionGroups.map((grp) => (
          <section key={grp.mission} style={{ marginTop: 28 }}>
            <SubHeader title={`${grp.mission} (${grp.count})`}></SubHeader>
            <div className="card-grid" style={{ marginTop: 12 }}>
              {grp.volunteers.length === 0 ? (
                <div style={{ padding: 12, color: "#666" }}>No volunteers assigned</div>
              ) : (
                grp.volunteers.map((v, idx) => (
                  <Card
                    key={v.Volunteer_id ? `${v.Volunteer_id}-${grp.mission}` : `${v.Volunteer_name}-${grp.mission}-${idx}`}
                    ckey={v.Volunteer_id}
                    img={v.Volunteer_Image ? v.Volunteer_Image : PLACEHOLDER}
                    title={v.Volunteer_name}
                    field1={`Gender: ${v.Gender}`}
                    field2={`Age: ${v.Volunteer_age}`} 
                    field3={`Status: ${v.Status}`}
                    onClick={() => {
                      setSelectedVolunteer(v);
                      setShowViewModal(true);
                    }}
                  />
                ))
              )}
            </div>
          </section>
        ))}

          {showAddModal && (
            <div className="popup-backdrop">
              <div className="popup-body">
                <VolunteerAddModal
                  handleState={closeAddModal}
                  onAdd={handleAddVolunteer}
                />
              </div>
            </div>
          )}

          {showFilterModal && (
            <div className="popup-backdrop">
              <div className="popup-body">
                <MissionFilterModal
                  handleState={closeFilterModal}
                  onFilter={handleFilterResults}
                  onReset={resetFilters}
                  volunteers={allVolunteersCombined}
                  missions={MISSIONS}
                />
              </div>
            </div>
          )}

          {showViewModal && selectedVolunteer && (
            <div className="popup-backdrop">
              <div className="viewcard-body">
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
            </div>
          )}
      </main>
      </>
  );
}

export default VolunteerPage;
