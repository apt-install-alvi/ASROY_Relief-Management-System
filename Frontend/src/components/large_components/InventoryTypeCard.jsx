import { useState, useEffect } from "react";
import "../styles/large_components/InventoryTypeCard.css";

export function InventoryTypeCard({ icon, label, totalItems, maxCapacity })
{
  const [percentage, setPercentage] = useState(0);
  useEffect(() =>
  {
    const calculatedPercentage = Math.min((totalItems / maxCapacity) * 100, 100);
    setPercentage(calculatedPercentage);
  }, [totalItems, maxCapacity]);

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
        <div className="inv-stock">{totalItems}</div>
      </div>
    </div>
  );
}
