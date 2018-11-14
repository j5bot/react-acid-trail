import { connect } from 'react-redux';
import { AcidTrailCharts } from '../../components';

import actions from '../../actions';

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
    const bar = event.target.value;
    const checked = event.target.checked;

    dispatch(createChangeShowBarsAction({
      [bar]: checked
    }));
  },
  changeShowShape: (event) => {
    const shape = event.target.checked ? event.target.value : false;

    dispatch(createChangeShowShapeAction({
      shape
    }));
  }
});

export const AcidTrailChartsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AcidTrailCharts);

export default AcidTrailChartsContainer;
