import { types } from '../actions';

const defaultState = {
  showBars: {}
};

const {
  CHANGE_SHOWBARS
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

  default:
    break;

  }

  return newState;

};

export default acidTrail;
