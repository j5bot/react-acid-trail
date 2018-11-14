import { createActions } from '../modules/actions';

let created = createActions([
  'chooseFiles',
  'enterTitle',
  'enterString',
  'clear',
  'startHash',
  'finishHash'
]);

export const { types, actions } = created;
export default created.default;
