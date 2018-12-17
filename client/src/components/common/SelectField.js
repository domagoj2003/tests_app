import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SelectField = ({
  name,
  placeholder,
  errors,
  info,
  value,
  options,
  onChange
}) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <div className="form-group">
      <select
        name={name}
        errors={errors}
        placeholder={placeholder}
        info={info}
        value={value}
        onChange={onChange}
        className={classnames("form-control form-control-lg", {
          "is-invalid": errors
        })}
      >
        {selectOptions}
      </select>
      {errors && <div className="invalid-feedback">{errors}</div>}
      {info && <div className="small form-text text-mutted">{info}</div>}
    </div>
  );
};

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  errors: PropTypes.object,
  info: PropTypes.string,
  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SelectField;
