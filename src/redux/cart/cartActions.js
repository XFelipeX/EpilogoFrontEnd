import { INCREMENT } from './cartTypes';
import { DECREMENT } from './cartTypes';
import { REMOVE } from './cartTypes';
import { CLEAR } from './cartTypes';

export const incrementItem = (item) => {
  return {
    type: INCREMENT,
    item: item,
  };
};

export const decrementItem = (item) => {
  return {
    type: DECREMENT,
    item: item,
  };
};

export const removeItem = (item) => {
  return {
    type: REMOVE,
    item: item,
  };
};

export const clearCart = (item) => {
  return {
    type: CLEAR,
    item: item,
  };
};
