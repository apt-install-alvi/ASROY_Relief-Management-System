import "./styles/ModalHeader.css";

export function ModalHeader({ header, handleState })
{
  return (
      <div className="modal-header">
      <h5 className="title">{header}</h5>
        <button className="x-btn"><img src="/assets/icons/x_btn.svg" onClick={handleState}/></button>
      </div>
  )
}