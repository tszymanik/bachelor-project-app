import React from 'react';

const Form = props => (
  <form onSubmit={props.onSubmit} className="mb-3" noValidate>
    {props.children}
  </form>
);

export default Form;
