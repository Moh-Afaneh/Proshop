import { applyMiddleware, combineReducers } from "redux";
import { createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { HandleCart } from "./reducers/cartReducers";
import {
  UserDeleteAdminReducer,
  UserDetailsReducer,
  UserListReducer,
  UserReducer,
  UserReducerRegister,
  UserUpdateAdminReducer,
  UserUpdateProfileReducer,
} from "./reducers/userReducers";
import { shippingAddressReducer } from "./reducers/ShippingReducer";
import { MethodPayment } from "./reducers/MethodPayment";
import {
  getAllOrdersReducer,
  OrderCreateReducers,
  orderDeliverReducer,
  OrderDetailReducers,
  OrderMyReducer,
  OrderPayReducer,
} from "./reducers/orderReducers";
import {
  productCreateReducer,
  productCreateReviewReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productUpdateReducer,
  topProductsRated,
} from "./reducers/productReducers";
const reducer = combineReducers({
  cart: HandleCart,
  UserLogin: UserReducer,
  UserRegister: UserReducerRegister,
  UserDetails: UserDetailsReducer,
  UserUpdateProfile: UserUpdateProfileReducer,
  ShippingAddress: shippingAddressReducer,
  paymentMethod: MethodPayment,
  orderCreate: OrderCreateReducers,
  orderDetails: OrderDetailReducers,
  OrderPay: OrderPayReducer,
  MyOrders: OrderMyReducer,
  UserList: UserListReducer,
  UserDel: UserDeleteAdminReducer,
  UserUpdateAdmin: UserUpdateAdminReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  AllOrders: getAllOrdersReducer,
  deliveredStatus: orderDeliverReducer,
  productReviewCreate: productCreateReviewReducer,
  productTopRated: topProductsRated,
});
const cartItemStorage = localStorage.getItem("cart")
  ? JSON?.parse(localStorage?.getItem("cart"))
  : [];
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const shippingAddress = localStorage.getItem("shipping")
  ? JSON.parse(localStorage.getItem("shipping"))
  : {};
const paymentMethod = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : {};
const initialState = {
  cart: cartItemStorage,
  UserLogin: { userInfo: userInfoFromStorage },
  ShippingAddress: { shipping: shippingAddress },
  paymentMethod: { paymentMethod },
};
const middleWare = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);
export default store;
