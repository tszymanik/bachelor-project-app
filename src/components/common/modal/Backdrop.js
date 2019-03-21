import React from 'react';

const Backdrop = props => (
  <div className="modal-backdrop show" onClick={props.hide}></div>
);

export default Backdrop;
