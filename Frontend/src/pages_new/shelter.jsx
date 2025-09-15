import axios from "axios";
import { Card } from "../components/base_components/Card";
import { ButtonRed } from "../components/base_components/ButtonRed";
import { Header } from "../components/base_components/Header";
import { Sidebar } from "../components/large_components/Sidebar";
import { useState, useEffect } from "react";
import { ShelterAddModal } from "../components/large_components/ShelterAddModal";
import { ShelterFilterModal } from "../components/large_components/ShelterFilterModal";
import { ViewShelterCard } from "../components/large_components/ViewShelterCard";  
import { BASE_URL } from "../utils/api";

export function ShelterPageNew()
{
  const [shelters, setShelters] = useState([]);
  const [allShelters, setAllShelters] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedShelter, setSelectedShelter] = useState(null);
  // const [showResetBtn, setShowResetBtn] = useState(false);

 
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/shelternew")
      .then((res) => {
        console.log("API Response Data:", res.data); // Add this line
        console.log("First shelter object:", res.data[0]); // Add this line
        setShelters(res.data);
        setAllShelters(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  function handleSaveShelter(updatedData, action)
  {
    if (action === "delete")
    {
      setShelters((prev) =>
        prev.filter((s) => s.Shelter_id !== selectedShelter.Shelter_id)
      );
    }

    else
    {
      setShelters((prev) =>
        prev.map((s) =>
          s.Shelter_id === selectedShelter.Shelter_id
            ? { ...s, ...updatedData }
            : s
        )
      );
    }
      setShowViewModal(false);
  };
  
  // function resetFilters()
  // {
  //   setShelters(allShelters);
  //   setShowResetBtn(false);
  // }
  //img handle

  //close modals
  function closeAddModal()
  {
    setShowAddModal(false);
  }

  function closeFilterModal()
  {
    setShowFilterModal(false);
  }

  function closeViewModal()
  {
    setShowViewModal(false);
  }



  return (
    <>
      <Sidebar></Sidebar>
      <Header title={"Shelters"}></Header>
      <main>
        <section className="active-events">
          <div className="events-subheader">
            <div className="modal-btn-position">
              <ButtonRed btnText={"Add Shelter"} onClick={() => setShowAddModal(true)}></ButtonRed>
              <ButtonRed btnText={"Filter"} onClick={() => setShowFilterModal(true)}></ButtonRed>
            </div>
          </div>
          <div className="card-grid">
            {shelters.map((s) =>(
              <Card
                ckey={s.Shelter_id}
                img={s.Shelter_image ? `${BASE_URL}${s.Shelter_image}` : "/assets/images/shelter.jpg"}
                title={s.Shelter_name}
                field1={s.Area_name}
                field2={`Current Capacity: ${s.Current_capacity}`} 
                field3={`Total Capacity: ${s.Total_capacity}`}
                onClick={() => {
                  console.log("Selected shelter:", s); // Debug log
                  setSelectedShelter(s);
                  setShowViewModal(true);
                }}>
              </Card>))}

          </div>
        </section>
        
        {showAddModal ? 
          <div className="modal-backdrop">
            <ShelterAddModal handleState={closeAddModal}></ShelterAddModal>
          </div> : null}
        
        {showFilterModal ? 
          <div className="modal-backdrop">
            {/* <ShelterFilterModal handleState={closeFilterModal} onFilter={handleFilterResults}></ShelterFilterModal> */}
            <ShelterFilterModal handleState={closeFilterModal}></ShelterFilterModal>
          </div> : null}
        
        {(showViewModal && selectedShelter) ?
          <div className="modal-backdrop">
             <ViewShelterCard
                eventId={selectedShelter.Shelter_id}
                name={selectedShelter.Shelter_name}
                area={selectedShelter.Area_name}
                current_capacity={selectedShelter.Current_capacity}
                total_capacity={selectedShelter.Total_capacity}
                handleState={closeViewModal}
                onSave={handleSaveShelter}
                onDelete={(id) => {
                  setShelters(prev => prev.filter(s => s.Shelter_id !== id));
                  setAllShelters(prev => prev.filter(s => s.Shelter_id !== id));
                  closeViewModal();
                }}
            ></ViewShelterCard>
          </div>
          : null}
        
      </main>
    </>
  );
}