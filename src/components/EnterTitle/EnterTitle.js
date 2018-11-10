import React from 'react';
import { Input } from 'reactstrap';

export const EnterTitle = (props) => {

  const { enter, title } = props;

  return (
    <Input
      type="text"
      name="title"
      id="title"
      value={ title }
      onChange={ enter }
      placeholder="enter a title"
    />
  );

};

export default EnterTitle;
