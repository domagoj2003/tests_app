import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

function TextArea({ name, placeholder, value, onChange, errors, info }) {
  return (
    <div className="form-group">
      <textarea
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        errors={errors}
        info={info}
        className={classnames("form-control form-control-lg", {
          "is-invalid": errors
        })}
      />
      {info && <small className="form-text text-mutted">{info}</small>}
      {errors && <div className="invalid-feedback">{errors}</div>}
    </div>
  );
}

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  errors: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextArea;
