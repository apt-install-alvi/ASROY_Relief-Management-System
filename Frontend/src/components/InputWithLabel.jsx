import "../components/styles/InputWithLabel.css";
import { InputField } from "./InputField";

export function InputWithLabel({ labelFor, label , listName, fieldType, placeholderTxt, value, onChange, className })
{
  return (
    <div className="with-label">
      <label htmlFor={labelFor}>{label}</label>
      <InputField
        className={className}
        listName={listName}
        fieldType={fieldType}
        fieldID={labelFor}
        placeholderTxt={placeholderTxt}
        value={value}
        onChange={onChange}>
      </InputField>
    </div>
  );
}