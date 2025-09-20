import "../styles/base_components/Checkbox.css";
export function Checkbox({ boxLabel, id, checked, onChange })
{
  return (
    <div className="box-label-container">
      <input type="checkbox"
        id={id} name={boxLabel} value={boxLabel}
        checked={checked} onChange={onChange}
      />
      <label className="checkbox-label" htmlFor={id}>{boxLabel}</label> 
    </div>
  );
}