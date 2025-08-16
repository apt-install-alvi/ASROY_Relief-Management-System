export function ViewCard({image, type, area, date, time, handleState})
{
  return (
    <div className="viewcard-body">
      <div className="viewcard-header">
        <h5 className="title">Filter By</h5>
        <button className="x-btn"><img src="/assets/icons/x_btn.svg" onClick={handleState}/></button>
      </div>
      <img src={image} />
      <p><span>Type: </span>{type}</p>
      <p><span>Area: </span>{area}</p>
      <p><span>Date: </span>{date}</p>
      <p><span>Time: </span>{time}</p>
    </div>
  );
}