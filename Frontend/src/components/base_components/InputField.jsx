import "../styles/base_components/InputField.css";

export function InputField({ listName, fieldType, fieldID, placeholderTxt, value, onChange, className })
{

  if (className == "date-time-fields")
    className = "input-field date-time-fields"
  else
    className = "input-field";
  
  if (
    fieldType == "text" ||
    fieldType == "url" ||
    fieldType == "search" ||
    fieldType == "number" ||
    fieldType == "tel" ||
    fieldType == "email" ||
    fieldType == "password")
    return <input className={className} list={listName} type={fieldType} id={fieldID} name={fieldID} placeholder={placeholderTxt} value={value} onChange={onChange} />;
  
  else if (fieldType == "file")
    return <input type={fieldType} id={fieldID}></input>;
  
  // else if (className=="date-time-fields")
  //       return <input className={`input-field date-time-fields`} list={listName} type={fieldType} id={fieldID} name={fieldID} value={value} onChange={onChange} />;    
  else
    return <input className={className} list={listName} type={fieldType} id={fieldID} name={fieldID} value={value} onChange={onChange} />;
}