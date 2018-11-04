import React from 'react';
import { Button } from 'reactstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const HashButton = (props) => {

  const { hash } = props;

  return (
    <div className="hash-button">
      <Button onClick={ hash }>
        Hash
      </Button>
    </div>
  );

};

export default HashButton;
