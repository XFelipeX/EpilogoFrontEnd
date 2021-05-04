import { GET_CART } from './cartTypes';

export const getCart = (payload) => {
  return {
    type: GET_CART,
    payload: payload,
  };
};
