import "./styles/Checkbox.css";
export function Checkbox({ boxLabel, boxCount, checked, onChange })
{
  return (
    <div className="box-label-container">
      <input type="checkbox"
        id={boxCount} name={boxLabel} value={boxLabel}
        checked={checked} onChange={onChange}
      />
      <label className="checkbox-label" htmlFor={boxCount}>{boxLabel}</label> 
    </div>
  );
}