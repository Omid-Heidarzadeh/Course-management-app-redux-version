import React from 'react';
import PropTypes from 'prop-types';

function SelectInput(props) {
  const {
    id,
    name,
    title,
    value,
    options,
    defaultOption,
    onChange,
    onBlur,
    error,
  } = props;

  let inputClass = 'form-control';
  if (error && error.length > 0) {
    inputClass += ' is-invalid';
  }

  return (
    <div className="form-group">
      <label className="control-label" htmlFor={id}>
        {title}
      </label>
      <select
        id={id}
        name={name}
        className={inputClass}
        value={value || ''}
        onChange={onChange}
        onBlur={onBlur}
      >
        <option value="0">{defaultOption}</option>
        {options.length &&
          options.map(({ value, name }, index) => (
            <option key={index} value={value}>
              {name}
            </option>
          ))}
      </select>
      <span id={`${id}-error`} className="form-text text-danger pl-2">
        {error}
      </span>
    </div>
  );
}

SelectInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.string,
  defaultOption: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};

export default SelectInput;
