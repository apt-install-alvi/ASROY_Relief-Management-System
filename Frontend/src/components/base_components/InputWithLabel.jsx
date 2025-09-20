import "../styles/base_components/InputWithLabel.css";
import { InputField } from "./InputField";

export function InputWithLabel({
  labelFor,
  label,
  listName,
  fieldType,
  placeholderTxt,
  value,
  onChange,
  className,
  min,
  accept})
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
        value={fieldType !== "file" ? value : undefined}
        onChange={onChange}
        min={min}
        accept={accept}>
      </InputField>
    </div>
  );
}