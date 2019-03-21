import React from 'react';

const Submit = props => (
  <button
    type="submit"
    className="btn btn-primary"
    disabled={props.disabled}
  >
    {props.children}
  </button>
);

export default Submit;
