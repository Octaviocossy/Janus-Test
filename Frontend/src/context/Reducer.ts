import { InitialState } from '../models';

import { Actions } from './actions';

const Reducer = (state: InitialState, action: Actions) => {
  switch (action.type) {
    case 'getReportes':
      return {
        ...state,
        reportes: action.payload,
      };
    case 'message':
      return {
        ...state,
        alert: action.payload,
      };
    case 'resetMessage':
      return {
        ...state,
        alert: null,
      };
    default:
      return state;
  }
};

export default Reducer;
