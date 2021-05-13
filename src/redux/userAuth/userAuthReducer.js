import { LOGIN, LOGOFF, SETPASSWORD } from './userAuthTypes';

const initialState = {
  id: -1,
  typeAccount: 2,
  user: '',
  token: null,
};

const userAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        id: action.payload.object.id,
        typeAccount: action.payload.object.typeAccount,
        user: action.payload.object,
        token: action.payload.session,
      };
    case LOGOFF:
      state = undefined;
      return {
        id: -1,
        typeAccount: 2,
        user: '',
        token: null,
      };
    case SETPASSWORD:
      state.user.userPassword = action.value;
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default userAuthReducer;
