
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/homepage";
import { EventPage } from "./pages_new/event";
import { ShelterPage } from "./pages/shelters";
import { Test } from "./pages/test";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/shelters" element={<ShelterPage />} />
        <Route path="/test" element={<Test />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
