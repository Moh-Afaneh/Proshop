export const MethodPayment = (state = { MethodPayment: "" }, action) => {
  switch (action.type) {
    case "CART_SAVE_PAYMENT_METHOD":
      return {
        ...state,
        paymentMethod: action.payload,
      };

    default:
      return state;
  }
};
