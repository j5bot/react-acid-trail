import { connect } from 'react-redux';
import { Hashes } from '../../components';

const mapStateToProps = (state) => ({
  ...state.hasher
});

export const HashesContainer = connect(
  mapStateToProps
)(Hashes);
export default HashesContainer;
