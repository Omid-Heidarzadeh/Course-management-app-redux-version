import React from 'react';
import PropTypes from 'prop-types';

function SelectInput(props) {
  const { id, name, title, value, options, defaultOption, onChange } = props;

  return (
    <div className="form-group">
      <label className="control-label" htmlFor={id}>
        {title}
      </label>
      <select
        id={id}
        name={name}
        className="form-control"
        value={value || ''}
        onChange={onChange}
      >
        <option value="">{defaultOption}</option>
        {options.length &&
          options.map(({ value, name }, index) => (
            <option key={index} value={value}>
              {name}
            </option>
          ))}
      </select>
    </div>
  );
}

SelectInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.arrayOf(PropTypes.object),
  defaultOption: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SelectInput;
