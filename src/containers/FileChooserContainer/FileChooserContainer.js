import { connect } from 'react-redux';
import { FileChooser } from '../../components';

import { actions } from '../../actions';

const mapStateToProps = (state) => ({
  ...state
});

const getFilesFromItems = (items) => {
  items = Array.prototype.map.call(items, (item) => item);
  return items.filter(
    (item) => item.kind === 'file'
  ).map(
    (item) => item.getAsFile()
  );
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  hashFiles: (event) => {
    return dispatch(actions.createStartHashAction());
  },
  choose:    (event) => {

    const transfer = event.dataTransfer;
    const target = event.target;
    const items = transfer && transfer.items;
    const files = (items && getFilesFromItems(items))
      || (transfer && transfer.files)
      || (target && target.files);

    return dispatch(actions.createChooseFilesActions(files));

  }
});

export const FileChooserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FileChooser);
export default FileChooserContainer;
