import React from 'react';

import './Table.css';

const Table = props => (
  <div className="table-responsive">
    <table className="table">{props.children}</table>
  </div>
);

export default Table;
