import { connect } from 'react-redux';
import { FileChooser } from '../../components';

import { actions } from '../../actions';

const {
  createChooseFilesAction,
  createEnterStringAction,
  createStartHashAction
} = actions;

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

const getFilesFromEvent = (event) => {
  const transfer = event.dataTransfer;
  const items = transfer && transfer.items;
  const files = (items && getFilesFromItems(items)) ||
    (transfer && transfer.files) ||
      (event.target && event.target.files);

  return files;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  hashFiles: (event) => {
    return dispatch(createStartHashAction());
  },
  choose:    (event) => {
    return dispatch(
      createChooseFilesAction(
        getFilesFromEvent(event)
      )
    );
  },
  enter:      (event) => {
    return dispatch(
      createEnterStringAction(
        event.target.value
      )
    );
  }
});

export const FileChooserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FileChooser);
export default FileChooserContainer;
