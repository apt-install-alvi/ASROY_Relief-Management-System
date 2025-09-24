import axios from "axios";
import "./styles/shelter.css";
import { Card } from "../components/base_components/Card";
import { ButtonRed } from "../components/base_components/ButtonRed";
import { ButtonWhite } from "../components/base_components/ButtonWhite";
import { Header } from "../components/base_components/Header";
import { Sidebar } from "../components/large_components/Sidebar";
import { useState, useEffect } from "react";
import { ShelterAddModal } from "../components/large_components/ShelterAddModal";
import { ShelterFilterModal } from "../components/large_components/ShelterFilterModal";
import { ViewShelterCard } from "../components/large_components/ViewShelterCard";
import { BASE_URL } from "../utils/api";

const PLACEHOLDER = "/assets/images/shelter.jpg";

export function ShelterPageNew() {
  const [shelters, setShelters] = useState([]);
  const [deletedShelters, setDeletedShelters] = useState([]);
  const [overCapacityAlerts, setOverCapacityAlerts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeletedModal, setShowDeletedModal] = useState(false);
  const [showAlertsModal, setShowAlertsModal] = useState(false);
  const [selectedShelter, setSelectedShelter] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);

  
  const closeAddModal = () => setShowAddModal(false);
  const closeFilterModal = () => setShowFilterModal(false);
  const closeViewModal = () => setShowViewModal(false);
  const closeDeletedModal = () => setShowDeletedModal(false);
  const closeAlertsModal = () => setShowAlertsModal(false);

  const getAreaName = (deletedShelter) => {
  const original = shelters.find(s => s.Shelter_id === deletedShelter.Shelter_id);
  return deletedShelter.Area_name || original?.Area_name || "N/A";
};

  const fetchShelters = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/shelternew`);
      console.log("Active shelters:", res.data);
      setShelters(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching active shelters:", err);
      setShelters([]);
    }
  };

  // Fetch deleted shelters
  const fetchDeletedShelters = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/shelternew/deleted`);
      console.log("Deleted shelters:", res.data);
      setDeletedShelters(Array.isArray(res.data.deleted) ? res.data.deleted : []);
    } catch (err) {
      console.error("Error fetching deleted shelters:", err);
      setDeletedShelters([]);
    }
  };

  // Fetch overcapacity alerts
