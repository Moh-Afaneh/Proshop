export const OrderCreateReducers = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_CREATE_RESQUEST":
      return { ...state, loading: true };
    case "ORDER_CREATE_SUCCESS":
      return { loading: false, success: true, order: action.payload };
    case "ORDER_CREATE_FAIL":
      return { loading: false, success: false, Error: action.payload };

    default:
      return state;
  }
};
export const OrderDetailReducers = (
  state = { loading: true, orderitems: [], shippingAdress: {} },
  action
) => {
  switch (action.type) {
    case "ORDER_DETAILS_RESQUEST":
      return { ...state, loading: true };
    case "ORDER_DETAILS_SUCCESS":
      return { order: action.payload };
    case "ORDER_DETAILS_FAIL":
      return { loading: false, success: false, Error: action.payload };

    default:
      return state;
  }
};
export const OrderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_PAY_RESQUEST":
      return { ...state, loading: true };
    case "ORDER_PAY_SUCCESS":
      return { loading: false, success: true };
    case "ORDER_PAY_FAIL":
      return { loading: false, success: false, Error: action.payload };
    case "ORDER_PAY_RESET":
      return {};

    default:
      return state;
  }
};
export const OrderMyReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_LIST_MY_RESQUEST":
      return { ...state, loading: true };
    case "ORDER_LIST_MY_SUCCESS":
      return { loading: false, success: true, orders: action.payload };
    case "ORDER_LIST_MY_FAIL":
      return { loading: false, success: false, Error: action.payload };

    default:
      return state;
  }
};
export const getAllOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case "ORDER_GET_RESQUEST":
      return { ...state, loading: true };
    case "ORDER_GET_SUCCESS":
      return { loading: false, success: true, orders: action.payload };
    case "ORDER_GET_FAIL":
      return { loading: false, success: false, Error: action.payload };

    default:
      return state;
  }
};
export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_DELIVER_RESQUEST":
      return { ...state, loading: true };
    case "ORDER_DELIVER_SUCCESS":
      return { loading: false, success: true };
    case "ORDER_DELIVER_FAIL":
      return { loading: false, success: false, Error: action.payload };
    case "ORDER_DELIVER_RESET":
      return {};

    default:
      return state;
  }
};
