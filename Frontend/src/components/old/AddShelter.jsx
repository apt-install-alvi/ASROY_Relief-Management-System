import "./Add_Popup.css";

export function AddShelter({header, handleState})
{
  return (
      <div className="popup-body">
        <div className="popup-header"> 
          <h4 className="title">Add {header}</h4>
          <button className="x-btn" onClick={handleState}><img src="/assets/icons/x_btn.svg"/></button>
        </div>
        <form>
          <label htmlFor="name" className="label-name">Name</label>
          <input className="input-field" type="text" id="name" placeholder="E.g-Flood"/>
          <label htmlFor="area" className="label-name">Area</label>
          <select id="area" className="dropdown"> {/*Dummy data, populate later with area from database*/}
            <option value="Dhaka">Dhaka</option>
            <option value="Khulna">Khulna</option>
            <option value="Rajshahi">Rajshahi</option>
            <option value="Rangpur">Rangpur</option>
            <option value="Sylhet">Sylhet</option>
            <option value="Kushtia">Kushtia</option>
          </select>
          <label htmlFor="t_cap" className="label-name">Total Capacity</label>
          <input className="input-field" type="text" id="t_cap" placeholder="E.g-50" />
          <label htmlFor="c_cap" className="label-name">Current Capacity</label>
          <input className="input-field" type="text" id="c_cap" placeholder="E.g-40"/>

          <div>
            <input type="submit" value="Add" className="popup-add-btn" />
          </div>
        </form>
      </div>
  );
}