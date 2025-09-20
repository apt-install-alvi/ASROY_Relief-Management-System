import "../styles/base_components/ModalHeader.css";

export function ModalHeader({ header, handleState, onClick })
{
  return (
    <div className="modal-header">
      <h5 className="title">{header}</h5>
      {onClick ? <button className="x-btn"><img src="/assets/icons/x_btn.svg" onClick={onClick}/></button>
      : <button className="x-btn"><img src="/assets/icons/x_btn.svg" onClick={handleState}/></button>}
    </div>
  )
}