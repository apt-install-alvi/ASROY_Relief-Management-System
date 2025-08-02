import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [ff, setff] = useState("Are You Ready ?");

  const abc = () => {
    setff("LETS GOO!!");
  };

  return (
    <div className="app-container">
      <h1 className="heading">{ff}</h1>
      <button className="start-button" onClick={abc}>
        YES
      </button>
      <p className="description">Hi guys, let's start the project!</p>
    </div>
  );
}

export default App;
