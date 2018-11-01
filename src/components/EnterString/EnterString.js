import React from 'react';

export const EnterString = (props) => {

  const { enter } = props;

  return (
    <textarea
      rows="5"
      cols="100"
      name="text"
      id="text"
      onChange={ enter }
    />
  );

};

export default EnterString;
