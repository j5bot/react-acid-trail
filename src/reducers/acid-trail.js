import actions from '../actions';

const defaultState = {
  showShape: 'notched',
  showBars:  {}
};

const {
  CHANGE_SHOW_BARS,
  CHANGE_SHOW_SHAPE
} = actions;

export const acidTrail = (state = defaultState, action) => {
  let newState = state;

  const { type, payload } = action;

  switch (type) {

  case CHANGE_SHOW_BARS:

    newState = {
      ...newState,
      showBars: {
        ...newState.showBars,
        ...payload
      }
    };

    break;

  case CHANGE_SHOW_SHAPE:

    newState = {
      ...newState,
      showShape: payload.shape || defaultState.showShape
    };

    break;

  default:
    break;

  }

  return newState;

};

export default acidTrail;
