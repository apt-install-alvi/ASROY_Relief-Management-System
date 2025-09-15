
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/homepage";
import { HomePage } from "./pages_new/home";
import { EventPage } from "./pages_new/event";
// import { ShelterPage } from "./pages/shelters";
import { Test } from "./pages/test";
import { ShelterPageNew } from "./pages_new/shelter";
import { Donation } from "./pages/donation";
import {Volunteer} from "./pages/volunteer"
function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Homepage />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventPage />} />
        {/* <Route path="/shelters" element={<ShelterPage />} /> */}
        <Route path="/test" element={<Test />}></Route>
        <Route path="/shelternew" element={<ShelterPageNew />}></Route>
        <Route path="/donation" element={<Donation />} />
        <Route path="/volunteer" element={ <Volunteer/>} />
      </Routes>
    </Router>
  );
}

export default App;
