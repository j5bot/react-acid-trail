import { connect } from 'react-redux';
import { EnterString } from '../../components';

import actions from '../../actions';

const {
  createEnterStringAction
} = actions;

const mapStateToProps = (state) => ({
  ...state.hasher
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  enter:      (event) => {
    return dispatch(
      createEnterStringAction({
        string: event.target.value
      })
    );
  }
});

export const EnterStringContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EnterString);
export default EnterStringContainer;
