import React from 'react';
import { AcidTrailChart } from '../../components';

export const AcidTrailCharts = (props) => {
  const { hashes } = props;

  return (
    <div>
      {
        hashes.map(
          (hash, index) => (
            <div key={index}>
              <AcidTrailChart hash={hash} />
            </div>
          )
        )
      }
    </div>
  );
};

export default AcidTrailCharts;
