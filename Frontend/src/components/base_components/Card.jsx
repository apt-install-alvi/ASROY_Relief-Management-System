import "../styles/base_components/Card.css";

export function Card({ img, title, field1, field2, field3, onClick})
{
  return (
    <div className="card-body" onClick={onClick}>
      <div className="card-img"><img src={img}></img></div>
      <div className="card-content">
        <p className="card-title">{title}</p>
        <p className="card-field1">{field1}</p>
        <p className="card-field2">{field2}</p>
        <p className="card-field3">{field3}</p>
      </div>
    </div>
 )
}