const fetchOverCapacityAlerts = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/shelternew/overcapacity`);
    console.log("Overcapacity alerts:", res.data);

    // Use res.data.alerts instead of res.data.overcapacity
    setOverCapacityAlerts(Array.isArray(res.data.alerts) ? res.data.alerts : []);
  } catch (err) {
    console.error("Error fetching overcapacity alerts:", err);
    setOverCapacityAlerts([]);
  }
};


  // Fetch all data at once
  const fetchAllData = async () => {
    await Promise.all([fetchShelters(), fetchDeletedShelters(), fetchOverCapacityAlerts()]);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Save or delete a shelter
  const handleSaveShelter = async (updatedData, action) => {
    if (!selectedShelter) return;
    try {
      if (action === "delete") {
        console.log("Deleting shelter:", selectedShelter.Shelter_id);
        await axios.delete(`${BASE_URL}/api/shelternew/delete/${selectedShelter.Shelter_id}`);

      } else {
        console.log("Updating shelter:", selectedShelter.Shelter_id, updatedData);
        await axios.put(`${BASE_URL}/api/shelternew/${selectedShelter.Shelter_id}`, updatedData);
      }
      await fetchAllData();
      setShowViewModal(false);
    } catch (err) {
      console.error("Error saving shelter:", err);
    }
  };

  // Filter shelters locally
  const handleFilterResults = (filteredShelters) => {
    if (!filteredShelters) {
      fetchShelters();
      setIsFiltered(false);
    } else {
      setShelters(filteredShelters);
      setIsFiltered(true);
    }
  };

  const resetFilters = () => {
    fetchShelters();
    setIsFiltered(false);
  };

  return (
    <>
      <Sidebar />
      <Header title="Shelters" />
      <main>
        <section className="active-events">
          <div className="shelter-subheader">
            <div className="modal-btn-position">
              <ButtonRed btnText="Add Shelter" onClick={() => setShowAddModal(true)} />
              <ButtonRed btnText="Filter" onClick={() => setShowFilterModal(true)} />
              <ButtonRed
                btnText={`Deleted Shelters (${deletedShelters.length})`}
                onClick={async () => { await fetchDeletedShelters(); setShowDeletedModal(true); }}
              />
              <ButtonRed
                btnText={`Overcapacity Alerts (${overCapacityAlerts.length})`}
                onClick={async () => { await fetchOverCapacityAlerts(); setShowAlertsModal(true); }}
              />
              {isFiltered && <ButtonWhite btnText="Reset Filters" onClick={resetFilters} />}
            </div>
          </div>

          {/* Active Shelters Card Grid */}
          <div className="card-grid">
            {shelters.map((s) => (
              <Card
                key={s.Shelter_id}
                img={PLACEHOLDER}
                title={s.Shelter_name}
                field1={s.Area_name}
                field2={`Current Capacity: ${s.Current_capacity}`}
                field3={`Total Capacity: ${s.Total_capacity}`}
                onClick={() => { setSelectedShelter(s); setShowViewModal(true); }}
              />
            ))}
          </div>
        </section>

        {/* Modals */}
        {showAddModal && (
          <div className="modal-backdrop">
            <ShelterAddModal handleState={closeAddModal} />
          </div>
        )}

        {showFilterModal && (
          <div className="modal-backdrop">
            <ShelterFilterModal handleState={closeFilterModal} onFilter={handleFilterResults} />
          </div>
        )}

        {showViewModal && selectedShelter && (
          <div className="modal-backdrop">
            <ViewShelterCard
              shelterId={selectedShelter.Shelter_id}
              name={selectedShelter.Shelter_name}
              area={selectedShelter.Area_name}
              current_capacity={selectedShelter.Current_capacity}
              total_capacity={selectedShelter.Total_capacity}
              handleState={closeViewModal}
              onSave={handleSaveShelter}
            />
          </div>
        )}
        {/* Deleted Shelters Modal */}
        {showDeletedModal && (
          <div className="modal-backdrop">
            <div className="shelter-alert-modal">
              <h3>Deleted Shelters</h3>
              <table>
                <thead>
                  <tr>
                    <th>Sr No.</th>
                    <th>Shelter Name</th>
                    <th>Area</th>
                  </tr>
                </thead>
                <tbody>
                  {deletedShelters.length > 0 ? (
                    deletedShelters.map((s, idx) => (
                      <tr key={s.Del_id}>
                        <td>{idx + 1}</td>
                        <td>{s.Shelter_name}</td>
                        <td>{getAreaName(s)}</td>
                        
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3}>No deleted shelters</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <ButtonRed btnText="Close" onClick={closeDeletedModal} />
            </div>
          </div>
        )}

        {/* Overcapacity Alerts Modal */}
        {showAlertsModal && (
          <div className="modal-backdrop">
            <div className="shelter-alert-modal">
              <h3>Overcapacity Shelters</h3>
              <table>
                <thead>
                  <tr>
                    <th>Sr No.</th>
                    <th>Shelter Name</th>
                    <th>Area</th>
                    <th>Current</th>
                    <th>Total Capacity</th>
                    <th>Excess</th>
                  </tr>
                </thead>
                <tbody>
                  {overCapacityAlerts.length > 0 ? (
                    overCapacityAlerts.map((s, idx) => (
                      <tr key={s.Shelter_id}>
                        <td>{idx + 1}</td>
                        <td>{s.Shelter_name}</td>
                        <td>{s.Area_name || "N/A"}</td>
                        <td>{s.Current_capacity}</td>
                        <td>{s.Total_capacity}</td>
                        <td>{s.Current_capacity - s.Total_capacity}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6}>No overcapacity alerts</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <ButtonRed btnText="Close" onClick={closeAlertsModal} />
            </div>
          </div>
        )}

      </main>
    </>
  );
}
