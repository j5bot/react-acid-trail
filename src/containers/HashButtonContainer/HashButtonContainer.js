import { connect } from 'react-redux';
import { HashButton } from '../../components';

import { actions } from '../../actions';

const {
  createStartHashAction
} = actions;

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  hash: (event) => {
    return dispatch(createStartHashAction());
  }
});

export const HashButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HashButton);
export default HashButtonContainer;
