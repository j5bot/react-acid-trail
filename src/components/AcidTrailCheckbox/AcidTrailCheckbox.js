import React from 'react';

export const AcidTrailCheckbox = (props) => {

  const { change, show, checked } = props;

  return (
    <label
      htmlFor={ `${show}-checkbox` }
      className="showChoice-container checkbox-container">
      <div
        className="checkbox-bar">
        <input
          name={ `${show}-checkbox` }
          id={ `${show}-checkbox` }
          type="checkbox"
          value={ show }
          checked={ checked || false }
          className="acidTrailCheckbox checkbox"
          onChange={ change }/>
        <label
          htmlFor={ `${show}-checkbox` }
          className="checkbox-label" />
      </div>
      { show }
    </label>
  );

};

export default AcidTrailCheckbox;
