import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Homepage } from "./pages/homepage";
import { HomePage } from "./pages_new/home";
import { EventPage } from "./pages_new/event";
// import { ShelterPage } from "./pages/shelters";
import { Test } from "./pages_old/test";
import { ShelterPageNew } from "./pages_new/shelter";
import { DonationPage } from "./pages_new/donation";
import { VolunteerPage } from "./pages_new/volunteer"
import { InventoryPage } from "./pages_new/inventory";
function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Homepage />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/test" element={<Test />}></Route>
        <Route path="/shelternew" element={<ShelterPageNew />}></Route>
        <Route path="/donation" element={<DonationPage />} />
        <Route path="/volunteer" element={<VolunteerPage />} />
        <Route path="/inventory" element={<InventoryPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
