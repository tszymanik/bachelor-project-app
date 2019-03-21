import React from 'react';

import './Sidebar.css';

const Sidebar = props => (
  <div className="sidebar col-lg-2">
    {props.children}
  </div>
);

export default Sidebar;
