import axios from "axios";

export const listProducts =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: "PRODUCT_LIST_REQUEST" });
      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      dispatch({
        type: "PRODUCT_LIST_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "PRODUCT_LIST_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_DETAILS_REQUEST" });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: "PRODUCT_DETAILS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "PRODUCT_DETAILS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "PRODUCT_DETAILS_REQUEST" });
    const {
      UserLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);

    dispatch({
      type: "PRODUCT_DELETE_SUCCESS",
    });
  } catch (error) {
    dispatch({
      type: "PRODUCT_DELETE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "PRODUCT_CREATE_REQUEST" });
    const {
      UserLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products`, {}, config);

    dispatch({
      type: "PRODUCT_CREATE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "PRODUCT_CREATE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: "PRODUCT_UPDATE_REQUEST" });
    const {
      UserLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.patch(
      `/api/products/${product._id}`,
      product,
      config
    );

    dispatch({
      type: "PRODUCT_UPDATE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "PRODUCT_UPDATE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createProductReview =
  (id, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: "PRODUCT_REVIEW_CREATE_REQUEST" });
      const {
        UserLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/products/${id}/reviews`,
        review,
        config
      );

      dispatch({
        type: "PRODUCT_REVIEW_CREATE_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "PRODUCT_REVIEW_CREATE_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getTopRatedProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_TOP_RATED_REQUEST" });

    const { data } = await axios.get(`/api/products/top`);

    dispatch({
      type: "PRODUCT_TOP_RATED_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "PRODUCT_TOP_RATED_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
