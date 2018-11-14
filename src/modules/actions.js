/**
 * Methods to create standardized action types, action creators, and
 * action dispatchers from an action name
 *
 * @module actions
 */

/**
 * Convert camel-cased string to snake-cased string, for example:
 *
 * camelToSnake('fooAction') === 'foo_Action'
 *
 * @param  {String} string camel-cased string
 * @return {String}        snake-cased string
 */
export const camelToSnake = (string) => {
  return string.replace(/([A-Z]{1})([A-Z]*)/g, '_$1$2');
};

/**
 * Convert camel-cased string to upper-snake-cased string, for example:
 *
 * camelToUpperSnake('fooAction') === 'FOO_ACTION'
 *
 * @param  {String} string camel-cased string
 * @return {String}        upper-snake-cased string
 */
export const camelToUpperSnake = (string) => {
  return camelToSnake(string).toUpperCase();
};

/**
 * Convert camel-cased string to lower-snake-cased string, for example:
 *
 * camelToLowerSnake('fooAction') === 'foo_action'
 *
 * @param  {[type]} string [description]
 * @return {[type]}        [description]
 */
export const camelToLowerSnake = (string) => {
  return camelToSnake(string).toLowerCase();
};

/**
 * Create the action creator name from the action name, for example:
 *
 * getCreateActionName('fooAction') === 'createFooAction'
 *
 * @param  {String} string name of action
 * @return {String}        name of action creator
 */
export const getCreateActionName = (string) => {
  return 'create' +
    string.substr(0, 1).toUpperCase() +
    string.substr(1) +
    'Action';
};

/**
 * Action creator generator --
 * Create a function that calls a pure function and mutates the given object
 *
 * @param  {Object} created The object to mutate (update with new actions)
 * @return {Function}       The function which mutates the object to add new
 *                          actions
 */
export const makeActionCreator = (created) => {

  return ({ action, loader }) => {

    const { actions, types, dispatchers } = create({
      actions:      created.actions,
      types:        created.types,
      dispatchers:  created.dispatchers,
      action,
      loader
    });

    created.actions = actions;
    created.types = types;
    created.dispatchers = dispatchers;

    return created;
  };
};

/**
 * Given an array of action definitions, run the actionCreator for each action.
 *
 * @param  {Array} actions  An array of action definitions, either action names
 *                          as Strings or objects containing action names and
 *                          optional action loaders (payload creators)
 * @return {Object}         An object containing types, actions, dispatchers and
 *                          a default object for exporting
 */
export const createActions = (actions) => {

  let created = {};
  const actionCreator = makeActionCreator(created);

  actions.forEach(
    (action) => actionCreator(
      typeof action === 'object' ? action : { action: action }
    )
  );

  return {
    ...created,
    default: {
      ...created.types,
      ...created.actions,
      ...created.dispatchers
    }
  };

};

/**
 * Given action-creators, action-types, and action-dispatchers objects, and
 * an action name and optional loader (payload transformer) function,
 * create new action-creators, action-types, and action-dispatchers objects with
 * new creator, type, and dispatcher for the provided action name.
 *
 * @param  {Object} [actions={}]     Existing action-creator methods, default is
 *                                   a new empty object
 * @param  {Object} [types={}]       Existing action-types, default is a new
 *                                   empty object
 * @param  {Object} [dispatchers={}] Existing action-dispatcher methods, default
 *                                   is a new empty object
 * @param  {String} action           New action name
 * @param  {Function} [loader]         An optional function to transform the
 *                                   payload sent to the action-creator
 * @return {Object}                  An option containing new action-creators,
 *                                   action-types, and action-dispatchers
 */
export const create = ({
  actions = {}, types = {}, dispatchers = {}, action, loader = undefined
}) => {

  const type = camelToUpperSnake(action);
  const ACTION_TYPE = Symbol(type);

  const createAction = (payload) => {
    return {
      type:       ACTION_TYPE,
      payload:    loader ? loader(payload) : payload,
      timestamp:  new Date().valueOf()
    };
  };

  const newActions = {
    ...actions,
    [getCreateActionName(action)]: createAction
  };

  const newTypes = {
    ...types,
    [type]: ACTION_TYPE
  };

  const newDispatchers = {
    ...dispatchers,
    [action]: (dispatch, transformer) => (payload) => dispatch(
      createAction(transformer ? transformer(payload) : payload)
    )
  };

  return {
    actions:      newActions,
    types:        newTypes,
    dispatchers:  newDispatchers
  };

};

export default {
  create,
  createActions,
  makeActionCreator
};
