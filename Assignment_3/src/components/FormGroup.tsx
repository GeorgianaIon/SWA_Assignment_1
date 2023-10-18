import { ChangeEvent } from "react";

interface FormGroupProps {
  label: string;
  type: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FormGroup: React.FC<FormGroupProps> = ({
  label,
  type,
  value,
  onChange,
}) => (
  <div className="form-group">
    <label className="form-label">{label}</label>
    <input
      className="form-input"
      type={type}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default FormGroup;
