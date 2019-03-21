import React from 'react';

const ButtonSecondary = props => (
  <button onClick={props.onClick} type="button" className="btn btn-secondary">{props.children}</button>
);

export default ButtonSecondary;
