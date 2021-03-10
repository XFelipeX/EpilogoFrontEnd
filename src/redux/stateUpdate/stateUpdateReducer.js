import { UPDATESTATE } from './stateUpdateTypes';

const initialState = false;

const stateUpdateReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATESTATE:
      return !state 
    default:
      return state
  }
}

export default stateUpdateReducer;