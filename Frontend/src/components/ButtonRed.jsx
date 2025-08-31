import "./styles/ButtonRed.css";

export function ButtonRed({ btnText, onClick })
{
  return <button className="red-btn" onClick={onClick}>{btnText}</button>;
}