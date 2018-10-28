import React from 'react';
import { Button } from 'reactstrap';

const TagName = 'span';

export const Base = (props) => {

  const { doSomething, doAnother } = props;

  return [
    <Button key="something" onClick={ doSomething }>something:
      <TagName>{ props.something }</TagName>
    </Button>,
    <Button key="another" onClick={ doAnother }>another: 
      <TagName>{ props.another }</TagName>
    </Button>
  ];
};

export default Base;
