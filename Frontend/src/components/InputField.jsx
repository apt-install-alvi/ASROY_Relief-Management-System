import "./InputField.css"

export function InputField({ fieldType, fieldID, placeholderTxt, value, onChange })
{
  if(fieldType=="text")
    return <input className="input-field" type={fieldType}
    id={fieldID} name={fieldID} placeholder={placeholderTxt}
    value={value} onChange={onChange} />;
  else
    return <input className="input-field" type={fieldType}
    id={fieldID} name={fieldID}
    value={value} onChange={onChange} />;
}