// src/pages/Volunteer.jsx
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import "./volunteer.css";
import "../components/volunteerAdd.css";
import "../components/VolunteerViewcard.css";

import { MissionFilterModal } from "../components/MissionFilterModal";


import { VolunteerAddModal } from "../components/large_components/VolunteerAddModal";
import { ViewVolunteerCard } from "../components/large_components/ViewVolunteerCard";
import { FilterModal } from "../components/old/FilterPopup";

import { BASE_URL, safeParseJson } from "../utils/api";

const PLACEHOLDER = "/assets/images/volunteer.jpeg";

const MISSIONS = [
  "Rescue Mission",
  "Rehabilitation mission",
  "Reconstruction Mission",
  "Management",
];

export function VolunteerPage() {
  const [activeVolunteers, setActiveVolunteers] = useState([]);
  const [pastVolunteers, setPastVolunteers] = useState([]);
  const [allActiveVolunteers, setAllActiveVolunteers] = useState([]);
  const [allPastVolunteers, setAllPastVolunteers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showViewCardModal, setShowViewCardModal] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Derived all volunteers combined
  const allVolunteersCombined = [...allActiveVolunteers, ...allPastVolunteers];

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${BASE_URL}/api/volunteers/all`);
        const data = await safeParseJson(response);
        if (!response.ok) {
          throw new Error((data && data.error) || `HTTP error! status: ${response.status}`);
        }

        const normalize = (v) => ({
          ...v,
          Volunteer_Image: v.Volunteer_Image ? (v.Volunteer_Image.startsWith("http") ? v.Volunteer_Image : `${BASE_URL}${v.Volunteer_Image}`) : null,
          // ensure Work_Assigned exists
          Work_Assigned: v.Work_Assigned || "Rescue Mission",
        });

        const active = (data || []).filter((v) => v.Status === "Active").map(normalize);
        const inactive = (data || []).filter((v) => v.Status !== "Active").map(normalize);
        setActiveVolunteers(active);
        setPastVolunteers(inactive);
        setAllActiveVolunteers(active);
        setAllPastVolunteers(inactive);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setActiveVolunteers([]);
        setPastVolunteers([]);
        setAllActiveVolunteers([]);
        setAllPastVolunteers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, []);

  // Save or update volunteer in lists
  const handleSaveVolunteer = (updatedVolunteer) => {
    // normalize image path if backend returned "/uploads/...":
    if (updatedVolunteer && updatedVolunteer.Volunteer_Image && updatedVolunteer.Volunteer_Image.startsWith("/")) {
      updatedVolunteer.Volunteer_Image = `${BASE_URL}${updatedVolunteer.Volunteer_Image}`;
    }

    // ensure Work_Assigned exists
    if (updatedVolunteer && !updatedVolunteer.Work_Assigned) updatedVolunteer.Work_Assigned = "Rescue Mission";

    const isNowActive = updatedVolunteer.Status === "Active";

    if (isNowActive) {
      setActiveVolunteers((prev) => [
        ...prev.filter((v) => v.Volunteer_id !== updatedVolunteer.Volunteer_id),
        updatedVolunteer,
      ]);
      setPastVolunteers((prev) => prev.filter((v) => v.Volunteer_id !== updatedVolunteer.Volunteer_id));
      setAllActiveVolunteers((prev) => [
        ...prev.filter((v) => v.Volunteer_id !== updatedVolunteer.Volunteer_id),
        updatedVolunteer,
      ]);
      setAllPastVolunteers((prev) => prev.filter((v) => v.Volunteer_id !== updatedVolunteer.Volunteer_id));
    } else {
      setPastVolunteers((prev) => [
        ...prev.filter((v) => v.Volunteer_id !== updatedVolunteer.Volunteer_id),
        updatedVolunteer,
      ]);
      setActiveVolunteers((prev) => prev.filter((v) => v.Volunteer_id !== updatedVolunteer.Volunteer_id));
      setAllPastVolunteers((prev) => [
        ...prev.filter((v) => v.Volunteer_id !== updatedVolunteer.Volunteer_id),
        updatedVolunteer,
      ]);
      setAllActiveVolunteers((prev) => prev.filter((v) => v.Volunteer_id !== updatedVolunteer.Volunteer_id));
    }

    setShowViewCardModal(false);
  };

  // Filtering: receives filteredVolunteers (array) from MissionFilterModal and splits into active/inactive
  const handleFilterResults = (filteredVolunteers) => {
    const active = filteredVolunteers.filter((v) => v.Status === "Active");
    const inactive = filteredVolunteers.filter((v) => v.Status !== "Active");

    setActiveVolunteers(active);
    setPastVolunteers(inactive);
  };

  const resetFilters = () => {
    setActiveVolunteers(allActiveVolunteers);
    setPastVolunteers(allPastVolunteers);
  };

  const closePopup = () => setShowPopup(false);
  const closeModal = () => setShowFilterModal(false);
  const closeView = () => setShowViewCardModal(false);

  // derive mission groups from combined all volunteers (the "IN ADDITION" blocks)
  const missionGroups = MISSIONS.map((mission) => {
    return {
      mission,
      volunteers: allVolunteersCombined.filter((v) => v.Work_Assigned === mission),
      count: allVolunteersCombined.filter((v) => v.Work_Assigned === mission).length,
    };
  });

  const activeCount = activeVolunteers.length;
  const inactiveCount = pastVolunteers.length;

  return (
    <div className="volunteers-app">
      <aside className="sidebar">
        <nav className="menu">
          <NavLink to="/" end className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
            <i className="fa-solid fa-house" />
            <span>Home</span>
          </NavLink>
          <NavLink to="/events" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
            <i className="fa-solid fa-bell" />
            <span>Events</span>
          </NavLink>
          <NavLink to="/shelters" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
            <i className="fa-solid fa-house-chimney" />
            <span>Shelters</span>
          </NavLink>
          <NavLink to="/volunteer" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
            <i className="fa-solid fa-users" />
            <span>Volunteers</span>
          </NavLink>
          <NavLink to="/donation" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
            <i className="fa-solid fa-dollar-sign" />
            <span>Donations</span>
          </NavLink>
          <NavLink to="/inventory" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
            <i className="fa-solid fa-box" />
            <span>Inventory</span>
          </NavLink>
        </nav>
      </aside>

      <div className="volunteers-main">
        <header className="volunteers-header">
          <h2>Volunteers</h2>

          {/* counts area and actions on the right */}
          <div className="header-actions" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ color: "var(--bg-light-grey)", textAlign: "right", marginRight: 8 }}>
              <div style={{ fontSize: 14 }}>Active: <strong>{activeCount}</strong></div>
              <div style={{ fontSize: 14 }}>Inactive: <strong>{inactiveCount}</strong></div>
            </div>

            {/* Filter button moved here */}
            <button
              className="header-filter-btn"
              onClick={() => setShowFilterModal(true)}
              title="Filter by mission"
              type="button"
            >
              Filter
            </button>

            <button className="add-btn" onClick={() => setShowPopup(true)}>
              Add
            </button>
          </div>
        </header>

        <div className="volunteers-body">
          {loading && <div className="loading">Loading volunteers...</div>}
          {error && <div className="error">Error: {error}</div>}

          {!loading && !error && (
            <>
              <section className="section">
                <h3 className="section-title">Active Volunteers</h3>
                <div className="cards-grid">
                  {activeVolunteers.map((v) => (
                    <article
                      className="event-card"
                      key={v.Volunteer_id}
                      onClick={() => {
                        setSelectedVolunteer(v);
                        setShowViewCardModal(true);
                        // ensure view card sees Work_Assigned
                        window.localWorkAssigned = v.Work_Assigned;
                      }}
                    >
                      <div className="card-img">
                        <img src={v.Volunteer_Image || PLACEHOLDER} alt={v.Volunteer_name} />
                      </div>
                      <div className="card-info">
                        <div className="card-title">{v.Volunteer_name}</div>
                        <div className="card-meta">
                          <div>
                            <span className="meta-label">Gender: </span>
                            <span className="meta-value">{v.Gender}</span>
                          </div>
                          <div>
                            <span className="meta-label">Age: </span>
                            <span className="meta-value">{v.Volunteer_age}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="section past-section">
                <h3 className="section-title">Past / Inactive Volunteers</h3>

                <div className="cards-grid">
                  {pastVolunteers.map((v) => (
                    <article
                      className="event-card"
                      key={v.Volunteer_id}
                      onClick={() => {
                        setSelectedVolunteer(v);
                        setShowViewCardModal(true);
                        window.localWorkAssigned = v.Work_Assigned;
                      }}
                    >
                      <div className="card-img">
                        <img src={v.Volunteer_Image || PLACEHOLDER} alt={v.Volunteer_name} />
                      </div>
                      <div className="card-info">
                        <div className="card-title">{v.Volunteer_name}</div>
                        <div className="card-meta">
                          <div>
                            <span className="meta-label">Gender: </span>
                            <span className="meta-value">{v.Gender}</span>
                          </div>
                          <div>
                            <span className="meta-label">Age: </span>
                            <span className="meta-value">{v.Volunteer_age}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* mission blocks (IN ADDITION to active/inactive) */}
              {missionGroups.map((grp) => (
                <section key={grp.mission} className="section">
                  <h3 className="section-title">{grp.mission} ({grp.count})</h3>
                  <div className="cards-grid">
                    {grp.volunteers.length === 0 ? (
                      <div style={{ padding: 12, color: "#666" }}>No volunteers assigned</div>
                    ) : (
                      grp.volunteers.map((v) => (
                        <article
                          className="event-card"
                          key={v.Volunteer_id + "-" + grp.mission}
                          onClick={() => {
                            setSelectedVolunteer(v);
                            setShowViewCardModal(true);
                            window.localWorkAssigned = v.Work_Assigned;
                          }}
                        >
                          <div className="card-img">
                            <img src={v.Volunteer_Image || PLACEHOLDER} alt={v.Volunteer_name} />
                          </div>
                          <div className="card-info">
                            <div className="card-title">{v.Volunteer_name}</div>
                            <div className="card-meta">
                              <div>
                                <span className="meta-label">Gender: </span>
                                <span className="meta-value">{v.Gender}</span>
                              </div>
                              <div>
                                <span className="meta-label">Age: </span>
                                <span className="meta-value">{v.Volunteer_age}</span>
                              </div>
                            </div>
                          </div>
                        </article>
                      ))
                    )}
                  </div>
                </section>
              ))}
            </>
          )}

          {/* Volunteer Add Popup */}
          {showPopup && (
            <div className="popup-backdrop">
              <div className="popup-body">
                <VolunteerAddModal
                  header="Volunteer"
                  handleState={(val) => {
                    setShowPopup(false);
                  }}
                  onAdd={(newVolunteer) => {
                    if (!newVolunteer) return;
                    if (newVolunteer.Volunteer_Image && newVolunteer.Volunteer_Image.startsWith("/")) {
                      newVolunteer.Volunteer_Image = `${BASE_URL}${newVolunteer.Volunteer_Image}`;
                    }
                    if (newVolunteer.Status === "Active") {
                      setActiveVolunteers((prev) => [newVolunteer, ...prev]);
                      setAllActiveVolunteers((prev) => [newVolunteer, ...prev]);
                    } else {
                      setPastVolunteers((prev) => [newVolunteer, ...prev]);
                      setAllPastVolunteers((prev) => [newVolunteer, ...prev]);
                    }
                  }}
                />
              </div>
            </div>
          )}

          {/* Mission Filter Modal - pass all volunteers and missions */}
          {showFilterModal && (
            <div className="popup-backdrop">
              <div className="popup-body">
                <MissionFilterModal
                  handleState={closeModal}
                  onFilter={handleFilterResults}
                  onReset={resetFilters}
                  volunteers={allVolunteersCombined}
                  missions={MISSIONS}
                />
              </div>
            </div>
          )}

          {/* Volunteer View Card */}
          {showViewCardModal && selectedVolunteer && (
            <div className="popup-backdrop">
              <div className="viewcard-body">
                <ViewVolunteerCard
                  volunteerId={selectedVolunteer.Volunteer_id}
                  image={selectedVolunteer.Volunteer_Image}
                  name={selectedVolunteer.Volunteer_name}
                  gender={selectedVolunteer.Gender}
                  age={selectedVolunteer.Volunteer_age}
                  status={selectedVolunteer.Status}
                  handleState={(val) => {
                    setShowViewCardModal(false);
                  }}
                  onUpdate={handleSaveVolunteer}
                  onDelete={(id) => {
                    setActiveVolunteers((prev) => prev.filter((v) => v.Volunteer_id !== id));
                    setPastVolunteers((prev) => prev.filter((v) => v.Volunteer_id !== id));
                    setAllActiveVolunteers((prev) => prev.filter((v) => v.Volunteer_id !== id));
                    setAllPastVolunteers((prev) => prev.filter((v) => v.Volunteer_id !== id));
                    setShowViewCardModal(false);
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { VolunteerPage as Volunteer };
export default VolunteerPage;
