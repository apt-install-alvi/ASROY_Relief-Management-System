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

export function HomePage() {
  const mapRef = useRef(null);
  const mapDivRef = useRef(null);
  const markersLayerRef = useRef(null);

  const [events, setEvents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [showFilterModal, setshowFilterModal] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filterTitle, setFilterTitle] = useState("Active Events");
  const [volCounts, setVolCounts] = useState({ total: 0, active: 0, inactive: 0 });
  const [donationStats, setDonationStats] = useState({ 
    totalMoney: 0, 
    totalItems: 0 
  });
  const [isLoadingVolunteers, setIsLoadingVolunteers] = useState(true);
  const [isLoadingDonations, setIsLoadingDonations] = useState(true);

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
    }).fitBounds(BD_BOUNDS);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const lg = L.layerGroup().addTo(map);
    markersLayerRef.current = lg;

    setTimeout(() => {
      map.invalidateSize();
    }, 100);

    const handleResize = () => {
      setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.invalidateSize();
        }
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
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

  // Fetch volunteer counts directly from API
  useEffect(() => {
    const fetchVolunteerCounts = async () => {
      try {
        setIsLoadingVolunteers(true);
        const response = await axios.get("http://localhost:5000/api/volunteers/all");
        const volunteers = response.data || [];
        
        const total = volunteers.length;
        const active = volunteers.filter(v => v.Status === "Active").length;
        const inactive = volunteers.filter(v => v.Status !== "Active").length;
        
        setVolCounts({ total, active, inactive });
        
        // Also store in localStorage for consistency
        localStorage.setItem("volunteerCounts", JSON.stringify({
          total,
          activeCount: active,
          inactiveCount: inactive
        }));
        
      } catch (error) {
        console.error("Error fetching volunteer counts:", error);
        // Fallback to localStorage if API fails
        readFromLocalStorage();
      } finally {
        setIsLoadingVolunteers(false);
      }
    };

    const readFromLocalStorage = () => {
      try {
        const raw = localStorage.getItem("volunteerCounts");
        if (raw) {
          const parsed = JSON.parse(raw);
          setVolCounts({
            total: parsed.total ?? 0,
            active: parsed.activeCount ?? parsed.active ?? 0,
            inactive: parsed.inactiveCount ?? parsed.inactive ?? 0,
          });
        }
      } catch (err) {
        console.error("Error reading volunteerCounts from localStorage", err);
      }
    };

    // Listen for updates from VolunteerPage
    const handleVolunteerUpdate = (e) => {
      if (e.detail) {
        setVolCounts({
          total: e.detail.total ?? 0,
          active: e.detail.activeCount ?? e.detail.active ?? 0,
          inactive: e.detail.inactiveCount ?? e.detail.inactive ?? 0,
        });
      } else {
        // If no detail, refetch from API
        fetchVolunteerCounts();
      }
    };

    // Initial fetch
    fetchVolunteerCounts();

    window.addEventListener("volunteerCountsUpdated", handleVolunteerUpdate);
    return () => {
      window.removeEventListener("volunteerCountsUpdated", handleVolunteerUpdate);
    };
  }, []);

  // Fetch donation statistics
  useEffect(() => {
    const fetchDonationStats = async () => {
      try {
        setIsLoadingDonations(true);
        const response = await axios.get("http://localhost:5000/api/donations/list");
        const data = response.data;
        
        // Use the summary data from your donations API
        if (data.summary) {
          setDonationStats({
            totalMoney: data.summary.totalMoney || 0,
            totalItems: data.summary.totalItems || 0
          });
        } else {
          // Fallback: calculate manually if summary not available
          const donations = Array.isArray(data) ? data : (data.donations || []);
          const totalMoney = donations
            .filter(d => d.donation_type === "Money")
            .reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
          const totalItems = donations
            .filter(d => d.donation_type !== "Money")
            .reduce((sum, d) => sum + (Number(d.quantity) || 0), 0);
          
          setDonationStats({ totalMoney, totalItems });
        }
      } catch (error) {
        console.error("Error fetching donation stats:", error);
        setDonationStats({ totalMoney: 0, totalItems: 0 });
      } finally {
        setIsLoadingDonations(false);
      }
    };

    fetchDonationStats();

    // Listen for donation updates
    const handleDonationUpdate = () => {
      fetchDonationStats();
    };

    window.addEventListener("donationAdded", handleDonationUpdate);
    return () => {
      window.removeEventListener("donationAdded", handleDonationUpdate);
    };
  }, []);

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

    eventsToRender.forEach(e => {
      L.marker([e.lat, e.lon], { icon: dotIcon }).addTo(markersLayerRef.current)
        .bindTooltip(`${e.title} - ${e.area} - ${formatDisplayDate(e.date)}`);
    });
  };

  function applyFilter() {
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    const next = events.filter(e => {
      const d = new Date(e.date);
      if (from && d < from) return false;
      if (to && d > to) return false;
      return true;
    });

    setFiltered(next);

    if (from || to) {
      setFilterTitle(`${formatDisplayDate(fromDate)} — ${formatDisplayDate(toDate)}`);
    } else {
      setFilterTitle("Active Events");
    }

    setshowFilterModal(false);
  }

  function clearFilter() {
    setFromDate("");
    setToDate("");
    const activeEvents = events.filter(e => e.status === "Active");
    setFiltered(activeEvents);
    setFilterTitle("Active Events");
    setshowFilterModal(false);
  }

  function formatDisplayDate(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d)) return ""; 
    const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
    const day = d.getDate().toString().padStart(2, "0");
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    
    return `${day}-${month}-${year}`;
  }
  
  function handleModalClose() {
    setshowFilterModal(false);
  }

  return (
    <>
      <Sidebar />
      <Header title={"Activities At-A-Glance"} />
      <main className="main">
        <div className="modal-btn-position">
          <ButtonRed btnText={"Filter By Occurrence"} onClick={() => setshowFilterModal(true)} />
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
            {isLoadingVolunteers ? (
              <p>Loading volunteers...</p>
            ) : (
              <>
                <p>Total Volunteers: <b>{volCounts.total.toLocaleString()}</b></p>
                <p>Active Volunteers: <b>{volCounts.active.toLocaleString()}</b></p>
                <p>Inactive Volunteers: <b>{volCounts.inactive.toLocaleString()}</b></p>
              </>
            )}

            <h3>Donations</h3>
            {isLoadingDonations ? (
              <p>Loading donations...</p>
            ) : (
              <>
                <p>Total Amount Donated: <b>Tk. {donationStats.totalMoney.toLocaleString()}</b></p>
                <p>Total Items Donated: <b>{donationStats.totalItems.toLocaleString()}</b></p>
              </>
            )}
          </div>
        </div>
      </main>

      {showFilterModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <ModalHeader header={"Filter by Occurrence"} handleState={handleModalClose} />
            <div className="inputs-in-modal">
              <InputWithLabel
                labelFor={"from-date"}
                label="From"
                fieldType={"date"}
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
              <InputWithLabel
                labelFor={"to-date"}
                label="To"
                fieldType={"date"}
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
            <div className="modal-btn-position">
              <ButtonWhite btnText={"Clear"} onClick={clearFilter} />
              <ButtonRed btnText={"Apply Filter"} onClick={applyFilter} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}