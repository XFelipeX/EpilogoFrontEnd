import { INCREMENT } from './cartTypes';
import { DECREMENT } from './cartTypes';
import { REMOVE } from './cartTypes';
import { CLEAR } from './cartTypes';

const initialState = {
  products: [],
  amount: 0,
  subtotal: 0,
  frete: 0,
  total: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      const existItem = state.products.filter(
        (product) => +product.id === +action.item.id,
      );

      if (existItem.length) {
        existItem[0].quantity += 1;
        state.products = state.products.filter(
          (product) => product.id !== existItem[0].id,
        );

        return {
          ...state,
          products: [...state.products, existItem[0]],
          amount: (state.amount += 1),
          subtotal: +(state.subtotal += existItem[0].price).toFixed(2),
        };
      }

      action.item.quantity = 1;

      return {
        ...state,
        products: [...state.products, action.item],
        amount: (state.amount += 1),
        subtotal: +(state.subtotal += action.item.price).toFixed(2),
      };
    case DECREMENT:
      const item = state.products.filter(
        (product) => +product.id === +action.item.id,
      );

      if (item.length && item[0].quantity > 1) {
        item[0].quantity -= 1;
        state.products = state.products.filter(
          (product) => product.id !== item[0].id,
        );
        state.products.total -= 1;
        return {
          ...state,
          products: [...state.products, item[0]],
          amount: (state.amount -= 1),
          subtotal: +(state.subtotal -= item[0].price).toFixed(2),
        };
      }
      return { ...state };
    case REMOVE:
      const itemRemove = state.products.filter(
        (product) => product.id === action.item.id,
      );
      state.products = state.products.filter(
        (product) => product.id !== action.item.id,
      );
      return {
        ...state,
        amount: state.amount - itemRemove[0].quantity,
        subtotal: +(state.subtotal -=
          itemRemove[0].price * itemRemove[0].quantity).toFixed(2),
      };
    case CLEAR:
      state = initialState;
      return { ...state };
    default:
      return state;
  }
};

export default cartReducer;
