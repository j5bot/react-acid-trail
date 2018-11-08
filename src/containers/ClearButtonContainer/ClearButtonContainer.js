import { connect } from 'react-redux';
import { ClearButton } from '../../components';

import { actions } from '../../actions';

const {
  createClearAction
} = actions;

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  clear: (event) => {
    return dispatch(createClearAction());
  }
});

export const ClearButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClearButton);
export default ClearButtonContainer;
