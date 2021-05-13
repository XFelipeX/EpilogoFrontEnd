import { LOGIN, LOGOFF, SETPASSWORD } from './userAuthTypes';

export const logIn = (info) => {
  return {
    type: LOGIN,
    payload: info,
  };
};

export const logOff = () => {
  return {
    type: LOGOFF,
  };
};

export const setPassword = (value) => {
  return {
    type: SETPASSWORD,
    value: value,
  };
};
