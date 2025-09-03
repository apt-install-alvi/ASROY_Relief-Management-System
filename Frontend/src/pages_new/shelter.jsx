import { Card } from "../components/base_components/Card";
import { ButtonRed } from "../components/base_components/ButtonRed";
import { ButtonWhite } from "../components/base_components/ButtonWhite";
import { InputField } from "../components/base_components/InputField";
import { ModalHeader } from "../components/base_components/ModalHeader";
import { ButtonSidebar } from "../components/base_components/ButtonSidebar";
import { Header } from "../components/base_components/Header";
import { Sidebar } from "../components/large_components/Sidebar";
import { SubHeader } from "../components/base_components/SubHeader";
import { EventAddModal } from "../components/large_components/EventAddModal";
import { EventFilterModal } from "../components/large_components/EventFilterModal";

import { InputWithLabel } from "../components/base_components/InputWithLabel";

// import { useState, useEffect } from "react";
import { useState} from "react";
import { ViewEventCard } from "../components/large_components/ViewEventCard";
// import { formatTimeForDisplay } from "../utils/formatTimeDisplay";
// import { formatDateForDisplay } from "../utils/formatDateDisplay";
// import { assignImg } from "../utils/assignImg";
import { ShelterAddModal } from "../components/large_components/ShelterAddModal";
import { ShelterFilterModal } from "../components/large_components/ShelterFilterModal";
import { ViewShelterCard } from "../components/large_components/ViewShelterCard";  

