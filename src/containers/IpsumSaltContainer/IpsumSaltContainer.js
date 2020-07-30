import { connect } from 'react-redux';
import { IpsumSalt } from '../../components';

import actions from '../../actions';

const {
  createEnterStringAction
} = actions;

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  salt:     (string) => {
    return dispatch(
      createEnterStringAction(
          { string }
      )
    );
  }
});

export const IpsumSaltContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(IpsumSalt);
export default IpsumSaltContainer;
