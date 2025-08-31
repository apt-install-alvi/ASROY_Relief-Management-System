import "./styles/InputField.css";

export function InputField({ listName, fieldType, fieldID, placeholderTxt, value, onChange, className })
{
  if (
    fieldType == "text" ||
    fieldType == "url" ||
    fieldType == "search" ||
    fieldType == "number" ||
    fieldType == "tel" ||
    fieldType == "email" ||
    fieldType == "password")
    return <input className="input-field" list={listName} type={fieldType} id={fieldID} name={fieldID} placeholder={placeholderTxt} value={value} onChange={onChange} />;
  
  else if (className=="date-time-fields")
        return <input className={`input-field ${className}`} list={listName} type={fieldType} id={fieldID} name={fieldID} value={value} onChange={onChange} />;    
  else
    return <input className="input-field" list={listName} type={fieldType} id={fieldID} name={fieldID} value={value} onChange={onChange} />;
}