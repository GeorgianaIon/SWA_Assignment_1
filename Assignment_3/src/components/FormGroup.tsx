import React, { ChangeEvent, useState } from "react";

interface FormGroupProps {
  label: string;
  value: string;
  isPassword?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FormGroup: React.FC<FormGroupProps> = ({
  label,
  value,
  onChange,
  isPassword = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = showPassword ? "text" : isPassword ? "password" : "text";

  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <div className="input">
        <input
          className="form-input"
          type={inputType}
          value={value}
          onChange={onChange}
        />
        {isPassword && (
          <button
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
            type="button"
          >
            {showPassword ? (
              <i className="material-icons">visibility_off</i>
            ) : (
              <i className="material-icons">visibility</i>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default FormGroup;
