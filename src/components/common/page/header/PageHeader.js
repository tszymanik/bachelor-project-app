import React from 'react';

import Container from '../container/Container';

const PageHeader = props => (
  <div className="pb-2">
    <Container>
      {props.children}
    </Container>
  </div>
);

export default PageHeader;
