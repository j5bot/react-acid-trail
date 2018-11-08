import { connect } from 'react-redux';
import { AcidTrailCharts } from '../../components';

import { actions } from '../../actions';

const {
  createChangeShowBarsAction,
  createChangeShowShapeAction
} = actions;

const mapStateToProps = (state) => ({
  ...state.hasher,
  ...state.acidTrail
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeShowBars: (event) => {
    dispatch(createChangeShowBarsAction(
      event.target.value,
      event.target.checked
    ));
  },
  changeShowShape: (event) => {
    dispatch(createChangeShowShapeAction(
      event.target.checked ? event.target.value : false
    ));
  }
});

export const AcidTrailChartsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AcidTrailCharts);

export default AcidTrailChartsContainer;
