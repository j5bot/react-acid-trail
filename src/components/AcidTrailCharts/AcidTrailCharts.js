import React from 'react';
import { AcidTrailChart } from '../../components';
import { AcidTrailShowBar } from '../../components';

import './AcidTrailCharts.css';

export const AcidTrailCharts = (props) => {
  const {
    children,
    job,
    hashes,
    showBars = {},
    changeShowBars
  } = props;

  const keys = [
    'hash',
    'shades',
    'colors',
    'names'
  ];

  return (
    <div className="acid-trail-charts-container">
      <div className="showBars">
        {
          keys.map(
            (show) => (
              <AcidTrailShowBar
                key={ show }
                show={ show }
                checked={ showBars[show] }
                change={ changeShowBars }/>
            )
          )
        }
        { children }
      </div>
      <div className="acid-trail-charts">
        {
          hashes.map(
            (hash, index) => (
              <div
                key={index}
                id={ `acid-trail-${ job }-${ index }-${ hash.hashed }` }>
                <AcidTrailChart hash={hash} showBars={showBars} />
              </div>
            )
          )
        }
      </div>
    </div>
  );
};

export default AcidTrailCharts;
