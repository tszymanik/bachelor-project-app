import React from 'react';

const Input = (props) => {
  let inputElement = null;

  let classes = '';
  if (props.touched) {
    if (props.valid) {
      classes = 'is-valid';
    } else {
      classes = 'is-invalid';
    }
  }

  switch (props.elementType) {
    case 'input':
      switch (props.elementConfig.type) {
        case 'checkbox':
          inputElement = (
            <input
              id={props.id}
              name={props.id}
              value={props.value}
              className={`form-check-input ${classes}`}
              onChange={props.change}
              {...props.elementConfig}
            />
          );
          break;
        default:
          inputElement = (
            <input
              id={props.id}
              name={props.id}
              value={props.value}
              className={`form-control ${classes}`}
              onChange={props.change}
              {...props.elementConfig}
            />
          );
          break;
      }
      break;
    case 'select':
      inputElement = (
        <select
          id={props.id}
          name={props.id}
          value={props.value}
          className={`form-control ${classes}`}
          onChange={props.change}
        >
          <option value="">{props.elementConfig.placeholder}</option>
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      );
      break;
    default:
      break;
  }

  if (props.elementConfig.type === 'checkbox') {
    return (
      <div className="form-group">
        <div className="form-check">
          {inputElement}
          <label className="form-check-label" htmlFor={props.id}>{props.label}</label>
        </div>
      </div>
    );
  }

  return (
    <div className="form-group">
      <label htmlFor={props.id}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
