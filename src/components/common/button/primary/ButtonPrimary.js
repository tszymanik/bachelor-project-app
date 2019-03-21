import React from 'react';

const ButtonPrimary = props => (
  <button onClick={props.onClick} type="button" className="btn btn-primary">{props.children}</button>
);

export default ButtonPrimary;
