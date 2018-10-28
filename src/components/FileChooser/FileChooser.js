import React from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const FileChooser = (props) => {

  const { choose, hashFiles } = props;

  return ([
    <div id="dropZone" key="dropZone">
      <div className="pointer">
        <FontAwesomeIcon icon="hand-pointer"/>
      </div>
      <p>Drag one or more files to this Drop Zone ... or</p>
      <input
        type="file"
        name="file"
        id="file"
        className="inputfile"
        onChange={ choose }
      />
      <p>
        <Button>
          <label htmlFor="file">
            <FontAwesomeIcon icon="file"/> Choose File
          </label>
        </Button>
      </p>
    </div>,
    <div key="hashButton">
      <Button onClick={ hashFiles }>
        Hash Files
      </Button>
    </div>
  ]);

};

export default FileChooser;
