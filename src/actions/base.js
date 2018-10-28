const DO_SOMETHING = Symbol('DO_SOMETHING');
const DO_ANOTHER = Symbol('DO_ANOTHER');

export const types = {
  DO_SOMETHING,
  DO_ANOTHER
};

export const createDoSomethingAction = (something) => {
  return {
    type:    DO_SOMETHING,
    payload: {
      something
    }
  };
};

export const createDoAnotherAction = (another) => {
  return {
    type:    DO_ANOTHER,
    payload: {
      another
    }
  };
};

export const actions = {
  createDoSomethingAction,
  createDoAnotherAction
};

export default {
  ...types,
  ...actions
};
