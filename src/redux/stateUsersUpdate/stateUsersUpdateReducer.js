import { UPDATESTATE } from './stateUsersUpdateTypes';

const initialState = false;

const stateUpdateUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATESTATE:
      return !state;
    default:
      return state;
  }
};

export default stateUpdateUsersReducer;
