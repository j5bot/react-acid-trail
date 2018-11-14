import { connect } from 'react-redux';
import { EnterTitle } from '../../components';

import actions from '../../actions';

const {
  createEnterTitleAction
} = actions;

const mapStateToProps = (state) => ({
  ...state.hasher
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  enter:      (event) => {
    return dispatch(
      createEnterTitleAction({
        title: event.target.value
      })
    );
  }
});

export const EnterTitleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EnterTitle);
export default EnterTitleContainer;
