import { GET_CART } from './cartTypes';

const initialState = {
  products: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return action.payload;
    default:
      return state;
  }
};

export default cartReducer;
