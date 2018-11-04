import React from 'react';

export const AcidTrailShowBar = (props) => {

  const { change, show } = props;

  return (
    <label
      htmlFor={ `${show}-checkbox` }
      className="showBar-container checkbox-container">
      <div
        className="checkbox-bar">
        <input
          name={ `${show}-checkbox` }
          id={ `${show}-checkbox` }
          type="checkbox"
          value={ show }
          className="showBarsCheckbox checkbox"
          onChange={ change }/>
        <label
          htmlFor={ `${show}-checkbox` }
          className="checkbox-label" />
      </div>
      { show }
    </label>
  );

};

export default AcidTrailShowBar;
