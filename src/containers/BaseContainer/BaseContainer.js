import { connect } from 'react-redux';
import { Base } from '../../components';
import { randomInteger } from '../../modules/utils';

import actionCreators from '../../actions';

const mapStateToProps = (state, ownProps) => {
  return {
    ...state
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...actionCreators,
  doSomething: (event) => {
    dispatch(
      actionCreators.createDoSomethingAction(randomInteger(1, 10))
    );
  },
  doAnother: (event) => {
    dispatch(
      actionCreators.createDoAnotherAction(randomInteger(1, 100))
    );
  }
});

export const BaseContainer =
  connect(mapStateToProps, mapDispatchToProps)(Base);

export default BaseContainer;
