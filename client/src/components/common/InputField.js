import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const InputField = ({
  name,
  value,
  errors,
  info,
  disabled,
  onChange,
  type,
  placeholder
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        disabled={disabled}
        info={info}
        errors={errors}
        onChange={onChange}
        style={{ backgroundColor: `mintcream` }}
        className={classnames("form-control form-control-lg", {
          "is-invalid": errors
        })}
      />
      {errors && <div className="invalid-feedback">{errors}</div>}
      {info && <small className="form-text text mutted">{info}</small>}
    </div>
  );
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  errors: PropTypes.string,
  info: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string
};

InputField.defaultProps = {
  type: "text"
};

export default InputField;
