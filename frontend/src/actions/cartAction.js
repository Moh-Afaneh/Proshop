export const AddCart = (product, qty) => async (dispatch, getState) => {
  dispatch({
    type: "ADDITEM",
    payload: {
      product,
      qty,
    },
  });
  localStorage.setItem("cart", JSON.stringify(getState().cart));
};
export const ResetCart = () => async (dispatch, getState) => {
  dispatch({
    type: "RESETITEM",
    payload: {},
  });
  localStorage.removeItem("cart", JSON.stringify(getState().cart));
};
export const RemoveCart = (product, qty) => async (dispatch, getState) => {
  dispatch({
    type: "DELITEM",
    payload: {
      product,
      qty,
    },
  });
  localStorage.setItem("cart", JSON.stringify(getState().cart));
};
export const UpdateCart = (product, qty) => async (dispatch, getState) => {
  dispatch({
    type: "UPATEITEM",
    payload: {
      product,
      qty,
    },
  });
  localStorage.setItem("cart", JSON.stringify(getState().cart));
};
export const saveShipping = (data) => async (dispatch) => {
  dispatch({
    type: "CART_SAVE_SHIPPING_ADDRESS",
    payload: data,
  });
  localStorage.setItem("shipping", JSON.stringify(data));
};
export const savePaymentMethod = (data) => async (dispatch) => {
  dispatch({
    type: "CART_SAVE_PAYMENT_METHOD",
    payload: data,
  });
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
