import {
  INCREMENT,
  DECREMENT,
  REMOVE,
  CLEAR,
  SHIPPING,
  TOTAL,
  DELIVERY,
  PAYMENT,
  ADDTOTAL,
} from './cartTypes';

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

export const insertShipping = (value) => {
  return {
    type: SHIPPING,
    value,
  };
};

export const getTotal = () => {
  return {
    type: TOTAL,
  };
};

export const insertTotal = (value) => {
  return {
    type: ADDTOTAL,
    value,
  };
};

export const getDelivery = (item) => {
  return {
    type: DELIVERY,
    item: item,
  };
};

export const getPayment = (item) => {
  return {
    type: PAYMENT,
    item: item,
  };
};
