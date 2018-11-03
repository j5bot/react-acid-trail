import { connect } from 'react-redux';
import { AcidTrailCharts } from '../../components';

const mapStateToProps = (state) => ({
  ...state.hasher
});

export const AcidTrailChartsContainer = connect(
  mapStateToProps
)(AcidTrailCharts);

export default AcidTrailChartsContainer;
