import axios from "axios";
export const Login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "USER_LOGIN_REQUEST",
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );
    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_FAILED",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const Logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: "USER_LOGOUT",
  });
  dispatch({
    type: "USER_LIST_RESET",
  });
  dispatch({
    type: "ORDER_PAY_RESET",
  });
  dispatch({
    type: "USER_DETAILS_RESET",
  });
  dispatch({
    type: "RESETITEM",
  });
};
export const Register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "USER_REGISTER_REQUEST",
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/signup",
      { name, email, password },
      config
    );
    dispatch({
      type: "USER_REGISTER_SUCCESS",
      payload: data,
    });
    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "USER_REGISTER_FAILED",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_DETAILS_REQUEST",
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
    const { data } = await axios.get(`/api/users/${id}`, config);
    console.log(data);
    dispatch({
      type: "USER_DETAILS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "USER_DETAILS_FAILED",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const UpdateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_UPDATE_PROFILE_REQUEST",
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
    const { data } = await axios.put(`/api/users/profile`, user, config);
    dispatch({
      type: "USER_DETAILS_SUCCESS",
      payload: data,
    });
    dispatch({
      type: "USER_UPDATE_PROFILE_SUCCESS",
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "USER_UPDATE_PROFILE_FAILED",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const GetUserList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_LIST_REQUEST",
    });
    const {
      UserLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/users`, config);

    dispatch({
      type: "USER_LIST_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "USER_LIST_FAILED",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const DeleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_DELETE_REQUEST",
    });
    const {
      UserLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/users/${id}`, config);
    dispatch({
      type: "USER_DELETE_SUCCESS",
    });
  } catch (error) {
    dispatch({
      type: "USER_DELETE_FAILED",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const UpdateUserAdmin = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_UPDATE_REQUEST",
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
    const { data } = await axios.put(`/api/users/${user._id}`, user, config);
    console.log(data);

    dispatch({
      type: "USER_UPDATE_SUCCESS",
    });
    dispatch({
      type: "USER_DETAILS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "USER_UPDATE_FAILED",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
