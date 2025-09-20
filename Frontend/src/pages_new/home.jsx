import "./styles/home.css";
import { ButtonRed } from "../components/base_components/ButtonRed";
import { ButtonWhite } from "../components/base_components/ButtonWhite";
import { ModalHeader } from "../components/base_components/ModalHeader";
import { Header } from "../components/base_components/Header";
import { Sidebar } from "../components/large_components/Sidebar";
import { InputWithLabel } from "../components/base_components/InputWithLabel";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios"; 
import { areaCoordinates } from "../utils/areaCoordinates.js"; 



export function HomePage()
{
  const mapRef = useRef(null);
  const mapDivRef = useRef(null);
  const markersLayerRef = useRef(null);

  const [events, setEvents] = useState([]);       // all events from backend
  const [filtered, setFiltered] = useState([]);   // filtered events
  const [showFilterModal, setshowFilterModal] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filterTitle, setFilterTitle] = useState("Active Events");
  const BD_BOUNDS = [
    [20.370, 88.0],
    [28.635, 92.69],
  ];
  // Initialize map
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }
    if (!mapDivRef.current) return;

    const map = L.map(mapDivRef.current, {
      minZoom: 7.2,
      maxBounds: BD_BOUNDS,
      inertia: false,
    });
    map.fitBounds(BD_BOUNDS);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // L.rectangle(BD_BOUNDS, {
    //   color: "#700000",
    //   weight: 2,
    //   fillOpacity: 0.0,
    // }).addTo(map);

    const lg = L.layerGroup().addTo(map);
    markersLayerRef.current = lg;

    // map.whenReady(() => setTimeout(() => map.invalidateSize(), 0));

    const handleResize = () =>
    {
      setTimeout(() => {map.invalidateSize();}, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      map.remove();
      mapRef.current = null;
      markersLayerRef.current = null;
    };
  }, []);

  // Fetch events from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/events/homepage")
      .then(res => {
        const allEvents = res.data.map(e => {
          const coords = areaCoordinates[e.Area_name] || { lat: 23.685, lng: 90.3563 };
          return {
            id: e.Event_id,
            title: e.Event_name,
            area: e.Area_name,
            date: e.Date_of_occurrence,
            status: e.Status,
            lat: coords.lat,
            lon: coords.lng
          };
        });

        setEvents(allEvents);

        // Default: show only Active events
        const activeEvents = allEvents.filter(ev => ev.status === "Active");
        setFiltered(activeEvents);

      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
  if (mapRef.current && filtered.length) {
    renderMarkers(filtered);
  }
}, [filtered]);


  

  // Render markers function
  const renderMarkers = (eventsToRender) => {
    if (!markersLayerRef.current) return;
    markersLayerRef.current.clearLayers();

    const dotIcon = L.divIcon({
      className: "pin", 
      html: '<span class="pin-dot"></span>',
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });

    eventsToRender.forEach(e =>
    {
      L.marker([e.lat, e.lon], { icon: dotIcon }).addTo(markersLayerRef.current)
      .bindTooltip(`${e.title} - ${e.area} - ${formatDisplayDate(e.date)}`);
    });

  };

  function applyFilter()
  {
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    const next = events.filter(e =>
    {
      const d = new Date(e.date);
      if (from && d < from) return false;
      if (to && d > to) return false;
      return true;
    });

    setFiltered(next);

    if (from || to)
    {
      setFilterTitle(`${formatDisplayDate(fromDate)} — ${formatDisplayDate(toDate)}`);
    }
    
    else
    {
      setFilterTitle("Active Events");
    }

    setshowFilterModal(false);
  };

  // Clear filter
  function clearFilter()
  {
    setFromDate("");
    setToDate("");
    const activeEvents = events.filter(e => e.status === "Active");
    setFiltered(activeEvents);
    setFilterTitle("Active Events");
    setshowFilterModal(false);
  }

  function formatDisplayDate(dateStr)
  {
    if (!dateStr)
      return "";
    const d = new Date(dateStr);
    if (isNaN(d))
      return ""; 
    const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
    const day = d.getDate().toString().padStart(2, "0");
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    
    return `${day}-${month}-${year}`;
  }
  
  function handleModalClose()
  {
    setshowFilterModal(false);
  }

  return (
    <>
      <Sidebar></Sidebar>
      <Header title={"Activities At-A-Glance"}></Header>
      <main className="main">
        <div className="modal-btn-position">
        <ButtonRed btnText={"Filter By Occurrence"} onClick={() => setshowFilterModal(true)}></ButtonRed>
        </div>

        <div className="canvas-row">
          <div className="map-box">
            <div ref={mapDivRef} id="map" />
          </div>

          <div className="right-card">
            <h3>{filterTitle}</h3>
            <ul className="dot-list">
              {filtered.map((e) => (
                <li key={e.id}>
                  <span className="dot red" />
                  {e.title} - {e.area} - {formatDisplayDate(e.date)}
                </li>
              ))}

              {filtered.length === 0 && <li>No events in this range.</li>}
            </ul>

            <h3>Volunteers</h3>
            <p>
              Total Volunteers : <b>52</b>
            </p>
            <p>
              Active Volunteers : <b>36</b>
            </p>

            <h3>Donations</h3>
            <p>
              Total Received : <b>Tk.26,503</b>
            </p>
            <p>
              Received in the Current Month : <b>Tk.3,600</b>
            </p>
          </div>
        </div>
      </main>

      {showFilterModal && (
        <>
          <div className="modal-backdrop">
            <div className="modal">
              <ModalHeader header={"Filter by Occurrence"} handleState={handleModalClose}></ModalHeader>
              <div className="inputs-in-modal">
                <InputWithLabel
                  labelFor={"from-date"}
                  label="From"
                  fieldType={"date"}
                  value={fromDate}
                  onChange={(e)=> setFromDate(e.target.value)}
                ></InputWithLabel>

                <InputWithLabel
                  labelFor={"to-date"}
                  label="To"
                  fieldType={"date"}
                  value={toDate}
                  onChange={(e)=> setToDate(e.target.value)}
                ></InputWithLabel>
              </div>
              
              <div className="modal-btn-position">
                <ButtonWhite btnText={"Clear"} onClick={clearFilter}>
                </ButtonWhite>
                <ButtonRed btnText={"Add Filter"} onClick={applyFilter}>
                </ButtonRed>
            </div>
              </div>
            </div>
        </>
      )}
    </>
  );
}