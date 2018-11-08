import React from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const FileChooser = (props) => {

  const { choose, files } = props;

  return (
    <div id="dropZone">
      <div className="pointer">
        <FontAwesomeIcon icon="hand-pointer"/>
      </div>
      <p>Drag one or more files to this Drop Zone ... or</p>
      <input
        type="file"
        name="file"
        id="file"
        className="inputfile"
        multiple
        onChange={ choose }
      />
      <p>
        <Button>
          <label htmlFor="file">
            <FontAwesomeIcon icon="file"/> Choose Files
          </label>
        </Button>
      </p>
      <div className="icon-list">
        {
          Array.prototype.map.call(
            files,
            (file, index) => (
              <div key={ index } title={ file.name }>
                <FontAwesomeIcon icon="file"/>
              </div>
            )
          )
        }
      </div>
    </div>);

};

export default FileChooser;
