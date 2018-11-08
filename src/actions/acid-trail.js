const CHANGE_SHOWBARS = Symbol('CHANGE_SHOWBARS');
const CHANGE_SHOWSHAPE = Symbol('CHANGE_SHOWSHAPE');

export const types = {
  CHANGE_SHOWBARS,
  CHANGE_SHOWSHAPE
};

export const createChangeShowBarsAction = (bar, checked) => {
  return {
    type:     CHANGE_SHOWBARS,
    payload:  {
      [bar]: checked
    }
  };
};

export const createChangeShowShapeAction = (shape) => {
  return {
    type:     CHANGE_SHOWSHAPE,
    payload:  {
      shape
    }
  };
};

export const actions = {
  createChangeShowBarsAction,
  createChangeShowShapeAction
};

export default {
  ...types,
  ...actions
};
