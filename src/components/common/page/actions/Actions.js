import React from 'react';

import './Actions.css';

const Actions = props => (
  <div className="page-actions d-flex justify-content-end mb-4">{props.children}</div>
);

export default Actions;
