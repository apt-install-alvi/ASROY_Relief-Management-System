import "../styles/base_components/ButtonWhite.css";

export function ButtonWhite({ btnText, onClick })
{
  return <button className="white-btn" onClick={onClick}>{btnText}</button>;
}