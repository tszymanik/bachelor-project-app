import React from 'react';

import './Container.css';

const Container = props => (
  <div className="container mt-3">{props.children}</div>
);

export default Container;
