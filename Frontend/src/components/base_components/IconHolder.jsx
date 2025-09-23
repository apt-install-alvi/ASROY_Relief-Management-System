import "../styles/base_components/IconHolder.css";

export function IconHolder({ icon, label, onClick })
{
  return (
    <button className="icon-container" onClick={onClick}>
      <img src={icon}></img>
      <p>{label}</p>
    </button>
  );
}