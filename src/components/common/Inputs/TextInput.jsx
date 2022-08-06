import React from 'react';
import PropTypes from 'prop-types';

function TextInput(props) {
  const { id, name, title, value, onChange, onBlur, error = '' } = props;
  let inputClass = 'form-control';
  if (error && error.length > 0) {
    inputClass += ' is-invalid';
  }

  return (
    <div className="form-group">
      <label className="control-label" htmlFor={id}>
        {title}
      </label>
      <input
        id={id}
        name={name}
        type="text"
        className={inputClass}
        value={value || ''}
        onChange={onChange}
        onBlur={onBlur}
      />
      <span className="form-text text-danger pl-2">{error}</span>
    </div>
  );
}

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  error: PropTypes.string,
};

export default TextInput;
