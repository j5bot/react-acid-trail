import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { AcidTrailChart } from '../../components';
import { AcidTrailCheckbox } from '../../components';

import './AcidTrailCharts.css';

export const AcidTrailCharts = (props) => {
  const {
    children,
    hashes,
    showShape,
    showBars = {},
    changeShowBars,
    changeShowShape
  } = props;

  const barKeys = [
    'hash',
    'shades',
    'colors',
    'names'
  ];

  const shapeKeys = [
    'notched',
    'rect',
    'ellipse'
  ];

  return (
    <div className="acid-trail-charts-container">
      <div className="acid-trail-controls">
        <div className="choices-container">
          <div className="showChoice showBars">
            <p>Display</p>
            {
              barKeys.map(
                (show) => (
                  <AcidTrailCheckbox
                    key={ show }
                    show={ show }
                    checked={ showBars[show] }
                    change={ changeShowBars }/>
                )
              )
            }
          </div>
          <div className="showChoice showShapes">
            <p>Shape</p>
            {
              shapeKeys.map(
                (show) => (
                  <AcidTrailCheckbox
                    key={ show }
                    show={ show }
                    checked={ showShape === show }
                    change={ changeShowShape }/>
                )
              )
            }
          </div>
        </div>
        { children }
      </div>
      { hashes && hashes.length > 0 &&
      (<div className="acid-trail-charts">
        {
          hashes.map(
            (hash, index) => (
              <div
                key={index}
                className="acid-trail"
                id={ `acid-trail-${ hash.job }-${ index }-${ hash.hashed }` }>
                <div className="trail-reference">
                  <FontAwesomeIcon icon={ hash.file ? 'file' : 'font' } />
                  { hash.title && (
                    <span>{ hash.title }:</span>)
                  }
                  <span>{ hash.name }</span>
                </div>
                <AcidTrailChart
                  hash={hash}
                  showBars={showBars}
                  showShape={showShape} />
              </div>
            )
          )
        }
      </div>) }
    </div>
  );
};

export default AcidTrailCharts;
