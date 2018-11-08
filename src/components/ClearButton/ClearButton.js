import React from 'react';
import { Button } from 'reactstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ClearButton = (props) => {

  const { clear } = props;

  return (
    <div className="clear-button">
      <Button onClick={ clear }>
        Clear
      </Button>
    </div>
  );

};

export default ClearButton;
