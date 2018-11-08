import React from 'react';

export const EnterString = (props) => {

  const { enter, string } = props;

  return (
    <textarea
      rows="5"
      cols="100"
      name="text"
      id="text"
      value={ string }
      onChange={ enter }
      placeholder="create ACID trail from this data"
    />
  );

};

export default EnterString;
