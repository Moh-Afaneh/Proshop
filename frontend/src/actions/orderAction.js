import axios from "axios";
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "ORDER_CREATE_RESQUEST",
    });
    const {
      UserLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/order`, order, config);
    dispatch({
      type: "ORDER_CREATE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ORDER_CREATE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "ORDER_DETAILS_RESQUEST",
    });
    const {
      UserLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/order/${id}`, config);
    dispatch({
      type: "ORDER_DETAILS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ORDER_DETAILS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const SetPaidOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({
        type: "ORDER_PAY_RESQUEST",
      });
      const {
        UserLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/order/${orderId}/pay`,
        paymentResult,
        config
      );
      dispatch({
        type: "ORDER_PAY_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "ORDER_PAY_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const GetMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "ORDER_LIST_MY_RESQUEST",
    });
    const {
      UserLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/order/myorders`, config);
    dispatch({
      type: "ORDER_LIST_MY_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ORDER_LIST_MY_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const GetAllOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "ORDER_GET_RESQUEST",
    });
    const {
      UserLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/order`, config);
    dispatch({
      type: "ORDER_GET_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ORDER_GET_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const setDelivered = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "ORDER_DELIVER_RESQUEST",
    });
    const {
      UserLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/order/${id}/deliver`, {}, config);
    dispatch({
      type: "ORDER_DELIVER_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ORDER_DELIVER_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
