
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/homepage";
import { EventPage } from "./pages/event";
import { ShelterPage } from "./pages/shelters";
import { Donation } from "./pages/donation";
import {Volunteer} from "./pages/volunteer"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/shelters" element={<ShelterPage />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/volunteer" element={ <Volunteer/>} />
      </Routes>
    </Router>
  );
}

export default App;
