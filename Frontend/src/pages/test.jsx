import React, { useState, useEffect } from "react";
import VolunteerAddPopup from "../components/VolunteerAddPopup";
import VolunteerViewCard from "../components/VolunteerViewCard";
import { FilterModal } from "../components/old/FilterPopup";
import { BASE_URL, safeParseJson } from "../utils/api";
import { Sidebar } from "../components/large_components/Sidebar";
import { Header } from "../components/base_components/Header";
import { ButtonRed } from "../components/base_components/ButtonRed";
import { ButtonWhite } from "../components/base_components/ButtonWhite";
import { Card } from "../components/base_components/Card";
import { SubHeader } from "../components/base_components/SubHeader";

const PLACEHOLDER = "/assets/images/volunteer_default.jpeg";

export function Test() {
  const [activeVolunteers, setActiveVolunteers] = useState([]);
  const [pastVolunteers, setPastVolunteers] = useState([]);
  const [allActiveVolunteers, setAllActiveVolunteers] = useState([]);
  const [allPastVolunteers, setAllPastVolunteers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    async function fetchVolunteers()
    {
      try
      {
        const response = await fetch(`${BASE_URL}/api/volunteers/all`);
        const data = await safeParseJson(response);
        if (!response.ok)
        {
          throw new Error((data && data.error) || `HTTP error! status: ${response.status}`);
        }

        const normalize = (v) => ({
          ...v,
          Volunteer_Image: v.Volunteer_Image ? (v.Volunteer_Image.startsWith("http") ? v.Volunteer_Image : `${BASE_URL}${v.Volunteer_Image}`) : null,
        });

        const active = (data || []).filter((v) => v.Status === "Active").map(normalize);
        const inactive = (data || []).filter((v) => v.Status !== "Active").map(normalize);
        setActiveVolunteers(active);
        setPastVolunteers(inactive);
        setAllActiveVolunteers(active);
        setAllPastVolunteers(inactive);
      }
      
      catch (err)
      {
        console.error("Fetch error:", err);
        setActiveVolunteers([]);
        setPastVolunteers([]);
        setAllActiveVolunteers([]);
        setAllPastVolunteers([]);
      }      
    };

    fetchVolunteers();
  }, []);

  function handleAddVolunteer(newVolunteer)
  {
    if (!newVolunteer)
      return;

    if (newVolunteer.Volunteer_Image && newVolunteer.Volunteer_Image.startsWith("/"))
    {
      newVolunteer.Volunteer_Image = `${BASE_URL}${newVolunteer.Volunteer_Image}`;
    }
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
    // normalize image path if backend returned "/uploads/..."
    if (updatedVolunteer && updatedVolunteer.Volunteer_Image && updatedVolunteer.Volunteer_Image.startsWith("/")) {
      updatedVolunteer.Volunteer_Image = `${BASE_URL}${updatedVolunteer.Volunteer_Image}`;
    }

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

  return (
    <>
      <Sidebar></Sidebar>
      <Header title={"Volunteers"}></Header>
      <main>
        <section className="active-events">
          <div className="events-subheader">
          <SubHeader title={"Active Volunteers"}></SubHeader>
          <div className="add-filter-div">
            <ButtonRed btnText={"Add Volunteer"} onClick={() => setShowAddModal(true)}></ButtonRed>
            <ButtonRed btnText={"Filter"} onClick={() => setShowFilterModal(true)}></ButtonRed>
            {isFiltered ?
              <ButtonWhite btnText={"Reset Filters"} onClick={resetFilters}></ButtonWhite> : null}
          </div>
        </div>
          <div className="card-grid">
          {activeVolunteers.map((v) => (
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
          ))}
          </div>
        </section>

        <section className="past-events">
          <SubHeader title={"Inactive Volunteers"}></SubHeader>
          <div className="card-grid">
            {pastVolunteers.map((v) => (
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
            ))}
          </div>
        </section>
          

          {/* Volunteer Add Popup */}
          {showAddModal && (
            <div className="popup-backdrop">
              <div className="popup-body">
                <VolunteerAddPopup
                  header="Volunteer"
                  handleState={closeAddModal}
                  onAdd={handleAddVolunteer}
                />
              </div>
            </div>
          )}

          {/* Filter Modal */}
          {showFilterModal && (
            <div className="popup-backdrop">
              <div className="popup-body">
                <FilterModal handleState={closeFilterModal} onFilter={handleFilterResults} onReset={resetFilters} />
              </div>
            </div>
          )}

          {/* Volunteer View Card */}
          {showViewModal && selectedVolunteer && (
            <div className="popup-backdrop">
              <div className="viewcard-body">
                <VolunteerViewCard
                  volunteerId={selectedVolunteer.Volunteer_id}
                  image={selectedVolunteer.Volunteer_Image}
                  name={selectedVolunteer.Volunteer_name}
                  gender={selectedVolunteer.Gender}
                  age={selectedVolunteer.Volunteer_age}
                  status={selectedVolunteer.Status}
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