export function ShelterPageNew()
{
  // const [activeEvents, setActiveEvents] = useState([]);
  // const [pastEvents, setPastEvents] = useState([]);
  // const [allActiveEvents, setAllActiveEvents] = useState([]);
  // const [allPastEvents, setAllPastEvents] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  // const [selectedEvent, setSelectedEvent] = useState(null);
  // const [showResetBtn, setShowResetBtn] = useState(false);

  // //fetch events list from db
  // useEffect(() => {
  //   fetch("http://localhost:5000/api/events/all")
  //     .then(res => res.json())
  //     .then(data => {
  //       const active = data.filter(ev => ev.Status === "Active");
  //       const inactive = data.filter(ev => ev.Status !== "Active");
  //       setActiveEvents(active);
  //       setPastEvents(inactive);
  //       setAllActiveEvents(active);
  //       setAllPastEvents(inactive);
  //     }
  //   )
  //   .catch(err => console.error(err));
  // }, []);

  // //add new events
  // function addNewEvent(newEvent)
  // {
  //   if (newEvent.Status === "Active")
  //   {
  //     setActiveEvents(prev => [newEvent, ...prev]);
  //     setAllActiveEvents(prev => [newEvent, ...prev]);
  //   }
  //   else
  //   {
  //     setPastEvents(prev => [newEvent, ...prev]);
  //     setAllPastEvents(prev => [newEvent, ...prev]);
  //   }
  // }

  // //save event with updated info
  // function handleSaveEvent(updatedEvent)
  // {
  //   const isNowActive = updatedEvent.Status === "Active";

  //   if (isNowActive)
  //   {
  //     setActiveEvents(prev => [
  //       ...prev.filter(ev => ev.Event_id !== updatedEvent.Event_id),
  //       updatedEvent
  //     ]);
  //     setPastEvents(prev => prev.filter(ev => ev.Event_id !== updatedEvent.Event_id));
  //   }
    
  //   else
  //   {
  //     setPastEvents(prev => [
  //       ...prev.filter(ev => ev.Event_id !== updatedEvent.Event_id),
  //       updatedEvent
  //     ]);
  //     setActiveEvents(prev => prev.filter(ev => ev.Event_id !== updatedEvent.Event_id));
  //   }
  //   setShowViewModal(false);
  // }

  // //filter events
  // function handleFilterResults(filteredEvents)
  // {
  //   const active = filteredEvents.filter((ev) => ev.Status === "Active");
  //   const inactive = filteredEvents.filter((ev) => ev.Status !== "Active");
  //   setActiveEvents(active);
  //   setPastEvents(inactive);
  // }

  // function resetFilters()
  // {
  //   setActiveEvents(allActiveEvents);
  //   setPastEvents(allPastEvents);
  //   setShowResetBtn(false);
  // }

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
            {/* <SubHeader title={"Shelters"}></SubHeader> */}
            <div className="modal-btn-position">
              <ButtonRed btnText={"Add Shelter"} onClick={() => setShowAddModal(true)}></ButtonRed>
              {/* <ButtonRed btnText={"Filter"} onClick={() => { setShowFilterModal(true); setShowResetBtn(true); }}></ButtonRed> */}
              <ButtonRed btnText={"Filter"} onClick={() => setShowFilterModal(true)}></ButtonRed>
              {/* {showResetBtn ? <ButtonWhite btnText={"Reset Filters"} onClick={resetFilters}></ButtonWhite>: null} */}
            </div>
          </div>
          <div className="card-grid">
            {/* {activeEvents.map((ev) =>(
              <Card
                key={ev.id}
                img={assignImg(ev.Event_name)}
                title={ev.Event_name}
                field1={ev.area}
                field2={`Date of Occurrence: ${formatDateForDisplay(ev.Date_of_occurrence)}`} 
                field3={`Time of Occurrence: ${formatTimeForDisplay(ev.Time_of_occurrence)}`}
                onClick={() => {
                  setSelectedEvent(ev);
                  setShowViewModal(true);
                }}>
              </Card>))} */}
            <Card img={"/assets/images/shelter.jpg"} title={"Motijheel Govt Boys' School"} field1={"Motijheel"} field2={"Current Capacity: 32"} field3={"Total Capacity: 50"} onClick={()=>setShowViewModal(true)}></Card>
            <Card img={"/assets/images/shelter.jpg"} title={"Motijheel Govt Boys' School"} field1={"Motijheel"} field2={"Current Capacity: 32"} field3={"Total Capacity: 50"} onClick={() => setShowViewModal(true)}></Card>
            <Card img={"/assets/images/shelter.jpg"} title={"Motijheel Govt Boys' School"} field1={"Motijheel"} field2={"Current Capacity: 32"} field3={"Total Capacity: 50"} onClick={()=>setShowViewModal(true)}></Card>
            <Card img={"/assets/images/shelter.jpg"} title={"Motijheel Govt Boys' School"} field1={"Motijheel"} field2={"Current Capacity: 32"} field3={"Total Capacity: 50"} onClick={()=>setShowViewModal(true)}></Card>
            <Card img={"/assets/images/shelter.jpg"} title={"Motijheel Govt Boys' School"} field1={"Motijheel"} field2={"Current Capacity: 32"} field3={"Total Capacity: 50"} onClick={()=>setShowViewModal(true)}></Card>
          </div>
        </section>
        
        {showAddModal ? 
          <div className="modal-backdrop">
            {/* <ShelterAddModal handleState={closeAddModal} onAdd={addNewEvent}></ShelterAddModal> */}
            <ShelterAddModal handleState={closeAddModal}></ShelterAddModal>
          </div> : null}
        
        {showFilterModal ? 
          <div className="modal-backdrop">
            {/* <ShelterFilterModal handleState={closeFilterModal} onFilter={handleFilterResults}></ShelterFilterModal> */}
            <ShelterFilterModal handleState={closeFilterModal}></ShelterFilterModal>
          </div> : null}
        
        {/* {(showViewModal && selectedEvent) ? */}
        {showViewModal ?
          <div className="modal-backdrop">
            {/* <ViewEventCard
                eventId={selectedEvent.Event_id}
                type={selectedEvent.Event_name}
                area={selectedEvent.area}
                date={selectedEvent.Date_of_occurrence}
                time={selectedEvent.Time_of_occurrence}
                status={selectedEvent.Status}
                handleState={closeViewModal}
                onUpdate={handleSaveEvent}
                onDelete={(id) => {
                  setActiveEvents(prev => prev.filter(ev => ev.Event_id !== id));
                  setPastEvents(prev => prev.filter(ev => ev.Event_id !== id));
                  setAllActiveEvents(prev => prev.filter(ev => ev.Event_id !== id));
                  setAllPastEvents(prev => prev.filter(ev => ev.Event_id !== id));
                  closeViewModal();
                }}
            ></ViewEventCard> */}
            <ViewShelterCard handleState={closeViewModal}></ViewShelterCard>
          </div>
          : null}
        
      </main>
    </>
  );
}