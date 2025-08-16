import "./ViewCard.css";

export function ViewCard({ image, type, area, date, time, handleState })
{
  return (
    <div className="viewcard-body">
      <div className="modal-header">
        <h5 className="title">View Event</h5>
        <button className="x-btn" onClick={handleState}><img src="/assets/icons/x_btn.svg"/></button>
      </div>
      <img src={image} />
      <p><span>Type: </span>{type}</p>
      <p><span>Area: </span>{area}</p>
      <p><span>Date: </span>{date}</p>
      <p><span>Time: </span>{time}</p>
      <div className="edit-delete-btn-container">
        <button className="edit-btn">Edit</button>
        <button className="delete-btn">Delete</button>
      </div>
    </div>
  );
}
