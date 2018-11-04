const CHANGE_SHOWBARS = Symbol('CHANGE_SHOWBARS');

export const types = {
  CHANGE_SHOWBARS
};

export const createChangeShowBarsAction = (bar, checked) => {
  return {
    type:     CHANGE_SHOWBARS,
    payload:  {
      [bar]: checked
    }
  };
};

export const actions = {
  createChangeShowBarsAction
};

export default {
  ...types,
  ...actions
};
