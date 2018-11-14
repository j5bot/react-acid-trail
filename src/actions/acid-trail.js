import { createActions } from '../modules/actions';

let created = createActions([
  'changeShowBars',
  'changeShowShape'
]);

export const { actions, types, dispatchers } = created;

export default created.default;
