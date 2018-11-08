import { types } from '../actions';

const defaultState = {
  showShape: 'notched',
  showBars:  {}
};

const {
  CHANGE_SHOWBARS,
  CHANGE_SHOWSHAPE
} = types;

export const acidTrail = (state = defaultState, action) => {
  let newState = state;

  const { type, payload } = action;

  switch (type) {

  case CHANGE_SHOWBARS:

    newState = {
      ...newState,
      showBars: {
        ...newState.showBars,
        ...payload
      }
    };

    break;

  case CHANGE_SHOWSHAPE:

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
