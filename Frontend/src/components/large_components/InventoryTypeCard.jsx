import { useState } from "react";
import "../styles/large_components/InventoryTypeCard.css";

export function InventoryTypeCard({ stockValue, icon, label })
{
  const [percentage, setPercentage] = useState(10);



  return (
    <div className="inv-cnt">
      <div className="item-display">
      <img src={icon} className="inv-img"></img>
        <p className="inv-item-name">{label}</p>
      </div>
      <div>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
        </div>
        <div className="inv-stock">{stockValue}</div>
      </div>
    </div>
  );
}
